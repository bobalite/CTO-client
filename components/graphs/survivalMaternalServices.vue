<template>
 <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
        MATERNAL CARE AND SERVICES
    </h3>
    <div :class="props.class" class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- Chart 1 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
                Maternal Adolescent Deliveries
            </h3>
            <ApexCharts 
                type="bar"
                height="200"
                width="100%"
                :options="state.populationHoriOptions"
                :series="state.graphSeries"
            />
        </div>

        <!-- Chart 2 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
               Pregnant Women with at least 8 Antenatal Check-ups
            </h3>
            <ApexCharts 
                type="pie"
                height="200"
                width="100%"
                :options="state.OptionsPieDatasource"
                :series="state.graphSeries"
            />
        </div>

        <!-- Chart 3 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
                 Deliveries with Skilled Health Professionals
            </h3>
            <ApexCharts 
                 type="pie"
                height="200"
                width="100%"
                :options="state.OptionsPieDatasource"
                :series="state.graphSeries"
            />
        </div>

        <!-- Chart 4 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
                 Postpartum Check ups
            </h3>
            <ApexCharts 
                 type="pie"
                height="200"
                width="100%"
                :options="state.OptionsPieDatasource"
                :series="state.graphSeries"
            />
        </div>

    </div>

  
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts';
import {reportDetailsService } from '~/components/api/ReportDetailsService';
import {reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService';  

const All_deliveries = [10,20,30,40]
const less_15_deliveries = [10,20,30,40]
const deliveries_15_19 = [120,110,100,90]

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
    },report_years: {
        type: Object,
        required: true,
    }
  
})

//sm:col-span-4

onMounted(() => {
   
    //fillgraphseries()
    //fetchReports_Details_pie()
    //fetchReports_Details_Horizontal_graph()
    intit()
})


function intit(){
     state.graphSeriesAll = [0, 0, 0, 0]
     state.graphSeriesless15 = [0, 0, 0, 0]
     state.graphSeries15to19 = [0, 0, 0, 0]
}

const state = reactive({

graphSeries: [],    

graphSeriesAll: [],
graphSeriesless15: [],
graphSeries15to19: [],
total_value: 0,
report_details: [],
prevalence: 0,

graphSeriesAll: [],

populationHoriOptions: {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false
            }
        },
        colors: [
            '#312e81',
            '#c026d3',
            '#701a75',
            '#db2777',
            '#9d174d'],
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'smooth'
        },
        group: {
            style: {
              fontSize: '10px',
              fontWeight: 700
            },
          },    
        series: [
            {
            name: 'ALL maternal deliveries',
            data: All_deliveries
            },
            {
            name: 'Less than 15 years old pregnany deliveries',
            data: less_15_deliveries
            }, 
            {
            name: '15-19 years old pregnany deliveries',
            data: deliveries_15_19
            }
        ],
        xaxis: {
            categories: [
            'First Quarter',
            'Second Quarter',
            'Third Quarter',
            'Fourth Quarter',
            ]
        },
    },
})


// async function fetchReports_Details_Horizontal_graph() { // main fetching function for actuals
//     try {

//         await props.passed_data.data
//         await props.report_year.data 


//         //props.report_years.data.sort((a, b) => b.report_year - a.report_year); // sort descending

//         let years_options = []
//         console.log('props report years: ', props.report_years)

//         console.log('props report year: ', props.report_year)
//         for (const y in props.report_years.data) {

//             if (props.report_years.data[y].report_year == props.report_year) {
//             years_options.push({ value: props.report_years.data[y].id, text: props.report_years.data[y].report_year })
//             }
            
//         }

//         console.log('years options: ', years_options)

//         state.report_details.data = props.passed_data.data
        
//          //let total_value = 0
//          //let prevalence = 0
//          //let del_2_1_1 = 0
//          //let del_2_1_2 = 0


//         state.graphSeriesAll = [0, 0, 0, 0]
//         state.graphSeriesless15 = [0, 0, 0, 0]
//         state.graphSeries15to19 = [0, 0, 0, 0]
        
//         for (const c in state.report_details.data) {

//             //given: the report is quarterly

//             if (state.report_details.data[c].indicator_no == '1.1'  && state.report_details.data[c].report_year == props.report_year) {
//                 state.graphSeriesAll[0] = parseFloat(state.graphSeriesAll[0]) + parseFloat(state.report_details.data[c].total)
                
