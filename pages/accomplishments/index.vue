<template>
    <div class="print:hidden flex justify-between items-center">
        <h1 class="text-2xl font-bold">ACCOMPLISHMENTS</h1>
        <div class="flex items-center space-x-4">

        </div>
    </div>

    <div class="print:hidden px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">

            <div class="mt-8 flow-root">
                <p class="mb-1 text-lg font-normal text-gray-500 lg:text-xl sm:px-10 xl:px-1 dark:text-black">Children's
                    Rights Situational Analysis (CRSA)</p>
                <div class="sm:flex-auto">
                    <p>Select Report Year</p>
                    <div>
                        <FormSelect name="selected_year" v-model="state.selected_year_id"
                            :options="state.options.report_years" @click="changeYear()" />
                    </div>
                </div>

                <div class="sm:flex-auto">

                    <p>Select Right</p>
                    <div>
                        <FormSelect :options="state.options.rights " v-model="state.selected_rights_id"
                            @click="changeData()" />
                    </div>
                </div>
                <div class="sm:flex-auto">

                    <p>Select Graph Type</p>
                    <div>
                        <FormSelect name="selected_year" v-model="state.selected_graph_type"
                            :options="state.options.selected_graph_type" />
                    </div>
                </div>
            </div>

        </div>

        <div class="sm:col-span-6 text-xl font-bold  text-center  border-1 border-solid border-blue-900 pb-4">

            <ModalAlert :show="state.isGraphModalOpen" :close="state.closeGraphModal" :title=state.alertmessage>
                <ApexChart :type="state.selected_graph_type" height="400" width="100%"
                    :options="state.populationHoriOptions" :series="state.graphseries_all" />
                <GridCell v-if="state.is_annual != 1" class="sm:col-span-10 " :displaytext="state.selected_quarter" />
                <div
                    class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-10  border-solid border-grey border-t pb-4 pt-4">
                    <GraphsGrp01 v-if="state.selected_group == 1" :key="state.refresh_graphs_toggle"
                        :passed_data="state.passed_data"
                        class="sm:col-span-5 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
                        :displaytext="'TEENAGE PREGNANCY'" :report_year="state.report_year"
                        :passed_year_data="state.report_years">
                    </GraphsGrp01>


                    <GridCell class="sm:col-span-4  text-l font-bold text-left   pb-4" :displaytext="''" />
                    <GridCell class="sm:col-span-8  pb-4" :displaytext="'DATASOURCE: ' + state.selected_datasource" />
                    <GridCell class="sm:col-span-4  text-l font-bold text-left   pb-4" :displaytext="''" />
                    <GridCell class="sm:col-span-8  pb-4" :displaytext="' '" />


                    <!-- <button
                        class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                        @click="PrintGraphModal"> 🖨️ Print </button> -->

                    <button
                        class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                        @click="closeGraphModal"> Close </button>

                </div>

            </ModalAlert>

        </div>


        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>

                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Group</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Indicator</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Agency</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Entry Type</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Actual</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Projected</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        National</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Stat</th>
                                    <!-- <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Print</th>      -->

                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="Rights_entry_config in state.Selected_Rights_entry_config.data"
                                    v-bind:key=Rights_entry_config.id @click="getclicked(Rights_entry_config)">

                                    <template v-if="Rights_entry_config.tier_level == 1">
                                        <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-md font-medium text-gray-900 sm:pl-6">
                                            {{ Rights_entry_config.group }}
                                        </td>
                                        <td class="py-4 pl-4 pr-3 text-md font-medium text-gray-900 sm:pl-6">
                                            {{ Rights_entry_config.description }}
                                        </td>
                                        <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            <span
                                                class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-center rounded-2xl border  font-large text-black mr-2 mb-2"
                                                :class="state.options.agencies.find(a => a.value === Rights_entry_config.agency_id)?.color">
                                                <template v-for="agency in state.options.agencies">
                                                    <template v-if="agency.value == Rights_entry_config.agency_id">
                                                        {{ agency.label }}
                                                    </template>
                                                </template>
                                            </span>
                                        </td>

                                        <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            <span v-if="Rights_entry_config.is_annual == 1"
                                                class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-center rounded-2xl  border-green-200 bg-green-200  font-large text-black">
                                                {{ Rights_entry_config.is_annual == 1 ? 'A' : 'Q' }}
                                            </span>

                                            <span v-if="Rights_entry_config.is_annual == 0"
                                                class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-center rounded-2xl  border-red-200 bg-red-200  font-large text-black">
                                                {{ Rights_entry_config.is_annual == 1 ? 'A' : 'Q' }}
                                            </span>

                                        </td>

                                        <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">

                                            <template v-for="tracked in state.Tracked_details">
                                                <template
                                                    v-if="tracked.group_id == Rights_entry_config.group && tracked.report_year == state.selected_year  && tracked.entry_type == 'Actual' && tracked.grand_total != '0' && Rights_entry_config.is_annual == 1 ">
                                                    <span
                                                        class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-left rounded-2xl border bg-green-500 font-large text-black mr-2 mb-2">
                                                        {{tracked.grand_total}}
                                                    </span>

                                                </template>
                                                <template
                                                    v-if="tracked.group_id == Rights_entry_config.group && tracked.report_year_id == state.selected_year_id  && tracked.entry_type == 'Actual' && tracked.grand_total != '0' && Rights_entry_config.is_annual == 0">
                                                    <span
                                                        class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-left rounded-2xl border bg-green-500 font-large text-black mr-2 mb-2">
                                                        {{tracked.grand_total}}
                                                    </span>

                                                </template>

                                            </template>

                                        </td>

                                        <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">

                                            <template v-for="tracked in state.Tracked_details">

                                                <!-- annual-->
                                                <template
                                                    v-if="tracked.group_id == Rights_entry_config.group && tracked.report_year == state.selected_year && tracked.entry_type == 'Projected' && tracked.grand_total != '0' && Rights_entry_config.is_annual == 1">
                                                    <span
                                                        class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-left rounded-2xl border bg-green-500 font-large text-black mr-2 mb-2">
                                                        {{tracked.grand_total}}

                                                    </span>
                                                </template>


                                                <!-- quarterly-->
                                                <template
                                                    v-if="tracked.group_id == Rights_entry_config.group && tracked.report_year_id == state.selected_year_id && tracked.entry_type == 'Projected' && tracked.grand_total != '0' && Rights_entry_config.is_annual == 0">
                                                    <span
                                                        class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-left rounded-2xl border bg-green-500 font-large text-black mr-2 mb-2">
                                                        {{tracked.grand_total}}
                                                    </span>
                                                </template>
                                            </template>

                                        </td>

                                        <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">

                                            <template v-for="tracked in state.Tracked_details">
                                                <template
                                                    v-if="tracked.group_id == Rights_entry_config.group && tracked.report_year == state.selected_year && tracked.entry_type == 'National Projected' && tracked.grand_total != '0' && Rights_entry_config.is_annual == 1">
                                                    <span
                                                        class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-left rounded-2xl border bg-green-500 font-large text-black mr-2 mb-2">
                                                        {{tracked.grand_total}}
                                                    </span>
                                                </template>

                                                <template
                                                    v-if="tracked.group_id == Rights_entry_config.group && tracked.report_year_id == state.selected_year_id && tracked.entry_type == 'National Projected' && tracked.grand_total != '0' && Rights_entry_config.is_annual == 0">
                                                    <span
                                                        class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-left rounded-2xl border bg-green-500 font-large text-black mr-2 mb-2">
                                                        {{tracked.grand_total}}
                                                    </span>
                                                </template>
                                            </template>

                                        </td>

                                        <td class="py-4 pl-4 pr-3 text-md font-medium text-gray-900 sm:pl-6">
                                            <NuxtLink @click="OpenGraphModal(Rights_entry_config)">
                                                <IconPresentation />
                                            </NuxtLink>
                                        </td>

                                        <!-- <td class="py-4 pl-4 pr-3 text-md font-medium text-gray-900 sm:pl-6">
                                            <NuxtLink @click="DisplayPrint(Rights_entry_config)">
                                                <IconPrint />
                                            </NuxtLink>
                                        </td> -->

                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>

    </div>

