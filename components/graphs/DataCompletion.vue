<template>
   
        <ApexCharts height="90%" width="90%" :options="state.OptionsPieDatasource"
          :series="state.graphSeries" />
           <h3 class="text-sm z-1 font-bold border-1 border-solid border-blue-900  rounded-xl ">{{props.displaytext}}:  {{props.report_year}}</h3>
   
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts';
//import { report_yearService } from '../api/ReportYears';
//import {reportDetailsService } from '~/components/api/ReportDetailsService';
import {reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService'; 

const props = defineProps({
    class: {
        type: String,
        required: true,
        default: 'border-solid',
    },
    displaytext:{
        type: String,
        required: false,
    },group_id:{
        type: String,
        required: false,
    },report_year:{
        type: Number,
        required: false,
    },passed_data: {
        type: Object,
        required: true,
    }
  
})

//sm:col-span-4

onMounted(() => {
   
    //fillgraphseries()
    fetchReports_Details_Actuals()
})

const state = reactive({

graphSeries: []   ,
report_details: [],
prevalence: 0,

OptionsPieDatasource: {
       chart: {
           height: 80,
           width: 80,
           type: 'radialBar',
    },
    colors: [
        '#f87171', // light red
        '#fbbf24', // light amber
        '#60a5fa', // light blue
        '#c084fc', // light purple
        '#818cf8', // light indigo
        '#22d3ee', // light cyan
    ],
    dataLabels: {
        enabled: true
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '40%',
            },
         },
       },
       grid: {
         padding: {
           top: 0,
           bottom: 0,
           left: 0,
           right: 0,
         },
       },
       dataLabels: {
         formatter(val, opts) {
           const name = opts.w.globals.labels[opts.seriesIndex]
           return [name, val.toFixed(1) + '%']
         },
       },
       legend: {
         show: false,
       },
       labels: [ // need to retrive labels from database based on group id
           '1st Quarter',
           '2nd Quarter',
           '3rd Quarter',
            '4th Quarter',
            'Annual Data', 
            'Open Dated'
          
      ],
   }
})


async function fetchReports_Details_Actuals() { // main fetching function for actuals
    try {
      
        await props.passed_data.data
        state.report_details.data = props.passed_data.data  
        state.graphSeries = [20, 30, 40, 10, 45, 80] // need to retrive actual data from database based on group id

      
    } catch (error) {
        //console.log(error)
        state.graphSeries = [0,0,0,0,0,0]
    }
}

</script>