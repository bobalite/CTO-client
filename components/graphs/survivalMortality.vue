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

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <!-- Chart 1 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">
        Top 10 Leading causes of Infant Mortality (0-11 months)
      </h3>

      <ClientOnly>
        <apexchart
          type="pie"
          height="400"
          width="100%"
          :options="{
            ...state.pieOptionsBase,
            labels: state.infantPieByQuarter?.[qid]?.labels ?? []
          }"
          :series="state.infantPieByQuarter?.[qid]?.series ?? []"
        />
      </ClientOnly>
    </div>

    <!-- Chart 2 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">
        Top 10 leading causes of Under-Five (U5) Mortality
      </h3>

      <ClientOnly>
        <apexchart
          type="pie"
          height="400"
          width="100%"
         :options="{
            ...state.pieOptionsBase,
            labels: state.u5PieByQuarter?.[qid]?.labels ?? []
          }"
          :series="state.u5PieByQuarter?.[qid]?.series ?? []"
        />
      </ClientOnly>
    </div>
  </div>


   <!-- <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">CHILD MORTALITY</h3>

      <ClientOnly>
        TOP 10 Child Mortality Causes     
      </ClientOnly>
    </div> -->

    
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";
import { reportDetailsExcelService } from '~/components/api/ReportDetailsExcelService';

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


  exceldata: [],

   // chart-ready for the two “Top 10” charts
  infantMortalityTop10: [],   // Apex series
  infantMortalityCats: [],    // xaxis categories

  u5MortalityTop10: [],
  u5MortalityCats: [],

  header_name1: 'Value 1',
  header_name2: 'Value 2',
  header_name3: 'Value 3',

  top10_infant_series: [],
  top10_u5_series: [],
  top10_categories: [], // disease names (shared)

  // ...existing options


  populationHoriOptions: {
    chart: { type: "bar", stacked: false, toolbar: { show: false }, zoom: { enabled: false } },
    plotOptions: { bar: { horizontal: false } },
    colors: ["#00796B", "#388E3C", "#AFB42B", "#F9A825"],
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    xaxis: { categories: ["1Q", "2Q", "3Q", "4Q"] },
  },



    // ...existing
  infantPieByQuarter: {}, // {1:{labels,series},2:{...}}
  u5PieByQuarter: {},

  pieOptionsBase: {
    chart: { type: "pie", toolbar: { show: false } },
    legend: { show: true, position: "bottom" },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${Number(val).toFixed(1)}%`,
    },
    tooltip: {
      y: {
        formatter: (val) => `${Number(val).toFixed(1)}%`,
      },
    },
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
  getexceldata();
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

//--------------------------------------excel data fetch function----------------------------

// async function getexceldata() {



//   try {
//     //if (!props.group) return

//     const params = {
//       //indicator_group_id: props.group.group_no ?? null,
//       //report_year_id: Number(props.selected_year_id),
      
//     }

//     //const response = await reportDetailsExcelService.getReportExcelDetails(params)
//     const response = await reportDetailsExcelService.getReportExcelDetails()
//     console.log('response reportDetailsExcelService', response)

//     // Decide shape once
//     const rows = Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : []

//     state.exceldata = rows
//     console.log('state.exceldata', state.exceldata)

//     const first = rows[0] ?? null

//     if (first) {
//       state.header_name1 = first.header_name1 ?? 'Value 1'
//       state.header_name2 = first.header_name2 ?? 'Value 2'
//       state.header_name3 = first.header_name3 ?? 'Value 3'
//     } else {
//       state.header_name1 = 'Value 1'
//       state.header_name2 = 'Value 2'
//       state.header_name3 = 'Value 3'
//     }

//     console.log('header names', state.header_name1, state.header_name2, state.header_name3)
//   } catch (err) {
//     console.error('Error fetching report detail excel:', err)
//   }
// }

async function getexceldata() {
  try {
    const response = await reportDetailsExcelService.getReportExcelDetails()

    const rows = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response)
        ? response
        : []

    state.exceldata = rows

    const quarterIds = (state.quarterIds ?? []).map(Number)
    if (!quarterIds.length) {
      state.infantPieByQuarter = {}
      state.u5PieByQuarter = {}
      return
    }

    const toNum = (v) => {
      const n = Number(v)
      return Number.isFinite(n) ? n : 0
    }

    const buildPieByQuarter = (indicatorNo) => {
      const out = {}

      for (const qid of quarterIds) {
        const list = rows
          .filter(r =>
            r &&
            String(r.indicator_no) === String(indicatorNo) &&
            Number(r.report_year_id) === qid
          )
          .map(r => ({
            rank: toNum(r.header_value1),           // 1..10
            label: String(r.header_value2 ?? ''),  // disease_name
            value: toNum(r.header_value3),         // count
          }))
          .filter(x => x.label)
          .sort((a, b) => a.rank - b.rank)
          .slice(0, 10)

        const total = list.reduce((sum, x) => sum + x.value, 0)
        const labels = list.map(x => x.label)

        // PIE NEEDS numbers; we want percentages
        const series = total > 0
          ? list.map(x => Number(((x.value / total) * 100).toFixed(2)))
          : list.map(() => 0)

        out[qid] = { labels, series }
      }

      return out
    }

    state.infantPieByQuarter = buildPieByQuarter("12.1")
    state.u5PieByQuarter = buildPieByQuarter("12.2")

    // hard debug (remove later)
    console.log("infantPieByQuarter", JSON.parse(JSON.stringify(state.infantPieByQuarter)))
    console.log("u5PieByQuarter", JSON.parse(JSON.stringify(state.u5PieByQuarter)))
  } catch (err) {
    console.error("Error fetching report detail excel:", err)
    state.infantPieByQuarter = {}
    state.u5PieByQuarter = {}
  }
}



</script>
