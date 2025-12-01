<template>
<apexchart :type="state.selected_graph_type" height="400" width="100%"
   :options="state.populationHoriOptions" :series="state.graphseries_all" />
<GridCell v-if="state.is_annual != 1" class="sm:col-span-10 " :displaytext="state.selected_quarter" />

</template>
<script>



const dummyPercentageActualvsLocal =[1.2,3.4,5.1,85.6,75,97]
const dummyPercentageActualvsNAtional =[88.3,100,96.8,91.4,125,104]

const years = [2021,2022,2023,2024,2025,2026]

let Actuals = [0,0,0,0,0]
let Projected = [0,0,0,0,0]
let NationalProjected = [0,0,0,0,0]

const props = defineProps({
    selected_group: {
        type: String,
        required: true,
    },
    is_annual: {
        type: Number,
        required: true,
    },
    datasource: {
        type: String,
        required: false,
    },
    passed_data: {
        type: Object,
        required: true,
    },
    passed_year_data: {
         type: Object,
        required: true,
    } 

});


const state = reactive({
    selected_graph_type: 'bar',
    is_annual: 0,
    selected_quarter: '',
    graphseries_all: [],
    selected_datasource: '',
    report_details: [],


    populationHoriOptions: {
        chart: {
            type: 'line',
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
        colors: ['#0891b2',
            '#164e63',
            '#4f46e5',
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

        title: {
            text: 'Actual vs Projected and National Projected Comparisons',
            align: 'center',
            style: {
                fontSize: '20px',
                fontWeight: 'bold'
            }},
        
           series: [ {
            name: 'Accomplishment',
            data: Actuals
            },{
            name: 'Projected (Local) ',
            data: Projected
            },{
            name: 'Projected (National) ',
            data: NationalProjected
            }
        ],
        series_percentage: [ {
            name: 'Accomplishment Vs Local',
            data: dummyPercentageActualvsLocal
            
        },{
            name: 'Accomplishment Vs National',
            data: dummyPercentageActualvsNAtional
        }
        ],
        xaxis: {
            categories: years
        },
    },

     options: {
        entry_type: [
            { value: 'Actual', label: 'Actual' },
            { value: 'Projected', label: 'Projected' },
            { value: 'National Projected', label: 'National Projected' },
        ],
      
        years:[
            {value: '1', label: 'Jan - Dec 2024' },
            {value: '2', label: 'Jan - Dec 2025' },
        ],
        agencies: [
            { value: 1, label: 'SOCC', color: 'bg-red-500 border-red-400' },
            { value: 2, label: 'CHO', color: 'bg-blue-500 border-blue-400' },
            { value: 3, label: 'DepEd', color: 'bg-green-500 border-green-400' },
            { value: 4, label: 'CSWDO', color: 'bg-yellow-500 border-yellow-400' },
            { value: 5, label: 'CHED', color: 'bg-purple-500 border-purple-400' },
            { value: 6, label: 'DCPO', color: 'bg-pink-500 border-pink-400' },
            { value: 7, label: 'DILG', color: 'bg-indigo-500 border-indigo-400' },
            { value: 8, label: 'IGDD', color: 'bg-teal-500 border-teal-400' },
            { value: 9, label: 'CBO', color: 'bg-orange-500 border-orange-400' },
            { value: 10, label: 'CPDO', color: 'bg-gray-500 border-gray-400' },
            { value: 11, label: 'CCRO', color: 'bg-lime-500 border-lime-400' },
            { value: 12, label: 'CDRRMO', color: 'bg-rose-500 border-rose-400' },
            { value: 13, label: 'FCCDI', color: 'bg-cyan-500 border-cyan-400' },
            { value: 14, label: 'PSA', color: 'bg-emerald-500 border-emerald-400' },
            { value: 15, label: 'NCIP', color: 'bg-fuchsia-500 border-fuchsia-400' },
        ],
        selected_graph_type: [
            { value: 'bar', label: 'Bar' },
            { value: 'line', label: 'Line' },
            { value: 'area', label: 'Area' },
        ],

           
    },

});




</script>