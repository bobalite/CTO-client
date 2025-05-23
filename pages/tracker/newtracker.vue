<template>
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">DATASOURCE TRACKER</h1>
        <!-- <div class="flex items-center space-x-4">
            <button class="btn btn-primary">Export</button>
            <button class="btn btn-primary">Print</button>
        </div> -->
    </div>

    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">

            <div class="mt-8 flow-root">
                <p class="mb-1 text-lg font-normal text-gray-500 sm:text-md sm:px-10 xl:px-1 dark:text-black pb-4 ">
                    Track data completion for each Indicator</p>
                <div class="sm:flex-auto pb-3">
                    <p class="pb-2">Select Report Year</p>
                    <div>
                        <FormSelect class="pb-2" name="selected_year" v-model="state.selected_year_id"
                            :options="state.options.report_years" />
                    </div>
                </div>

                <div class="sm:flex-auto">

                    <p class="pb-2">Select Right</p>
                    <div>
                        <FormSelect class="pb-2" :options="state.options.rights " v-model="state.selected_rights_id"
                            @click="changeData()" />
                    </div>
                </div>
            </div>

            <ModalSaveform :show="state.isViewModalOpen" :close="state.closeViewModal" :title="'View Entries'">
                <form @submit.prevent="verifyclosing">
                    <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12">

                        <GridCell
                            class="sm:col-span-4 text-center  table-header-1  border-1 border-r border-solid border-grey border-l border-t pb-4"
                            :displaytext="'Select Projected Type:'" />

                        <GridSelect v-model="state.selected_view_entry_type" :options="state.options.view_entry_type"
                            :class="'sm:col-span-8 text-center  bg-green-200   border-1 border-solid border-l  border-black border-r pb-4'" />
                        <GridCell
                            class="sm:col-span-4 text-center  table-header-1  border-1 border-t border-r border-solid border-grey border-l pb-4"
                            :displaytext="'Select Datasource:'" />

                        <FormSelect v-model="state.view_selected_datasource" :options="state.options.datasources"
                            :class="'sm:col-span-8 text-center  bg-green-200   border-1 border-solid border-l  border-black border-r pb-4'"
                            :displaytext="''" @click="changeViewdata()" />

                        <GridCell
                            class="sm:col-span-12 flex justify-center items-center text-xl text-white table-header-text  border-white border-t border-l border-r border-b border-grey pb-6"
                            :displaytext=state.selected_group_header />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-white border-l  border-b border-grey pb-6"
                            :displaytext="'Indicator'" />
                        <GridCell class="sm:col-span-2 text-center table-header-4 border-l  border-b border-grey pb-6"
                            :displaytext="'MALE'" />
                        <GridCell class="sm:col-span-2 text-center table-header-4 border-l   border-b border-grey pb-6"
                            :displaytext="'FEMALE'" />
                        <GridCell class="sm:col-span-2 text-center table-header-4 border-l border-b border-grey pb-6"
                            :displaytext="'TOTAL'" />
                        <GridCell class="sm:col-span-2 text-center table-header-4 border-l  border-b border-grey pb-6"
                            :displaytext="'GRAND TOTAL'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-l border-b border-r border-grey pb-6"
                            :displaytext="'Remarks'" />

                        <GridCell class="sm:col-span-2 text-center table-header-4  border-l  border-b border-grey pb-6"
                            :displaytext="''" />
                        <GridCell class="sm:col-span-1 text-center header_table-2 border-l  border-b border-grey pb-6"
                            :displaytext="'ACTUAL'" />
                        <GridCell class="sm:col-span-1 text-center table-header-3 border-l   border-b border-grey pb-6"
                            :displaytext="'PROJECTED'" />
                        <GridCell class="sm:col-span-1 text-center header_table-2  border-l border-b border-grey pb-6"
                            :displaytext="'ACTUAL'" />
                        <GridCell class="sm:col-span-1 text-center table-header-3 border-l  border-b border-grey pb-6"
                            :displaytext="'PROJECTED'" />
                        <GridCell class="sm:col-span-1 text-center header_table-2 border-l border-b  border-grey pb-6"
                            :displaytext="'ACTUAL'" />
                        <GridCell class="sm:col-span-1 text-center table-header-3 border-l border-b  border-grey pb-6"
                            :displaytext="'PROJECTED'" />
                        <GridCell class="sm:col-span-1 text-center header_table-2  border-l  border-b border-grey pb-6"
                            :displaytext="'ACTUAL'" />
                        <GridCell class="sm:col-span-1 text-center table-header-3 border-l border-b pb-6"
                            :displaytext="'PROJECTED'" />
                        <GridCell class="sm:col-span-1 text-center  header_table-2 border-l   border-b border-grey pb-6"
                            :displaytext="'ACTUAL'" />
                        <GridCell
                            class="sm:col-span-1 text-center text-wrap table-header-3   border-r border-l border-b border-grey pb-6"
                            :displaytext="'PROJECTED'" />


                        <template v-for="group in state.Selected_Rights_entry_config_group.data">
                            <GridCell class="sm:col-span-2 text-left table-header-4 border-l border-b border-grey pb-3"
                                :displaytext=group.description />

                            <GridTextView v-model="state.view_male[group.sequence_header]"
                                class="sm:col-span-1 header_table-2 text-right  border-l border-b border-grey pb-2"
                                :entrystatus="group.male" />
                            <GridTextView v-model="state.view_male_projected[group.sequence_header]"
                                class="sm:col-span-1 text-right table-header-3 border-l border-b border-grey pb-2"
                                :entrystatus="group.male" />

                            <GridTextView v-model="state.view_female[group.sequence_header]"
                                class="sm:col-span-1  header_table-2 text-right  border-l border-b border-grey pb-2"
                                :entrystatus="group.female" />
                            <GridTextView v-model="state.view_female_projected[group.sequence_header]"
                                class="sm:col-span-1 text-right table-header-3 border-l border-b border-grey pb-2"
                                :entrystatus="group.female" />

                            <GridTextView v-model="state.view_total[group.sequence_header]"
                                class="sm:col-span-1  header_table-2 text-right  border-l border-b border-grey pb-2"
                                :entrystatus="group.total" />
                            <GridTextView v-model="state.view_total_projected[group.sequence_header]"
                                class="sm:col-span-1 text-right table-header-3 border-l border-b border-grey pb-2"
                                :entrystatus="group.total" />

                            <GridTextView v-model="state.view_grand_total[group.sequence_header]"
                                class="sm:col-span-1  header_table-2 text-right  border-l border-b border-grey pb-2"
                                :entrystatus="group.grand_total" />
                            <GridTextView v-model="state.view_grand_total_projected[group.sequence_header]"
                                class="sm:col-span-1 text-right table-header-3 border-l border-b border-grey pb-2"
                                :entrystatus="group.grand_total" />

                            <GridTextView v-model="state.view_remarks[group.sequence_header]"
                                class="sm:col-span-1 text-center   header_table-2 border-l  border-b border-grey pb-2"
                                :entrystatus="group.remarks" />
                            <GridTextView v-model="state.view_remarks_projected[group.sequence_header]"
                                class="sm:col-span-1 text-center  table-header-3 border-l border-r border-b border-grey pb-2"
                                :entrystatus="group.remarks" />
                        </template>

                        <GridCell class="sm:col-span-12 pb-6" :displaytext="''" />
                        <GridCell class="sm:col-span-12 pb-6" :displaytext="''" />
                        <GridCell class="sm:col-span-5 pb-6" :displaytext="''" />


                        <button
                            class="sm:col-span-3 block rounded-md primary-green px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                            @click="changeViewdata"> Load </button>
                        <GridCell class="sm:col-span-1 pb-6" :displaytext="''" />
                        <button
                            class="sm:col-span-3 block rounded-md primary-green px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                            @click="closeViewModal"> Close </button>

                    </div>
                </form>
            </ModalSaveform>



            <ModalAlert :show="state.isAlertModalOpen" :close="state.closeAlertModal" :title=state.alertmessage>

                <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12">

                    <GridCell class="sm:col-span-4  text-l font-bold text-left   pb-4" :displaytext="''" />
                    <GridCell class="sm:col-span-8  pb-4" :displaytext="''" />

                    <GridCell class="sm:col-span-4  text-l font-bold text-left   pb-4"
                        :displaytext="'Rows Inserted:'" />
                    <GridCell class="sm:col-span-8  pb-4" :displaytext=state.successcount />

                    <GridCell class="sm:col-span-4  text-l font-bold text-left   pb-4"
                        :displaytext="'Errors Encountered:'" />
                    <GridCell class="sm:col-span-8  pb-4" :displaytext=state.errorcount />


                    <GridCell class="sm:col-span-10 " :displaytext="''" />
                    <button
                        class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                        @click="closeAlertModal"> Close </button>

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
                                        Indicator</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Datasources</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Actual</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Local Proj.</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Nat Proj.</th>


                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Action</th>

                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="Rights_entry_config in state.Selected_Rights_entry_config.data"
                                    v-bind:key=Rights_entry_config.id @click="getclicked(Rights_entry_config)">
                                 

                                    <td
                                        class="whitespace-wrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-4">
                                        {{ Rights_entry_config.description }}
                                    </td>

                                    <td
                                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        <span v-for="datasource in Rights_entry_config.datasources"
                                            v-bind:key=Rights_entry_config.datasources.agency_id
                                            class="h-20 w-20 shrink-5 items-center justify-center rounded-lg border border-green-400 bg-green-500 text-[0.625rem] font-large text-black">
                                            <template v-for="agency in state.options.agencies">
                                                <template v-if="agency.value == datasource.agency_id">
                                                    {{ agency.label }}
                                                </template>
                                            </template>

                                        </span>
                                    </td>
                                    <td
                                        class="whitespace-nowrap py-4 pl-4 pr-1 text-sm font-medium text-gray-900 sm:pl-6">
                                        <span class="h-20 w-20 shrink-5 items-center justify-center rounded-md border border-green-400 bg-green-500 text-[0.625rem] font-large text-black">100%</span>
                                        
                                    </td>
                                    <td
                                        class="whitespace-nowrap py-4 pl-4 pr-1 text-sm font-medium text-gray-900 sm:pl-6">
                                        <span class="h-20 w-20 shrink-5 items-center justify-center  border border-green-400 bg-green-500 text-[0.625rem] font-large text-black">100%</span>
                                    </td>
                                    <td
                                        class="whitespace-nowrap py-4 pl-4 pr-1 text-sm font-medium text-gray-900 sm:pl-6">
                                        <span class="h-20 w-20 shrink-5 items-center justify-center  border border-green-400 bg-green-500 text-[0.625rem] font-large text-black">100%</span>
                                    </td>

                                    <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        <FormDropdown>
                                            <MenuItem v-if="state.roles.allow_view == 1" :key="'view'">
                                            <NuxtLink @click="openViewModal"
                                                class="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 bg-white-100 dark:bg-white-900 dark:text-black hover:text-white hover:bg-blue-700">
                                                View Entries
                                            </NuxtLink>
                                            </MenuItem>

                                        </FormDropdown>
                                    </td>
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
import {reportDetailsService } from '~/components/api/ReportDetailsService'; 
import {Childrens_rightsService } from '~/components/api/Rights'; 
import {rolesService } from '~/components/api/Roles'; 
import {useUserStore} from '~/store/user'
import {agenciesService } from '~/components/api/Agencies'; 

