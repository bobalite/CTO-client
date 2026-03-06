<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold mt-3 mb-0 w-full">
    LGU POPULATION
  </h3>

  <div class="border rounded-xl p-2">
    <h3 class="text-sm font-bold mb-2">CIVIL REGISTRATION</h3>

    <ClientOnly>
      <apexchart
        type="bar"
        height="400"
        width="100%"
        :options="state.barOptionsCivreg"
        :series="state.civreg"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";

const props = defineProps({
  class: { type: String, required: false, default: "border-solid" },
  displaytext: { type: String, required: false },
  group_id: { type: String, required: false },

  report_year: { type: [Number, String], required: false },
  passed_data: { type: [Array, Object], required: true },
  report_years: { type: [Array, Object], required: true },
});

const COLORS = [
  "#312e81", "#c026d3", "#46C2CB", "#db2777", "#9d174d",
  "#B12C00", "#DC2525", "#6D67E4", "#F4B342", "#662549"
];

function baseBarOptions() {
  return {
    chart: {
      type: "bar",
      stacked: false,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    plotOptions: { bar: { horizontal: false } },
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    xaxis: { categories: [] },
    colors: COLORS,
    yaxis: {
      labels: {
        formatter: (v) => Number(v).toLocaleString(), // ✅ comma thousands
      },
    },
    tooltip: {
      y: {
        formatter: (v) => Number(v).toLocaleString(), // ✅ comma thousands
      },
    },
  };
}

const state = reactive({
  quarterIds: [],
  quarterNames: [],

  civreg: [],
  barOptionsCivreg: baseBarOptions(),
});

onMounted(() => recalc());

watch(
  () => [props.report_year, props.report_years, props.passed_data],
  () => recalc(),
  { deep: true }
);

function normalizeReportYears() {
  const raw = props.report_years;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  if (raw && Array.isArray(raw?.data?.data)) return raw.data.data;
  return [];
}

function normalizePassedData() {
  const raw = props.passed_data;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  return [];
}

function recalc() {
  buildQuarterArrays();
  fetchReports_Details_Bars();
}

function buildQuarterArrays() {
  const allYears = normalizeReportYears();
  const targetYear = Number(props.report_year);

  // quarters for this year (your API has report_year_id, so we use ids)
  const filtered = allYears
    .filter((q) => Number(q?.year) === targetYear)
    .sort((a, b) => Number(a?.quarter ?? a?.id) - Number(b?.quarter ?? b?.id));

  const quarterIds = filtered.map((q) => Number(q.id)).filter(Number.isFinite);
  const quarterNames = filtered.map((q, index) => `Q${index + 1} ${q.year}`);

  state.quarterIds = quarterIds;
  state.quarterNames = quarterNames;

  state.barOptionsCivreg = {
    ...state.barOptionsCivreg,
    xaxis: {
      ...state.barOptionsCivreg.xaxis,
      categories: quarterNames.length ? quarterNames : ["Q1", "Q2", "Q3", "Q4"],
    },
  };
}

function fetchReports_Details_Bars() {
  try {
    const data = normalizePassedData();
    const quarterIds = (state.quarterIds ?? []).map(Number).filter(Number.isFinite);

    if (!quarterIds.length) {
      state.civreg = [];
      return;
    }

    // ✅ arrays sized to number of quarters
    const civ_49_1 = new Array(quarterIds.length).fill(0);
    const civ_49_2 = new Array(quarterIds.length).fill(0);
    const civ_49_3 = new Array(quarterIds.length).fill(0);
    const civ_49_4 = new Array(quarterIds.length).fill(0);
    const civ_49_5 = new Array(quarterIds.length).fill(0);

    for (const row of data) {
      if (!row) continue;

      const reportYearId = Number(row?.report_year_id);
      const idx = quarterIds.indexOf(reportYearId);
      if (idx === -1) continue;

      const value = row?.total != null ? Number(row.total) : 0;
      if (!Number.isFinite(value)) continue;

      switch (String(row?.indicator_no)) {
        case "49.1": civ_49_1[idx] += value; break;
        case "49.2": civ_49_2[idx] += value; break;
        case "49.3": civ_49_3[idx] += value; break;
        case "49.4": civ_49_4[idx] += value; break;
        case "49.5": civ_49_5[idx] += value; break;
        default: break;
      }
    }

    state.civreg = [
      { name: "49.1 Children registered at-birth (<=17)", data: civ_49_1 },
      { name: "49.2 Moro children registered at-birth (<=17)", data: civ_49_2 },
      { name: "49.3 IP children registered at-birth (<=17)", data: civ_49_3 },
      { name: "49.4 Birth registrations via SCRA (<=17)", data: civ_49_4 },
      { name: "49.5 Birth registrations via BCRA (<=17)", data: civ_49_5 },
    ];
  } catch (error) {
    console.error("fetchReports_Details_Bars error:", error);
    state.civreg = [];
  }
}
</script>