<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold mt-3 mb-0 w-full">
    
  </h3>

  <!-- 1 column block -->
  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
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
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";

const props = defineProps({
  class: { type: String, default: "border-solid" },
  report_year: { type: [Number, String] },
  passed_data: { type: [Array, Object], required: true },
  report_years: { type: [Array, Object], required: true },
});

const COLORS = [
  "#312e81",
  "#c026d3",
  "#46C2CB",
  "#db2777",
  "#9d174d"
];

function baseBarOptions() {
  return {
    chart: {
      type: "bar",
      stacked: false,
      toolbar: { show: false },
      zoom: { enabled: false }
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%"
      }
    },

    dataLabels: {
      enabled: true,
      formatter: (val) => Number(val).toLocaleString()
    },

    stroke: { width: 1 },

    legend: {
      position: "bottom",
      fontSize: "12px"
    },

    xaxis: {
      categories: [],
      labels: {
        rotate: -45
      }
    },

    yaxis: {
      labels: {
        formatter: (v) => Number(v).toLocaleString()
      }
    },

    tooltip: {
      y: {
        formatter: (v) => Number(v).toLocaleString()
      }
    },

    colors: COLORS
  };
}

const state = reactive({
  quarterIds: [],
  quarterNames: [],
  civreg: [],
  barOptionsCivreg: baseBarOptions()
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
      categories: quarterNames.length ? quarterNames : ["Q1", "Q2", "Q3", "Q4"]
    }
  };
}

function fetchReports_Details_Bars() {
  try {
    const data = normalizePassedData();
    const quarterIds = state.quarterIds;

    if (!quarterIds.length) {
      state.civreg = [];
      return;
    }

    const civ_49_1 = new Array(quarterIds.length).fill(0);
    const civ_49_2 = new Array(quarterIds.length).fill(0);
    const civ_49_3 = new Array(quarterIds.length).fill(0);
    const civ_49_4 = new Array(quarterIds.length).fill(0);
    const civ_49_5 = new Array(quarterIds.length).fill(0);

    for (const row of data) {
      const idx = quarterIds.indexOf(Number(row?.report_year_id));
      if (idx === -1) continue;

      const value = Number(row?.total) || 0;

      switch (String(row?.indicator_no)) {
        case "49.1": civ_49_1[idx] += value; break;
        case "49.2": civ_49_2[idx] += value; break;
        case "49.3": civ_49_3[idx] += value; break;
        case "49.4": civ_49_4[idx] += value; break;
        case "49.5": civ_49_5[idx] += value; break;
      }
    }

    state.civreg = [
      { name: "Registered Births", data: civ_49_1 },
      { name: "Registered Moro", data: civ_49_2 },
      { name: "Registered IP", data: civ_49_3 },
      { name: "SCRA Registrations", data: civ_49_4 },
      { name: "BCRA Registrations", data: civ_49_5 }
    ];

  } catch (error) {
    console.error("fetchReports_Details_Bars error:", error);
    state.civreg = [];
  }
}
</script>