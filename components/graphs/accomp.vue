<template>
<ApexCharts :type="state.selected_graph_type" height="400" width="100%"
   :options="state.populationHoriOptions" :series="state.graphseries_all" />
<GridCell v-if="state.is_annual != 1" class="sm:col-span-10 " :displaytext="state.selected_quarter" />

</template>
<script>

import ApexCharts from 'vue3-apexcharts';

const dummyPercentageActualvsLocal =[84.8,88.4,91.1,85.6,75,97]
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

async function OpenGraphModal(){


    //const response = await reportDetailsGroupsService.getReportDetailsGroups()
    await props.passed_data.data
    await props.passed_year_data.data
    state.report_details.data = props.passed_data.data  

    state.selected_group = props.selected_group
    //state.selected_datasource = Rights_entry_config.datasource_id
    state.is_annual = props.is_annual
    const type = props.is_annual
    state.Actuals = [0, 0, 0, 0, 0, 0 ]
    state.Projected = [0, 0, 0, 0, 0, 0]
    state.NationalProjected = [0, 0, 0, 0, 0, 0]

    try{
        state.selected_datasource =  props.datasource  
    }
    catch{

    }
             if (state.report_details) {
                const seen = new Set();
                var data = [];
               for (const item of state.report_details.data) {
                    const key = `${item.group_id}|${item.entry_type}|${item.report_year}|${item.grand_total} `;
                    console.log('key = ', key)
                    if (!seen.has(key)){
                         seen.add(key)
                        data.push({
                            group_id: item.group_id,
                            entry_type: item.entry_type,
                            report_year_id: item.report_year_id,
                            report_year: item.report_year,
                            grand_total: item.grand_total
                        });
                    }

                    if (type == 1){ // annual
                        
                        for (const i in years) {
                            if (item.report_year == years[i]) {
                                if (item.entry_type == 'Actual' && item.grand_total != '0' && item.group_id == state.selected_group) {
                                    state.Actuals[i] = item.grand_total
                                    console.log('group_id', item.group_id + ' ' + state.selected_group)

                                } else if (item.entry_type == 'Projected' && item.grand_total != '0' && item.group_id == state.selected_group) {
                                    state.Projected[i] = item.grand_total

                                } else if (item.entry_type == 'National Projected' && item.grand_total != '0' && item.group_id == state.selected_group) {
                                    state.NationalProjected[i] = item.grand_total

                                }
                            }
                        }
                    }else{ // quarterly
                         for (const i in years) {
                            if (item.report_year == years[i]) {
                                if (item.entry_type == 'Actual' && item.grand_total != '0' && item.group_id == state.selected_group ) {
                                    state.Actuals[i] = parseInt(state.Actuals[i] )+ parseInt(item.grand_total)
                                    //console.log('group_id', item.group_id + ' ' + state.selected_group)

                                } else if (item.entry_type == 'Projected' && item.grand_total != '0' && item.group_id == state.selected_group ) {
                                    state.Projected[i] =  parseInt(state.Projected[i]) + parseInt(item.grand_total)

                                } else if (item.entry_type == 'National Projected' && item.grand_total != '0' && item.group_id == state.selected_group ) {
                                    state.NationalProjected[i] =  parseInt(state.NationalProjected[i]) + parseInt(item.grand_total)

                                }
                            }
                        }
                    }
                }
                state.Tracked_details = data;
                console.log('Tracked_details = ', state.Tracked_details)
                state.graphseries_all[0] = { name: "Actuals", data: state.Actuals };
                state.graphseries_all[1] = { name: "Projected", data: state.Projected };
                state.graphseries_all[2] = { name: "NationalProjected", data: state.NationalProjected };
                console.log('Actuals = ', state.Actuals)
                console.log('Actuals = ', state.graphseries_all)
            } else {
                state.Actuals = [0, 0, 0, 0, 0, 0 ]
                state.Projected = [0, 0, 0, 0, 0, 0]
                state.NationalProjected = [0, 0, 0, 0, 0, 0]
                alert('No data found for Tracker. ')
            }

    state.isGraphModalOpen = true
}


</script>