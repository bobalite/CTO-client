<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
    CHILD CARE AND SERVICES
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Chart 1 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">
        BIRTH WEIGHT
      </h3>

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
      <h3 class="text-lg font-bold mb-2">
        INFANT BREASTFEEDING
      </h3>

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
      <h3 class="text-lg font-bold mb-2">
        CHILD IMMUNIZATION
      </h3>

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
import { reactive, onMounted } from "vue";

const props = defineProps({
  class: {
    type: String,
    required: false,
    default: "border-solid",
  },
  displaytext: {
    type: String,
    required: false,
  },
  group_id: {
    type: String,
    required: false,
  },
  report_year: {
    type: Number,
    required: false,
  },
  passed_data: {
    type: Object,
    required: true,
  },
  report_years: {
    type: Object,
    required: true,
  },
});

const state = reactive({
  // ✅ VALID INITIAL SERIES (bar)
  graphSeriesAll: [
    {
      name: "Less than 15 yrs old",
      data: [0, 0, 0, 0],
    },
    {
      name: "15 - 19 yrs old",
      data: [0, 0, 0, 0],
    },
  ],

  quarterNames: [],
  quarterIds: [],
  birth_weight: [],
 

  // ✅ VALID INITIAL SERIES (pie)
  graphSeriesPie: [0, 0, 0],

  report_details: [],

  populationHoriOptions: {
    chart: {
      type: "bar",
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    colors: ["#00796B", "#388E3C", "#AFB42B", "#F9A825"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: ["1Q", "2Q", "3Q", "4Q"],
    },
  },

  OptionsPieDatasource: {
    chart: {
      type: "pie",
    },
    colors: ["#fbbf24", "#facc15", "#a3e635", "#4ade80"],
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#333"],
        fontSize: "12px",
        fontWeight: "bold",
      },
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    legend: {
      show: false,
    },
    labels: [
      "Above 19 yrs old",
      "less than 15 yrs old",
      "15 - 19 yrs old",
    ],
  },
});

onMounted(() => {

  buildQuarterArrays();

  fetchReports_Details_Bars();
 
});



function buildQuarterArrays() {
  const raw = props.report_years ?? [];

  // Normalize report_years into a plain array
  let allYears = [];

  if (Array.isArray(raw.data)) {
    allYears = raw.data;
  } else if (Array.isArray(raw)) {
    allYears = raw;
  }

  const targetYear = Number(props.report_year);
  console.log('Building quarter arrays for props.report_year:', props.report_year);
  console.log('Normalized report_years (allYears):', allYears);
  console.log('Target year (number):', targetYear);

  // Filter only quarters for the selected year
  const filtered = allYears.filter((q) => Number(q.year) === targetYear);

  console.log('Filtered quarters:', filtered);

  // IDs and names
  const quarterIds = filtered.map((q) => Number(q.id));
  const quarterNames = filtered.map((q, index) => `Q${index + 1} ${q.year}`);

  state.quarterIds = quarterIds;
  state.quarterNames = quarterNames;

  console.log('quarterIds:', state.quarterIds);
  console.log('quarterNames:', state.quarterNames);

  // Optional: sync x-axis categories with quarter names
  if (quarterNames.length) {
    state.populationHoriOptions.xaxis = {
      ...state.populationHoriOptions.xaxis,
      categories: quarterNames,
    };
  }
}





async function fetchReports_Details_Bars() {
  try {
    // Normalize data from props
    const rawData = props.passed_data?.data ?? [];
    const data = Array.isArray(rawData) ? rawData : [...rawData];

    // Normalize quarter IDs from state
    const rawQuarterIds = state.quarterIds ?? [];
    const quarterIds = Array.isArray(rawQuarterIds)
      ? rawQuarterIds.map(Number)
      : [...rawQuarterIds].map(Number);

    if (!quarterIds.length) {
      console.warn('fetchReports_Details_Bars: quarterIds is empty, nothing to aggregate');
      state.graphSeriesAll = [
        { name: 'Less than 15 yrs old', data: [] },
        { name: '15 - 19 yrs old', data: [] },
      ];

   
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

   
    // SINGLE PASS over data
    for (const row of data) {
      if (!row) continue;

      const reportYearId = Number(row.report_year_id);
      const idx = quarterIds.indexOf(reportYearId);
      if (idx === -1) continue; // not one of the tracked quarters

      const value = row.total != null ? Number(row.total) : 0;
      if (Number.isNaN(value)) continue;

      if (row.indicator_no === '7.1') {
        total_live_births[idx] += value;
      }else if (row.indicator_no === '7.2') {
        total_low_birth_weight[idx] += value;
      }else if (row.indicator_no === '7.3') {
        percentage_low_birth_weight[idx] += value;
      } 
      
      else if (row.indicator_no === '8.1') {
        total_newborns_breastfeeding[idx] += value;
      }else if (row.indicator_no === '8.2') {
        percentage_newborns_breastfeeding[idx] += value;

      }else if (row.indicator_no === '9.1') {
        total_FIC[idx] += value;
      }else if (row.indicator_no === '9.2') {
        total_population_0_12_old[idx] += value;
      }else if (row.indicator_no === '9.3') {
        percentage_FIC[idx] += value;
      
    
    }

    state.less15 = less15;
    state.from15to19 = from15to19;
    state.prevalence = prevalence;

    

    state.birth_weight = [
      { name: '7.1 Total number of live births', data: total_live_births },
      { name: '7.2 Total number of low birth weight', data: total_low_birth_weight },
      { name: '7.3 Prevalence/percentage of low birth weight', data: percentage_low_birth_weight },
    ];

     state.graphSeriesPrenatalCare = [
      { name: '8.1 - Newborns initiated to breastfeeding', data: total_newborns_breastfeeding },
      { name: '8.2 - Percentage newborns initiated to breastfeeding', data: percentage_newborns_breastfeeding },
      
    
    ];

    state.attendedskilled = [
     
      { name: '9.1 - Total number of Fully Immunized Children', data: total_FIC },
      { name: '9.2 - Total eligible population of 0-12 months old', data: total_population_0_12_old },
      { name: '9.3 - Proportion/percentage coverage of (FIC)', data: percentage_FIC },
  
    ];

    

  }

  } catch (error) {
    console.error('fetchReports_Details_Bars error:', error);

    state.graphSeriesAll = [
      { name: 'Less than 15 yrs old', data: [0, 0, 0, 0] },
      { name: '15 - 19 yrs old', data: [0, 0, 0, 0] },
    ];
  }
}





</script>


