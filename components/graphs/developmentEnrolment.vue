<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
    SCHOOL ENROLMENT
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">STUDENT ENROLMENT</h3>
      <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.student_enrol" />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">NET ENROLMENT</h3>
      <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.net_enrol" />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">COMPLETION</h3>
      <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.completion" />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">SCHOOL LEAVER (DROP-OUT)</h3>
      <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.leaver" />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">SECTORAL ENROLMENT IP</h3>
      <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.sectoral_IP" />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">SECTORAL ENROLMENT MORO</h3>
      <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.sectoral_Moro" />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">SECTORAL ENROLMENT CWSN</h3>
      <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.sectoral_CWSN" />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">ALTERNATIVE LEARNING SYSTEM</h3>
      <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.ALS" />
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";

const props = defineProps({
  class: { type: String, required: false, default: "border-solid" },
  displaytext: { type: String, required: false },
  group_id: { type: String, required: false },

  report_year: { type: [Number, String], required: false }, // not used for filtering (annual trend)
  passed_data: { type: [Array, Object], required: true },
  report_years: { type: [Array, Object], required: true },
});

const state = reactive({
  annualYearIds: [],
  annualYearNames: [],

  student_enrol: [],
  net_enrol: [],
  completion: [],
  leaver: [],
  sectoral_IP: [],
  sectoral_Moro: [],
  sectoral_CWSN: [],
  ALS: [],

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
    xaxis: { categories: [] },
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

  state.populationHoriOptions.xaxis = {
    ...state.populationHoriOptions.xaxis,
    categories: state.annualYearNames,
  };
}

function fetchReports_Details_Bars_Annual() {
  try {
    const data = normalizePassedData();
    const yearIds = state.annualYearIds;

    if (!yearIds.length) {
      state.student_enrol = [];
      state.net_enrol = [];
      state.completion = [];
      state.leaver = [];
      state.sectoral_IP = [];
      state.sectoral_Moro = [];
      state.sectoral_CWSN = [];
      state.ALS = [];
      return;
    }

    const yearIndexMap = new Map();
    yearIds.forEach((year, idx) => yearIndexMap.set(year, idx));

    // 23.*
    const a23_1   = new Array(yearIds.length).fill(0);
    const a23_1_1 = new Array(yearIds.length).fill(0);
    const a23_1_2 = new Array(yearIds.length).fill(0);
    const a23_1_3 = new Array(yearIds.length).fill(0);
    const a23_1_4 = new Array(yearIds.length).fill(0);

    // 24.*
    const a24_1 = new Array(yearIds.length).fill(0);
    const a24_2 = new Array(yearIds.length).fill(0);
    const a24_3 = new Array(yearIds.length).fill(0);
    const a24_4 = new Array(yearIds.length).fill(0);

    // 25.*
    const a25_1 = new Array(yearIds.length).fill(0);
    const a25_2 = new Array(yearIds.length).fill(0);

    // 26.*
    const a26_1 = new Array(yearIds.length).fill(0);
    const a26_2 = new Array(yearIds.length).fill(0);

    // 27.*
    const a27_1   = new Array(yearIds.length).fill(0);
    const a27_1_1 = new Array(yearIds.length).fill(0);
    const a27_1_2 = new Array(yearIds.length).fill(0);
    const a27_1_3 = new Array(yearIds.length).fill(0);
    const a27_1_4 = new Array(yearIds.length).fill(0);

    // 28.*
    const a28_1   = new Array(yearIds.length).fill(0);
    const a28_1_1 = new Array(yearIds.length).fill(0);
    const a28_1_2 = new Array(yearIds.length).fill(0);
    const a28_1_3 = new Array(yearIds.length).fill(0);
    const a28_1_4 = new Array(yearIds.length).fill(0);

    // 29.*
    const a29_1   = new Array(yearIds.length).fill(0);
    const a29_1_1 = new Array(yearIds.length).fill(0);
    const a29_1_2 = new Array(yearIds.length).fill(0);
    const a29_1_3 = new Array(yearIds.length).fill(0);
    const a29_1_4 = new Array(yearIds.length).fill(0);

    // 30.*
    const a30_1   = new Array(yearIds.length).fill(0);
    const a30_1_1 = new Array(yearIds.length).fill(0);
    const a30_1_2 = new Array(yearIds.length).fill(0);
    const a30_1_3 = new Array(yearIds.length).fill(0);
    const a30_1_4 = new Array(yearIds.length).fill(0);

    for (const row of data) {
      if (!row) continue;

      const rowYear = getRowYear(row);
      if (!Number.isFinite(rowYear)) continue;

      const idx = yearIndexMap.get(rowYear);
      if (idx === undefined) continue;

      const value = row.total != null ? Number(row.total) : 0;
      if (!Number.isFinite(value)) continue;

      switch (row.indicator_no) {
        case "23.1":   a23_1[idx]   += value; break;
        case "23.1.1": a23_1_1[idx] += value; break;
        case "23.1.2": a23_1_2[idx] += value; break;
        case "23.1.3": a23_1_3[idx] += value; break;
        case "23.1.4": a23_1_4[idx] += value; break;

        case "24.1": a24_1[idx] += value; break;
        case "24.2": a24_2[idx] += value; break;
        case "24.3": a24_3[idx] += value; break;
        case "24.4": a24_4[idx] += value; break;

        case "25.1": a25_1[idx] += value; break;
        case "25.2": a25_2[idx] += value; break;

        case "26.1": a26_1[idx] += value; break;
        case "26.2": a26_2[idx] += value; break;

        case "27.1":   a27_1[idx]   += value; break;
        case "27.1.1": a27_1_1[idx] += value; break;
        case "27.1.2": a27_1_2[idx] += value; break;
        case "27.1.3": a27_1_3[idx] += value; break;
        case "27.1.4": a27_1_4[idx] += value; break;

        case "28.1":   a28_1[idx]   += value; break;
        case "28.1.1": a28_1_1[idx] += value; break;
        case "28.1.2": a28_1_2[idx] += value; break;
        case "28.1.3": a28_1_3[idx] += value; break;
        case "28.1.4": a28_1_4[idx] += value; break;

        case "29.1":   a29_1[idx]   += value; break;
        case "29.1.1": a29_1_1[idx] += value; break;
        case "29.1.2": a29_1_2[idx] += value; break;
        case "29.1.3": a29_1_3[idx] += value; break;
        case "29.1.4": a29_1_4[idx] += value; break;

        case "30.1":   a30_1[idx]   += value; break;
        case "30.1.1": a30_1_1[idx] += value; break;
        case "30.1.2": a30_1_2[idx] += value; break;
        case "30.1.3": a30_1_3[idx] += value; break;
        case "30.1.4": a30_1_4[idx] += value; break;

        default: break;
      }
    }

    // IMPORTANT: assign AFTER the loop
    state.student_enrol = [
      { name: "Total number of School enrollees (Current SY)", data: a23_1 },
      { name: "Total number of Kindergarten enrollees (Current SY)", data: a23_1_1 },
      { name: "Total number of Elementary enrollees (Current SY)", data: a23_1_2 },
      { name: "Total number of Junior High School enrollees (Current SY)", data: a23_1_3 },
      { name: "Total number of Senior High School enrollees (Current SY)", data: a23_1_4 },
    ];

    state.net_enrol = [
      { name: "Kindergarten Net Enrolment Rate (Current SY)", data: a24_1 },
      { name: "Elementary Net Enrolment Rate (Current SY)", data: a24_2 },
      { name: "Junior High School Net Enrolment Rate (Current SY)", data: a24_3 },
      { name: "Senior High School Net Enrolment Rate (Current SY)", data: a24_4 },
    ];

    state.completion = [
      { name: "Kindergarten & Elementary Completion Rate (Previous SY)", data: a25_1 },
      { name: "Secondary Completion Rate (Previous SY)", data: a25_2 },
    ];

    state.leaver = [
      { name: "Kinder & Elementary Drop-out Rate (Current SY)", data: a26_1 },
      { name: "Secondary Drop-out Rate (Current SY)", data: a26_2 },
    ];

    state.sectoral_IP = [
      { name: "Total number of ALL IP children enrolled (Current SY)", data: a27_1 },
      { name: "Total number of IP children enrolled in Kindergarten (Current SY)", data: a27_1_1 },
      { name: "Total number of IP children enrolled in Elementary (Current SY)", data: a27_1_2 },
      { name: "Total number of IP children enrolled in JHS (Current SY)", data: a27_1_3 },
      { name: "Total number of IP children enrolled in SHS (Current SY)", data: a27_1_4 },
    ];

    state.sectoral_Moro = [
      { name: "Total number of ALL Moro children enrolled (Current SY)", data: a28_1 },
      { name: "Total number of Moro children enrolled in Kindergarten (Current SY)", data: a28_1_1 },
      { name: "Total number of Moro children enrolled in Elementary (Current SY)", data: a28_1_2 },
      { name: "Total number of Moro children enrolled in JHS (Current SY)", data: a28_1_3 },
      { name: "Total number of Moro children enrolled in SHS (Current SY)", data: a28_1_4 },
    ];

    state.sectoral_CWSN = [
      { name: "ALL Children with Special Needs (CWSN) / (CWD) enrolled (Current SY)", data: a29_1 },
      { name: "Total number of CWSN/CWD children enrolled in Kindergarten (Current SY)", data: a29_1_1 },
      { name: "Total number of CWSN/CWD children enrolled in Elementary (Current SY)", data: a29_1_2 },
      { name: "Total number of CWSN/CWD children enrolled in JHS (Current SY)", data: a29_1_3 },
      { name: "Total number of CWSN/CWD children enrolled in SHS (Current SY)", data: a29_1_4 },
    ];

    state.ALS = [
      { name: "Children enrolled/passers in ALS (aged 17 years old and below only)", data: a30_1 },
      { name: "Children enrolled/passers in ALS Basic Literacy Program (aged 17 years old and below only)", data: a30_1_1 },
      { name: "Children enrolled/passers in ALS A&E Elementary Level (aged 17 years old and below only)", data: a30_1_2 },
      { name: "Children enrolled/passers in ALS A&E Junior High School Level (aged 17 years old and below only)", data: a30_1_3 },
      { name: "Children enrolled/passers in ALS A&E Senior High School Level (aged 17 years old and below only)", data: a30_1_4 },
    ];
  } catch (error) {
    console.error("fetchReports_Details_Bars_Annual error:", error);
    state.student_enrol = [];
    state.net_enrol = [];
    state.completion = [];
    state.leaver = [];
    state.sectoral_IP = [];
    state.sectoral_Moro = [];
    state.sectoral_CWSN = [];
    state.ALS = [];
  }
}
</script>
