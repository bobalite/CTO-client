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


async function fetchReports_Details_Actuals() { // main fetching function for actuals
    try {
        let params = {
            group_id: 48,
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
                state.graphSeriesMale = [0,0,0,0,0,0,0,0,0,0,0,0]
                state.graphSeriesFemale = [0,0,0,0,0,0,0,0,0,0,0,0]
                for (const c in state.report_details.data) {

                    if (state.report_details.data[c].sequence_header == '3.1.1.1') {
                        state.graphSeriesMale[0] = parseFloat(state.graphSeriesMale[0]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[0] = parseFloat(state.graphSeriesFemale[0]) + parseFloat( state.report_details.data[c].female)
                    } else if (state.report_details.data[c].sequence_header == '3.1.1.2') {
                        state.graphSeriesMale[1] = parseFloat(state.graphSeriesMale[1]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[1] = parseFloat(state.graphSeriesFemale[1]) + parseFloat( state.report_details.data[c].female)
                    } else if (state.report_details.data[c].sequence_header == '3.1.1.3') {
                        state.graphSeriesMale[2] = parseFloat(state.graphSeriesMale[2]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[2] = parseFloat(state.graphSeriesFemale[2]) + parseFloat( state.report_details.data[c].female)
                    }else if (state.report_details.data[c].sequence_header == '3.1.1.4') {
                        state.graphSeriesMale[3] = parseFloat(state.graphSeriesMale[3]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[3] = parseFloat(state.graphSeriesFemale[3]) + parseFloat( state.report_details.data[c].female)
                    }else if (state.report_details.data[c].sequence_header == '3.1.1.5') {
                        state.graphSeriesMale[4] = parseFloat(state.graphSeriesMale[4]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[4] = parseFloat(state.graphSeriesFemale[4]) + parseFloat( state.report_details.data[c].female)
                    }else if (state.report_details.data[c].sequence_header == '3.1.1.6') {
                        state.graphSeriesMale[5] = parseFloat(state.graphSeriesMale[5]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[5] = parseFloat(state.graphSeriesFemale[5]) + parseFloat( state.report_details.data[c].female)
                    }else if (state.report_details.data[c].sequence_header == '3.1.1.7') {
                        state.graphSeriesMale[6] = parseFloat(state.graphSeriesMale[6]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[6] = parseFloat(state.graphSeriesFemale[6]) + parseFloat( state.report_details.data[c].female)
                    }else if (state.report_details.data[c].sequence_header == '3.1.1.8') {
                        state.graphSeriesMale[7] = parseFloat(state.graphSeriesMale[7]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[7] = parseFloat(state.graphSeriesFemale[7]) + parseFloat( state.report_details.data[c].female)
                    }else if (state.report_details.data[c].sequence_header == '3.1.1.9') {
                        state.graphSeriesMale[8] = parseFloat(state.graphSeriesMale[8]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[8] = parseFloat(state.graphSeriesFemale[8]) + parseFloat( state.report_details.data[c].female)
                    }else if (state.report_details.data[c].sequence_header == '3.1.1.10') {
                        state.graphSeriesMale[9] = parseFloat(state.graphSeriesMale[9]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[9] = parseFloat(state.graphSeriesFemale[9]) + parseFloat( state.report_details.data[c].female)
                    }else if (state.report_details.data[c].sequence_header == '3.1.1.11') {
                        state.graphSeriesMale[10] = parseFloat(state.graphSeriesMale[10]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[10] = parseFloat(state.graphSeriesFemale[10]) + parseFloat( state.report_details.data[c].female)
                    }else if (state.report_details.data[c].sequence_header == '3.1.1.12') {
                        state.graphSeriesMale[11] = parseFloat(state.graphSeriesMale[11]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[11] = parseFloat(state.graphSeriesFemale[11]) + parseFloat( state.report_details.data[c].female)
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

        state.graphSeriesMale = [0,0,0,0,0,0,0,0,0,0,0,0]
        state.graphSeriesFemale = [0,0,0,0,0,0,0,0,0,0,0,0]
    }
}

</script>