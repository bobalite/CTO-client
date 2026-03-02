<template>
  <div class="border rounded-xl p-4">
    <div class="flex items-end justify-between gap-4">
      <div>
        <div class="text-lg font-bold">{{ title }}</div>
        <div class="text-xs opacity-70">
          Overall: {{ overall.actual }} / {{ overall.expected }} ({{ overall.percentage }}%)
        </div>
        <div class="text-xs opacity-70" v-if="activeTabName">
          Tab: <span class="font-semibold">{{ activeTabName }}</span>
        </div>
      </div>

      <div class="text-2xl font-semibold">
        {{ overall.percentage }}%
      </div>
    </div>

    <!-- Stacked bar (overall) -->
    <div class="mt-3 h-5 w-full rounded-full overflow-hidden bg-gray-200 flex">
      <div
        v-for="seg in segments"
        :key="seg.key"
        class="h-full relative"
        :style="{ width: seg.widthPct + '%' }"
        :title="`${seg.label}\n${seg.actual}/${seg.expected} (${seg.pct}%)`"
      >
        <div class="absolute inset-0 bg-gray-300 opacity-40"></div>
        <div
          class="absolute inset-y-0 left-0 bg-green-600"
          :style="{ width: seg.fillPct + '%' }"
        ></div>
        <div class="absolute right-0 top-0 h-full w-[1px] bg-white/70"></div>
      </div>
    </div>

    <!-- Apex vertical bar chart -->
    <div class="mt-4">
      <div v-if="groupSummaries.length === 0" class="text-sm opacity-70 py-6 text-center">
        No completeness data for this tab yet.
      </div>

      <div v-else>
        <ClientOnly>
          <apexchart
            type="bar"
            height="220"
            width="100%"
            :options="chartOptions"
            :series="chartSeries"
          />
        </ClientOnly>
      </div>
    </div>

    <div v-if="allValues.length === 0" class="text-sm opacity-70 py-6 text-center">
      No completeness data yet.
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: { type: String, default: "Completeness (All Subcategories)" },
  selected_tab: { type: [Object, String], required: false, default: "" },
  data: { type: [Array, Object], required: true },
  report_year: { type: [Number, String], required: true },
});

function normalizeData(raw) {
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === "object") return Object.values(raw);
  return [];
}

const allValues = computed(() => normalizeData(props.data));

const activeTabName = computed(() => {
  if (!props.selected_tab) return "";
  if (typeof props.selected_tab === "string") return props.selected_tab;
  return String(props.selected_tab?.name ?? "").trim();
});

const filteredValues = computed(() => {
  const values = allValues.value;
  const tab = activeTabName.value;

  if (!tab) return values;

  return values.filter((v) => {
    const tn = String(v?.tab_name ?? "").trim();
    if (!tn) return true; // fallback for legacy payload
    return tn === tab;
  });
});

/**
 * Submission-type normalization
 */
function normalizeSubmissionType(v) {
  return String(v?.submission_type ?? v?.submissionType ?? "")
    .trim()
    .toLowerCase();
}

/**
 * Group key/label getters (group-encoded payload)
 */
function getGroupKey(row) {
  return String(row?.subcategory_key ?? row?.subcategory_label ?? "unknown").trim();
}

function getGroupLabel(row) {
  return String(row?.subcategory_label ?? row?.subcategory_key ?? "Subcategory").trim();
}

/**
 * Year matching:
 * - If row has year/report_year fields, filter by props.report_year
 * - Else assume data is already year-filtered upstream
 */
function rowMatchesYear(row, year) {
  const y =
    row?.year ??
    row?.report_year ??
    row?.reportYear ??
    null;

  if (y == null || String(y).trim() === "") return true;
  return Number(y) === Number(year);
}

/**
 * Quarter identity:
 * - Prefer row.quarter (1..4)
 * - Else use report_year_id as a "quarter bucket id" if that’s what you store
 */
function getQuarterIdentity(row) {
  const q = Number(row?.quarter);
  if (Number.isFinite(q) && q >= 1 && q <= 4) return `Q${q}`;

  const ryId = row?.report_year_id ?? row?.reportYearId;
  if (ryId != null && String(ryId).trim() !== "") return String(ryId);

  return null;
}

