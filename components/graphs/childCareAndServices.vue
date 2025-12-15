<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
    CHILD CARE AND SERVICES
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Chart 1 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">BIRTH WEIGHT</h3>
      <ClientOnly>
        <apexchart
          type="bar"
          height="90%"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.birth_weight"
        />
      </ClientOnly>
    </div>

    <!-- Chart 2 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">INFANT BREASTFEEDING</h3>
      <ClientOnly>
        <apexchart
          type="bar"
          height="200"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.graphSeriesPrenatalCare"
        />
      </ClientOnly>
    </div>

    <!-- Chart 3 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">CHILD IMMUNIZATION</h3>
      <ClientOnly>
        <apexchart
          type="bar"
          height="200"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.attendedskilled"
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

  // series used by charts
  birth_weight: [],
  graphSeriesPrenatalCare: [],
  attendedskilled: [],

  populationHoriOptions: {
    chart: { type: "bar", stacked: false, toolbar: { show: false }, zoom: { enabled: false } },
    plotOptions: { bar: { horizontal: false } },
    colors: ["#00796B", "#388E3C", "#AFB42B", "#F9A825"],
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    xaxis: { categories: ["1Q", "2Q", "3Q", "4Q"] },
  },
});

onMounted(() => {
  rebuildAll();
});

// Rebuild on year/quarters list change
watch(() => props.report_year, () => rebuildAll());
watch(() => props.report_years, () => rebuildAll(), { deep: true });

// Recompute series on data change (deep because parent sometimes mutates nested .data)
watch(() => props.passed_data, () => fetchReports_Details_Bars(), { deep: true });

function rebuildAll() {
  buildQuarterArrays();
  fetchReports_Details_Bars();
}

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

function buildQuarterArrays() {
  const allYears = normalizeReportYears();
  const targetYear = Number(props.report_year);

  const filtered = allYears
    .filter(q => Number(q.year) === targetYear)
    // ensure stable order if you have quarter field, otherwise fallback to id
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

async function fetchReports_Details_Bars() {
  try {
    const data = normalizePassedData();
    const quarterIds = (state.quarterIds ?? []).map(Number);

    if (!quarterIds.length) {
      // no quarters for selected year -> reset
      state.birth_weight = [];
      state.graphSeriesPrenatalCare = [];
      state.attendedskilled = [];
      return;
    }

    // Initialize arrays
    const total_live_births = new Array(quarterIds.length).fill(0);
    const total_low_birth_weight = new Array(quarterIds.length).fill(0);
    const percentage_low_birth_weight = new Array(quarterIds.length).fill(0);

    const total_newborns_breastfeeding = new Array(quarterIds.length).fill(0);
    const percentage_newborns_breastfeeding = new Array(quarterIds.length).fill(0);

    const total_FIC = new Array(quarterIds.length).fill(0);
    const total_population_0_12_old = new Array(quarterIds.length).fill(0);
    const percentage_FIC = new Array(quarterIds.length).fill(0);

    // Single pass
    for (const row of data) {
      if (!row) continue;

      const reportYearId = Number(row.report_year_id);
      const idx = quarterIds.indexOf(reportYearId);
      if (idx === -1) continue;

      const value = row.total != null ? Number(row.total) : 0;
      if (Number.isNaN(value)) continue;

      switch (row.indicator_no) {
        case "7.1":
          total_live_births[idx] += value;
          break;
        case "7.2":
          total_low_birth_weight[idx] += value;
          break;
        case "7.3":
          percentage_low_birth_weight[idx] += value;
          break;

        case "8.1":
          total_newborns_breastfeeding[idx] += value;
          break;
        case "8.2":
          percentage_newborns_breastfeeding[idx] += value;
          break;

        case "9.1":
          total_FIC[idx] += value;
          break;
        case "9.2":
          total_population_0_12_old[idx] += value;
          break;
        case "9.3":
          percentage_FIC[idx] += value;
          break;

        default:
          break;
      }
    }

    state.birth_weight = [
      { name: "7.1 Total number of live births", data: total_live_births },
      { name: "7.2 Total number of low birth weight", data: total_low_birth_weight },
      { name: "7.3 Prevalence/percentage of low birth weight", data: percentage_low_birth_weight },
    ];

    state.graphSeriesPrenatalCare = [
      { name: "8.1 - Newborns initiated to breastfeeding", data: total_newborns_breastfeeding },
      { name: "8.2 - Percentage newborns initiated to breastfeeding", data: percentage_newborns_breastfeeding },
    ];

    state.attendedskilled = [
      { name: "9.1 - Total number of Fully Immunized Children", data: total_FIC },
      { name: "9.2 - Total eligible population of 0-12 months old", data: total_population_0_12_old },
      { name: "9.3 - Proportion/percentage coverage of (FIC)", data: percentage_FIC },
    ];
  } catch (error) {
    console.error("fetchReports_Details_Bars error:", error);
    state.birth_weight = [];
    state.graphSeriesPrenatalCare = [];
    state.attendedskilled = [];
  }
}
</script>
