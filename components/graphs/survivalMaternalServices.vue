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
          height="90%"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.graphSeriesAll"
        />
      </ClientOnly>
    </div>

    <!-- Chart 2 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">
        All Maternal Deliveries
      </h3>

      <ClientOnly>
        <apexchart
          type="pie"
          height="200"
          width="100%"
          :options="state.OptionsPieDatasource"
          :series="state.graphSeriesPie"
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
          type="pie"
          height="200"
          width="100%"
          :options="state.OptionsPieDatasource"
          :series="state.graphSeriesPie"
        />
      </ClientOnly>
    </div>

    <!-- Chart 4 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">
        Facility Deliveries
      </h3>

      <ClientOnly>
        <apexchart
          type="pie"
          height="200"
          width="100%"
          :options="state.OptionsPieDatasource"
          :series="state.graphSeriesPie"
        />
      </ClientOnly>
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">
        Postpartum care
      </h3>

      <ClientOnly>
        <apexchart
          type="pie"
          height="200"
          width="100%"
          :options="state.OptionsPieDatasource"
          :series="state.graphSeriesPie"
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
  fetchReports_Details_Bars();
  fetchReports_Details_Pie();
  buildQuarterArrays();
});



function buildQuarterArrays() {
  const raw = props.report_years ?? [];

  // 1) Normalize: prefer raw.data if it exists, otherwise use raw as array
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

  // 2) Filter only quarters for the selected year
  const filtered = allYears.filter((q) => Number(q.year) === targetYear);

  console.log('Filtered quarters:', filtered);

  // 3) Save IDs
  state.quarterIds = filtered.map((q) => q.id);

  // 4) Save names as "Q1 2025", "Q2 2025", etc.
  state.quarterNames = filtered.map((q, index) => {
    const qNum = index + 1; // 0→Q1, 1→Q2, ...
    return `Q${qNum} ${q.year}`;
  });

  console.log('quarterNames:', state.quarterNames);
  console.log('quarterIds:', state.quarterIds);
}



async function fetchReports_Details_Bars() {


  try {
    const data = props.passed_data?.data ?? [];
    const years_data = props.report_years ?? [];



    let less15 = [0, 0, 0, 0];
    let from15to19 = [0, 0, 0, 0];

    // TODO: replace fake values with real aggregation logic

    for (const item of data) {
      console.log('Data item:', item);

      if (item.indicator_no === "2.11") {
        less15[0] += item.total ?? 0;
      
      }else if (item.indicator_no === "2.12") {
        from15to19[0] += item.total ?? 0;
      }
    }

    console.log('Aggregated less15:', less15);
    console.log('Aggregated from15to19:', from15to19);  
  

    state.graphSeriesAll = [
      { name: "Less than 15 yrs old", data: less15 },
      { name: "15 - 19 yrs old", data: from15to19 },
    ];
  } catch (error) {
    console.error(error);
    state.graphSeriesAll = [
      { name: "Less than 15 yrs old", data: [0, 0, 0, 0] },
      { name: "15 - 19 yrs old", data: [0, 0, 0, 0] },
    ];
  }
}


// async function fetchReports_Details_Bars() {


//   for (const item of props.report_years) {
//     console.log('Data item report_years:', item);
//   }





//   try {
//     const data = props.passed_data?.data ?? [];
//     const yearsRaw = props.report_years ?? [];

//     // Normalize report_years into a plain array
//     const yearsArray = Array.isArray(yearsRaw)
//       ? yearsRaw
//       : Array.isArray(yearsRaw.data)
//         ? yearsRaw.data
//         : [];

//     console.log('fetchReports_Details_Bars data:', data);
//     console.log('fetchReports_years_data (normalized):', yearsArray);

//     // Make 1 slot per quarter (max 4)
//     const quartersCount = Math.min(4, yearsArray.length || 4);
//     const less15 = Array(quartersCount).fill(0);
//     const from15to19 = Array(quartersCount).fill(0);

//     // Loop over each quarter definition
//     yearsArray.slice(0, quartersCount).forEach((quarter, index) => {
//       const quarterId = quarter?.id;

//       console.log(`Processing quarter index=${index}, id=${quarterId}, name=${quarter?.name}`);

//       // Loop all items and aggregate into the correct quarter index
//       for (const item of data) {
//         if (!item) continue;

//         // If your items have a report_year_id, uncomment this to strictly match quarter:
//         // if (quarterId != null && item.report_year_id != null && item.report_year_id !== quarterId) {
//         //   continue;
//         // }

//         const total = Number(item.total ?? 0) || 0;

//         if (item.indicator_no === "2.11") {
//           less15[index] += total;
//         } else if (item.indicator_no === "2.12") {
//           from15to19[index] += total;
//         }
//       }
//     });

//     console.log('Aggregated less15:', less15);          // [Q1, Q2, Q3, Q4]
//     console.log('Aggregated from15to19:', from15to19);  // [Q1, Q2, Q3, Q4]

//     state.graphSeriesAll = [
//       { name: "Less than 15 yrs old", data: less15 },
//       { name: "15 - 19 yrs old", data: from15to19 },
//     ];
//   } catch (error) {
//     console.error(error);

//     state.graphSeriesAll = [
//       { name: "Less than 15 yrs old", data: [0, 0, 0, 0] },
//       { name: "15 - 19 yrs old", data: [0, 0, 0, 0] },
//     ];
//   }
// }




async function fetchReports_Details_Pie() {
  try {
    const data = props.passed_data?.data ?? [];

    console.log('fetchReports_Details_Pie data:', data);

    // TODO: replace with real logic
    state.graphSeriesPie = [3000, 2000, 3000];
  } catch (error) {
    console.error(error);
    state.graphSeriesPie = [0, 0, 0];
  }
}
</script>