</template>

<script setup >

import {
       MenuItem
} from '@headlessui/vue'

import {Rights_entry_configServices } from '~/components/api/Rights_entry_configService'; 
import {reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService'; 
import {Childrens_rightsService } from '~/components/api/Rights'; 
import {rolesService } from '~/components/api/Roles'; 
import {useUserStore} from '~/store/user'
import {report_yearService } from '~/components/api/ReportYears'; 



const userStore = useUserStore()
const printSection = ref(null)



let currentPage = 1;
definePageMeta({
    layout: 'main'
})


const dummyPercentageActualvsLocal =[84.8,88.4,91.1,85.6,75,97]
const dummyPercentageActualvsNAtional =[88.3,100,96.8,91.4,125,104]

const years = [2021,2022,2023,2024,2025,2026]

let Actuals = [0,0,0,0,0]
let Projected = [0,0,0,0,0]
let NationalProjected = [0,0,0,0,0]



const state = reactive({

    Actuals: [0,0,0,0,0],
    Projected: [0,0,0,0,0],
    NationalProjected: [0,0,0,0,0], 
    selected_graph_type: 'bar',
    selected_datasource: '',
    graphseries_all: [],
    passed_data: [],
    isGraphModalOpen: false, 
    Rights:[],
    Tracked_details: [],
    isViewModalOpen: false,
    isAddModalOpen: false,
    isEditModalOpen: false,
    isAlertModalOpen: false,
    alertmessage: '',
    successcount: '',
    errorcount:  '',
    errormessage: '',
    buttoncompute: false,
    buttonsavenew: true,
    buttoncomputeEdit: false,
    buttonsaveEdit: true,
    roles:[{}],
    male:[{}],
    female:[{}],
    total:[{}],
    grand_total:[{}],
    remarks:[{}],
    edit_ids:[{}],
    edit_female:[{}],
    edit_total:[{}],
    edit_male:[{}],
    edit_grand_total:[{}],
    edit_remarks:[{}],
    view_male:[{}],
    view_female:[{}],
    view_total:[{}],
    view_grand_total:[{}],
    view_remarks:[{}],
    view_selected_datasource: 1,
    view_male_projected:[{}],
    view_female_projected:[{}],
    view_total_projected:[{}],
    view_grand_total_projected:[{}],
    view_remarks_projected:[{}],
    totaled_from:[{}],
    test: [{}], 

    selected_entry_type: 'Actual',
    selected_view_entry_type: 'Projected',
    selected_year_id: 0,
    selected_year: '',
    selected_quarter: '',
    datasource_id: 0,
    datasources: [],

    selected_edit_entry_type: 'Actual',
    edit_selected_datasource: 0,
    is_annual: 0,
    //selected_rights_id: 0,
    selected_sequence_header: '',
    selected_description: '',
    selected_group: 0,

    report_details: [],
    report_years: [],

    report_year: 1,

    
    selected_group_header: '',
    Selected_Rights_entry_config_parent: [],
    Selected_Rights_entry_config_group: [],

    clicked_Rights_entry_config: [],
    Selected_Rights_entry_config: [],
    Rights_entry_config: [],
    Rights_entry_config1: [],
    Rights_entry_config2: [],
    Rights_entry_config3: [],
    Rights_entry_config4: [],
    Rights_entry_config5: [],
    Rights_entry_config6: [],
    text: null,
    selected_rights_id: 1,


    categories: ['2020',  
                '2021',
                '2022',
                '2023',
                '2024',
                '2025',],


   
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



})

onMounted(() => {
    fetchreportyear()
    fetchRights()
    fetchRights_entry_config()
    fetchrole()
    fetchReports_Details_Actuals()
   
})

async function fetchreportyear() {
    try {
           const response = await report_yearService.getReportYears()
        if (response.data) {
            
            state.report_years.data = response.data
            var data = [];
            var datasources = [];
            if (state.report_years.data != null) {
                
                datasources = state.report_years.data

                for (const i in datasources) {
                    const value = datasources[i].id;
                    if (!datasources.includes(value)) {

                        if(datasources[i].status == 1){
                        data[i] = { "value": datasources[i].id, "label": datasources[i].name, "year": datasources[i].year };
                        }
                    }
                }
                state.options.report_years = data;
                //console.log('report_years = ', state.options.report_years.data)
            }

        }
    } catch (error) { 
        //console.log(error)
    }
}

async function fetchrole() {
    try {
       
        const response = await rolesService.getRole(userStore.getUser.userRole.role_id)
        //console.log(response)
        if (response.data) {
            state.roles = response.data
         
            //console.log(state.roles)
        }
    } catch (error) { 
        //console.log(error)
    }
}



function changeData(){
    switch (state.selected_rights_id){
        case(0):
        state.Selected_Rights_entry_config  = state.Rights_entry_config
        break;
        case(1):
        state.Selected_Rights_entry_config  = state.Rights_entry_config1
        break;
        case(2):
        state.Selected_Rights_entry_config  = state.Rights_entry_config2
        break;
        case(3):
        state.Selected_Rights_entry_config  = state.Rights_entry_config3
        break;
        case(4):
        state.Selected_Rights_entry_config  = state.Rights_entry_config4
        break;
        case(5):
        state.Selected_Rights_entry_config  = state.Rights_entry_config5
        break;
        case(6):
        state.Selected_Rights_entry_config  = state.Rights_entry_config6
        break;
        default:
        state.Selected_Rights_entry_config  = state.Rights_entry_config
        //console.log(state.Selected_Rights_entry_config)

    }
}

function changeYear() {
   
    try {
        state.selected_year = state.options.report_years[state.selected_year_id - 1].year
        state.selected_quarter = state.options.report_years[state.selected_year_id - 1].label
    } catch (error) {
        state.selected_year = 0
    }

}



async function fetchRights(){
    try {
        let params = {
            page: currentPage
        }
        const response = await Childrens_rightsService.getRights(params)
     
        if (response.data) {
            state.Rights.data = response.data
            //console.log(state.Rights.data[0].description)
        }

       var data = [];
       for (const i in state.Rights.data){

        data[i] =  { "value":  state.Rights.data[i].id, "label": state.Rights.data[i].description };
        
        }

        state.options.rights = data;
        //console.log( state.options.rights)

    } catch (error) {
        //console.log(error)
    }
}

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
            //console.log(response.data)
        }
    } catch (error) { 
        //.log(error)
    }
}


