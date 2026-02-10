<template>
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold">ENCODE DATA INDICATORS</h1>
  </div>

  <!-- ✅ DATA STATISTICS (ONE BAR = % COMPLETION PER SUBCATEGORY) -->
  <div class="border rounded-xl p-3 mt-6">
    <div class="flex items-center justify-between mb-2">
      <div>
        <div class="text-lg font-bold">Data Statistics (Completion % by Subcategory)</div>
        <div class="text-xs opacity-70">
          Each bar = one Subcategory. % = Actual Encoded / Expected Indicators × 100.
        </div>
      </div>

      <div class="text-xs opacity-70">
        Year:
        <span class="font-semibold">{{ state.selected_year_label }}</span>
        · Right ID:
        <span class="font-semibold">{{ state.selected_rights_id }}</span>
      </div>
    </div>

    <div v-if="state.stats.loading" class="text-sm opacity-70 py-6 text-center">
      Loading statistics...
    </div>

    <div v-else-if="state.stats.categories.length === 0" class="text-sm opacity-70 py-6 text-center">
      No subcategories found for selected right/year.
    </div>

    <div v-else>
      <ClientOnly>
        <apexchart
          type="bar"
          height="420"
          width="100%"
          :options="state.stats.options"
          :series="state.stats.series"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, watch } from "vue";
import { reportDetailsService } from "~/components/api/ReportDetailsService";

definePageMeta({ layout: "main" });

const props = defineProps({
  report_year: { type: [Number, String], required: false }, // from parent (treat as report_year_id)
  report_years: { type: [Array, Object], required: true },  // for label lookup
  passed_data: { type: [Array, Object], required: true },   // indicator categories tree
  right: { type: [Number, String], required: false },       // right id from parent
});

