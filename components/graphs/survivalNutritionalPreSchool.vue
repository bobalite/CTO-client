<template>
 <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 mb-0 w-full">
        NUTRITIONAL STATUS OF PRE-SCHOOL CHILDREN
    </h3>
    <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">

        <!-- Chart 1 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-sm font-bold mb-2">
               OPERATION TIMBANG (OPT) PLUS
            </h3>
            <apexchart
                type="line"
                height="200"
                width="100%"
                :options="state.populationHoriOptions"
                :series="state.operation_timbang"
            />
        </div>

        
        <div class="border rounded-xl p-2">
            <h3 class="text-sm font-bold mb-2">
               NUTRITIONAL STATUS OF 0-59 MONTHS OLD CHILDREN
            </h3>
            <apexchart
                type="bar"
                height="400"
                width="100%"
                :options="state.populationHoriOptions"
                :series="state.nut_status_0to59"
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

    //---------------------------------------------------------------------------------------------------
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

    //---------------------------------------------------------------------------------------------------

    if (!yearIds.length) {
      console.warn('fetchReports_Details_Bars_Annual: yearIds is empty, nothing to aggregate');

      state.operation_timbang = [];
      state.nut_status_0to59 = [];
      return;
    }


     //---------------------------------------------------------------------------------------------------
    // 2) Build a fast lookup: year -> index
    const yearIndexMap = new Map();
    yearIds.forEach((year, index) => {
      yearIndexMap.set(year, index);
    });
    // Optionally store categories for the chart
    // (make sure xaxis.categories uses this)
    state.annualYearCategories = yearIds;

     //---------------------------------------------------------------------------------------------------


    // Initialize arrays per YEAR
    const timbang13_1 = new Array(yearIds.length).fill(0);
    const timbang13_2 = new Array(yearIds.length).fill(0);
    const timbang13_3 = new Array(yearIds.length).fill(0);

    const nut_status14_1  = new Array(yearIds.length).fill(0);
    const nut_status14_2  = new Array(yearIds.length).fill(0);
    const nut_status14_3  = new Array(yearIds.length).fill(0);
    const nut_status14_4  = new Array(yearIds.length).fill(0);
    const nut_status14_5  = new Array(yearIds.length).fill(0);
    const nut_status14_6  = new Array(yearIds.length).fill(0);
    const nut_status14_7  = new Array(yearIds.length).fill(0);
    const nut_status14_8  = new Array(yearIds.length).fill(0);
    const nut_status14_9  = new Array(yearIds.length).fill(0);
    const nut_status14_10 = new Array(yearIds.length).fill(0);
    const nut_status14_11 = new Array(yearIds.length).fill(0);
    const nut_status14_12 = new Array(yearIds.length).fill(0);
    const nut_status14_13 = new Array(yearIds.length).fill(0);
    const nut_status14_14 = new Array(yearIds.length).fill(0);
    const nut_status14_15 = new Array(yearIds.length).fill(0);
    const nut_status14_16 = new Array(yearIds.length).fill(0);
    const nut_status14_17 = new Array(yearIds.length).fill(0);

    // SINGLE PASS over data, now grouping by YEAR not quarter
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

      if (row.indicator_no === '13.1') {
        timbang13_1[idx] += value;
      } else if (row.indicator_no === '13.2') {
        timbang13_2[idx] += value;
      } else if (row.indicator_no === '13.3') {
        timbang13_3[idx] += value;
      }

      else if (row.indicator_no === '14.1') {
        nut_status14_1[idx] += value;
      } else if (row.indicator_no === '14.2') {
        nut_status14_2[idx] += value;
      } else if (row.indicator_no === '14.3') {
        nut_status14_3[idx] += value;
      } else if (row.indicator_no === '14.4') {
        nut_status14_4[idx] += value;
      } else if (row.indicator_no === '14.5') {
        nut_status14_5[idx] += value;
      } else if (row.indicator_no === '14.6') {
        nut_status14_6[idx] += value;
      } else if (row.indicator_no === '14.7') {
        nut_status14_7[idx] += value;
      } else if (row.indicator_no === '14.8') {
        nut_status14_8[idx] += value;
      } else if (row.indicator_no === '14.9') {
        nut_status14_9[idx] += value;
      } else if (row.indicator_no === '14.10') {
        nut_status14_10[idx] += value;
      } else if (row.indicator_no === '14.11') {
        nut_status14_11[idx] += value;
      } else if (row.indicator_no === '14.12') {
        nut_status14_12[idx] += value;
      } else if (row.indicator_no === '14.13') {
        nut_status14_13[idx] += value;
      } else if (row.indicator_no === '14.14') {
        nut_status14_14[idx] += value;
      } else if (row.indicator_no === '14.15') {
        nut_status14_15[idx] += value;
      } else if (row.indicator_no === '14.16') {
        nut_status14_16[idx] += value;
      } else if (row.indicator_no === '14.17') {
        nut_status14_17[idx] += value;
      }
    }

    // ✅ Series now indexed by YEAR
    state.operation_timbang = [
      { name: '13.1 Actual number of 0-59 months weighed', data: timbang13_1 },
      { name: '13.2 Total target population of 0-59 months old', data: timbang13_2 },
      { name: '13.3 Operation Timbang Plus Coverage', data: timbang13_3 },
    ];

    state.nut_status_0to59 = [
      { name: '14.1 Total number of stunted (St) 0-59 months old children', data: nut_status14_1 },
      { name: '14.3 Total number of severely stunted (Sst) 0-59 months old children', data: nut_status14_3 },
      { name: '14.5 Total number of tall (T) 0-59 months old children', data: nut_status14_5 },
      { name: '14.7 Total number of underweight (UW) 0-59 months old children', data: nut_status14_7 },
      { name: '14.9 Total number of severely underweight (SUW) 0-59 months old children', data: nut_status14_9 },
      { name: '14.11 Total number of wasted (W) 0-59 months old children', data: nut_status14_11 },
      { name: '14.13 Total number of severely wasted (SW) 0-59 months old children', data: nut_status14_13 },
      { name: '14.15 Total number of overweight (OW) 0-59 months old children', data: nut_status14_15 },
      { name: '14.17 Total number of obese (OB) 0-59 months old children', data: nut_status14_16 },

      { name: '14.2 Prevalence rate of stunted (St) 0-59 months old children', data: nut_status14_2 },
      { name: '14.4 Prevalence rate of severly stunted (SSt) 0-59 months old children', data: nut_status14_4 },
      { name: '14.6 Prevalence rate of tall (T) 0-59 months old children', data: nut_status14_6 },
      { name: '14.8 Prevalence rate of underweight (UW) 0-59 months old children', data: nut_status14_8 },
      { name: '14.10 Prevalence rate of severely underweight (SUW) 0-59 months old children', data: nut_status14_10 },
      { name: '14.12 Prevalence rate of wasted (W) 0-59 months old children', data: nut_status14_12 },
      { name: '14.14 Prevalence rate of severly wasted (SW) 0-59 months old children', data: nut_status14_14 },
      { name: '14.18 Prevalence rate of obese (OB) 0-59 months old children', data: nut_status14_17 },
    ];

    console.log('ANNUAL state.operation_timbang', state.operation_timbang);
    console.log('ANNUAL state.nut_status_0to59', state.nut_status_0to59);

  } catch (error) {
    console.error('fetchReports_Details_Bars_Annual error:', error);
  }
}




</script>
