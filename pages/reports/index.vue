<template>
  <div>
    <div ref="printSection" class="p-6 bg-white">
      <apexchart
        ref="chart"
        width="100%"
        height="350"
        type="line"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>

    <button @click="printChart" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
      Print Chart
    </button>
  </div>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts'
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

definePageMeta({
    layout: 'main'
})

</script>