import {report_yearService } from '~/components/api/ReportYears'; 

const userStore = useUserStore()

let currentPage = 1;
definePageMeta({
    layout: 'main'
})


const state = reactive({
    agencies:[],
    Rights:[],

    isViewModalOpen: false,
    isAddModalOpen: false,
    isEditModalOpen: false,
    isAlertModalOpen: false,
    alertmessage: '',
    successcount: '',
    errorcount:  '',

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
    selected_year_id: 2,
    datasource_id: 0,
    datasources: [],

    selected_edit_entry_type: 'Actual',
    edit_selected_datasource: 0,

    selected_rights_id: 0,
    selected_sequence_header: '',
    selected_description: '',
    selected_group: 0,

    report_details: [],

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
    report_years: [],
   
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
        report_years:[],
           
    },
})

onMounted(() => {
    fetchRights_entry_config()
    fetchRights()
    fetchrole()
    fetchagencies()
    fetchreportyear()
})


async function fetchagencies() {
    try {
       
        const response = await agenciesService.getAgencies()
       
        if (response.data) {
            state.agencies.data = response.data
            var data = [];
            var datasources = [];
            if (state.agencies.data != null) {
                
                datasources = state.agencies.data

                for (const i in datasources) {
                    const value = datasources[i].id;
                    if (!datasources.includes(value)) {
                        data[i] = { "value": datasources[i].id, "label": datasources[i].name };
                    }
                }
                state.options.agencies = data;
            }
        }
    } catch (error) { 
        console.log(error)
    }
}


