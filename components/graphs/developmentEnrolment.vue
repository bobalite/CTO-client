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
  report_year: { type: [Number, String], required: false }, // year selected in parent (e.g. 2026)
  passed_data: { type: [Array, Object], required: true },
  report_years: { type: [Array, Object], required: true },
});

const SUBCATEGORY_KEY = "development_school_enrolment";
const SUBCATEGORY_LABEL = "School Enrolment";
const TAB_NAME = "Development";

// ✅ expected indicators (includes 23.2.*)
const EXPECTED_INDICATORS = [
  "23.1", "23.1.1", "23.1.2", "23.1.3", "23.1.4",
  "23.2", "23.2.1", "23.2.2", "23.2.3", "23.2.4",
  "24.1", "24.2", "24.3", "24.4",
  "25.1", "25.2",
  "26.1", "26.2",
  "27.1", "27.1.1", "27.1.2", "27.1.3", "27.1.4",
  "28.1", "28.1.1", "28.1.2", "28.1.3", "28.1.4",
  "29.1", "29.1.1", "29.1.2", "29.1.3", "29.1.4",
  "30.1", "30.1.1", "30.1.2", "30.1.3", "30.1.4",
];

const EXPECTED_SET = new Set(EXPECTED_INDICATORS);

const state = reactive({
  axisKeys: [],        // could be year OR report_year_id fallback
  axisLabels: [],      // string labels for x-axis
  axisKeyToIndex: new Map(),

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
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    xaxis: { categories: [] },
  },
});

onMounted(recalc);

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

/**
 * If your backend messed up indicator_no typing, this will show it.
 * Supports alternative field names too.
 */
function getIndicatorNo(row) {
  const v = row?.indicator_no ?? row?.indicatorNo ?? row?.indicator ?? row?.indicator_number;
  return String(v ?? "").trim();
}

function getRowYear(row) {
  // preferred explicit year
  const y = row?.year ?? row?.report_year;
  if (y != null && y !== "") {
    const yn = Number(y);
    if (Number.isFinite(yn)) return yn;
  }

  // fallback map report_year_id -> year
  const ryId = Number(row?.report_year_id);
  if (!Number.isFinite(ryId)) return NaN;

  // if ryId itself looks like a year (e.g. 2024), accept it
  if (ryId >= 1900 && ryId <= 3000) return ryId;

  const reportYears = normalizeReportYears();
  const match = reportYears.find((r) => Number(r?.id) === ryId);
  const my = Number(match?.year);
  return Number.isFinite(my) ? my : NaN;
}

/**
 * Build axis from real data:
 * - If year mapping works => axis is years (2023,2024,...)
 * - If year mapping fails => axis falls back to report_year_id buckets
 */
function buildAxis() {
  const data = normalizePassedData();

  const yearVals = [];
  const idVals = [];

  for (const r of data) {
    const y = getRowYear(r);
    const ryId = Number(r?.report_year_id);
    if (Number.isFinite(y)) yearVals.push(y);
    if (Number.isFinite(ryId)) idVals.push(ryId);
  }

  const years = Array.from(new Set(yearVals)).sort((a, b) => a - b);

  // If we can’t resolve ANY year, fall back to report_year_id
  const axisKeys = years.length
    ? years
    : Array.from(new Set(idVals)).sort((a, b) => a - b);

  state.axisKeys = axisKeys;
  state.axisLabels = axisKeys.map(String);

  const map = new Map();
  axisKeys.forEach((k, i) => map.set(k, i));
  state.axisKeyToIndex = map;

  state.populationHoriOptions.xaxis = {
    ...state.populationHoriOptions.xaxis,
    categories: state.axisLabels,
  };
}

function recalc() {
  buildAxis();
  aggregateSeries();
  emitCompletenessForSelectedYear();
}

