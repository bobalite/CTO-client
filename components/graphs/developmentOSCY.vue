<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
    OUT OF SCHOOL CHILDREN AND YOUTH (OSCY)
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">OUT OF SCHOOL CHILDREN</h3>
      <ClientOnly>
        <apexchart
          type="line"
          height="300"
          width="100%"
          :options="state.oscLineOptions"
          :series="state.osc"
        />
      </ClientOnly>
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">OUT OF SCHOOL CHILDREN (ALS)</h3>
      <ClientOnly>
        <apexchart
          type="area"
          height="300"
          width="100%"
          :options="state.oscAreaOptions"
          :series="state.osc_als"
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

  report_year: { type: [Number, String], required: false }, // used for completeness year selection
  passed_data: { type: [Array, Object], required: true },
  report_years: { type: [Array, Object], required: true },
});

const SUBCATEGORY_KEY = "development_oscy";
const SUBCATEGORY_LABEL = "Out of School Children and Youth (OSCY)";
const TAB_NAME = "Development";

const EXPECTED_INDICATORS = [
  "31.1", "31.1.1", "31.1.2", "31.1.3",
  "32.1", "32.2", "32.3", "32.4",
];

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

      switch (String(row.indicator_no)) {
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

    state.osc = [
      { name: "31.1 Total OSC (<=17)", data: osc_31_1 },
      { name: "31.1.1 OSC (6-11)", data: osc_31_1_1 },
      { name: "31.1.2 OSCY (12-15)", data: osc_31_1_2 },
      { name: "31.1.3 OSCY (16-17)", data: osc_31_1_3 },
    ];

    state.osc_als = [
      { name: "32.1 OSC enrolled in ALS (<=17)", data: osc_32_1 },
      { name: "32.2 Learners under ADM (<=17)", data: osc_32_2 },
      { name: "32.3 OSCY assisted for enrolment (<=17)", data: osc_32_3 },
      { name: "32.4 Dropouts reintegrated (balik-aral) (<=17)", data: osc_32_4 },
    ];
  } catch (error) {
    console.error("fetchReports_Details_Bars_Annual error:", error);
    state.osc = [];
    state.osc_als = [];
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

  const present = new Set();
  for (const row of data) {
    if (!row) continue;

    const rowYear = getRowYear(row);
    if (!Number.isFinite(rowYear) || rowYear !== selectedYear) continue;

    const ind = String(row.indicator_no ?? "").trim();
    if (!ind) continue;

    const value = row.total != null ? Number(row.total) : NaN;
    if (!Number.isFinite(value)) continue;

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
