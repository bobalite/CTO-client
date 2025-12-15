<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
    EARLY CHILDHOOD CARE AND DEVELOPMENT
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">
        EARLY CHILDHOOD CARE AND DEVELOPMENT (ECCD)
      </h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="300"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.early_childhood"
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

  report_year: { type: [Number, String], required: false }, // not used for filtering; trend is across years
  passed_data: { type: [Array, Object], required: true },
  report_years: { type: [Array, Object], required: true },
});

const state = reactive({
  annualYearIds: [],
  annualYearNames: [],

  early_childhood: [],

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

// Best-effort: get year from row. If API doesn't include year/report_year,
// fallback: map report_year_id -> year using report_years list.
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

  // IMPORTANT: build from DATA so chart shows ALL years present in the dataset
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
      state.early_childhood = [];
      return;
    }

    const yearIndexMap = new Map();
    yearIds.forEach((year, idx) => yearIndexMap.set(year, idx));

    // indicator arrays (per YEAR)
    const ecd_22_1   = new Array(yearIds.length).fill(0);
    const ecd_22_2   = new Array(yearIds.length).fill(0);
    const ecd_22_2_1 = new Array(yearIds.length).fill(0);
    const ecd_22_2_2 = new Array(yearIds.length).fill(0);
    const ecd_22_3   = new Array(yearIds.length).fill(0);
    const ecd_22_4   = new Array(yearIds.length).fill(0);
    const ecd_22_5   = new Array(yearIds.length).fill(0);
    const ecd_22_6   = new Array(yearIds.length).fill(0);
    const ecd_22_7   = new Array(yearIds.length).fill(0);

    for (const row of data) {
      if (!row) continue;

      const rowYear = getRowYear(row);
      if (!Number.isFinite(rowYear)) continue;

      const idx = yearIndexMap.get(rowYear);
      if (idx === undefined) continue;

      const value = row.total != null ? Number(row.total) : 0;
      if (!Number.isFinite(value)) continue;

      switch (row.indicator_no) {
        case "22.1":   ecd_22_1[idx]   += value; break;
        case "22.2":   ecd_22_2[idx]   += value; break;
        case "22.2.1": ecd_22_2_1[idx] += value; break;
        case "22.2.2": ecd_22_2_2[idx] += value; break;
        case "22.3":   ecd_22_3[idx]   += value; break;
        case "22.4":   ecd_22_4[idx]   += value; break;
        case "22.5":   ecd_22_5[idx]   += value; break;
        case "22.6":   ecd_22_6[idx]   += value; break;
        case "22.7":   ecd_22_7[idx]   += value; break;
        default: break;
      }
    }

    // IMPORTANT: assign AFTER the loop
    state.early_childhood = [
      { name: "22.1 Total number of ECCD (Day Care) enrollees", data: ecd_22_1 },
      { name: "22.2 Total number of Child Development Centers/Facilities (CDCs)", data: ecd_22_2 },
      { name: "22.2.1 Total number of Public CDCs", data: ecd_22_2_1 },
      { name: "22.2.2 Total number of Private CDCs", data: ecd_22_2_2 },
      { name: "22.3 Total number of ECCD-recognized centers", data: ecd_22_3 },
      { name: "22.4 Total number of DSWD accredited centers", data: ecd_22_4 },
      { name: "22.5 Total number of Centers that have undergone internal assessment (under ECCD Guidelines)", data: ecd_22_5 },
      { name: "22.6 Total number of Day Care Workers (DCWs)", data: ecd_22_6 },
      { name: "22.7 Total number of barangays with CDCs", data: ecd_22_7 },
    ];
  } catch (error) {
    console.error("fetchReports_Details_Bars_Annual error:", error);
    state.early_childhood = [];
  }
}
</script>
