<template>
    <div :class=props.class >
        <div >
        <h3 class="text-lg font-bold border-1 border-solid border-blue-900  rounded-xl ">Pregnancies</h3>
        <apexchart type="bar" height="90%" width="90%" :options="state.populationHoriOptions"
            :series="state.graphSeriesAll" />
           
        </div>
    </div>

   

    
</template>

<script setup>

//import {reportDetailsService } from '~/components/api/ReportDetailsService';
//import {reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService';  
const fakedata = [10,20,30,40]
const fakedata1 = [10,20,30,40]
const fakedata2 = [120,110,100,90]

const props = defineProps({
  
    displaytext:{
        type: String,
        required: false,
    },group_id:{
        type: String,
        required: false,
    },report_year:{
        type: [String, Number],
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

graphSeriesAllpreg: [],
graphSeriesless15: [],
graphSeries15to19: [],

graphSeriesMale: [],
graphSeriesFemale: [],
report_details: [],
prevalence: 0,

graphSeriesAll: [],
 



populationHoriOptions: {
        chart: {
            type: 'bar',
            stacked: false,
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
            '#00796B', 
            '#388E3C', 
            '#AFB42B', 
            '#F9A825', 
            ],
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
            name: 'Less than 15 yrs old',
            data: fakedata1
            }, 
            {
            name: '15 - 19 yrs old',
            data: fakedata2
            }
        ],
        xaxis: {
            categories: [
            '1st Quarter',
            '2nd Quarter',
            '3rd Quarter',
            '4th Quarter',
            
            
            ],
        },
},


})


async function fetchReports_Details_Actuals() { // main fetching function for actuals
 
    try {
        // await props.passed_data.data
        state.report_details.data = props.passed_data.data
        state.graphSeriesAll = []
        //state.graphSeriesAllpreg = [5000,4500,6000,5412]
        state.graphSeriesless15 = [10,20,15,22]
        state.graphSeries15to19 = [22,35,41,12]
        
       
        state.graphSeriesAll[0] = { name: "FLess than 15 yrs old", data: state.graphSeriesless15 };
        state.graphSeriesAll[1] = { name: "15 - 19 yrs old", data: state.graphSeries15to19 };

    } catch (error) {
        //console.log(error)

        state.graphSeriesAllpreg = [0,0,0,0]
        state.graphSeriesless15 = [0,0,0,0]
        state.graphSeries15to19 = [0,0,0,0]
    }

    console.log('graphseriesall', state.graphSeriesAll )
}

</script>