//             } else if (state.report_details.data[c].sequence_header == '2.1' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
//                 state.graphSeriesless15[1] = parseFloat(state.graphSeriesMale[1]) + parseFloat(state.report_details.data[c].male)
//                 state.graphSeriesFemale[1] = parseFloat(state.graphSeriesFemale[1]) + parseFloat(state.report_details.data[c].female)
//             } else if (state.report_details.data[c].sequence_header == '3.1.1.3' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
//                 state.graphSeriesMale[2] = parseFloat(state.graphSeriesMale[2]) + parseFloat(state.report_details.data[c].male)
//                 state.graphSeriesFemale[2] = parseFloat(state.graphSeriesFemale[2]) + parseFloat(state.report_details.data[c].female)
//             } else if (state.report_details.data[c].sequence_header == '3.1.1.4' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
//                 state.graphSeriesMale[3] = parseFloat(state.graphSeriesMale[3]) + parseFloat(state.report_details.data[c].male)
//                 state.graphSeriesFemale[3] = parseFloat(state.graphSeriesFemale[3]) + parseFloat(state.report_details.data[c].female)
//             } else if (state.report_details.data[c].sequence_header == '3.1.1.5' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
//                 state.graphSeriesMale[4] = parseFloat(state.graphSeriesMale[4]) + parseFloat(state.report_details.data[c].male)
//                 state.graphSeriesFemale[4] = parseFloat(state.graphSeriesFemale[4]) + parseFloat(state.report_details.data[c].female)
//             } else if (state.report_details.data[c].sequence_header == '3.1.1.6' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
//                 state.graphSeriesMale[5] = parseFloat(state.graphSeriesMale[5]) + parseFloat(state.report_details.data[c].male)
//                 state.graphSeriesFemale[5] = parseFloat(state.graphSeriesFemale[5]) + parseFloat(state.report_details.data[c].female)
//             } else if (state.report_details.data[c].sequence_header == '3.1.1.7' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
//                 state.graphSeriesMale[6] = parseFloat(state.graphSeriesMale[6]) + parseFloat(state.report_details.data[c].male)
//                 state.graphSeriesFemale[6] = parseFloat(state.graphSeriesFemale[6]) + parseFloat(state.report_details.data[c].female)
//             } else if (state.report_details.data[c].sequence_header == '3.1.1.8' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
//                 state.graphSeriesMale[7] = parseFloat(state.graphSeriesMale[7]) + parseFloat(state.report_details.data[c].male)
//                 state.graphSeriesFemale[7] = parseFloat(state.graphSeriesFemale[7]) + parseFloat(state.report_details.data[c].female)
//             } else if (state.report_details.data[c].sequence_header == '3.1.1.9' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
//                 state.graphSeriesMale[8] = parseFloat(state.graphSeriesMale[8]) + parseFloat(state.report_details.data[c].male)
//                 state.graphSeriesFemale[8] = parseFloat(state.graphSeriesFemale[8]) + parseFloat(state.report_details.data[c].female)
//             } else if (state.report_details.data[c].sequence_header == '3.1.1.10' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
//                 state.graphSeriesMale[9] = parseFloat(state.graphSeriesMale[9]) + parseFloat(state.report_details.data[c].male)
//                 state.graphSeriesFemale[9] = parseFloat(state.graphSeriesFemale[9]) + parseFloat(state.report_details.data[c].female)
//             } else if (state.report_details.data[c].sequence_header == '3.1.1.11' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
//                 state.graphSeriesMale[10] = parseFloat(state.graphSeriesMale[10]) + parseFloat(state.report_details.data[c].male)
//                 state.graphSeriesFemale[10] = parseFloat(state.graphSeriesFemale[10]) + parseFloat(state.report_details.data[c].female)
//             } else if (state.report_details.data[c].sequence_header == '3.1.1.12' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
//                 state.graphSeriesMale[11] = parseFloat(state.graphSeriesMale[11]) + parseFloat(state.report_details.data[c].male)
//                 state.graphSeriesFemale[11] = parseFloat(state.graphSeriesFemale[11]) + parseFloat(state.report_details.data[c].female)
//             }
//         }
//         state.graphSeriesAll[0] = { name: "Male", data: state.graphSeriesMale };
//         state.graphSeriesAll[1] = { name: "Female", data: state.graphSeriesFemale };
//     } catch (error) {
//         state.graphSeriesMale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//         state.graphSeriesFemale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//     }
// }

</script>