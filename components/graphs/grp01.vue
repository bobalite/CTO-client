<template>
    <div :class=props.class >
        <div >
        <h3 class="text-lg font-bold border-1 border-solid border-blue-900  rounded-xl ">Group 1. {{props.displaytext}}</h3>
        <ApexCharts height="200" width="120%" :options="state.OptionsPieDatasource"
          :series="state.graphSeries" />
           
        </div>
    </div>

    <GridCard
        class="sm:col-span-4 text-xl font-bold  text-left m-1 pl-2 border-1 border-solid border-blue-black bg-green-100 rounded-xl border-blue-900 border-t border-b border-l border-r ">
        <h1 class="text-1xl font-bold"> Prevalence/percentage of Adolescent Pregnancies</h1>
        <h1 class="text-1xl font-bold"></h1>
        <h1 class="text-4xl text-center font-bold"></h1>
        <h1 class="text-7xl text-center font-bold">{{state.prevalence}} %</h1>
        <h1 class="text-md text-center font-bold border-solid decoration-red-50 border-blue-black border-t"></h1>
        
    </GridCard>

     

    
    
</template>

<script setup>

import ApexCharts from 'vue3-apexcharts';

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
    },year: {
        type: String,
        required: false,
    },passed_year_data: {
         type: Object,
        required: true,
    } 
  
})



onMounted(() => {
   
  
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
           '10-14 years old pregnant',
           '15-17 years old pregnant',
           '18-19 years old pregnant '
       ],
   }
})

async  function fetchReports_Details_Actuals() { // main fetching function for actuals

    try {
     
        //await reportDetailsGroupsService.getReportDetailsGroups()
        await props.passed_data.data
        await props.passed_year_data.data
        state.report_details.data = props.passed_data.data   
            //console.log('state.report_details.data', state.report_details.data) 
        state.graphSeries = [0,0,0]
        //console.log('props.passed_year_data',props.passed_year_data)

        for (const c in state.report_details.data) {
           if (state.report_details.data[c].sequence_header == '1.1.1.1.1' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeries[0] = parseFloat(state.graphSeries[0]) + parseFloat( state.report_details.data[c].total)
            } else if (state.report_details.data[c].sequence_header == '1.1.1.1.2' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeries[1] = parseFloat(state.graphSeries[1]) +  parseFloat( state.report_details.data[c].total)
            } else if (state.report_details.data[c].sequence_header == '1.1.1.1.3' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeries[2] = parseFloat(state.graphSeries[2]) +  parseFloat( state.report_details.data[c].total)
            } else if (state.report_details.data[c].sequence_header == '1.1.1.2' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year){
                state.prevalence = parseFloat(state.prevalence) +  parseFloat( state.report_details.data[c].total)
            }
        }
        
    } catch (error) {
        console.log('error', error)
        state.graphSeries = [0,0,0]
    }
}

</script>