function aggregateSeries() {
  const data = normalizePassedData();
  const axisKeys = state.axisKeys;

  if (!axisKeys.length) {
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

  const zeros = () => new Array(axisKeys.length).fill(0);

  // 23.1.* and 23.2.* (both)
  const a23_1 = zeros(), a23_1_1 = zeros(), a23_1_2 = zeros(), a23_1_3 = zeros(), a23_1_4 = zeros();
  const a23_2 = zeros(), a23_2_1 = zeros(), a23_2_2 = zeros(), a23_2_3 = zeros(), a23_2_4 = zeros();

  // others
  const a24_1 = zeros(), a24_2 = zeros(), a24_3 = zeros(), a24_4 = zeros();
  const a25_1 = zeros(), a25_2 = zeros();
  const a26_1 = zeros(), a26_2 = zeros();

  const a27_1 = zeros(), a27_1_1 = zeros(), a27_1_2 = zeros(), a27_1_3 = zeros(), a27_1_4 = zeros();
  const a28_1 = zeros(), a28_1_1 = zeros(), a28_1_2 = zeros(), a28_1_3 = zeros(), a28_1_4 = zeros();
  const a29_1 = zeros(), a29_1_1 = zeros(), a29_1_2 = zeros(), a29_1_3 = zeros(), a29_1_4 = zeros();
  const a30_1 = zeros(), a30_1_1 = zeros(), a30_1_2 = zeros(), a30_1_3 = zeros(), a30_1_4 = zeros();

  // 🔥 debug counters
  let hit23 = 0;
  let missIdx = 0;
  let numericIndicatorSuspect = 0;

  for (const row of data) {
    if (!row) continue;

    // pick axis key: year if possible else report_year_id
    const y = getRowYear(row);
    const axisKey = Number.isFinite(y) ? y : Number(row?.report_year_id);

    const idx = state.axisKeyToIndex.get(axisKey);
    if (idx === undefined) {
      missIdx++;
      continue;
    }

    const rawIndicator = row?.indicator_no ?? row?.indicatorNo ?? row?.indicator;
    if (typeof rawIndicator === "number") numericIndicatorSuspect++;

    const ind = getIndicatorNo(row);
    const value = Number.isFinite(Number(row?.total)) ? Number(row.total) : 0;

    // quick sanity check for 23.*
    if (ind.startsWith("23.")) hit23++;

    switch (ind) {
      case "23.1": a23_1[idx] += value; break;
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

      case "27.1": a27_1[idx] += value; break;
      case "27.1.1": a27_1_1[idx] += value; break;
      case "27.1.2": a27_1_2[idx] += value; break;
      case "27.1.3": a27_1_3[idx] += value; break;
      case "27.1.4": a27_1_4[idx] += value; break;

      case "28.1": a28_1[idx] += value; break;
      case "28.1.1": a28_1_1[idx] += value; break;
      case "28.1.2": a28_1_2[idx] += value; break;
      case "28.1.3": a28_1_3[idx] += value; break;
      case "28.1.4": a28_1_4[idx] += value; break;

      case "29.1": a29_1[idx] += value; break;
      case "29.1.1": a29_1_1[idx] += value; break;
      case "29.1.2": a29_1_2[idx] += value; break;
      case "29.1.3": a29_1_3[idx] += value; break;
      case "29.1.4": a29_1_4[idx] += value; break;

      case "30.1": a30_1[idx] += value; break;
      case "30.1.1": a30_1_1[idx] += value; break;
      case "30.1.2": a30_1_2[idx] += value; break;
      case "30.1.3": a30_1_3[idx] += value; break;
      case "30.1.4": a30_1_4[idx] += value; break;

      default:
        break;
    }
  }

  // 🚨 If these logs show numericIndicatorSuspect > 0, your backend is trashing indicator_no.
  console.log("[SchoolEnrol] axisKeys:", state.axisKeys);
  console.log("[SchoolEnrol] 23.* rows seen:", hit23, "missIdx:", missIdx, "numericIndicatorSuspect:", numericIndicatorSuspect);

  state.student_enrol = [
    { name: "23.1 Total School enrollees (A)", data: a23_1 },
    { name: "23.1.1 Kinder (A)", data: a23_1_1 },
    { name: "23.1.2 Elem (A)", data: a23_1_2 },
    { name: "23.1.3 JHS (A)", data: a23_1_3 },
    { name: "23.1.4 SHS (A)", data: a23_1_4 },

  ];

  state.net_enrol = [
    { name: "24.1 Kinder Net Enrolment", data: a24_1 },
    { name: "24.2 Elem Net Enrolment", data: a24_2 },
    { name: "24.3 JHS Net Enrolment", data: a24_3 },
    { name: "24.4 SHS Net Enrolment", data: a24_4 },
  ];

  state.completion = [
    { name: "25.1 Kinder & Elem Completion", data: a25_1 },
    { name: "25.2 Secondary Completion", data: a25_2 },
  ];

  state.leaver = [
    { name: "26.1 Kinder & Elem Drop-out", data: a26_1 },
    { name: "26.2 Secondary Drop-out", data: a26_2 },
  ];

  state.sectoral_IP = [
    { name: "27.1 ALL IP enrolled", data: a27_1 },
    { name: "27.1.1 IP Kinder", data: a27_1_1 },
    { name: "27.1.2 IP Elem", data: a27_1_2 },
    { name: "27.1.3 IP JHS", data: a27_1_3 },
    { name: "27.1.4 IP SHS", data: a27_1_4 },
  ];

  state.sectoral_Moro = [
    { name: "28.1 ALL Moro enrolled", data: a28_1 },
    { name: "28.1.1 Moro Kinder", data: a28_1_1 },
    { name: "28.1.2 Moro Elem", data: a28_1_2 },
    { name: "28.1.3 Moro JHS", data: a28_1_3 },
    { name: "28.1.4 Moro SHS", data: a28_1_4 },
  ];

  state.sectoral_CWSN = [
    { name: "29.1 ALL CWSN/CWD enrolled", data: a29_1 },
    { name: "29.1.1 CWSN Kinder", data: a29_1_1 },
    { name: "29.1.2 CWSN Elem", data: a29_1_2 },
    { name: "29.1.3 CWSN JHS", data: a29_1_3 },
    { name: "29.1.4 CWSN SHS", data: a29_1_4 },
  ];

  state.ALS = [
    { name: "30.1 ALS enrolled/passers", data: a30_1 },
    { name: "30.1.1 ALS Basic Literacy", data: a30_1_1 },
    { name: "30.1.2 ALS A&E Elem", data: a30_1_2 },
    { name: "30.1.3 ALS A&E JHS", data: a30_1_3 },
    { name: "30.1.4 ALS A&E SHS", data: a30_1_4 },
  ];
}

function emitCompletenessForSelectedYear() {
  const data = normalizePassedData();
  const expected = EXPECTED_INDICATORS.length;

  // pick selectedYear (best effort)
  const requested = Number(props.report_year);
  const selectedYear = Number.isFinite(requested)
    ? requested
    : (state.axisKeys?.length ? state.axisKeys[state.axisKeys.length - 1] : null);

  if (selectedYear == null) {
    emit("completeness", {
      subcategory_key: SUBCATEGORY_KEY,
      subcategory_label: SUBCATEGORY_LABEL,
      tab_name: TAB_NAME,
      report_year: null,
      expected,
      actual: 0,
      percentage: 0,
    });
    return;
  }

  const present = new Set();

  for (const row of data) {
    if (!row) continue;

    const y = getRowYear(row);
    const axisKey = Number.isFinite(y) ? y : Number(row?.report_year_id);
    if (axisKey !== selectedYear) continue;

    const ind = getIndicatorNo(row);
    if (EXPECTED_SET.has(ind)) present.add(ind);
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