/**
 * ✅ Simplified completeness per group:
 * - Quarterly => expected=4, actual=distinct quarters present
 * - Annual/Open/others => expected=1, actual=1 if any entry exists
 */
const groupSummaries = computed(() => {
  const year = Number(props.report_year);
  const rows = filteredValues.value.filter((r) => rowMatchesYear(r, year));

  const map = new Map();

  for (const row of rows) {
    if (!row) continue;

    const key = getGroupKey(row);
    const label = getGroupLabel(row);
    const st = normalizeSubmissionType(row);

    if (!map.has(key)) {
      map.set(key, {
        key,
        label,
        submission_type: st,
        hasAny: false,
        quarterSet: new Set(),
      });
    }

    const g = map.get(key);
    g.hasAny = true;

    if (st === "quarterly") {
      const qid = getQuarterIdentity(row);
      if (qid) g.quarterSet.add(qid);
    }
  }

  return Array.from(map.values()).map((g) => {
    const expected = g.submission_type === "quarterly" ? 4 : 1;
    const actual =
      g.submission_type === "quarterly"
        ? Math.min(g.quarterSet.size, 4)
        : g.hasAny
          ? 1
          : 0;

    const pct = expected > 0 ? (actual / expected) * 100 : 0;

    return {
      subcategory_key: g.key,
      subcategory_label: g.label,
      submission_type: g.submission_type,
      expected,
      actual,
      percentage: Number(Math.min(pct, 100).toFixed(1)),
    };
  });
});

const overall = computed(() => {
  let expected = 0;
  let actual = 0;

  for (const g of groupSummaries.value) {
    expected += Number(g.expected) || 0;
    actual += Number(g.actual) || 0;
  }

  const percentage =
    expected > 0 ? Number(((actual / expected) * 100).toFixed(1)) : 0;

  return { expected, actual, percentage };
});

const segments = computed(() => {
  const values = groupSummaries.value.filter((g) => (Number(g.expected) || 0) > 0);
  const totalExpected = overall.value.expected || 0;

  return values.map((g) => {
    const expected = Number(g.expected) || 0;
    const actual = Number(g.actual) || 0;

    const widthPct = totalExpected > 0 ? (expected / totalExpected) * 100 : 0;
    const fillPct = expected > 0 ? (actual / expected) * 100 : 0;

    return {
      key: String(g.subcategory_key ?? g.subcategory_label ?? Math.random()),
      label: String(g.subcategory_label ?? g.subcategory_key ?? "Subcategory"),
      expected,
      actual,
      pct: Number(Math.min(fillPct, 100).toFixed(1)),
      widthPct: Number(widthPct.toFixed(3)),
      fillPct: Number(Math.min(fillPct, 100).toFixed(3)),
    };
  });
});

const chartSeries = computed(() => {
  const data = groupSummaries.value.map((g) => Number(g.percentage) || 0);
  return [{ name: "Completion (%)", data }];
});

const chartOptions = computed(() => {
  const values = groupSummaries.value;

  const categories = values.map((g) =>
    String(g.subcategory_label ?? g.subcategory_key ?? "Subcategory")
  );

  const meta = values.map((g) => ({
    expected: Number(g.expected) || 0,
    actual: Number(g.actual) || 0,
    submission_type: String(g.submission_type ?? "").trim(),
  }));

  return {
    chart: { type: "bar", toolbar: { show: false }, zoom: { enabled: false } },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${Number(val).toFixed(0)}%`,
      offsetY: -6,
    },
    xaxis: {
      categories,
      labels: { rotate: -25, trim: true, style: { fontSize: "11px" } },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      title: { text: "Completion (%)" },
      labels: { formatter: (v) => `${Number(v).toFixed(0)}%` },
    },
    tooltip: {
      y: {
        formatter: (val, opts) => {
          const i = opts.dataPointIndex;
          const m = meta[i] || { actual: 0, expected: 0, submission_type: "" };
          const st = m.submission_type ? `, ${m.submission_type}` : "";
          return `${Number(val).toFixed(1)}% (Actual ${m.actual} / Expected ${m.expected}${st})`;
        },
      },
    },
    legend: { show: false },
  };
});
</script>