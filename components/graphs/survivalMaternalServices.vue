<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
    MATERNAL CARE AND SERVICES
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Chart 1 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">
        Maternal Adolescent Deliveries
      </h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="300"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.graphSeriesAll"
        />
      </ClientOnly>
    </div>

    <!-- Chart 2 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">
        Prevalence of Teenage Pregnancy
      </h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="300"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.graphSeriesAllPrevalence"
        />
      </ClientOnly>
    </div>

    <!-- Chart 3 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">
        Prenatal Care
      </h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="300"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.graphSeriesPrenatalCare "
        />
      </ClientOnly>
    </div>

    <!-- Chart 4 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">
        Attended by Skilled Health Professionals
      </h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="300"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.attendedskilled "
        />
      </ClientOnly>
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">
        Facility Based Deliveries 
      </h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="300"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.facilitybased"
        />
      </ClientOnly>
    </div>

     <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">
        Postpartum Care
      </h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="300"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.postpartum"
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
  graphSeriesAll: [
    { name: "Less than 15 yrs old", data: [0, 0, 0, 0] },
    { name: "15 - 19 yrs old", data: [0, 0, 0, 0] },
  ],

  graphSeriesAllPrevalence: [{ name: "Prevalence/percentage of adolescent pregnancies", data: [0, 0, 0, 0] }],
  graphSeriesPrenatalCare: [],
  attendedskilled: [],
  facilitybased: [],
  postpartum: [],

  quarterNames: [],
  quarterIds: [],

  populationHoriOptions: {
    chart: { type: "bar", stacked: false, toolbar: { show: false }, zoom: { enabled: false } },
    plotOptions: { bar: { horizontal: false } },
    colors: ["#00796B", "#388E3C", "#AFB42B", "#F9A825"],
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    xaxis: { categories: ["1Q", "2Q", "3Q", "4Q"] },
  },

  OptionsPieDatasource: {
    chart: { type: "pie" },
    colors: ["#fbbf24", "#facc15", "#a3e635", "#4ade80"],
    grid: { padding: { top: 0, bottom: 0, left: 0, right: 0 } },
    dataLabels: {
      enabled: true,
      style: { colors: ["#333"], fontSize: "12px", fontWeight: "bold" },
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    legend: { show: false },
    labels: ["Above 19 yrs old", "less than 15 yrs old", "15 - 19 yrs old"],
  },
});

onMounted(() => {
  rebuildAll();
});

/**
 * Rebuild order matters:
 * 1) quarterIds must be correct for the year
 * 2) then compute series using quarterIds
 */
function rebuildAll() {
  buildQuarterArrays();
  fetchReports_Details_Bars();
  fetchReports_Details_Pie();
}

/**
 * Watch year changes -> rebuild quarters and series
 */
watch(
  () => props.report_year,
  () => {
    rebuildAll();
  }
);

/**
 * Watch report_years changes (quarters list changes) -> rebuild quarters and series
 */
watch(
  () => props.report_years,
  () => {
    rebuildAll();
  },
  { deep: true }
);

/**
 * Watch passed_data changes -> recompute series (quarters already computed)
 * Use deep: true because your parent mutates nested .data sometimes.
 */
watch(
  () => props.passed_data,
  () => {
    // only recompute series; quarterIds might still be valid
    fetchReports_Details_Bars();
    fetchReports_Details_Pie();
  },
  { deep: true }
);

function normalizeReportYears() {
  const raw = props.report_years;

  if (Array.isArray(raw)) return raw;

  if (raw && Array.isArray(raw.data)) return raw.data;

  return [];
}

function normalizePassedData() {
  const raw = props.passed_data;

  // if parent passes array
  if (Array.isArray(raw)) return raw;

  // if parent passes {data: [...]}
  if (raw && Array.isArray(raw.data)) return raw.data;

  return [];
}

