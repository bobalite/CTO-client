<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
   EARLY CHILDHOOD CARE AND DEVELOPMENT
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <!-- Chart 1 -->
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

     
  early_childhood: [],
 

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
    // 1) Coerce to numbers, make them unique, and sort them
    const yearIds = Array.from(
      new Set(
        (Array.isArray(rawYearIds)
          ? rawYearIds
          : Object.values(rawYearIds)
        ).map(Number)
      )
    ).sort((a, b) => a - b);

    if (!yearIds.length) {
      console.warn('fetchReports_Details_Bars_Annual: yearIds is empty, nothing to aggregate');

      state.early_childhood = [];
     
      return;
    }


     // 2) Build a fast lookup: year -> index
    const yearIndexMap = new Map();
    yearIds.forEach((year, index) => {
      yearIndexMap.set(year, index);
    });
    // Optionally store categories for the chart
    // (make sure xaxis.categories uses this)
    state.annualYearCategories = yearIds;
   
   
    // Initialize arrays
    const ecd_22_1 = new Array(yearIds.length).fill(0);
    const ecd_22_2 = new Array(yearIds.length).fill(0);
    const ecd_22_2_1 = new Array(yearIds.length).fill(0);
    const ecd_22_2_2 = new Array(yearIds.length).fill(0);
    const ecd_22_3 = new Array(yearIds.length).fill(0);
    const ecd_22_4 = new Array(yearIds.length).fill(0);
    const ecd_22_5 = new Array(yearIds.length).fill(0);
    const ecd_22_6 = new Array(yearIds.length).fill(0);
    const ecd_22_7 = new Array(yearIds.length).fill(0); 


    
   
    // SINGLE PASS over data
   for (const row of data) {
      if (!row) continue;

     //------------------------------------------------------------------------------------------------------
      // Adjust depending on your payload: year / report_year
      const rowYear = Number(row.year ?? row.report_year);
      if (!rowYear || Number.isNaN(rowYear)) continue;

      const idx = yearIndexMap.get(rowYear);
      if (idx === undefined) continue; // not one of the tracked years

      //------------------------------------------------------------------------------------------------------


      const value = row.total != null ? Number(row.total) : 0;
      if (Number.isNaN(value)) continue;

      if (row.indicator_no === '22.1') {
        ecd_22_1[idx] += value;
      }else if (row.indicator_no === '22.2') {
        ecd_22_2[idx] += value;
      }else if (row.indicator_no === '22.2.1') {
        ecd_22_2_1[idx] += value;
      }else if (row.indicator_no === '22.2.2') {
        ecd_22_2_2[idx] += value;
      }else if (row.indicator_no === '22.3') {
        ecd_22_3[idx] += value;
      }else if (row.indicator_no === '22.4') {
        ecd_22_4[idx] += value;
      }else if (row.indicator_no === '22.5') {
        ecd_22_5[idx] += value;
      }else if (row.indicator_no === '22.6') {
        ecd_22_6[idx] += value;
      }else if (row.indicator_no === '22.7') {
        ecd_22_7[idx] += value;
      }

      state.early_childhood = [
      { name: '22.1 Total number of ECCD (Day Care) enrollees', data: ecd_22_1 },
      { name: '22.2 Total number of Child Development Centers/Facilities (CDCs)', data: ecd_22_2 },
      { name: '22.2.1 Total number of Public CDCs', data: ecd_22_2_1 },
      { name: '22.2.2 Total number of Private CDCs', data: ecd_22_2_2 },
      { name: '22.3 Total number of ECCD-recognized centers', data: ecd_22_3 },
      { name: '22.4 Total number of DSWD accredited centers', data: ecd_22_4 },
      { name: '22.5 Total number of Centers that have undergone internal assessment (under ECCD Guidelines)', data: ecd_22_5 },
      { name: '22.6 Total number of Day Care Workers (DCWs)', data: ecd_22_6 },
      { name: '22.7 Total number of barangays with CDCs', data: ecd_22_7 },
        
        ];
    }

  } catch (error) {
    console.error('fetchReports_Details_Bars error:', error);

  
  }
}





</script>


