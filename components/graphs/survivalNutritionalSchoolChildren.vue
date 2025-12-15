<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 mb-0 w-full">
    NUTRITIONAL STATUS OF SCHOOL CHILDREN
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <!-- Chart 1 -->
    <div class="border rounded-xl p-2 col-span-1">
      <h3 class="text-sm font-bold mb-2">
        SCHOOL-BASED FEEDING PROGRAM (SBFP)
      </h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="200"
          width="100%"
          :options="state.annualBarOptions"
          :series="state.nutritional"
        />
      </ClientOnly>
    </div>

    <!-- Chart 2 -->
    <div class="border rounded-xl p-2 col-span-2">
      <h3 class="text-sm font-bold mb-2">
        NUTRITIONAL STATUS OF KINDER TO GRADE 6 LEARNERS
      </h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="200"
          width="100%"
          :options="state.annualBarOptions"
          :series="state.nutritional2"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";

const props = defineProps({
  class: { type: String, required: false, default: "border-solid" },
  displaytext: { type: String, required: false },
  group_id: { type: String, required: false },

  // selected year from parent (NOT used to filter; only triggers recompute)
  report_year: { type: [Number, String], required: false },

  // annual dataset rows
  passed_data: { type: [Array, Object], required: true },

  // mapping table for fallback: report_year_id -> year
  report_years: { type: [Array, Object], required: true },
});

const state = reactive({
  annualYearIds: [],
  annualYearNames: [],

  nutritional: [],
  nutritional2: [],

  annualBarOptions: {
    chart: { type: "bar", stacked: false, toolbar: { show: false }, zoom: { enabled: false } },
    plotOptions: { bar: { horizontal: false } },
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    xaxis: { categories: [] },
    colors: [
      "#312e81", "#c026d3", "#46C2CB", "#db2777", "#9d174d",
      "#B12C00", "#DC2525", "#6D67E4", "#F4B342", "#662549"
    ],
  },
});

onMounted(() => recalc());

// Recompute when data or mapping changes (or selected year changes and parent refetches annual data)
watch(() => props.passed_data, () => recalc(), { deep: true });
watch(() => props.report_years, () => recalc(), { deep: true });
watch(() => props.report_year, () => recalc());

function normalizePassedData() {
  const raw = props.passed_data;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  return [];
}

function normalizeReportYears() {
  const raw = props.report_years;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  return [];
}

function getRowYear(row) {
  // prefer explicit year fields
  const y = row?.year ?? row?.report_year;
  if (y != null && y !== "") {
    const yn = Number(y);
    return Number.isFinite(yn) ? yn : NaN;
  }

  // fallback: map report_year_id -> year
  const ryId = Number(row?.report_year_id);
  if (!Number.isFinite(ryId)) return NaN;

  const reportYears = normalizeReportYears();
  const match = reportYears.find(r => Number(r?.id) === ryId);

  const my = Number(match?.year);
  return Number.isFinite(my) ? my : NaN;
}

function recalc() {
  buildAnnualAxisFromAnnualData();
  buildAnnualSeriesFromAnnualData();
}

function buildAnnualAxisFromAnnualData() {
  const data = normalizePassedData();

  // derive years from annual rows (most reliable)
  const years = Array.from(
    new Set(data.map(r => getRowYear(r)).filter(y => Number.isFinite(y)))
  ).sort((a, b) => a - b);

  state.annualYearIds = years;
  state.annualYearNames = years.map(String);

  state.annualBarOptions.xaxis = {
    ...state.annualBarOptions.xaxis,
    categories: state.annualYearNames,
  };
}

function buildAnnualSeriesFromAnnualData() {
  const data = normalizePassedData();
  const yearIds = state.annualYearIds;

  if (!yearIds.length) {
    state.nutritional = [];
    state.nutritional2 = [];
    return;
  }

  const yearIndexMap = new Map();
  yearIds.forEach((year, idx) => yearIndexMap.set(year, idx));

  // per-year arrays
  const a15_1 = new Array(yearIds.length).fill(0);

  const a16_1 = new Array(yearIds.length).fill(0);
  const a16_2 = new Array(yearIds.length).fill(0);
  const a16_3 = new Array(yearIds.length).fill(0);

  const a17_1 = new Array(yearIds.length).fill(0);
  const a17_2 = new Array(yearIds.length).fill(0);
  const a17_3 = new Array(yearIds.length).fill(0);

  for (const row of data) {
    if (!row) continue;

    const rowYear = getRowYear(row);
    if (!Number.isFinite(rowYear)) continue;

    const idx = yearIndexMap.get(rowYear);
    if (idx === undefined) continue;

    const value = row.total != null ? Number(row.total) : 0;
    if (!Number.isFinite(value)) continue;

    switch (row.indicator_no) {
      case "15.1": a15_1[idx] += value; break;

      case "16.1": a16_1[idx] += value; break;
      case "16.2": a16_2[idx] += value; break;
      case "16.3": a16_3[idx] += value; break;

      case "17.1": a17_1[idx] += value; break;
      case "17.2": a17_2[idx] += value; break;
      case "17.3": a17_3[idx] += value; break;

      default: break;
    }
  }

  state.nutritional = [
    { name: "15.1 Total learners enrolled in SBFP", data: a15_1 },
  ];

  state.nutritional2 = [
    { name: "16.1 Stunted Kinder to Grade 6 learners", data: a16_1 },
    { name: "16.2 Wasted Kinder to Grade 6 learners", data: a16_2 },
    { name: "16.3 Overweight/obese Kinder to Grade 6 learners", data: a16_3 },

    { name: "17.1 Total number of Schools", data: a17_1 },
    { name: "17.2 Schools fully-implementing the WinS", data: a17_2 },
    { name: "17.3 % schools fully implementing WinS", data: a17_3 },
  ];
}
</script>
