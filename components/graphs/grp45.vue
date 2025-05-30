<template>
    <div :class=props.class >
        <div >
        <h3 class="text-lg font-bold border-1 border-solid border-blue-900  rounded-xl ">{{props.displaytext}}</h3>
        <ApexCharts height="200" width="120%" :options="state.OptionsPieDatasource"
          :series="state.graphSeries" />
           
        </div>
    </div>

   

    
</template>

<script setup>
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
           '#009900',
           '#999966',
           '#005c99',
           '990099'
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
           '6-11 years old',
           '12-15 years old',
           '16-17 years old',
           '5-17 years old (CFLGA indicator)'
       ],
       style: {
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                colors: ['#009900'],
              },
   }
})


async function fetchReports_Details_Actuals() { // main fetching function for actuals
    try {
        let params = {
            group_id: 45,
            report_year_id: props.report_year, // need to be passed from the dashboard main page
            is_active: 1,
            entry_type: "Actual",//state.selected_view_entry_type,
            group_agency_datasource_id: 0 // set to 0 for non specific of the datasource
        }
   
        const response = await reportDetailsService.getReportDetails(params)
   
        //
        if (response.data) {


             state.report_details.data = response.data          
            
             if (response) {
                state.graphSeries = [0,0,0,0]
                for (const c in state.report_details.data) {

                    if (state.report_details.data[c].sequence_header == '2.11.1' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
   
                        state.graphSeries[0] = parseFloat(state.graphSeries[0]) + parseFloat( state.report_details.data[c].total)

                    } else if (state.report_details.data[c].sequence_header == '2.11.2' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {

   
                        state.graphSeries[1] = parseFloat(state.graphSeries[1]) +  parseFloat( state.report_details.data[c].total)

                    } else if (state.report_details.data[c].sequence_header == '2.11.3' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
   
                        state.graphSeries[2] = parseFloat(state.graphSeries[2]) +  parseFloat( state.report_details.data[c].total)
                    }else if (state.report_details.data[c].sequence_header == '2.11.4' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
   
                        state.graphSeries[3] = parseFloat(state.graphSeries[3]) +  parseFloat( state.report_details.data[c].total)
                    }
                   
                  

                    // for actual
                }

   
                //state.graphSeries = [10,10,10]
   
            } else {
                //alert('No data found for ACTUAL Entries. ')  
            }
            

        }
    } catch (error) {
   
        state.graphSeries = [0,0,0,0]
    }
}

</script>