<template>
   
    <GridCard
        class="sm:col-span-3 text-xl font-bold  text-left m-1 pl-2 border-1 border-solid border-blue-black bg-green-100 rounded-xl border-blue-900 border-t border-b border-l border-r ">
        <h1 class="text-1xl font-bold"> Proportion/percentage of PW with at least 4 pre-natal check-ups</h1>
        <h1 class="text-1xl font-bold"></h1>
        <h1 class="text-4xl text-center font-bold"></h1>
        <h1 class="text-7xl text-center font-bold">{{state.prevalence}} %</h1>
        <h1 class="text-md text-center font-bold border-solid decoration-red-50 border-blue-black border-t"></h1>
      </GridCard>

    
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts';
//import { report_yearService } from '../api/ReportYears';
import {reportDetailsService } from '~/components/api/ReportDetailsService';
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

report_details: [],
prevalence: 0,


})


async function fetchReports_Details_Actuals() { // main fetching function for actuals
      try {
       
        await props.passed_data.data
        state.report_details.data = props.passed_data.data
        for (const c in state.report_details.data) {

          if (state.report_details.data[c].sequence_header == '1.1.5' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
            state.prevalence = parseFloat(state.prevalence) + parseFloat(state.report_details.data[c].total)
          }
        }

      } catch (error) {
        state.graphSeries = [0, 0, 0]
      }
}

</script>