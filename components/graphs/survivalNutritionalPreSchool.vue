<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 mb-0 w-full">
    NUTRITIONAL STATUS OF PRE-SCHOOL CHILDREN
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <!-- Chart 1 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">
        OPERATION TIMBANG (OPT) PLUS
      </h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="200"
          width="100%"
          :options="state.optLineOptions"
          :series="state.operation_timbang"
        />
      </ClientOnly>
    </div>

    <!-- Chart 2 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">
        NUTRITIONAL STATUS OF 0-59 MONTHS OLD CHILDREN
      </h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="400"
          width="100%"
          :options="state.nutBarOptions"
          :series="state.nut_status_0to59"
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

  // selected year from parent (used only to trigger recompute; we DO NOT filter out other years)
  report_year: { type: [Number, String], required: false },

  // annual rows
  passed_data: { type: [Array, Object], required: true },

  // can be quarter table; used only as fallback mapping report_year_id -> year
  report_years: { type: [Array, Object], required: true },
});

const state = reactive({
  annualYearIds: [],
  annualYearNames: [],

  operation_timbang: [],
  nut_status_0to59: [],

  optLineOptions: {
    chart: { type: "line", toolbar: { show: false }, zoom: { enabled: false } },
    stroke: { curve: "smooth" },
    dataLabels: { enabled: true },
    xaxis: { categories: [] },
    colors: [
      "#312e81", "#c026d3", "#46C2CB", "#db2777", "#9d174d",
      "#B12C00", "#DC2525", "#6D67E4", "#F4B342", "#662549"
    ],
  },

  nutBarOptions: {
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

// We recalc whenever:
// - annual data changes (most important)
// - mapping table changes (fallback mapping)
// - selected year changes (to force redraw / re-aggregate if parent fetches year-specific payloads)
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

// Resolve "year" for a row
function getRowYear(row) {
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
  buildAnnualYearAxisFromData();
  buildAnnualSeriesFromData();
}

function buildAnnualYearAxisFromData() {
  const data = normalizePassedData();

  // IMPORTANT: derive years from annual dataset itself
  const years = Array.from(
    new Set(data.map(r => getRowYear(r)).filter(y => Number.isFinite(y)))
  ).sort((a, b) => a - b);

  state.annualYearIds = years;
  state.annualYearNames = years.map(String);

  // update x-axis categories for BOTH charts
  state.optLineOptions.xaxis = { ...state.optLineOptions.xaxis, categories: state.annualYearNames };
  state.nutBarOptions.xaxis  = { ...state.nutBarOptions.xaxis,  categories: state.annualYearNames };
}

function buildAnnualSeriesFromData() {
  const data = normalizePassedData();
  const yearIds = state.annualYearIds;

  if (!yearIds.length) {
    state.operation_timbang = [];
    state.nut_status_0to59 = [];
    return;
  }

  const yearIndexMap = new Map();
  yearIds.forEach((year, idx) => yearIndexMap.set(year, idx));

  // 13.x
  const timbang13_1 = new Array(yearIds.length).fill(0);
  const timbang13_2 = new Array(yearIds.length).fill(0);
  const timbang13_3 = new Array(yearIds.length).fill(0);

  // 14.1 - 14.18
  const n14_1  = new Array(yearIds.length).fill(0);
  const n14_2  = new Array(yearIds.length).fill(0);
  const n14_3  = new Array(yearIds.length).fill(0);
  const n14_4  = new Array(yearIds.length).fill(0);
  const n14_5  = new Array(yearIds.length).fill(0);
  const n14_6  = new Array(yearIds.length).fill(0);
  const n14_7  = new Array(yearIds.length).fill(0);
  const n14_8  = new Array(yearIds.length).fill(0);
  const n14_9  = new Array(yearIds.length).fill(0);
  const n14_10 = new Array(yearIds.length).fill(0);
  const n14_11 = new Array(yearIds.length).fill(0);
  const n14_12 = new Array(yearIds.length).fill(0);
  const n14_13 = new Array(yearIds.length).fill(0);
  const n14_14 = new Array(yearIds.length).fill(0);
  const n14_15 = new Array(yearIds.length).fill(0);
  const n14_16 = new Array(yearIds.length).fill(0);
  const n14_17 = new Array(yearIds.length).fill(0); // obese count
  const n14_18 = new Array(yearIds.length).fill(0); // obese prevalence

  for (const row of data) {
    if (!row) continue;

    const rowYear = getRowYear(row);
    if (!Number.isFinite(rowYear)) continue;

    const idx = yearIndexMap.get(rowYear);
    if (idx === undefined) continue;

    const value = row.total != null ? Number(row.total) : 0;
    if (!Number.isFinite(value)) continue;

    switch (row.indicator_no) {
      case "13.1": timbang13_1[idx] += value; break;
      case "13.2": timbang13_2[idx] += value; break;
      case "13.3": timbang13_3[idx] += value; break;

      case "14.1":  n14_1[idx]  += value; break;
      case "14.2":  n14_2[idx]  += value; break;
      case "14.3":  n14_3[idx]  += value; break;
      case "14.4":  n14_4[idx]  += value; break;
      case "14.5":  n14_5[idx]  += value; break;
      case "14.6":  n14_6[idx]  += value; break;
      case "14.7":  n14_7[idx]  += value; break;
      case "14.8":  n14_8[idx]  += value; break;
      case "14.9":  n14_9[idx]  += value; break;
      case "14.10": n14_10[idx] += value; break;
      case "14.11": n14_11[idx] += value; break;
      case "14.12": n14_12[idx] += value; break;
      case "14.13": n14_13[idx] += value; break;
      case "14.14": n14_14[idx] += value; break;
      case "14.15": n14_15[idx] += value; break;
      case "14.16": n14_16[idx] += value; break;
      case "14.17": n14_17[idx] += value; break;
      case "14.18": n14_18[idx] += value; break;

      default: break;
    }
  }

  state.operation_timbang = [
    { name: "13.1 Actual number of 0-59 months weighed", data: timbang13_1 },
    { name: "13.2 Total target population of 0-59 months old", data: timbang13_2 },
    { name: "13.3 Operation Timbang Plus Coverage", data: timbang13_3 },
  ];

  // NOTE: I kept your intended series grouping, but FIXED the obese mapping and the 14.18 existence.
  state.nut_status_0to59 = [
    { name: "14.1 Total number of stunted (St)", data: n14_1 },
    { name: "14.3 Total number of severely stunted (Sst)", data: n14_3 },
    { name: "14.5 Total number of tall (T)", data: n14_5 },
    { name: "14.7 Total number of underweight (UW)", data: n14_7 },
    { name: "14.9 Total number of severely underweight (SUW)", data: n14_9 },
    { name: "14.11 Total number of wasted (W)", data: n14_11 },
    { name: "14.13 Total number of severely wasted (SW)", data: n14_13 },
    { name: "14.15 Total number of overweight (OW)", data: n14_15 },
    { name: "14.17 Total number of obese (OB)", data: n14_17 },

    { name: "14.2 Prevalence rate of stunted (St)", data: n14_2 },
    { name: "14.4 Prevalence rate of severely stunted (SSt)", data: n14_4 },
    { name: "14.6 Prevalence rate of tall (T)", data: n14_6 },
    { name: "14.8 Prevalence rate of underweight (UW)", data: n14_8 },
    { name: "14.10 Prevalence rate of severely underweight (SUW)", data: n14_10 },
    { name: "14.12 Prevalence rate of wasted (W)", data: n14_12 },
    { name: "14.14 Prevalence rate of severely wasted (SW)", data: n14_14 },
    { name: "14.16 Prevalence rate of overweight (OW)", data: n14_16 },
    { name: "14.18 Prevalence rate of obese (OB)", data: n14_18 },
  ];
}
</script>
