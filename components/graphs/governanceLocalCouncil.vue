<template>
 <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
        LOCAL COUNCIL FOR THE PROTECTION OF CHILDREN
    </h3>
    <div :class="props.class" class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- Chart 1 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
                LCPC FUNCTIONALITY
            </h3>
            <apexchart 
                type="bar"
                height="200"
                width="100%"
                :options="state.populationHoriOptions"
                :series="state.lcpc"
            />
        </div>

        <!-- Chart 2 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
               LOCAL INSTITUTIONS
            </h3>
            <apexchart 
                type="bar"
                height="200"
                width="100%"
                :options="state.populationHoriOptions"
                :series="state.local"
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
      "default",
      
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

      state.osc = [];
      state.osc_als = [];
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

    // 3) Initialize arrays with correct length
    const lcpc_44_1   = new Array(yearIds.length).fill(0);
    const lcpc_44_2   = new Array(yearIds.length).fill(0);
    const lcpc_44_3   = new Array(yearIds.length).fill(0);
    const lcpc_44_4   = new Array(yearIds.length).fill(0);
    const lcpc_44_5   = new Array(yearIds.length).fill(0);
    const lcpc_44_6   = new Array(yearIds.length).fill(0);
    const local_45_1   = new Array(yearIds.length).fill(0);
    const local_45_2   = new Array(yearIds.length).fill(0);
    
    
    // 4) SINGLE PASS over data
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

      switch (row.indicator_no) {
        case '44.1':
          lcpc_44_1[idx] += value;
          break;
        case '44.2':
          lcpc_44_2[idx] += value;
          break;
        case '44.3':
          lcpc_44_3[idx] += value;
          break;
        case '44.4':
          lcpc_44_4[idx] += value;
          break;
        
        case '44.5':
          lcpc_44_5[idx] += value;
          break;
        case '44.6':
          lcpc_44_6[idx] += value;
          break;
        case '45.1':
          local_45_1[idx] += value;
          break;
        case '45.2':
          local_45_2[idx] += value;
          break;

        default:
          // ignore other indicators
          break;
      }
    }

    // 5) Only set state ONCE, after aggregation
    state.lcpc = [
      {
        name: 'Total Number of BCPC SGLGB passers',
        data: lcpc_44_1,
      },
      {
        name: 'Total LCPC budget allocated for children\'s programs, projects, and activities',
        data: lcpc_44_2,
      },
      {
        name: 'Total LGU National Tax Allotment (NTA) Share',
        data: lcpc_44_3,
      }
      ,
      {
        name: 'Percentage of LCPC budget allocation to LGU NTA Share',
        data: lcpc_44_4,
      }
      ,
      {
        name: 'Total LCPC budget utilized for children\'s programs, projects, and activities',
        data: lcpc_44_5,
      }
      ,
      {
        name: 'Percentage of LCPC budget utilization',
        data: lcpc_44_6,
      }
    ];

    state.local = [
      {
        name: 'Total Number of Functional BVAWC Desks',
        data: local_45_1,
      },
       {
        name: 'List of LGU Accredited NGOs/CSOs providing services to Children',
        data: local_45_2,
      }
    ];
  } catch (error) {
    console.error('fetchReports_Details_Bars_Annual error:', error);
  }
}

</script>
