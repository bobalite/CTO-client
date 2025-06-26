<template>
    <div :class=props.class>
        <div>
            <h3 class="text-lg font-bold border-1 border-solid border-blue-900  rounded-xl ">Group 59. {{ props.displaytext }}</h3>
            <ApexCharts height="200" width="120%" :options="state.OptionsPieDatasource" :series="state.graphSeries" />

        </div>
    </div>




</template>

<script setup>
import ApexCharts from 'vue3-apexcharts';
//import { report_yearService } from '../api/ReportYears';
import { reportDetailsService } from '~/components/api/ReportDetailsService';
import { reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService';

const props = defineProps({
    class: {
        type: String,
        required: true,
        default: 'border-solid',
    },
    displaytext: {
        type: String,
        required: false,
    }, group_id: {
        type: String,
        required: false,
    }, report_year: {
        type: Number,
        required: false,
    }, passed_data: {
        type: Object,
        required: true,
    },passed_year_data: {
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

    graphSeries: [],
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
            '#005c99'
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
            'Child Rep. Selected via Election',
            'Child Rep. Selected via Appointment',

        ],
        style: {
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            colors: ['#009900'],
        },
    }
})


function fetchReports_Details_Actuals() { // main fetching function for actuals
    try {
        props.passed_data.data
        props.passed_year_data
        props.passed_data.data


        state.report_details.data = props.passed_data.data
        state.graphSeries = [0, 0]
        //const report_schedule = state.report_details.data[0].report_schedule


        for (const c in props.passed_year_data.data) {
            if (props.passed_year_data.data[c].id == props.report_year) {
                state.report_year = props.passed_year_data.data[c].year
            }
        }

        for (const c in state.report_details.data) {
            if (state.report_details.data[c].sequence_header == '4.1.1' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year == state.report_year) {
                state.graphSeries[0] = parseFloat(state.graphSeries[0]) + parseFloat(state.report_details.data[c].total)
            } else if (state.report_details.data[c].sequence_header == '4.1.2' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year == props.report_year) {
                state.graphSeries[1] = parseFloat(state.graphSeries[1]) + parseFloat(state.report_details.data[c].total)
            }
        }
       

    } catch (error) {

        state.graphSeries = [0, 0]
    }
}

</script>