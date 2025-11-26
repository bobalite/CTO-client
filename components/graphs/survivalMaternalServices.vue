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
        <ApexChart
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
        <ApexChart
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
        <ApexChart
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
        <ApexChart
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
        <ApexChart
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
});

async function fetchReports_Details_Bars() {
  try {
    const data = props.passed_data?.data ?? [];

    // TODO: replace fake values with real aggregation logic
    const less15 = [10, 20, 15, 22];
    const from15to19 = [22, 35, 41, 12];

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

async function fetchReports_Details_Pie() {
  try {
    const data = props.passed_data?.data ?? [];

    // TODO: replace with real logic
    state.graphSeriesPie = [3000, 2000, 3000];
  } catch (error) {
    console.error(error);
    state.graphSeriesPie = [0, 0, 0];
  }
}
</script>
