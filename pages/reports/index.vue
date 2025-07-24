<template>
  <div>
    <div class="sm:flex-auto">
      <!-- <p>Select Report Year</p>
      <div>
        <FormSelect name="selected_year" v-model="state.selected_year_id" :options="state.options.report_years"
          @click="changeYear()" />
      </div> -->
    </div>


    <div ref="printSection" class="p-6 bg-white">
      <ApexCharts ref="chart" width="100%" height="350" type="bar" :options="chartOptions" :series="series" />
    </div>

    <button @click="printChart" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
      Print Chart
    </button>
  </div>
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts';
import { ref, nextTick } from 'vue'

const chartOptions = {
  chart: {
    id: 'vuechart-example'
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995]
  }
}

const series = [{
  name: 'Sales',
  data: [30, 40, 35, 50, 49]
}]

const printChart = async () => {
  await nextTick()
  setTimeout(() => {
    window.print()
  }, 500) // delay for chart render completion
}


const state = reactive({
  selected_year_id: 0,
  selected_year: 0,
  refresh_graphs_toggle: 0,
  selected_quarter: '',
  options: {
    report_years: [
      { year: 2020, label: '2020' },
      { year: 2021, label: '2021' },
      { year: 2022, label: '2022' },
      { year: 2023, label: '2023' }
    ]
  },
  showGraphsGrp01: true,
  passed_data: {},
  report_years: {}
})



//-----------------------------------------------// Props and reactive state----------------------------

function changeYear() {
   
    try {
        state.selected_year = state.options.report_years[state.selected_year_id - 1].year
        state.selected_quarter = state.options.report_years[state.selected_year_id - 1].label
    } catch (error) {
        state.selected_year = 0
    }

}


//------------------------------------------------------------------------------------------------------

definePageMeta({
    layout: 'main'
})

</script>