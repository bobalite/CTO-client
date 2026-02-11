<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
    HIV/AIDS
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">CHILDREN AFFECTED BY HIV/AIDS</h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="90%"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.hiv"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";

const emit = defineEmits(["completeness"]);

const props = defineProps({
  class: { type: String, required: false, default: "border-solid" },
  displaytext: { type: String, required: false },
  group_id: { type: String, required: false },

  report_year: { type: [Number, String], required: false },
  passed_data: { type: [Array, Object], required: true },
  report_years: { type: [Array, Object], required: true },
});

const SUBCATEGORY_KEY = "hiv-aids";
const SUBCATEGORY_LABEL = "HIV/AIDS";
const INDICATORS = ["21.1", "21.2"];

const state = reactive({
  quarterNames: [],
  quarterIds: [],

  hiv: [],

  populationHoriOptions: {
    chart: {
      type: "bar",
      stacked: false,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    plotOptions: { bar: { horizontal: false } },
    colors: ["#00796B", "#388E3C", "#AFB42B", "#F9A825"],
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    xaxis: { categories: ["1Q", "2Q", "3Q", "4Q"] },
  },
});

function recalc() {
  buildQuarterArrays();
  fetchReports_Details_Bars();
  emitCompleteness();
}

onMounted(() => recalc());

watch(
  () => [props.report_year, props.report_years, props.passed_data],
  () => recalc(),
  { deep: true }
);

function normalizeReportYears() {
  const raw = props.report_years;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  return [];
}

function normalizePassedData() {
  const raw = props.passed_data;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  return [];
}

function buildQuarterArrays() {
  const allYears = normalizeReportYears();
  const targetYear = Number(props.report_year);

  // stable order (quarter if present, otherwise id)
  const filtered = allYears
    .filter((q) => Number(q.year) === targetYear)
    .sort((a, b) => Number(a.quarter ?? a.id) - Number(b.quarter ?? b.id));

  const quarterIds = filtered.map((q) => Number(q.id));
  const quarterNames = filtered.map((q, index) => `Q${index + 1} ${q.year}`);

  state.quarterIds = quarterIds;
  state.quarterNames = quarterNames;

  state.populationHoriOptions.xaxis = {
    ...state.populationHoriOptions.xaxis,
    categories: quarterNames.length ? quarterNames : ["1Q", "2Q", "3Q", "4Q"],
  };
}

function fetchReports_Details_Bars() {
  try {
    const data = normalizePassedData();
    const quarterIds = (state.quarterIds ?? []).map(Number);

    if (!quarterIds.length) {
      state.hiv = [];
      return;
    }

    const hiv_0_17 = new Array(quarterIds.length).fill(0);
    const hiv_0_17_provided = new Array(quarterIds.length).fill(0);

    for (const row of data) {
      if (!row) continue;

      const reportYearId = Number(row.report_year_id);
      const idx = quarterIds.indexOf(reportYearId);
      if (idx === -1) continue;

      const value = row.total != null ? Number(row.total) : 0;
      if (!Number.isFinite(value)) continue;

      switch (String(row.indicator_no)) {
        case "21.1":
          hiv_0_17[idx] += value;
          break;
        case "21.2":
          hiv_0_17_provided[idx] += value;
          break;
        default:
          break;
      }
    }

    state.hiv = [
      {
        name: "21.1 Children affected by HIV/AIDS (aged 0-17 years old only)",
        data: hiv_0_17,
      },
      {
        name: "21.2 Children (0-17) affected by HIV/AIDS provided with appropriate health services",
        data: hiv_0_17_provided,
      },
    ];
  } catch (error) {
    console.error("fetchReports_Details_Bars error:", error);
    state.hiv = [];
  }
}

/**
 * ✅ Completeness emit (row existence, not totals)
 * Expected = indicators × quarters
 * Actual   = unique (indicator_no, report_year_id) pairs that exist
 */
function emitCompleteness() {
  const quarterIds = (state.quarterIds ?? []).map(Number);

  if (!quarterIds.length) {
    emit("completeness", {
      tab_name: "Survival",
      subcategory_key: SUBCATEGORY_KEY,
      subcategory_label: SUBCATEGORY_LABEL,
      report_year: props.report_year,
      expected: 0,
      actual: 0,
      percentage: 0,
    });
    return;
  }

  const data = normalizePassedData();
  const indicatorSet = new Set(INDICATORS);

  const expected = INDICATORS.length * quarterIds.length;

  const pairs = new Set(); // `${indicator}:${quarterId}`

  for (const row of data) {
    if (!row) continue;

    const ind = String(row.indicator_no ?? "").trim();
    if (!indicatorSet.has(ind)) continue;

    const ry = Number(row.report_year_id);
    if (!quarterIds.includes(ry)) continue;

    pairs.add(`${ind}:${ry}`);
  }

  const actual = pairs.size;
  const percentage = expected > 0 ? Number(((actual / expected) * 100).toFixed(1)) : 0;

  emit("completeness", {
    tab_name: "Survival",
    subcategory_key: SUBCATEGORY_KEY,
    subcategory_label: SUBCATEGORY_LABEL,
    report_year: props.report_year,
    expected,
    actual,
    percentage,
  });
}
</script>
