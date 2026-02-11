<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
    SCHOOL ENROLMENT
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">STUDENT ENROLMENT</h3>
      <ClientOnly>
        <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.student_enrol" />
      </ClientOnly>
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">NET ENROLMENT</h3>
      <ClientOnly>
        <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.net_enrol" />
      </ClientOnly>
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">COMPLETION</h3>
      <ClientOnly>
        <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.completion" />
      </ClientOnly>
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">SCHOOL LEAVER (DROP-OUT)</h3>
      <ClientOnly>
        <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.leaver" />
      </ClientOnly>
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">SECTORAL ENROLMENT IP</h3>
      <ClientOnly>
        <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.sectoral_IP" />
      </ClientOnly>
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">SECTORAL ENROLMENT MORO</h3>
      <ClientOnly>
        <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.sectoral_Moro" />
      </ClientOnly>
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">SECTORAL ENROLMENT CWSN</h3>
      <ClientOnly>
        <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.sectoral_CWSN" />
      </ClientOnly>
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">ALTERNATIVE LEARNING SYSTEM</h3>
      <ClientOnly>
        <apexchart type="bar" height="300" width="100%" :options="state.populationHoriOptions" :series="state.ALS" />
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

  report_year: { type: [Number, String], required: false }, // used for completeness year selection
  passed_data: { type: [Array, Object], required: true },
  report_years: { type: [Array, Object], required: true },
});

const SUBCATEGORY_KEY = "development_school_enrolment";
const SUBCATEGORY_LABEL = "School Enrolment";
const TAB_NAME = "Development";

/**
 * ✅ Support BOTH variants:
 * - Some datasets use 23.1–23.1.4
 * - Others use 23.2–23.2.4
 */
const EXPECTED_INDICATORS = [
  // 23.* (variant A)
  "23.1", "23.1.1", "23.1.2", "23.1.3", "23.1.4",
  // 23.* (variant B)
  "23.2", "23.2.1", "23.2.2", "23.2.3", "23.2.4",

  // 24.*
  "24.1", "24.2", "24.3", "24.4",
  // 25.*
  "25.1", "25.2",
  // 26.*
  "26.1", "26.2",
  // 27.*
  "27.1", "27.1.1", "27.1.2", "27.1.3", "27.1.4",
  // 28.*
  "28.1", "28.1.1", "28.1.2", "28.1.3", "28.1.4",
  // 29.*
  "29.1", "29.1.1", "29.1.2", "29.1.3", "29.1.4",
  // 30.*
  "30.1", "30.1.1", "30.1.2", "30.1.3", "30.1.4",
];

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
    chart: { type: "bar", stacked: false, toolbar: { show: false }, zoom: { enabled: false } },
    plotOptions: { bar: { horizontal: false } },
    colors: ["#00796B", "#388E3C", "#AFB42B", "#F9A825"],
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    xaxis: { categories: [] },
  },
});

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

function normalizeIndicatorNo(v) {
  // handle numbers, strings, weird spacing
  return String(v ?? "").trim();
}

function toFiniteNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function getRowYear(row) {
  const y = row?.year ?? row?.report_year;
  if (y != null && y !== "") {
    const yn = Number(y);
    return Number.isFinite(yn) ? yn : NaN;
  }

  const ryId = Number(row?.report_year_id);
  if (!Number.isFinite(ryId)) return NaN;

  const reportYears = normalizeReportYears();
  const match = reportYears.find((r) => Number(r?.id) === ryId);

  const my = Number(match?.year);
  return Number.isFinite(my) ? my : NaN;
}

function recalc() {
  buildAnnualArrays();
  fetchReports_Details_Bars_Annual();
  emitCompletenessForSelectedYear();
}

