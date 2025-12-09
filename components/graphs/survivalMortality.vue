<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
     MORTALITY
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Chart 1 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">
         MATERNAL MORTALITY
      </h3>

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


    <!-- Chart 2 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">
        CHILD MORTALITY
      </h3>

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

function recalc() {
  buildQuarterArrays();
  fetchReports_Details_Bars();
}

onMounted(() => {
  recalc();
});

watch(
  () => [props.report_year, props.report_years, props.passed_data],
  () => {
    recalc();
  },
  { deep: true }
);



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
      " 1 ",
      " 2 ",
      " 3 ",
    ],
  },
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
    const total_maternal_deaths = new Array(quarterIds.length).fill(0);
    const ratio_maternal_deaths = new Array(quarterIds.length).fill(0);

    const total_neonatal_deaths = new Array(quarterIds.length).fill(0);
    const rate_neonatal_deaths = new Array(quarterIds.length).fill(0);
    const infant_deaths_0to11 = new Array(quarterIds.length).fill(0);
    const rate_infant_deaths = new Array(quarterIds.length).fill(0);
    const total_u5_deaths = new Array(quarterIds.length).fill(0);
    const rate_u5_deaths = new Array(quarterIds.length).fill(0);
  
   
    // SINGLE PASS over data
    for (const row of data) {
      if (!row) continue;

      const reportYearId = Number(row.report_year_id);
      const idx = quarterIds.indexOf(reportYearId);
      if (idx === -1) continue; // not one of the tracked quarters

      const value = row.total != null ? Number(row.total) : 0;
      if (Number.isNaN(value)) continue;

      if (row.indicator_no === '10.1') {
        total_maternal_deaths[idx] += value;
      }else if (row.indicator_no === '10.2') {
        ratio_maternal_deaths[idx] += value;
      }
      
      else if (row.indicator_no === '11.1') {
        total_neonatal_deaths[idx] += value;
      }else if (row.indicator_no === '11.2') {
        rate_neonatal_deaths[idx] += value;
      }else if (row.indicator_no === '11.3') {
        infant_deaths_0to11[idx] += value;
      }else if (row.indicator_no === '11.4') {
        rate_infant_deaths[idx] += value;
      }else if (row.indicator_no === '11.5') {
        total_u5_deaths[idx] += value;
      }else if (row.indicator_no === '11.6') {
        rate_u5_deaths[idx] += value;
      } 
    
    }

     

    state.maternal_mortality = [
      { name: '10.1 Total number of maternal deaths', data: total_maternal_deaths },
      { name: '10.2 Ratio of maternal deaths (MMR)', data: ratio_maternal_deaths }
      
    ];

     state.child_mortality = [
      { name: '11.1 - Neonatal deaths (0-28 days)', data: total_neonatal_deaths },
      { name: '11.2 - Rate of neonatal mortality ', data: rate_neonatal_deaths },
      { name: '11.3 - Infant deaths (0-11 months)', data: infant_deaths_0to11 },
      { name: '11.4 - Infant mortality rate', data: rate_infant_deaths },
      { name: '11.5 - Under-5 deaths', data: total_u5_deaths },
      { name: '11.6 - Under-5 mortality rate', data: rate_u5_deaths }   
     
      
    
    ];

 
  } catch (error) {
    console.error('fetchReports_Details_Bars error:', error);

   
  }
}

</script>


