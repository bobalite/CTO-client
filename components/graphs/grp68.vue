<template>
    <div :class=props.class >
        <div >
        <h3 class="text-lg font-bold border-1 border-solid border-blue-900  rounded-xl ">{{props.displaytext}}</h3>
        <ApexCharts type="bar" height="400" width="100%" :options="state.populationHoriOptions"
            :series="state.graphSeriesAll" />
           
        </div>
    </div>

   

    
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts';
import {reportDetailsService } from '~/components/api/ReportDetailsService';
import {reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService';  

const fakedata =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
const fakedata2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

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

graphSeriesMale: [],
graphSeriesFemale: [],
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
            name: 'Male',
            data: fakedata
            }, 
            {
            name: 'Female',
            data: fakedata2
            }
        ],
        xaxis: {
            categories: [
            '<1 year old',
            '1 year old',
            '2 years old',
            '3 years old',
            '4 years old',
            '5 years old',
            '6 years old',
            '7 years old',
            '8 years old',
            '9 years old',
            '10 years old',
            '11 years old',
            '12 years old',
            '13 years old',
            '14 years old',
            '15 years old',
            '16 years old',
            '17 years old'
            ],
        },
    },
})


async function fetchReports_Details_Actuals() { // main fetching function for actuals
    try {
        await props.passed_data.data
        state.report_details.data = props.passed_data.data
        state.graphSeriesMale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        state.graphSeriesFemale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (const c in state.report_details.data) {
            if (state.report_details.data[c].sequence_header == '6.1.3.1' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[0] = parseFloat(state.graphSeriesMale[0]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[0] = parseFloat(state.graphSeriesFemale[0]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.2' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[1] = parseFloat(state.graphSeriesMale[1]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[1] = parseFloat(state.graphSeriesFemale[1]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.3' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[2] = parseFloat(state.graphSeriesMale[2]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[2] = parseFloat(state.graphSeriesFemale[2]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.4' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[3] = parseFloat(state.graphSeriesMale[3]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[3] = parseFloat(state.graphSeriesFemale[3]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.5' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[4] = parseFloat(state.graphSeriesMale[4]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[4] = parseFloat(state.graphSeriesFemale[4]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.6' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[5] = parseFloat(state.graphSeriesMale[5]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[5] = parseFloat(state.graphSeriesFemale[5]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.7' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[6] = parseFloat(state.graphSeriesMale[6]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[6] = parseFloat(state.graphSeriesFemale[6]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.8' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[7] = parseFloat(state.graphSeriesMale[7]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[7] = parseFloat(state.graphSeriesFemale[7]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.9' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[8] = parseFloat(state.graphSeriesMale[8]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[8] = parseFloat(state.graphSeriesFemale[8]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.10' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[9] = parseFloat(state.graphSeriesMale[9]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[9] = parseFloat(state.graphSeriesFemale[9]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.11' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[10] = parseFloat(state.graphSeriesMale[10]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[10] = parseFloat(state.graphSeriesFemale[10]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.12' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[11] = parseFloat(state.graphSeriesMale[11]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[11] = parseFloat(state.graphSeriesFemale[11]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.13' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[12] = parseFloat(state.graphSeriesMale[12]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[12] = parseFloat(state.graphSeriesFemale[12]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.14' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[13] = parseFloat(state.graphSeriesMale[13]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[13] = parseFloat(state.graphSeriesFemale[13]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.15' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[14] = parseFloat(state.graphSeriesMale[14]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[14] = parseFloat(state.graphSeriesFemale[14]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.16' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[15] = parseFloat(state.graphSeriesMale[15]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[15] = parseFloat(state.graphSeriesFemale[15]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.17' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[16] = parseFloat(state.graphSeriesMale[16]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[16] = parseFloat(state.graphSeriesFemale[16]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '6.1.3.18' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[17] = parseFloat(state.graphSeriesMale[17]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[17] = parseFloat(state.graphSeriesFemale[17]) + parseFloat(state.report_details.data[c].female)
            }
        }
        state.graphSeriesAll[0] = { name: "Male", data: state.graphSeriesMale };
        state.graphSeriesAll[1] = { name: "Female", data: state.graphSeriesFemale };
    } catch (error) {
        state.graphSeriesMale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        state.graphSeriesFemale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
}

</script>