<template>
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">DATABASE TRACKER</h1>
        <div class="flex items-center space-x-4">

        </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">

            <div class="mt-8 flow-root">
                <p class="mb-1 text-lg font-normal text-gray-500 lg:text-xl sm:px-10 xl:px-1 dark:text-black">Children's
                    Rights Situational Analysis (CRSA)</p>
                <div class="sm:flex-auto">
                    <p>Select Report Year</p>
                    <div>
                        <FormSelect name="selected_year" v-model="state.selected_year_id"
                            :options="state.options.report_years" />
                    </div>
                </div>

                <div class="sm:flex-auto">

                    <p>Select Right</p>
                    <div>
                        <FormSelect :options="state.options.rights " v-model="state.selected_rights_id"
                            @click="changeData()" />
                    </div>
                </div>
            </div>

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
                                        Description</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Datasources</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Actual</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Projected</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        National Projected</th>
                                


                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="Rights_entry_config in state.Selected_Rights_entry_config.data"
                                    v-bind:key=Rights_entry_config.id >

                                    <template v-if="Rights_entry_config.tier_level == 1">
                                         <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-md font-medium text-gray-900 sm:pl-6">
                                            {{ Rights_entry_config.group }}
                                        </td>
                                        <td
                                            class="py-4 pl-4 pr-3 text-md font-medium text-gray-900 sm:pl-6">
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
                                          
                                                <template v-for="tracked in state.Tracked_details">
                                                    <template v-if="tracked.group_id == Rights_entry_config.group && tracked.report_year_id == state.selected_year_id  && tracked.entry_type == 'Actual'" >
                                                         <span 
                                                            class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-left rounded-2xl border bg-green-500 font-large text-black mr-2 mb-2"
                                                            >
                                                            DONE
                                                        </span>
                                                        
                                                    </template>
                                                  
                                                </template>
                                           
                                        </td>

                                        <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                           
                                                <template v-for="tracked in state.Tracked_details">
                                                    <template v-if="tracked.group_id == Rights_entry_config.group && tracked.report_year_id == state.selected_year_id && tracked.entry_type == 'Projected' ">
                                                         <span 
                                                            class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-left rounded-2xl border bg-green-500 font-large text-black mr-2 mb-2"
                                                            >
                                                            DONE
                                                        </span>
                                                    </template>
                                                </template>
                                           
                                        </td>

                                        <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                           
                                                <template v-for="tracked in state.Tracked_details">
                                                    <template v-if="tracked.group_id == Rights_entry_config.group && tracked.report_year_id == state.selected_year_id && tracked.entry_type == 'National Projected' ">
                                                         <span 
                                                            class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-left rounded-2xl border bg-green-500 font-large text-black mr-2 mb-2"
                                                            >
                                                             DONE
                                                        </span>
                                                    </template>
                                                </template>
                                           
                                        </td>
                                        
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



let currentPage = 1;
definePageMeta({
    layout: 'main'
})
 
const state = reactive({
   
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
    datasource_id: 0,
    datasources: [],

    selected_edit_entry_type: 'Actual',
    edit_selected_datasource: 0,

    selected_rights_id: 0,
    selected_sequence_header: '',
    selected_description: '',
    selected_group: 0,

    report_details: [],
    report_years: [],

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
   
    options: {
        entry_type: [
            { value: 'Actual', label: 'Actual' },
            { value: 'Projected', label: 'Projected' },
            { value: 'National Projected', label: 'National Projected' },
        ],
        view_entry_type: [
            
            { value: 'Projected', label: 'Projected' },
            { value: 'National Projected', label: 'National Projected' },
        ],
        is_disabled: [
            { value: '1', label: 'Not Applicable' },
            { value: '2', label: 'Enabled' },
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
        ]

           
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
                        data[i] = { "value": datasources[i].id, "label": datasources[i].name };
                        }
                    }
                }
                state.options.report_years = data;
            }

        }
    } catch (error) { 
        //console.log(error)
    }
}

async function fetchrole() {
    try {
       
        const response = await rolesService.getRole(userStore.getUser.user_roles.roles_id)
        //console.log(response)
        if (response.data) {
            state.roles = response.data
         
            //console.log(state.roles)
        }
    } catch (error) { 
        //console.log(error)
    }
}

function getclicked(Rights_entry_config){
  
     state.selected_sequence_header = Rights_entry_config.sequence_header
     state.selected_description = Rights_entry_config.description
     state.selected_group_header = Rights_entry_config.group_header
     state.selected_group = Rights_entry_config.group
     state.Selected_Rights_entry_config_group.data  = state.Rights_entry_config.data .filter(Rights_entry_config => Rights_entry_config.group ===  state.selected_group)
     //console.log(state.Selected_Rights_entry_config_group.data)
     if (state.Selected_Rights_entry_config_group.data != null){ 
       var data = [];
       var datasources = [];
       datasources = state.Selected_Rights_entry_config_group.data[0].datasources
       
            for (const i in datasources){
                const value = datasources[i].agency_id;
                if (!datasources.includes(value)){
                    data[i] =  { "value":  datasources[i].agency_id, "label": datasources[i].description };
                }
            }
        state.options.datasources = data;
        
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
          
            if (response) {
                const seen = new Set();
                var data = [];
               for (const item of state.report_details.data) {
                    const key = `${item.group_id}|${item.entry_type}|${item.report_year_id}`;
                    if (!seen.has(key)){
                         seen.add(key)
                        data.push({
                            group_id: item.group_id,
                            entry_type: item.entry_type,
                            report_year_id: item.report_year_id
                            
                        });
                    }
                }

                state.Tracked_details = data;
                //console.log('tracked_details = ', state.Tracked_details)

            } else {
                alert('No data found for Tracker. ')  
            }

        }
    } catch (error) {
        //console.log(error)
    }
}




//---------------------------------------------------View Entry Functions--------------------------------------------------------------






</script>
