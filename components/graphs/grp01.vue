<template>
    <div :class=props.class >
        <div >
        <h3 class="text-lg font-bold border-1 border-solid border-blue-900  rounded-xl ">{{props.displaytext}}</h3>
        <ApexCharts height="200" width="120%" :options="state.OptionsPieDatasource"
          :series="state.graphSeries" />
           
        </div>
    </div>

    <GridCard
        class="sm:col-span-3 text-xl font-bold  text-left m-1 pl-2 border-1 border-solid border-blue-black bg-green-100 rounded-xl border-blue-900 border-t border-b border-l border-r ">
        <h1 class="text-1xl font-bold"> Prevalence/percentage of Adolescent Pregnancies</h1>
        <h1 class="text-1xl font-bold"></h1>
        <h1 class="text-4xl text-center font-bold"></h1>
        <h1 class="text-7xl text-center font-bold">{{state.prevalence}} %</h1>
        <h1 class="text-md text-center font-bold border-solid decoration-red-50 border-blue-black border-t"></h1>
    </GridCard>

    
</template>

<script setup>
import { numeric } from '@vuelidate/validators';
import ApexCharts from 'vue3-apexcharts';
//import { report_yearService } from '../api/ReportYears';
import {reportDetailsService } from '~/components/api/ReportDetailsService'; 

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
           '10-14 years old pregnant',
           '15-17 years old pregnant',
           '18-19 years old pregnant '
       ],
   }
})


function fillgraphseries(){

    //state.graphSeries = [20,40,50]

}





async function fetchReports_Details_Actuals() { // main fetching function for actuals
    try {
        let params = {
            group_id: 1,
            report_year_id: props.report_year, // need to be passed from the dashboard main page
            is_active: 1,
            entry_type: 'Actual',//state.selected_view_entry_type,
            group_agency_datasource_id: 0 // set to 0 for non specific of the datasource
        }

        console.log('params', params)
       
        const response = await reportDetailsService.getReportDetails(params)
      
        //
        if (response.data) {


             state.report_details.data = response.data          
            
             if (response.data.length > 0) {
                state.graphSeries = [0,0,0]
                for (const c in state.report_details.data) {
                    if (state.report_details.data[c].sequence_header == '1.1.1.1.1') {
                        state.graphSeries[0] = parseFloat(state.graphSeries[0]) + parseFloat( state.report_details.data[c].total)
                    } else if (state.report_details.data[c].sequence_header == '1.1.1.1.2') {
                        state.graphSeries[1] = parseFloat(state.graphSeries[1]) +  parseFloat( state.report_details.data[c].total)
                    } else if (state.report_details.data[c].sequence_header == '1.1.1.1.3') {
                        state.graphSeries[2] = parseFloat(state.graphSeries[2]) +  parseFloat( state.report_details.data[c].total)
                    } else if (state.report_details.data[c].sequence_header == '1.1.1.2'){
                        state.prevalence = parseFloat(state.prevalence) +  parseFloat( state.report_details.data[c].total)
                    }
                }
                //state.graphSeries = [10,10,10]
               
            } else {
                //alert('No data found for ACTUAL Entries. ')  
            }
            

        }
    } catch (error) {
        console.log(error)
        state.graphSeries = [0,0,0]
    }
}

</script>