const state = reactive({
  // selected from props
  selected_year_id: 1,
  selected_year_label: "",
  selected_rights_id: 1,

  // config tree derived from props.passed_data
  Rights_entry_config: [],
  Selected_Rights_entry_config: { data: [] },

  // actual encodes
  report_details: [],

  // chart
  stats: {
    loading: false,
    categories: [],
    series: [],
    options: {
      chart: { type: "bar", toolbar: { show: false }, zoom: { enabled: false } },
      plotOptions: { bar: { horizontal: false, columnWidth: "55%" } },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${Number(val).toFixed(0)}%`,
      },
      tooltip: { shared: false, intersect: true },
      legend: { show: false },
      xaxis: { categories: [] },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
        title: { text: "Completion (%)" },
        labels: { formatter: (v) => `${Number(v).toFixed(0)}%` },
      },
    },
  },
});

const categories = computed(() => state.Selected_Rights_entry_config.data || []);

function normalizeArrayLike(raw) {
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  if (raw && Array.isArray(raw?.data?.data)) return raw.data.data;
  return [];
}

function syncSelectionsFromProps() {
  // year id from parent (fallback to 1)
  const yid = Number(props.report_year);
  state.selected_year_id = Number.isFinite(yid) && yid > 0 ? yid : 1;

  // right id from parent (fallback to 1)
  const rid = Number(props.right);
  state.selected_rights_id = Number.isFinite(rid) && rid > 0 ? rid : 1;

  // compute label from report_years
  const years = normalizeArrayLike(props.report_years);
  const match = years.find((r) => Number(r?.id) === Number(state.selected_year_id));
  state.selected_year_label = String(match?.name ?? match?.year ?? state.selected_year_id);
}

/**
 * ✅ Uses props.passed_data instead of fetching
 * Builds grouped configs by right_id and sets Selected_Rights_entry_config
 */
function fetchRights_entry_config() {
  const src = normalizeArrayLike(props.passed_data);

  state.Rights_entry_config = src;

  // group by right_id (same logic as before but from props)
  const grouped = {};
  for (const item of src) {
    const id = Number(item?.right_id ?? 0);
    if (!grouped[id]) grouped[id] = [];
    grouped[id].push(item);
  }

  // store grouped into state so the old selection logic still works
  for (const [id, items] of Object.entries(grouped)) {
    state[`Rights_entry_config${id}`] = { data: items };
  }

  changeData();
}

function changeData() {
  const id = Number(state.selected_rights_id) || 1;
  const key = `Rights_entry_config${id}`;

  // If right_id not found, fallback to ALL data
  state.Selected_Rights_entry_config = state[key] || { data: state.Rights_entry_config };

  rebuildStats();
}

/**
 * Fetch report_details for selected report_year_id + right_id
 * If your API expects different keys, change only params below.
 */
async function fetchReportDetails() {
  const params = {
    report_year_id: Number(state.selected_year_id),
    right_id: Number(state.selected_rights_id),
  };

  const response = await reportDetailsService.getReportDetails(params);
  return Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [];
}

/**
 * ✅ One bar per SUBCATEGORY = % completion
 * expected = total indicator_group_elements under that subcategory (across all groups)
 * actual = total count of report_details whose indicator_no is under that subcategory
 */
async function rebuildStats() {
  try {
    state.stats.loading = true;

    const cfg = categories.value || [];

    // Fetch actual details once
    const details = await fetchReportDetails();
    state.report_details = details;

    // indicator_no -> count
    const countByIndicator = new Map();
    for (const d of details) {
      const ind = String(d?.indicator_no ?? d?.indicator ?? "").trim();
      if (!ind) continue;
      countByIndicator.set(ind, (countByIndicator.get(ind) ?? 0) + 1);
    }

    // Build per-subcategory aggregates
    const subAgg = new Map(); // key -> { label, expected, actual }
    for (const cat of cfg) {
      const subs = Array.isArray(cat?.indicator_subcategories) ? cat.indicator_subcategories : [];
      for (const sub of subs) {
        const key = `${cat?.id ?? "cat"}:${sub?.id ?? "sub"}`;
        const label = String(sub?.description ?? "Subcategory").trim() || "Subcategory";

        let expected = 0;
        let actual = 0;

        const groups = Array.isArray(sub?.indicator_groups) ? sub.indicator_groups : [];
        for (const g of groups) {
          const elements = Array.isArray(g?.indicator_group_elements) ? g.indicator_group_elements : [];
          expected += elements.length;

          for (const e of elements) {
            const indNo = String(e?.indicator_no ?? "").trim();
            if (!indNo) continue;
            actual += countByIndicator.get(indNo) ?? 0;
          }
        }

        subAgg.set(key, { label, expected, actual });
      }
    }

    const categoriesAxis = [];
    const percentData = [];
    const meta = [];

    for (const [, v] of subAgg.entries()) {
      const pctRaw = v.expected > 0 ? (v.actual / v.expected) * 100 : 0;
      const pctShown = Number(Math.min(pctRaw, 100).toFixed(1)); // clamp 100

      categoriesAxis.push(v.label);
      percentData.push(pctShown);
      meta.push({ expected: v.expected, actual: v.actual, pctRaw });
    }

    state.stats.categories = categoriesAxis;
    state.stats.series = [{ name: "Completion (%)", data: percentData }];

    state.stats.options = {
      ...state.stats.options,
      xaxis: {
        categories: categoriesAxis,
        labels: { rotate: -25, trim: true, style: { fontSize: "11px" } },
      },
      tooltip: {
        y: {
          formatter: (val, opts) => {
            const i = opts.dataPointIndex;
            const m = meta[i] || { actual: 0, expected: 0, pctRaw: 0 };
            const shownPct = Number(val).toFixed(1);
            const rawPct = Number(m.pctRaw).toFixed(1);
            return `${shownPct}% (Actual ${m.actual} / Expected ${m.expected})${
              m.pctRaw > 100 ? ` · Raw ${rawPct}%` : ""
            }`;
          },
        },
      },
      yaxis: { ...state.stats.options.yaxis, min: 0, max: 100 },
      dataLabels: { enabled: true, formatter: (v) => `${Number(v).toFixed(0)}%` },
      legend: { show: false },
    };
  } catch (e) {
    console.error("rebuildStats error:", e);
    state.stats.categories = [];
    state.stats.series = [];
  } finally {
    state.stats.loading = false;
  }
}

onMounted(() => {
  syncSelectionsFromProps();
  fetchRights_entry_config();
});

// Recompute when parent changes year/right/config
watch(
  () => [props.report_year, props.right, props.passed_data, props.report_years],
  () => {
    syncSelectionsFromProps();
    fetchRights_entry_config();
  },
  { deep: true }
);
</script>