//---------------------------------------------------View Entry Functions--------------------------------------------------------------


async function fetchReports_Details_Actuals() {
    try {
       
        const response = await reportDetailsGroupsService.getReportDetailsGroups()
       
       
        //console.log(response)
        
        if (response.data) {
            state.report_details.data = response.data
            state.passed_data.data = response.data
              if (state.report_details) {
                const seen = new Set();
                var data = [];
               for (const item of state.report_details.data) {
                    const key = `${item.group_id}|${item.entry_type}|${item.report_year}|${item.grand_total} `;
                    //console.log('key = ', key)
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
                }

                state.Tracked_details = data;
                console.log('Tracked_details = ', state.Tracked_details)
            } else {
                alert('No data found for Tracker. ')  
            }



        }
    } catch (error) {
        //console.log(error)
    }
}




//---------------------------------------------------View Entry Functions--------------------------------------------------------------



//---------------------------------------------------Graph Modal-----------------------------------------------------------------------

function closeGraphModal(){
    state.isGraphModalOpen = false
}


function PrintGraphModal(){
  window.print();
}


function DisplayPrint(Rights_entry_config){
    
    const group = ref(Rights_entry_config.group)
    const description = ref(Rights_entry_config.description)
    const report_year = ref(state.selected_year_id)
    const query = new URLSearchParams({ group: group.value, description: description.value, report_year: report_year.value }).toString()
    window.open(`/print?${query}`, '_blank')

}


function OpenGraphModal(Rights_entry_config){
    state.selected_group = Rights_entry_config.group
    //state.selected_datasource = Rights_entry_config.datasource_id
    state.is_annual = Rights_entry_config.is_annual
    const type = Rights_entry_config.is_annual
      state.Actuals = [0, 0, 0, 0, 0, 0 ]
      state.Projected = [0, 0, 0, 0, 0, 0]
      
      state.NationalProjected = [0, 0, 0, 0, 0, 0]
    try{
        state.selected_datasource =  state.options.agencies[parseInt(Rights_entry_config.agency_id)].label
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
//---------------------------------------------------Graph Modal-----------------------------------------------------------------------


</script>