async function fetchrole() {
    try {
           const response = await rolesService.getRole(userStore.getUser.user_roles.roles_id)
        if (response.data) {
            state.roles = response.data
            console.log(state.roles)
        }
    } catch (error) { 
        console.log(error)
    }
}



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
                        data[i] = { "value": datasources[i].id, "label": datasources[i].name };
                    }
                }
                state.options.report_years = data;
            }

        }
    } catch (error) { 
        console.log(error)
    }
}


function closeAlertModal() { 
    state.isAlertModalOpen = false
} 

function getclicked(Rights_entry_config){
  
     state.selected_sequence_header = Rights_entry_config.sequence_header
     state.selected_description = Rights_entry_config.description
     state.selected_group_header = Rights_entry_config.group_header
     state.selected_group = Rights_entry_config.group
     state.Selected_Rights_entry_config_group.data  = state.Rights_entry_config.data .filter(Rights_entry_config => Rights_entry_config.group ===  state.selected_group)
     console.log(state.Selected_Rights_entry_config_group.data)
     if (state.Selected_Rights_entry_config_group.data != null){ 
       var data = [];
       var datasources = [];
       datasources = state.Selected_Rights_entry_config_group.data[1].datasources
       
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
            console.log(state.Rights.data[0].description)
        }

       var data = [];
       for (const i in state.Rights.data){
        data[i] =  { "value":  state.Rights.data[i].id, "label": state.Rights.data[i].description };
       
        }

        state.options.rights = data;
        console.log( state.options.rights)

    } catch (error) {
        console.log(error)
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
            console.log(response.data)
        }
    } catch (error) { 
        console.log(error)
    }
}







