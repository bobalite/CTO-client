<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
    MORTALITY
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">MATERNAL MORTALITY</h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="90%"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.maternal_mortality"
        />
      </ClientOnly>
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">CHILD MORTALITY</h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="200"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.child_mortality"
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

  report_year: { type: [Number, String], required: false },
  passed_data: { type: [Array, Object], required: true },
  report_years: { type: [Array, Object], required: true },
});

const state = reactive({
  quarterNames: [],
  quarterIds: [],

  maternal_mortality: [],
  child_mortality: [],

  populationHoriOptions: {
    chart: { type: "bar", stacked: false, toolbar: { show: false }, zoom: { enabled: false } },
    plotOptions: { bar: { horizontal: false } },
    colors: ["#00796B", "#388E3C", "#AFB42B", "#F9A825"],
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    xaxis: { categories: ["1Q", "2Q", "3Q", "4Q"] },
  },
});

function normalizeReportYears() {
  const raw = props.report_years;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
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

onMounted(() => {
  recalc();
});

// Recalc when year/quarters/data changes
watch(() => props.report_year, () => recalc());
watch(() => props.report_years, () => recalc(), { deep: true });
watch(() => props.passed_data, () => fetchReports_Details_Bars(), { deep: true });

function buildQuarterArrays() {
  const allYears = normalizeReportYears();
  const targetYear = Number(props.report_year);

  const filtered = allYears
    .filter(q => Number(q.year) === targetYear)
    // stable ordering (use quarter field if present, otherwise id)
    .sort((a, b) => Number(a.quarter ?? a.id) - Number(b.quarter ?? b.id));

  const quarterIds = filtered.map(q => Number(q.id));
  const quarterNames = filtered.map((q, index) => `Q${index + 1} ${q.year}`);

  state.quarterIds = quarterIds;
  state.quarterNames = quarterNames;

  state.populationHoriOptions.xaxis = {
    ...state.populationHoriOptions.xaxis,
    categories: quarterNames.length ? quarterNames : ["1Q", "2Q", "3Q", "4Q"],
  };
}

function fetchReports_Details_Bars() {
  try {
    const data = normalizePassedData();
    const quarterIds = (state.quarterIds ?? []).map(Number);

    if (!quarterIds.length) {
      state.maternal_mortality = [];
      state.child_mortality = [];
      return;
    }

    const total_maternal_deaths = new Array(quarterIds.length).fill(0);
    const ratio_maternal_deaths = new Array(quarterIds.length).fill(0);

    const total_neonatal_deaths = new Array(quarterIds.length).fill(0);
    const rate_neonatal_deaths = new Array(quarterIds.length).fill(0);
    const infant_deaths_0to11 = new Array(quarterIds.length).fill(0);
    const rate_infant_deaths = new Array(quarterIds.length).fill(0);
    const total_u5_deaths = new Array(quarterIds.length).fill(0);
    const rate_u5_deaths = new Array(quarterIds.length).fill(0);

    for (const row of data) {
      if (!row) continue;

      const reportYearId = Number(row.report_year_id);
      const idx = quarterIds.indexOf(reportYearId);
      if (idx === -1) continue;

      const value = row.total != null ? Number(row.total) : 0;
      if (Number.isNaN(value)) continue;

      switch (row.indicator_no) {
        case "10.1":
          total_maternal_deaths[idx] += value;
          break;
        case "10.2":
          ratio_maternal_deaths[idx] += value;
          break;

        case "11.1":
          total_neonatal_deaths[idx] += value;
          break;
        case "11.2":
          rate_neonatal_deaths[idx] += value;
          break;
        case "11.3":
          infant_deaths_0to11[idx] += value;
          break;
        case "11.4":
          rate_infant_deaths[idx] += value;
          break;
        case "11.5":
          total_u5_deaths[idx] += value;
          break;
        case "11.6":
          rate_u5_deaths[idx] += value;
          break;

        default:
          break;
      }
    }

    state.maternal_mortality = [
      { name: "10.1 Total number of maternal deaths", data: total_maternal_deaths },
      { name: "10.2 Ratio of maternal deaths (MMR)", data: ratio_maternal_deaths },
    ];

    state.child_mortality = [
      { name: "11.1 - Neonatal deaths (0-28 days)", data: total_neonatal_deaths },
      { name: "11.2 - Rate of neonatal mortality", data: rate_neonatal_deaths },
      { name: "11.3 - Infant deaths (0-11 months)", data: infant_deaths_0to11 },
      { name: "11.4 - Infant mortality rate", data: rate_infant_deaths },
      { name: "11.5 - Under-5 deaths", data: total_u5_deaths },
      { name: "11.6 - Under-5 mortality rate", data: rate_u5_deaths },
    ];
  } catch (error) {
    console.error("fetchReports_Details_Bars error:", error);
    state.maternal_mortality = [];
    state.child_mortality = [];
  }
}
</script>
