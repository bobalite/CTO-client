<template>
 <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 mb-0 w-full">
        ACCESS TO HEALTH SERVICES AND FACILITIES
    </h3>
    <div :class="props.class" class="grid grid-cols-3 md:grid-cols-3 gap-4">

        <!-- Chart 1 -->
        <div class="border rounded-xl p-2 col-span-1">
            <h3 class="text-sm font-bold mb-2">
             LOCAL HEALTH CENTERS
            </h3>
            <apexchart
                type="bar"
                height="400"
                width="100%"
                :options="state.populationHoriOptions"
                :series="state.access1"
            />
        </div>

        
        <div class="border rounded-xl p-2 col-span-2">
            <h3 class="text-sm font-bold mb-2">
               WATER & SANITATION SERVICES
            </h3>
            <apexchart
                type="bar"
                height="400"
                width="100%"
                :options="state.populationHoriOptions"
                :series="state.access2"
            />
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
    type: [Number,String],
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

   // ✅ VALID INITIAL SERIES (pie)
  graphSeriesPie: [0, 0, 0],

  operation_timbang: [],
  nut_status_0to59: [],

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
    colors: ['#312e81',
            '#c026d3',
            '#46C2CB',
            '#db2777',
            '#9d174d',
            '#B12C00',
            '#DC2525', 
            '#6D67E4', 
            '#F4B342', 
            '#662549'],
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
    colors: [ '#312e81',
            '#c026d3',
            '#701a75',
            '#db2777',
            '#9d174d',
            '#00FF9C'],
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

onMounted(() => {

  buildAnnualArrays();
  fetchReports_Details_Bars_Annual();
 
});



function buildAnnualArrays() {
  const raw = props.report_years ?? [];

  // Normalize into plain array
  let allYears = [];

  if (Array.isArray(raw.data)) {
    allYears = raw.data;
  } else if (Array.isArray(raw)) {
    allYears = raw;
  } else if (Array.isArray(raw?.data?.data)) {
    allYears = raw.data.data;
  } else {
    allYears = Object.values(raw);
  }

  console.log("Annual: Normalized allYears:", allYears);

  // Extract unique years from the dataset
  const years = [...new Set(allYears.map((y) => Number(y.year)))].sort();

  console.log("Annual: Unique years:", years);

  // Create labels (ex: ['2020', '2021', '2022'])
  const yearNames = years.map((yr) => `${yr}`);

  // Store in state
  state.annualYearIds = years;
  state.annualYearNames = yearNames;

  console.log("Annual Year IDs:", years);
  console.log("Annual Year Names:", yearNames);

  // Update x-axis categories for annual charts
  if (yearNames.length) {
    state.populationHoriOptions.xaxis = {
      ...state.populationHoriOptions.xaxis,
      categories: yearNames,
    };
  }
}






async function fetchReports_Details_Bars_Annual() {
  try {
    // Normalize data from props
    const rawData = props.passed_data?.data ?? props.passed_data ?? [];
    const data = Array.isArray(rawData) ? rawData : Object.values(rawData);

    // Normalize YEAR IDs from state (annual, not quarter)
    const rawYearIds = state.annualYearIds ?? [];
    const yearIds = Array.isArray(rawYearIds)
      ? rawYearIds.map(Number)
      : Object.values(rawYearIds).map(Number);

    if (!yearIds.length) {
      console.warn('fetchReports_Details_Bars_Annual: yearIds is empty, nothing to aggregate');

      state.operation_timbang = [];
      state.nut_status_0to59 = [];
      return;
    }

    // Initialize arrays per YEAR
    const access_18_1 = new Array(yearIds.length).fill(0);
    const access_19_1 = new Array(yearIds.length).fill(0);
    const access_19_2 = new Array(yearIds.length).fill(0); 
    const access_19_3 = new Array(yearIds.length).fill(0);

    const access_19_4 = new Array(yearIds.length).fill(0);
    const access_19_5 = new Array(yearIds.length).fill(0); 
    const access_19_6 = new Array(yearIds.length).fill(0);
    const access_19_7 = new Array(yearIds.length).fill(0);

    const access_20_1 = new Array(yearIds.length).fill(0);
    const access_20_2 = new Array(yearIds.length).fill(0); 
    const access_20_3 = new Array(yearIds.length).fill(0);

    

    // SINGLE PASS over data, now grouping by YEAR not quarter
    for (const row of data) {
      if (!row) continue;

      // 👇 adjust 'year' / 'report_year' depending on your payload
      const rowYear = Number(row.year ?? row.report_year);
      const idx = yearIds.indexOf(rowYear);
      if (idx === -1) continue; // not one of the tracked years

      const value = row.total != null ? Number(row.total) : 0;
      if (Number.isNaN(value)) continue;

      if (row.indicator_no === '18.1') {
        access_18_1[idx] += value;
      } else if (row.indicator_no === '19.1') {
        access_19_1[idx] += value;
      } else if (row.indicator_no === '19.2') {
        access_19_2[idx] += value;
      }else if (row.indicator_no === '19.3') {
        access_19_3[idx] += value;
      }

      else if (row.indicator_no === '19.4') {
        access_19_4[idx] += value;
      } else if (row.indicator_no === '19.5') {
        access_19_5[idx] += value;
      } else if (row.indicator_no === '19.6') {
        access_19_6[idx] += value;
      }  else if (row.indicator_no === '19.7') {
        access_19_7[idx] += value;
      } 

       else if (row.indicator_no === '20.1') {
        access_20_1[idx] += value;
      } else if (row.indicator_no === '20.2') {
        access_20_2[idx] += value;
      }  else if (row.indicator_no === '20.3') {
        access_20_3[idx] += value;
      }  






      
    }

    // ✅ Series now indexed by YEAR
    state.access1 = [
      { name: 'Total number of barangay health centers and health stations', data: access_18_1 },
    
    ];

    state.access2 = [
      { name: 'Total number of households (HH) with access to basic safe water supply (BSWS)', data: access_19_1 },
      { name: 'Total number of households with access to Level 1 BSWS', data: access_19_2 },
      { name: 'Proportion of households with access to Level 1 BSWS ', data: access_19_3 },

      { name: 'Total number of households with access to Level 2 BSWS', data: access_19_4 },
      { name: 'Proportion of households with access to Level 2 BSWS', data: access_19_5 },
      { name: 'Total number of households with access to Level 3 BSWS ', data: access_19_6 },
      { name: 'Proportion of households with access to Level 3 BSWS ', data: access_19_7 },


      { name: 'Total number of households (HH) with access to sanitation facilities', data: access_20_1 },
      { name: 'Total number of households (HH) in the City', data: access_20_2 },
      { name: 'Proportion of households (HH) in the City with access to sanitation facilities', data: access_20_3 },
      
    ];

   

  } catch (error) {
    console.error('fetchReports_Details_Bars_Annual error:', error);
  }
}




</script>