//---------------------------------------------------View Entry Functions--------------------------------------------------------------

function openViewModal() {
     clearViewData();
    state.isViewModalOpen = true;
}

function clearViewData(){
    try {
         for (let i = 0; i < state.Selected_Rights_entry_config_group.data.length; i++) {

                state.view_male[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.view_female[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.view_total[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.view_grand_total[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.view_remarks[state.Selected_Rights_entry_config_group.data[i].sequence_header] = ''
                
                state.view_male_projected[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.view_female_projected[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.view_total_projected[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.view_grand_total_projected[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.view_remarks_projected[state.Selected_Rights_entry_config_group.data[i].sequence_header] = ''
                
         }
    }
    catch (error) {
        console.log(error)
    }
}

function changeViewdata() {
    clearViewData()
    fetchReports_Details_Actuals()
    fetchReports_Details_Projected()
    
}

async function fetchReports_Details_Actuals() {
    try {
        let params = {
            group_id: state.selected_group,
            report_year_id: state.selected_year_id,
            is_active: 1,
            entry_type: 'Actual',
            group_agency_datasource_id: state.view_selected_datasource
        }


        const response = await reportDetailsService.getReportDetails(params)
        
        if (response.data) {
            state.report_details.data = response.data
          
            if (response) {
                for (const c in state.report_details.data) {
                    state.view_female[state.report_details.data[c].sequence_header] = state.report_details.data[c].female;
                    state.view_male[state.report_details.data[c].sequence_header] = state.report_details.data[c].male;
                    state.view_total[state.report_details.data[c].sequence_header] = state.report_details.data[c].total;
                    state.view_grand_total[state.report_details.data[c].sequence_header] = state.report_details.data[c].grand_total;
                    state.view_remarks[state.report_details.data[c].sequence_header] = state.report_details.data[c].remarks;

                    // for actual
                }
            } else {
                alert('No data found for ACTUAL Entries. ')  
            }
            

        }
    } catch (error) {
        console.log(error)
    }
}

async function fetchReports_Details_Projected() {
    try {
        let params = {
            group_id: state.selected_group,
            report_year_id: state.selected_year_id,
            is_active: 1,
            entry_type: state.selected_view_entry_type,
            group_agency_datasource_id: state.view_selected_datasource
        }


        const response = await reportDetailsService.getReportDetails(params)
        //console.log(response)
        console.log(params)
        if (response.data) {
            state.report_details.data = response.data
          
            if (response){

                for (const c in state.report_details.data) {
                    state.view_female_projected[state.report_details.data[c].sequence_header] = state.report_details.data[c].female;
                    state.view_male_projected[state.report_details.data[c].sequence_header] = state.report_details.data[c].male;
                    state.view_total_projected[state.report_details.data[c].sequence_header] = state.report_details.data[c].total;
                    state.view_grand_total_projected[state.report_details.data[c].sequence_header] = state.report_details.data[c].grand_total;
                    state.view_remarks_projected[state.report_details.data[c].sequence_header] = state.report_details.data[c].remarks;

                    // for actual
                }
               
            } else {
                alert('No data found for this Projected Entry. ')
            }

            
            

        }
    } catch (error) {
        console.log(error)
    }
}

function closeViewModal() {
    state.isViewModalOpen = false
    
}

//---------------------------------------------------View Entry Functions--------------------------------------------------------------




</script>