function buildQuarterArrays() {
  const allYears = normalizeReportYears();
  const targetYear = Number(props.report_year);

  const filtered = allYears
    .filter(q => Number(q.year) === targetYear)
    // IMPORTANT: ensure consistent quarter order (if you have quarter field or date)
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
      // year has no quarters; reset to empty
      state.graphSeriesAll = [
        { name: "Less than 15 yrs old", data: [] },
        { name: "15 - 19 yrs old", data: [] },
      ];
      state.graphSeriesAllPrevalence = [{ name: "Prevalence/percentage of adolescent pregnancies", data: [] }];
      state.graphSeriesPrenatalCare = [];
      state.attendedskilled = [];
      state.facilitybased = [];
      state.postpartum = [];
      return;
    }

    const total_pregnant_women = new Array(quarterIds.length).fill(0);
    const total_pregnant_adolescent = new Array(quarterIds.length).fill(0);


    //3.1  - 3.2.2 are prenatal care indicators; we need to keep them separate from total pregnant
    const total_pregnantw8antenatal = new Array(quarterIds.length).fill(0);
    const total_pregnantAdolescentw8antenatal = new Array(quarterIds.length).fill(0);
    const total_pregnantAdolescentw8antenatalLess15 = new Array(quarterIds.length).fill(0);
    const total_pregnantAdolescentw8antenatalmore15 = new Array(quarterIds.length).fill(0);
    
    const prevalence = new Array(quarterIds.length).fill(0);
    const less15 = new Array(quarterIds.length).fill(0);
    const from15to19 = new Array(quarterIds.length).fill(0);

    const total_atended = new Array(quarterIds.length).fill(0);
    const total_atendedless15 = new Array(quarterIds.length).fill(0);
    const total_atended15to19 = new Array(quarterIds.length).fill(0);
    const total_atendedmore19 = new Array(quarterIds.length).fill(0);

    const total_facility = new Array(quarterIds.length).fill(0);
    const total_facilityless15 = new Array(quarterIds.length).fill(0);
    const total_facility5to19 = new Array(quarterIds.length).fill(0);
    const total_facilitymore19 = new Array(quarterIds.length).fill(0);

    const allpregnantPostpartum = new Array(quarterIds.length).fill(0);
    const alladolescentPostpartum = new Array(quarterIds.length).fill(0);
    const alladolescentPostpartumless15 = new Array(quarterIds.length).fill(0);
    const alladolescentPostpartummore15 = new Array(quarterIds.length).fill(0);

   for (const row of data) {
  if (!row) continue;

  const reportYearId = Number(row.report_year_id);
  const idx = quarterIds.indexOf(reportYearId);
  if (idx === -1) continue;

  const value = row.total != null ? Number(row.total) : 0;
  if (Number.isNaN(value)) continue;

  switch (row.indicator_no) {
    case "1.1":
      total_pregnant_women[idx] += value;
      break;

    case "2.1":
      total_pregnant_adolescent[idx] += value;
      break;

    case "2.11":
      less15[idx] += value;
      break;

    case "2.12":
      from15to19[idx] += value;
      break;

    case "2.2":
      prevalence[idx] += value;
      break;

    case "3.1":
      total_pregnantw8antenatal[idx] += value;
      break;

    case "3.2":
      total_pregnantAdolescentw8antenatal[idx] += value;
      break;

    case "3.2.1":
      total_pregnantAdolescentw8antenatalLess15[idx] += value;
      break;
     case "3.2.2":
      total_pregnantAdolescentw8antenatalmore15[idx] += value;
      break;


    
    case "4.1":
      total_atended[idx] += value;
      break;

    case "4.1.1":
      total_atendedless15[idx] += value;
      break;

    case "4.1.2":
      total_atended15to19[idx] += value;
      break;

    case "4.1.3":
      total_atendedmore19[idx] += value;
      break;

    case "5.1":
      total_facility[idx] += value;
      break;

    case "5.1.1":
      total_facilityless15[idx] += value;
      break;

    case "5.1.2":
      total_facility5to19[idx] += value;
      break;

    case "5.1.3":
      total_facilitymore19[idx] += value;
      break;

    case "6.1":
      allpregnantPostpartum[idx] += value;
      break;

    case "6.2":
      alladolescentPostpartum[idx] += value;
      break;

      case "6.2.1":
      alladolescentPostpartumless15[idx] += value;
      break;

      case "6.2.2":
      alladolescentPostpartummore15[idx] += value;
      break;

    default:
      // ignore unknown indicator_no
      break;
  }
}

    state.graphSeriesAll = [
      { name: "1.1 - Total Pregnant Women", data: total_pregnant_women },
      { name: "2.1 - Total Pregnant Adolescents", data: total_pregnant_adolescent },
      { name: "2.1.1 - Less than 15 yrs old", data: less15 },
      { name: "2.1.2 - 15 - 19 yrs old", data: from15to19 },
    ];

     state.graphSeriesAllPrevalence = [
      { name: "2.2 - Prevalence/percentage of adolescent pregnancies", data: prevalence },
    ];

    state.graphSeriesPrenatalCare = [
      { name: "3.1 - ALL pregnant women with at least 8 antenatal check-ups ", data: total_pregnantw8antenatal },
      { name: "3.2 - ALL pregnant adolescents with at least 8 antenatal check-ups", data: total_pregnantAdolescentw8antenatal },
      { name: "3.2.1 - Total number of <15 years old pregnant adolescents", data: total_pregnantAdolescentw8antenatalLess15 },
      { name: "3.2.2 - Total number of 15-19 years old pregnant adolescents", data: total_pregnantAdolescentw8antenatalmore15 },
    ];

    state.attendedskilled = [
      { name: "4.1 - Total Attended deliveries", data: total_atended },
      { name: "4.1.1 - Total Attended <15 years old deliveries", data: total_atendedless15 },
      { name: "4.1.2 - Total Attended 15 -19 yrs. old deliveries", data: total_atended15to19 },
      { name: "4.1.3 - Total Attended >19 years old deliveries", data: total_atendedmore19 },
    ];

    state.facilitybased = [
      
      { name: "5.1 - Total Facility Based deliveries", data: total_facility },
      { name: "5.1.1 - Total Facility Based <15 years old deliveries", data: total_facilityless15 },
      { name: "5.1.2 - Total Facility Based 15 -19 yrs. old deliveries", data: total_facility5to19 },
      { name: "5.1.3 - Total Facility Based >19 years old deliveries", data: total_facilitymore19 },
    ];

    // BUG FIX: your postpartum series was using facility arrays (wrong)
    state.postpartum = [
      { name: "6.1 - Total Pregnant completed at least 4 postpartum check ups", data: allpregnantPostpartum },
      { name: "6.2 - Adolescent Pregnant completed at least 4 postpartum check ups", data: alladolescentPostpartum },
      { name: "6.2.1 - Adolescent Pregnant <15 years old completed at least 4 postpartum check ups", data: alladolescentPostpartumless15 },
      { name: "6.2.2 - Adolescent Pregnant 15-19 years old completed at least 4 postpartum check ups", data: alladolescentPostpartummore15 },
    ];

   
  } catch (error) {
    console.error("fetchReports_Details_Bars error:", error);
  }
}

async function fetchReports_Details_Pie() {
  try {
    const data = normalizePassedData();
    // compute pie here if needed
  } catch (error) {
    console.error(error);
  }
}
</script>