function buildAnnualArrays() {
  const data = normalizePassedData();

  const years = Array.from(
    new Set(data.map((r) => getRowYear(r)).filter((y) => Number.isFinite(y)))
  ).sort((a, b) => a - b);

  state.annualYearIds = years;
  state.annualYearNames = years.map((y) => String(y));

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

    // 23.* (A)
    const a23_1   = new Array(yearIds.length).fill(0);
    const a23_1_1 = new Array(yearIds.length).fill(0);
    const a23_1_2 = new Array(yearIds.length).fill(0);
    const a23_1_3 = new Array(yearIds.length).fill(0);
    const a23_1_4 = new Array(yearIds.length).fill(0);

    // 23.* (B)
    const a23_2   = new Array(yearIds.length).fill(0);
    const a23_2_1 = new Array(yearIds.length).fill(0);
    const a23_2_2 = new Array(yearIds.length).fill(0);
    const a23_2_3 = new Array(yearIds.length).fill(0);
    const a23_2_4 = new Array(yearIds.length).fill(0);

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

      const ind = normalizeIndicatorNo(row.indicator_no);
      const value = toFiniteNumber(row.total);

      switch (ind) {
        case "23.1":   a23_1[idx]   += value; break;
        case "23.1.1": a23_1_1[idx] += value; break;
        case "23.1.2": a23_1_2[idx] += value; break;
        case "23.1.3": a23_1_3[idx] += value; break;
        case "23.1.4": a23_1_4[idx] += value; break;

        case "23.2":   a23_2[idx]   += value; break;
        case "23.2.1": a23_2_1[idx] += value; break;
        case "23.2.2": a23_2_2[idx] += value; break;
        case "23.2.3": a23_2_3[idx] += value; break;
        case "23.2.4": a23_2_4[idx] += value; break;

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

    // ✅ show both variants in the chart (if one variant is unused it'll just be zeros)
    state.student_enrol = [
      { name: "23.1 Total School enrollees (variant A)", data: a23_1 },
      { name: "23.1.1 Kindergarten (A)", data: a23_1_1 },
      { name: "23.1.2 Elementary (A)", data: a23_1_2 },
      { name: "23.1.3 JHS (A)", data: a23_1_3 },
      { name: "23.1.4 SHS (A)", data: a23_1_4 },

      { name: "23.2 Total School enrollees (variant B)", data: a23_2 },
      { name: "23.2.1 Kindergarten (B)", data: a23_2_1 },
      { name: "23.2.2 Elementary (B)", data: a23_2_2 },
      { name: "23.2.3 JHS (B)", data: a23_2_3 },
      { name: "23.2.4 SHS (B)", data: a23_2_4 },
    ];

    state.net_enrol = [
      { name: "24.1 Kindergarten Net Enrolment Rate", data: a24_1 },
      { name: "24.2 Elementary Net Enrolment Rate", data: a24_2 },
      { name: "24.3 Junior High School Net Enrolment Rate", data: a24_3 },
      { name: "24.4 Senior High School Net Enrolment Rate", data: a24_4 },
    ];

    state.completion = [
      { name: "25.1 Kinder & Elementary Completion Rate", data: a25_1 },
      { name: "25.2 Secondary Completion Rate", data: a25_2 },
    ];

    state.leaver = [
      { name: "26.1 Kinder & Elementary Drop-out Rate", data: a26_1 },
      { name: "26.2 Secondary Drop-out Rate", data: a26_2 },
    ];

    state.sectoral_IP = [
      { name: "27.1 ALL IP children enrolled", data: a27_1 },
      { name: "27.1.1 IP Kinder", data: a27_1_1 },
      { name: "27.1.2 IP Elementary", data: a27_1_2 },
      { name: "27.1.3 IP JHS", data: a27_1_3 },
      { name: "27.1.4 IP SHS", data: a27_1_4 },
    ];

    state.sectoral_Moro = [
      { name: "28.1 ALL Moro children enrolled", data: a28_1 },
      { name: "28.1.1 Moro Kinder", data: a28_1_1 },
      { name: "28.1.2 Moro Elementary", data: a28_1_2 },
      { name: "28.1.3 Moro JHS", data: a28_1_3 },
      { name: "28.1.4 Moro SHS", data: a28_1_4 },
    ];

    state.sectoral_CWSN = [
      { name: "29.1 ALL CWSN/CWD enrolled", data: a29_1 },
      { name: "29.1.1 CWSN Kinder", data: a29_1_1 },
      { name: "29.1.2 CWSN Elementary", data: a29_1_2 },
      { name: "29.1.3 CWSN JHS", data: a29_1_3 },
      { name: "29.1.4 CWSN SHS", data: a29_1_4 },
    ];

    state.ALS = [
      { name: "30.1 ALS enrolled/passers (<=17)", data: a30_1 },
      { name: "30.1.1 ALS Basic Literacy (<=17)", data: a30_1_1 },
      { name: "30.1.2 ALS A&E Elementary (<=17)", data: a30_1_2 },
      { name: "30.1.3 ALS A&E JHS (<=17)", data: a30_1_3 },
      { name: "30.1.4 ALS A&E SHS (<=17)", data: a30_1_4 },
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

function emitCompletenessForSelectedYear() {
  const data = normalizePassedData();
  const years = state.annualYearIds || [];

  const expected = EXPECTED_INDICATORS.length;

  if (!years.length) {
    emit("completeness", {
      subcategory_key: SUBCATEGORY_KEY,
      subcategory_label: SUBCATEGORY_LABEL,
      tab_name: TAB_NAME,
      report_year: Number(props.report_year) || null,
      expected,
      actual: 0,
      percentage: 0,
    });
    return;
  }

  const requested = Number(props.report_year);
  const selectedYear = Number.isFinite(requested) ? requested : years[years.length - 1];

  // count an indicator as "present" if there's at least one row for that year (even if total=0)
  const present = new Set();
  for (const row of data) {
    if (!row) continue;

    const rowYear = getRowYear(row);
    if (!Number.isFinite(rowYear) || rowYear !== selectedYear) continue;

    const ind = normalizeIndicatorNo(row.indicator_no);
    if (!ind) continue;

    if (EXPECTED_INDICATORS.includes(ind)) present.add(ind);
  }

  const actual = present.size;
  const percentage = expected > 0 ? Number(((actual / expected) * 100).toFixed(1)) : 0;

  emit("completeness", {
    subcategory_key: SUBCATEGORY_KEY,
    subcategory_label: SUBCATEGORY_LABEL,
    tab_name: TAB_NAME,
    report_year: selectedYear,
    expected,
    actual,
    percentage,
  });
}
</script>
