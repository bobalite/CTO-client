<template>
    <div :class=props.class >
        <div >
        <h3 class="text-lg font-bold border-1 border-solid border-blue-900  rounded-xl ">Group 50. {{props.displaytext}}</h3>
        <ApexCharts type="bar" height="90%" width="90%" :options="state.populationHoriOptions"
            :series="state.graphSeriesAll" />
           
        </div>
    </div>

   

    
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts';
//import {reportDetailsService } from '~/components/api/ReportDetailsService';
//import {reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService';  
const fakedata = [10,20,30,40,50,60,70,80,90]
const fakedata2 = [120,110,100,90,80,70,60,50,40]

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
            'CNSP',
            'Curf',
            'Chil',
            'Chil',
            'Chil',
            'Chil',
            'Chil',
            'Chil',
            'Chil',
            
            ],
        },
},


})


async function fetchReports_Details_Actuals() { // main fetching function for actuals
 
    try {
        // await props.passed_data.data
        state.report_details.data = props.passed_data.data
        state.graphSeriesMale = [10,20,30,40,50,60,70,80,90]
        state.graphSeriesFemale = [10,20,30,40,50,60,70,80,90]
        
        state.graphSeriesAll[0] = { name: "Male", data: state.graphSeriesMale };
        state.graphSeriesAll[1] = { name: "Female", data: state.graphSeriesFemale };

    } catch (error) {
        //console.log(error)

        state.graphSeriesMale = [10,20,30,40,50,60,70,80,90]
        state.graphSeriesFemale = [10,20,30,40,50,60,70,80,90]
    }
}

</script>