<template>
    <div :class=props.class >
        <div >
        <h3 class="text-lg font-bold border-1 border-solid border-blue-900  rounded-xl ">Group 55. {{props.displaytext}}</h3>
        <ApexCharts type="bar" height="400" width="100%" :options="state.populationHoriOptions"
            :series="state.graphSeriesAll" />
           
        </div>
    </div>

   

    
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts';
import {reportDetailsService } from '~/components/api/ReportDetailsService';
import {reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService';  

const fakedata =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
const fakedata2 =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

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
            'Prevalence/percentage of adolescent pregnancies',
            'adolescent deliveries (10-19 yrs)',
            'ALL pregnant w/ @ least 8 antenatal',
            'Deliveries attended by skilled health professionals',
            'Facility based deliveries ',
            'Pregnant adolescents w/ at least 4 postpartum',
            'Live births',
            'Low birth weight',
            'Newborns initiated breastfeeding',
            'FIC',
            'Maternal deaths',
            'RA 10591',
            'RA 9287',
            'RA 7610',
            'RA 11313',
            'RA 1619'
            ],
        },
    },
})


async function fetchReports_Details_Actuals() { // main fetching function for actuals
    try {

        await props.passed_data.data
        state.report_details.data = props.passed_data.data
        state.graphSeriesMale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        state.graphSeriesFemale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
       


        state.graphSeriesAll[0] = { name: "2025", data: state.graphSeries2025 };
        state.graphSeriesAll[1] = { name: "2026", data: state.graphSeries2026 };


    } catch (error) {

        state.graphSeriesMale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        state.graphSeriesFemale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
}

</script>