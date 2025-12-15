<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
    OUT OF SCHOOL CHILDREN AND YOUTH (OSCY)
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">OUT OF SCHOOL CHILDREN</h3>
      <apexchart type="line" height="300" width="100%" :options="state.oscLineOptions" :series="state.osc" />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">OUT OF SCHOOL CHILDREN (ALS)</h3>
      <apexchart type="area" height="300" width="100%" :options="state.oscAreaOptions" :series="state.osc_als" />
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";

const props = defineProps({
  class: { type: String, required: false, default: "border-solid" },
  displaytext: { type: String, required: false },
  group_id: { type: String, required: false },

  report_year: { type: [Number, String], required: false }, // not used for filtering; annual trend = all years
  passed_data: { type: [Array, Object], required: true },
  report_years: { type: [Array, Object], required: true },
});

const state = reactive({
  annualYearIds: [],
  annualYearNames: [],

  osc: [],
  osc_als: [],

  oscLineOptions: {
    chart: { type: "line", toolbar: { show: false }, zoom: { enabled: false } },
    stroke: { curve: "smooth" },
    dataLabels: { enabled: true },
    xaxis: { categories: [] },
    colors: ["#00796B", "#388E3C", "#AFB42B", "#F9A825"],
  },

  oscAreaOptions: {
    chart: { type: "area", toolbar: { show: false }, zoom: { enabled: false } },
    stroke: { curve: "smooth" },
    dataLabels: { enabled: true },
    xaxis: { categories: [] },
    colors: ["#00796B", "#388E3C", "#AFB42B", "#F9A825"],
  },
});

function recalc() {
  buildAnnualArrays();
  fetchReports_Details_Bars_Annual();
}

onMounted(() => recalc());

watch(
  () => [props.report_years, props.passed_data, props.report_year],
  () => recalc(),
  { deep: true }
);

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
  if (raw && Array.isArray(raw?.data?.data)) return raw.data.data;
  return [];
}

// Best effort: get year directly; fallback: map report_year_id -> year using report_years
function getRowYear(row) {
  const y = row?.year ?? row?.report_year;
  if (y != null && y !== "") return Number(y);

  const ryId = Number(row?.report_year_id);
  if (!Number.isFinite(ryId)) return NaN;

  const reportYears = normalizeReportYears();
  const match = reportYears.find(r => Number(r.id) === ryId);
  return match ? Number(match.year) : NaN;
}

function buildAnnualArrays() {
  const data = normalizePassedData();

  const years = Array.from(
    new Set(data.map(r => getRowYear(r)).filter(y => Number.isFinite(y)))
  ).sort((a, b) => a - b);

  state.annualYearIds = years;
  state.annualYearNames = years.map(y => String(y));

  state.oscLineOptions.xaxis = { ...state.oscLineOptions.xaxis, categories: state.annualYearNames };
  state.oscAreaOptions.xaxis = { ...state.oscAreaOptions.xaxis, categories: state.annualYearNames };
}

function fetchReports_Details_Bars_Annual() {
  try {
    const data = normalizePassedData();
    const yearIds = state.annualYearIds;

    if (!yearIds.length) {
      state.osc = [];
      state.osc_als = [];
      return;
    }

    const yearIndexMap = new Map();
    yearIds.forEach((year, idx) => yearIndexMap.set(year, idx));

    const osc_31_1   = new Array(yearIds.length).fill(0);
    const osc_31_1_1 = new Array(yearIds.length).fill(0);
    const osc_31_1_2 = new Array(yearIds.length).fill(0);
    const osc_31_1_3 = new Array(yearIds.length).fill(0);

    const osc_32_1 = new Array(yearIds.length).fill(0);
    const osc_32_2 = new Array(yearIds.length).fill(0);
    const osc_32_3 = new Array(yearIds.length).fill(0);
    const osc_32_4 = new Array(yearIds.length).fill(0);

    for (const row of data) {
      if (!row) continue;

      const rowYear = getRowYear(row);
      if (!Number.isFinite(rowYear)) continue;

      const idx = yearIndexMap.get(rowYear);
      if (idx === undefined) continue;

      const value = row.total != null ? Number(row.total) : 0;
      if (!Number.isFinite(value)) continue;

      switch (row.indicator_no) {
        case "31.1":   osc_31_1[idx]   += value; break;
        case "31.1.1": osc_31_1_1[idx] += value; break;
        case "31.1.2": osc_31_1_2[idx] += value; break;
        case "31.1.3": osc_31_1_3[idx] += value; break;

        case "32.1": osc_32_1[idx] += value; break;
        case "32.2": osc_32_2[idx] += value; break;
        case "32.3": osc_32_3[idx] += value; break;
        case "32.4": osc_32_4[idx] += value; break;

        default: break;
      }
    }

    // set ONCE after aggregation
    state.osc = [
      { name: "31.1 Total number of Out of School Children (OSC) (aged 17 years old and below)", data: osc_31_1 },
      { name: "31.1.1 Total number of OSC (aged 6-11 years old)", data: osc_31_1_1 },
      { name: "31.1.2 Total number of OSCY (aged 12-15 years old)", data: osc_31_1_2 },
      { name: "31.1.3 Total number of OSCY (aged 16-17 years old)", data: osc_31_1_3 },
    ];

    state.osc_als = [
      { name: "32.1 Total number of OSC enrolled in ALS (aged 17 and below)", data: osc_32_1 },
      { name: "32.2 Total number of learners under ADM (aged 17 and below)", data: osc_32_2 },
      { name: "32.3 Total number of OSCY assisted for enrolment (aged 17 and below)", data: osc_32_3 },
      { name: "32.4 Total number of school dropouts reintegrated (balik-aral) (aged 17 and below)", data: osc_32_4 },
    ];
  } catch (error) {
    console.error("fetchReports_Details_Bars_Annual error:", error);
    state.osc = [];
    state.osc_als = [];
  }
}
</script>
