<template>

<div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">ADMINISTER CONFIGURATION TABLE</h1>
            <div class="flex items-center space-x-4">
                <button class="btn btn-primary">Export</button>
                <button class="btn btn-primary">Print</button>
            </div>
</div>        



    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Rights_entry_config</h1>
                <div>
                                <FormLabel for="select_rights" label="Select rights" :required="true" />
                                <FormSelect name="selected_rights" :options="state.options.rights"
                                    v-model="state.selected_rights_id" @click="changeData()" />
                 </div>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button type="button" @click="modalOpen"
                    class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit Format</button>
            </div>
            <FormModal :show="state.isOpen" :close="modalClose" >
   
                <section class="bg-white dark:bg-green-200">
                    <div class="py-8 px-4 mx-auto max-w-screen-xl text-left lg:py-1 lg:px-8">
                     
                        <FormLabel :label="'Sequence Header'" :For="'sequence_header'" />
                        <FormText :name="'sequence_header'" />

                        <FormLabel :label="'Description'" :For="'description'" />
                        <FormText :name="'description'" />

                        <FormLabel :label="'Remarks'" :For="'remarks'" />
                        <FormText :name="'remarks'" />

                    </div>

                </section>
             

            </FormModal>
        </div>
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Order No. </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Sequence Header</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Description</th>   
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Action</th>  
                                   
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="Rights_entry_config in state.Selected_Rights_entry_config.data" v-bind:key="Rights_entry_config.id">
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {{ Rights_entry_config.order_no }} 
                                    </td>
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {{ Rights_entry_config.sequence_header }}
                                    </td>
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {{ Rights_entry_config.description }}
                                    </td>
                                    <td
                                        class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <!-- <button type="button"
                                        class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit</button>
                                        <button type="button"
                                        class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Insert New</button>
                                        <button type="button"
                                        class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Delete</button> -->
                                        <div class="relative cursor-pointer">
                                            ...
                                        </div>                                    
                                        
                                    
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- <Pagination :data="state.Rights_entry_config" @previous="previous" @next="next" /> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup >

import {Rights_entry_configServices } from '~/components/api/Rights_entry_configService'; 


let currentPage = 1;
definePageMeta({
    layout: 'main'
})


const state = reactive({
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
    isOpen: false,
    options: {
        rights: [
            { value: 0, label: 'All Rights' },
            { value: 1, label: 'Rights to Survival' },
            { value: 2, label: 'Rights to Development' },
            { value: 3, label: 'Rights to Protection' },
            { value: 4, label: 'Rights to Participation' },
            { value: 5, label: 'Governance' },
            { value: 6, label: 'General Information' },
        ],
        entry_type: [
            { value: '1', label: 'Totaled Value' },
            { value: '2', label: 'Raw Data' },
        ],
        is_disabled: [
            { value: '1', label: 'Not Applicable' },
            { value: '2', label: 'Enabled' },
        ],
    },
})

onMounted(() => {
    fetchRights_entry_config()
//    changeData()

})

function savefrommodal(){
    state.isOpen = false
}

function modalOpen() {
    state.isOpen = true
}

function modalClose() {
    state.isOpen = false
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

async function fetchRights_entry_config() {
    try {
        let params = {
            page: currentPage
        }
        const response = await Rights_entry_configServices.getRights_entry_config(params)
        if (response.data) {
            state.Rights_entry_config.data = response.data.filter(rights_id1 => rights_id1.sequence_header !== '0' )
            state.Rights_entry_config1.data = response.data.filter(rights_id1 => rights_id1.rights_id === 1 && rights_id1.sequence_header !== '0' )
            state.Rights_entry_config2.data = response.data.filter(rights_id1 => rights_id1.rights_id === 2  && rights_id1.sequence_header !== '0')
            state.Rights_entry_config3.data = response.data.filter(rights_id1 => rights_id1.rights_id === 3  && rights_id1.sequence_header !== '0')
            state.Rights_entry_config4.data = response.data.filter(rights_id1 => rights_id1.rights_id === 4  && rights_id1.sequence_header !== '0')
            state.Rights_entry_config5.data = response.data.filter(rights_id1 => rights_id1.rights_id === 5  && rights_id1.sequence_header !== '0')
            state.Rights_entry_config6.data = response.data.filter(rights_id1 => rights_id1.rights_id === 6  && rights_id1.sequence_header !== '0')
            console.log(response.data)
        }
    } catch (error) { 
        console.log(error)
    }
}
function previous() {
    currentPage--
    fetchRights_entry_config()
}
function next() {
    currentPage++
    fetchRights_entry_config()
}
</script>
