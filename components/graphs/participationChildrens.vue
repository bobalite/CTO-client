<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 mb-0 w-full">
    CHILDREN'S PARTICIPATION
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">
        Total Number of BCPCs with Child Representatives
      </h3>
      <apexchart
        type="bar"
        height="400"
        width="100%"
        :options="state.populationHoriOptions"
        :series="state.repre_1"
      />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">
        Total Number of BCPCs conducted Barangay Children's Congress
      </h3>
      <apexchart
        type="bar"
        height="400"
        width="100%"
        :options="state.populationHoriOptions"
        :series="state.repre_2"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";

const props = defineProps({
  class: { type: String, required: false, default: "border-solid" },
  displaytext: { type: String, required: false },
  group_id: { type: String, required: false },

  report_year: { type: [Number, String], required: false }, // keep for consistency
  passed_data: { type: [Array, Object], required: true },
  report_years: { type: [Array, Object], required: true },
});

const state = reactive({
  annualYearIds: [],
  annualYearNames: [],

  repre_1: [],
  repre_2: [],

  populationHoriOptions: {
    chart: { type: "bar", stacked: false, toolbar: { show: false }, zoom: { enabled: false } },
    plotOptions: { bar: { horizontal: false } },
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
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
  () => [props.report_year, props.report_years, props.passed_data],
  () => recalc(),
  { deep: true }
);

function normalizePassedData() {
  const raw = props.passed_data;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  return [];
}

// Fallback to report_years mapping only if "year" isn't present in the row
function normalizeReportYears() {
  const raw = props.report_years;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  if (raw && Array.isArray(raw?.data?.data)) return raw.data.data;
  return [];
}

function getRowYear(row) {
  const y = row.year ?? row.report_year;
  if (y != null && y !== "") return Number(y);

  const ryId = Number(row.report_year_id);
  if (!Number.isFinite(ryId)) return NaN;

  const years = normalizeReportYears();
  const match = years.find((r) => Number(r.id) === ryId);
  return match ? Number(match.year) : NaN;
}

function buildAnnualArrays() {
  const data = normalizePassedData();

  // Prefer years coming from the dataset so it includes all years "regardless of selected year"
  const years = Array.from(
    new Set(data.map((r) => getRowYear(r)).filter((y) => Number.isFinite(y)))
  ).sort((a, b) => a - b);

  state.annualYearIds = years;
  state.annualYearNames = years.map(String);

  state.populationHoriOptions.xaxis = {
    ...state.populationHoriOptions.xaxis,
    categories: state.annualYearNames,
  };
}

function fetchReports_Details_Bars_Annual() {
  try {
    const data = normalizePassedData();
    const yearIds = state.annualYearIds ?? [];

    if (!yearIds.length) {
      state.repre_1 = [];
      state.repre_2 = [];
      return;
    }

    const yearIndexMap = new Map();
    yearIds.forEach((year, idx) => yearIndexMap.set(year, idx));

    const part_43_1 = new Array(yearIds.length).fill(0);
    const part_43_1_1 = new Array(yearIds.length).fill(0);
    const part_43_1_2 = new Array(yearIds.length).fill(0);
    const part_43_2 = new Array(yearIds.length).fill(0);

    for (const row of data) {
      if (!row) continue;

      const rowYear = getRowYear(row);
      if (!Number.isFinite(rowYear)) continue;

      const idx = yearIndexMap.get(rowYear);
      if (idx === undefined) continue;

      const value = row.total != null ? Number(row.total) : 0;
      if (!Number.isFinite(value)) continue;

      switch (row.indicator_no) {
        case "43.1": part_43_1[idx] += value; break;
        case "43.1.1": part_43_1_1[idx] += value; break;
        case "43.1.2": part_43_1_2[idx] += value; break;
        case "43.2": part_43_2[idx] += value; break;
        default: break;
      }
    }

    state.repre_1 = [
      { name: "Total Number of BCPCs with Child Representatives", data: part_43_1 },
      { name: "Elected Child Representatives", data: part_43_1_1 },
      { name: "Appointed Child Representatives", data: part_43_1_2 }, // FIXED (you had 43.1.1 again)
    ];

    state.repre_2 = [
      { name: "Total Number of BCPCs conducted Barangay Children's Congress", data: part_43_2 },
    ];
  } catch (error) {
    console.error("fetchReports_Details_Bars_Annual error:", error);
    state.repre_1 = [];
    state.repre_2 = [];
  }
}
</script>
