<template>
    <div :class=props.class >
        <div >
        <h3 class="text-lg font-bold border-1 border-solid border-blue-900  rounded-xl ">{{props.displaytext}}</h3>
        <ApexCharts type="bar" height="200" width="100%" :options="state.populationHoriOptions"
            :series="state.graphSeriesAll" />
           
        </div>
    </div>

   

    
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts';
import {reportDetailsService } from '~/components/api/ReportDetailsService'; 

const fakedata =   [0,0,0,0,0]
const fakedata2 =   [0,0,0,0,0]

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
            'Age',
            'Sex',
            'Ethnicity',
            'Disability',
            'School Status (in/out)'
            ],
        },
    },
})


async function fetchReports_Details_Actuals() { // main fetching function for actuals
    try {
        let params = {
            group_id: 65,
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
                state.graphSeriesMale =  [0,0,0,0,0]
                state.graphSeriesFemale =   [0,0,0,0,0]
                for (const c in state.report_details.data) {

                    if (state.report_details.data[c].sequence_header == '5.3.6.1') {
                        state.graphSeriesMale[0] = parseFloat(state.graphSeriesMale[0]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[0] = parseFloat(state.graphSeriesFemale[0]) + parseFloat( state.report_details.data[c].female)
                    } else if (state.report_details.data[c].sequence_header == '5.3.6.2') {
                        state.graphSeriesMale[1] = parseFloat(state.graphSeriesMale[1]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[1] = parseFloat(state.graphSeriesFemale[1]) + parseFloat( state.report_details.data[c].female)
                    } else if (state.report_details.data[c].sequence_header == '5.3.6.3') {
                        state.graphSeriesMale[2] = parseFloat(state.graphSeriesMale[2]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[2] = parseFloat(state.graphSeriesFemale[2]) + parseFloat( state.report_details.data[c].female)
                    }else if (state.report_details.data[c].sequence_header == '5.3.6.4') {
                        state.graphSeriesMale[3] = parseFloat(state.graphSeriesMale[3]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[3] = parseFloat(state.graphSeriesFemale[3]) + parseFloat( state.report_details.data[c].female)
                    }else if (state.report_details.data[c].sequence_header == '5.3.6.5') {
                        state.graphSeriesMale[4] = parseFloat(state.graphSeriesMale[4]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[4] = parseFloat(state.graphSeriesFemale[4]) + parseFloat( state.report_details.data[c].female)
                    }
                }
               
            } else {
                //alert('No data found for ACTUAL Entries. ')  
            }

            state.graphSeriesAll[0] =  { name: "Male", data: state.graphSeriesMale};
            state.graphSeriesAll[1] =  { name: "Female", data: state.graphSeriesFemale};

            // fakedata = state.graphSeriesMale;
            // fakedata2 = state.graphSeriesFemale;

        }
    } catch (error) {

        state.graphSeriesMale = [0,0,0,0,0]
        state.graphSeriesFemale = [0,0,0,0,0]
    }
}

</script>