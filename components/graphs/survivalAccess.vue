<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 mb-0 w-full">
    ACCESS TO HEALTH SERVICES AND FACILITIES
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <!-- Chart 1 -->
    <div class="border rounded-xl p-2 col-span-1">
      <h3 class="text-sm font-bold mb-2">LOCAL HEALTH CENTERS</h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="200"
          width="100%"
          :options="state.areaOptions"
          :series="state.access1"
        />
      </ClientOnly>
    </div>

    <!-- Chart 2 -->
    <div class="border rounded-xl p-2 col-span-2">
      <h3 class="text-sm font-bold mb-2">WATER & SANITATION SERVICES</h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="300"
          width="100%"
          :options="state.barOptions"
          :series="state.access2"
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

  // selected year from parent (not used to filter; only triggers recompute)
  report_year: { type: [Number, String], required: false },

  // annual rows
  passed_data: { type: [Array, Object], required: true },

  // mapping table for fallback report_year_id -> year
  report_years: { type: [Array, Object], required: true },
});

const COLORS = [
  "#312e81", "#c026d3", "#46C2CB", "#db2777", "#9d174d",
  "#B12C00", "#DC2525", "#6D67E4", "#F4B342", "#662549"
];

const state = reactive({
  annualYearIds: [],
  annualYearNames: [],

  access1: [],
  access2: [],

  areaOptions: {
    chart: { type: "area", stacked: false, toolbar: { show: false }, zoom: { enabled: false } },
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    xaxis: { categories: [] },
    colors: COLORS,
  },

  barOptions: {
    chart: { type: "bar", stacked: false, toolbar: { show: false }, zoom: { enabled: false } },
    plotOptions: { bar: { horizontal: false } },
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    xaxis: { categories: [] },
    colors: COLORS,
  },
});

onMounted(() => recalc());

// recompute whenever parent changes the selected year, or annual dataset changes, or mapping table changes
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
  // Prefer explicit year fields if present
  const y = row?.year ?? row?.report_year;
  if (y != null && y !== "") {
    const yn = Number(y);
    return Number.isFinite(yn) ? yn : NaN;
  }

  // Fallback: map report_year_id -> year
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

  const years = Array.from(
    new Set(data.map(r => getRowYear(r)).filter(y => Number.isFinite(y)))
  ).sort((a, b) => a - b);

  state.annualYearIds = years;
  state.annualYearNames = years.map(String);

  state.areaOptions.xaxis = { ...state.areaOptions.xaxis, categories: state.annualYearNames };
  state.barOptions.xaxis = { ...state.barOptions.xaxis, categories: state.annualYearNames };
}

function buildAnnualSeriesFromAnnualData() {
  const data = normalizePassedData();
  const yearIds = state.annualYearIds;

  if (!yearIds.length) {
    state.access1 = [];
    state.access2 = [];
    return;
  }

  const yearIndexMap = new Map();
  yearIds.forEach((year, idx) => yearIndexMap.set(year, idx));

  // Indicators
  const a18_1 = new Array(yearIds.length).fill(0);

  const a19_1 = new Array(yearIds.length).fill(0);
  const a19_2 = new Array(yearIds.length).fill(0);
  const a19_3 = new Array(yearIds.length).fill(0);
  const a19_4 = new Array(yearIds.length).fill(0);
  const a19_5 = new Array(yearIds.length).fill(0);
  const a19_6 = new Array(yearIds.length).fill(0);
  const a19_7 = new Array(yearIds.length).fill(0);

  const a20_1 = new Array(yearIds.length).fill(0);
  const a20_2 = new Array(yearIds.length).fill(0);
  const a20_3 = new Array(yearIds.length).fill(0);

  for (const row of data) {
    if (!row) continue;

    const rowYear = getRowYear(row);
    if (!Number.isFinite(rowYear)) continue;

    const idx = yearIndexMap.get(rowYear);
    if (idx === undefined) continue;

    const value = row.total != null ? Number(row.total) : 0;
    if (!Number.isFinite(value)) continue;

    switch (row.indicator_no) {
      case "18.1": a18_1[idx] += value; break;

      case "19.1": a19_1[idx] += value; break;
      case "19.2": a19_2[idx] += value; break;
      case "19.3": a19_3[idx] += value; break;
      case "19.4": a19_4[idx] += value; break;
      case "19.5": a19_5[idx] += value; break;
      case "19.6": a19_6[idx] += value; break;
      case "19.7": a19_7[idx] += value; break;

      case "20.1": a20_1[idx] += value; break;
      case "20.2": a20_2[idx] += value; break;
      case "20.3": a20_3[idx] += value; break;

      default: break;
    }
  }

  state.access1 = [
    { name: "18.1 Total number of barangay health centers and health stations", data: a18_1 },
  ];

  state.access2 = [
    { name: "19.1 HH with access to basic safe water supply (BSWS)", data: a19_1 },
    { name: "19.2 HH with access to Level 1 BSWS", data: a19_2 },
    { name: "19.3 % HH with access to Level 1 BSWS", data: a19_3 },

    { name: "19.4 HH with access to Level 2 BSWS", data: a19_4 },
    { name: "19.5 % HH with access to Level 2 BSWS", data: a19_5 },

    { name: "19.6 HH with access to Level 3 BSWS", data: a19_6 },
    { name: "19.7 % HH with access to Level 3 BSWS", data: a19_7 },

    { name: "20.1 HH with access to sanitation facilities", data: a20_1 },
    { name: "20.2 Total HH in the City", data: a20_2 },
    { name: "20.3 % HH with access to sanitation facilities", data: a20_3 },
  ];
}
</script>
