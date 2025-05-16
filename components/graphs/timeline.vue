<template>
    <div :class=props.class >
        <div >
        <h3 class="text-lg font-bold border-1 border-solid border-blue-900  rounded-xl ">{{props.displaytext}}</h3>
        <ApexCharts height="300" width="98%" :options="state.OptionsPieDatasource"
          :series=state.OptionsPieDatasource />
           
        </div>
    </div>

   

    
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts';
// import { report_yearService } from '../api/ReportYears';
// import {reportDetailsService } from '~/components/api/ReportDetailsService'; 


const props = defineProps({
    class: {
        type: String,
        required: true,
        default: 'border-solid',
    },
    displaytext:{
        type: String,
        required: false,
    },
    graph_series:{
      type: Object,
      required: false
    }
})

//sm:col-span-4

onMounted(() => {
     
    //fetchreportyear()
    // console.log("props.graph_series", props.graph_series) 
})



const colors= ['#c026d3','#c026d3','#701a75','#db2777','#9d174d']


const state = {

graphSeries: [],
report_details: [],
report_years: [],
new_options_series: [],


OptionsPieDatasource: {

    series: [
                {
                    data: [
                    {
                    x: '1st Quarter 2025',
                    y: [0,0],
                    fillColor: '#008FFB'
                    },
                    {
                    x: '2nd Quarter 2025',
                    y: [0,0],
                    fillColor: '#00E396'
                    },
                    {
                    x: '3rd Quarter 2025',
                    y: [0,0],
                    fillColor: '#775DD0'
                    },
                    {
                    x: '4th Quarter 2025',
                    y: [0,0],
                    fillColor: '#FEB019'
                    }
                    ],
                   
                }
            ],
          chart: {
          height: 350,
          type: 'rangeBar'
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
            dataLabels: {
              hideOverflowingLabels: false
            }
          }
        },
        

        dataLabels: {
          enabled: true,
            formatter: function (val, opts) {
                return opts.w.globals.labels[opts.dataPointIndex]
            },
          style: {
            colors: ['#f3f4f5', '#fff']
          }
        },
        xaxis: {
          type: 'datetime'
        }
      
   }
}


// async function fetchReports_Details_Actuals() { // main fetching function for actuals
//     try {
//         let params = {
//             group_id: 2,
//             report_year_id: props.report_year, // need to be passed from the dashboard main page
//             is_active: 1,
//             entry_type: 'Actual',//state.selected_view_entry_type,
//             group_agency_datasource_id: 0 // set to 0 for non specific of the datasource
//         }
   
//         const response = await reportDetailsService.getReportDetails(params)
   
//         //
//         if (response.data) {


//              state.report_details.data = response.data          
            
//              if (response.data.length > 0) {
//                 state.graphSeries = [0,0,0]
//                 for (const c in state.report_details.data) {

//                     if (state.report_details.data[c].sequence_header == '1.1.2.1') {
   
//                         state.graphSeries[0] = parseFloat(state.graphSeries[0]) + parseFloat( state.report_details.data[c].total)

//                     } else if (state.report_details.data[c].sequence_header == '1.1.2.2') {

   
//                         state.graphSeries[1] = parseFloat(state.graphSeries[1]) +  parseFloat( state.report_details.data[c].total)

//                     } else if (state.report_details.data[c].sequence_header == '1.1.2.3') {
   
//                         state.graphSeries[2] = parseFloat(state.graphSeries[2]) +  parseFloat( state.report_details.data[c].total)
//                     } else if (state.report_details.data[c].sequence_header == '1.1.3'){
//                         state.prevalence = parseFloat(state.prevalence) +  parseFloat( state.report_details.data[c].total)

//                     }
                   
                  

//                     // for actual
//                 }

   
//                 //state.graphSeries = [10,10,10]
   
//             } else {
//                 //alert('No data found for ACTUAL Entries. ')  
//             }
            

//         }
//     } catch (error) {
//         console.log(error)
//         state.graphSeries = [0,0,0]
//     }
// }

</script>