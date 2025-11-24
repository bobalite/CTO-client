<template>
 <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
        LOCAL COUNCIL FOR THE PROTECTION OF CHILDREN
    </h3>
    <div :class="props.class" class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- Chart 1 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
                LCPC FUNCTIONALITY
            </h3>
            <ApexCharts 
                type="pie"
                height="200"
                width="100%"
                :options="state.OptionsPieDatasource"
                :series="state.graphSeries"
            />
        </div>

        <!-- Chart 2 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
               LOCAL INSTITUTIONS
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

const fakedata = [10,20,30,40,50,60,70,80,90,100,110,120]
const fakedata2 = [120,110,100,90,80,70,60,50,40,30,20,10]

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
    fetchReports_Details_pie()
    fetchReports_Details_Actuals()
})

const state = reactive({

graphSeries: [],    

graphSeriesMale: [],
graphSeriesFemale: [],
report_details: [],
prevalence: 0,

graphSeriesAll: [],

 OptionsPieDatasource: {
        chart: {
            height: 100,
            width: 100,
            type: 'pie',
        },
        colors: [
            '#fbbf24', // light amber
            '#facc15', // light yellow
            '#a3e635', // light lime
            '#4ade80', // light green
        ],
        dataLabels: {
            enabled: true
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '50%',
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
            enabled: true,
            style: {
                colors: ['#333'], // 👈 change label text color here
                fontSize: '12px',
                fontWeight: 'bold',
            },
            formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex]
                return [name, val.toFixed(1) + '%']
            },
        },
        legend: {
            show: false,
        },
        labels: [ // need to retrive labels from database based on group id
            'CHO',
            'DepEd',
            'CSWDO',
            'SOCC'

        ],
    },
 



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
            'Abandoned',
            'Bullying',
            'Child labor',
            'Economic abuse',
            'Neglect',
            'Physical abuse',
            'Psychological abuse',
            'Sexual abuse',
            'Sexual exploitation',
            'Victim of OSEAC & CSAEM',
            'Victim of Dometic violence',
            'Trafficking in Persons',
            ],
        },
    },
})


async function fetchReports_Details_pie() { // main fetching function for actuals
    try {

        await props.passed_data.data
        state.report_details.data = props.passed_data.data
        state.graphSeries = [20, 30, 40, 10] // need to retrive actual data from database based on group id


    } catch (error) {
        //console.log(error)
        state.graphSeries = [0]
    }
}



async function fetchReports_Details_Actuals() { // main fetching function for actuals
    try {

        await props.passed_data.data
        state.report_details.data = props.passed_data.data
        state.graphSeriesMale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        state.graphSeriesFemale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (const c in state.report_details.data) {
            if (state.report_details.data[c].sequence_header == '3.1.1.1' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[0] = parseFloat(state.graphSeriesMale[0]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[0] = parseFloat(state.graphSeriesFemale[0]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '3.1.1.2' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[1] = parseFloat(state.graphSeriesMale[1]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[1] = parseFloat(state.graphSeriesFemale[1]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '3.1.1.3' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[2] = parseFloat(state.graphSeriesMale[2]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[2] = parseFloat(state.graphSeriesFemale[2]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '3.1.1.4' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[3] = parseFloat(state.graphSeriesMale[3]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[3] = parseFloat(state.graphSeriesFemale[3]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '3.1.1.5' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[4] = parseFloat(state.graphSeriesMale[4]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[4] = parseFloat(state.graphSeriesFemale[4]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '3.1.1.6' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[5] = parseFloat(state.graphSeriesMale[5]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[5] = parseFloat(state.graphSeriesFemale[5]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '3.1.1.7' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[6] = parseFloat(state.graphSeriesMale[6]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[6] = parseFloat(state.graphSeriesFemale[6]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '3.1.1.8' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[7] = parseFloat(state.graphSeriesMale[7]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[7] = parseFloat(state.graphSeriesFemale[7]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '3.1.1.9' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[8] = parseFloat(state.graphSeriesMale[8]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[8] = parseFloat(state.graphSeriesFemale[8]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '3.1.1.10' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[9] = parseFloat(state.graphSeriesMale[9]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[9] = parseFloat(state.graphSeriesFemale[9]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '3.1.1.11' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[10] = parseFloat(state.graphSeriesMale[10]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[10] = parseFloat(state.graphSeriesFemale[10]) + parseFloat(state.report_details.data[c].female)
            } else if (state.report_details.data[c].sequence_header == '3.1.1.12' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                state.graphSeriesMale[11] = parseFloat(state.graphSeriesMale[11]) + parseFloat(state.report_details.data[c].male)
                state.graphSeriesFemale[11] = parseFloat(state.graphSeriesFemale[11]) + parseFloat(state.report_details.data[c].female)
            }
        }
        state.graphSeriesAll[0] = { name: "Male", data: state.graphSeriesMale };
        state.graphSeriesAll[1] = { name: "Female", data: state.graphSeriesFemale };
    } catch (error) {
        state.graphSeriesMale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        state.graphSeriesFemale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
}

</script>