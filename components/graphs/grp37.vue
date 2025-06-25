<template>
    <div :class=props.class >
        <div >
        <h3 class="text-lg font-bold border-1 border-solid border-blue-900  rounded-xl ">Group 37. {{props.displaytext}}</h3>
        <ApexCharts height="200" width="95%" :options="state.populationHoriOptions"
          :series="state.graphSeriesAll" />
           
        </div>
    </div>

   

    
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts';
//import { report_yearService } from '../api/ReportYears';
const fakedata = [10,20,30]
const fakedata2 = [120,110,100]

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
    },passed_year_data: {
         type: Object,
        required: true,
    } 
  
})

//sm:col-span-4

onMounted(() => {
   
    
    fetchReports_Details_Actuals()
})

const state = reactive({
report_year: '',    
graphSeries: []   ,
graphSeriesMale: [],
graphSeriesFemale: [],
report_details: [],
graphSeriesAll:[],

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
            'Kindergarten',
            'Elementary',
            'Secondary'
            
            ],
        },
},
})


function fetchReports_Details_Actuals() { // main fetching function for actuals
     try {
        props.passed_year_data
        props.passed_data.data
        
        state.report_details.data = props.passed_data.data
        //console.log('props.passed_data.data', props.passed_data.data)
        state.graphSeriesMale = [0, 0, 0]
        state.graphSeriesFemale = [0, 0, 0]
        const report_schedule = state.report_details.data[0].report_schedule
        console.log('report_schedule', report_schedule)
        console.log('props.report_year' ,props.report_year )
        if (report_schedule == 'Annualy'){
            for (const c in props.passed_year_data.data) {
                if (props.passed_year_data.data[c].id == props.report_year) {
                    state.report_year = props.passed_year_data.data[c].year
                }
            }

            console.log('state.report_year', state.report_year) 
            console.log('props.props.passed_year_data.data =', props.passed_year_data.data)
            console.log('state.report_year_grp37 =', state.report_year)
            for (const c in state.report_details.data) {
                if (state.report_details.data[c].sequence_header == '2.3.1' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year == state.report_year) {
                    state.graphSeriesMale[0] = parseFloat(state.graphSeriesMale[0]) + parseFloat(state.report_details.data[c].male)
                    state.graphSeriesFemale[0] = parseFloat(state.graphSeriesFemale[0]) + parseFloat(state.report_details.data[c].female)
                } else if (state.report_details.data[c].sequence_header == '2.3.2' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year == state.report_year) {
                    state.graphSeriesMale[1] = parseFloat(state.graphSeriesMale[1]) + parseFloat(state.report_details.data[c].male)
                    state.graphSeriesFemale[1] = parseFloat(state.graphSeriesFemale[1]) + parseFloat(state.report_details.data[c].female)
                } else if (state.report_details.data[c].sequence_header == '2.3.3' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year == state.report_year) {
                    state.graphSeriesMale[2] = parseFloat(state.graphSeriesMale[2]) + parseFloat(state.report_details.data[c].male)
                    state.graphSeriesFemale[2] = parseFloat(state.graphSeriesFemale[2]) + parseFloat(state.report_details.data[c].female)
                }
            }
        }else{
            for (const c in state.report_details.data) {
                if (state.report_details.data[c].sequence_header == '2.3.1' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                    state.graphSeriesMale[0] = parseFloat(state.graphSeriesMale[0]) + parseFloat(state.report_details.data[c].male)
                    state.graphSeriesFemale[0] = parseFloat(state.graphSeriesFemale[0]) + parseFloat(state.report_details.data[c].female)
                } else if (state.report_details.data[c].sequence_header == '2.3.2' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                    state.graphSeriesMale[1] = parseFloat(state.graphSeriesMale[1]) + parseFloat(state.report_details.data[c].male)
                    state.graphSeriesFemale[1] = parseFloat(state.graphSeriesFemale[1]) + parseFloat(state.report_details.data[c].female)
                } else if (state.report_details.data[c].sequence_header == '2.3.3' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
                    state.graphSeriesMale[2] = parseFloat(state.graphSeriesMale[2]) + parseFloat(state.report_details.data[c].male)
                    state.graphSeriesFemale[2] = parseFloat(state.graphSeriesFemale[2]) + parseFloat(state.report_details.data[c].female)
                }
            }
        }
        state.graphSeriesAll[0] = { name: "Male", data: state.graphSeriesMale };
        state.graphSeriesAll[1] = { name: "Female", data: state.graphSeriesFemale };
    } catch (error) {
        console.log('error', error)
        state.graphSeriesMale = [0, 0, 0]
        state.graphSeriesFemale = [0, 0, 0]
    }
}

</script>