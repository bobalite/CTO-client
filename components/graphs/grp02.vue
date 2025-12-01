<template>
    <div :class=props.class >
        <div >
        <h3 class="text-lg font-bold border-1 border-solid border-blue-900  rounded-xl "> {{props.displaytext}}</h3>
        <apexchart height="200" width="120%" :options="state.OptionsPieDatasource"
          :series="state.graphSeries" />
           
        </div>

       
    </div>

   

    
</template>

<script setup>

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
           width: 380,
           type: 'pie',
       },
       colors: [
           '#701a75',
           '#db2777',
           '#9d174d'
        ],
       dataLabels: {
           enabled: true
       },
       plotOptions: {
         pie: {
           dataLabels: {
             offset: -5,
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
           '10-14 years old PW',
           '15-17 years old PW',
           '18 years old and above PW'
       ],
   }
})


async function fetchReports_Details_Actuals() { // main fetching function for actuals
    try {
      
        await props.passed_data.data
        state.report_details.data = props.passed_data.data  
        state.graphSeries = [0, 0, 0]

        for (const c in state.report_details.data) {
            if (state.report_details.data[c].sequence_header == '1.1.2.1' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeries[0] = parseFloat(state.graphSeries[0]) + parseFloat(state.report_details.data[c].total)
            } else if (state.report_details.data[c].sequence_header == '1.1.2.2' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeries[1] = parseFloat(state.graphSeries[1]) + parseFloat(state.report_details.data[c].total)
            } else if (state.report_details.data[c].sequence_header == '1.1.2.3' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeries[2] = parseFloat(state.graphSeries[2]) + parseFloat(state.report_details.data[c].total)
            } else if (state.report_details.data[c].sequence_header == '1.1.3' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.prevalence = parseFloat(state.prevalence) + parseFloat(state.report_details.data[c].total)
            }
        }
    } catch (error) {
        //console.log(error)
        state.graphSeries = [0,0,0]
    }
}

</script>