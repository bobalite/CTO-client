<template>
    <div :class=props.class >
        <div >
        <h3 class="text-lg font-bold border-1 border-solid border-blue-900  rounded-xl ">{{props.displaytext}}</h3>
        <apexchart type="bar" height="800" width="50%" :options="state.populationHoriOptions"
            :series="state.graphSeriesAll" />
           
        </div>
    </div>

   

    
</template>

<script setup>

import {reportDetailsService } from '~/components/api/ReportDetailsService';
import {reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService';  

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
    fetchRights_entry_config()
    loadGroupsToGraph()
})

const state = reactive({

graphSeriesMale: [],
graphSeriesFemale: [],
report_details: [],
prevalence: 0,
graphSeriesAll: [],
newcategories: [],

populationHoriOptions: {
        chart: {type: 'bar', stacked: true, 
                toolbar: {show: false},
                zoom: {enabled: false}},
        plotOptions: {
                bar: {horizontal: true}},
        colors: [ '#312e81','#c026d3','#701a75','#db2777','#9d174d'],
        dataLabels: {enabled: true},
        stroke: {curve: 'smooth'},
        group: {
            style: {
              fontSize: '10px',
              fontWeight: 700
            },
          },    
        series: [{
            name: 'Male',
            data: fakedata}, 
            {
            name: 'Female',
            data: fakedata2}
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



async function fetchRights_entry_config() {
    try {
        let params = {
            page: currentPage
        }
        const response = await Rights_entry_configServices.getRights_entry_config(params)
        //console.log(response)
        if (response.data) {
            state.Rights_entry_config.data = response.data.filter(rights_id1 => rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config1.data = response.data.filter(rights_id1 => rights_id1.rights_id === 1 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config2.data = response.data.filter(rights_id1 => rights_id1.rights_id === 2  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config3.data = response.data.filter(rights_id1 => rights_id1.rights_id === 3  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config4.data = response.data.filter(rights_id1 => rights_id1.rights_id === 4  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config5.data = response.data.filter(rights_id1 => rights_id1.rights_id === 5  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config6.data = response.data.filter(rights_id1 => rights_id1.rights_id === 6  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            console.log(response.data)
        }
    } catch (error) { 
        console.log(error)
    }
}


function loadGroupsToGraph(){

    console.log(state.Rights_entry_config.data)

    // for (let i = 0; i < state.Rights_entry_config.data.length; i++) {

    //     populationHoriOptions.xaxis.categories[i] = state.Rights_entry_config.data[i].group_header
    //     console.log(populationHoriOptions.xaxis.categories[i])

    // }
    
}




async function fetchReports_Details_Actuals() { // main fetching function for actuals
        try {
        let params = {
            group_id: 65,
            report_year_id: props.report_year, // need to be passed from the dashboard main page
            is_active: 1,
            // entry_type: "Actual",//state.selected_view_entry_type,
            group_agency_datasource_id: 0 // set to 0 for non specific of the datasource
        }

        //console.log('params-getReportDetailsGroups',params)
       
        //const response = await reportDetailsService.getReportDetails(params)
        const response = await reportDetailsGroupsService.getReportDetailsGroups()

        //
        if (response.data) {
             state.report_details.data = response.data          
             if (response) {
                state.graphSeriesMale =  [0,0,0,0,0]
                state.graphSeriesFemale =   [0,0,0,0,0]
                for (const c in state.report_details.data) {

                   
                        state.graphSeriesMale[4] = parseFloat(state.graphSeriesMale[4]) + parseFloat( state.report_details.data[c].male)
                        state.graphSeriesFemale[4] = parseFloat(state.graphSeriesFemale[4]) + parseFloat( state.report_details.data[c].female)
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



