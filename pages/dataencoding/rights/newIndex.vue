<template>
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">ENCODE DATA INDICATORS</h1>
       
    </div>

    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">

            <div class="mt-8 flow-root">

                <div class="flex gap2 sm:gap-3 items-center">
                    <div class="flex-1">
                        <FormYearSelector v-model="state.selected_year_id" :options="state.options.years"
                            :change-selected-year="changeYear()" />

                        <FormRightSelector :options="state.options.rights" v-model="state.selected_rights_id"
                            @click="changeData" />
                    </div>
                    <div class="flex-1">

                    </div>
                </div>
            </div>

            <!-- View Modal -->
            <ModalSaveform :show="state.isViewModalOpen" :close="state.closeViewModal" :title="'View Entries'">
                <form @submit.prevent="verifyclosing">
                    <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-16">


                        <GridCell
                            class="sm:col-span-16 flex rounded-t-lg bg-green-700 justify-center text-sm text-black  rounded-left border-white  border-l  pb-1"
                            :displaytext="''" />

                        <GridCell
                            class="sm:col-span-1 flex bg-yellow-400 justify-center text-xl text-black   border-white  border-l border-r border-b pb-1"
                            :displaytext="'1'" />

                        <GridCell
                            class="sm:col-span-5 flex justify-center items-left text-md text-white table-header-text  border-white  border-r border-b pb-1"
                            :displaytext="'MATERNAL CARE & SERVICES'" />

                        <GridCell
                            class="sm:col-span-10 flex justify-center items-left text-md text-white table-header-text  border-white  border-r border-b pb-1"
                            :displaytext="'MATERNAL DELIVERIES'" />
                        <GridCell
                            class="sm:col-span-6 text-center table-header-4 border-white border-l border-b border-grey pb-1"
                            :displaytext="'INDICATOR'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
                            :displaytext="'MALE'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
                            :displaytext="'FEMALE'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-white  border-l border-b border-grey pb-1"
                            :displaytext="'TOTAL'" />

                        <GridCell
                            class="sm:col-span-4 text-center table-header-4 border-white border-l border-b border-r border-grey pb-1"
                            :displaytext="'REMARKS'" />

                        <template v-for="group in state.Selected_Rights_entry_config_group.data">

                            <GridCell
                                class="sm:col-span-1 px-2 text-left table-header-4 text-xs border-white ring-1 ring-white  pb-1"
                                :displaytext="'1.1.1'" />

                            <GridCell
                                class="sm:col-span-5 px-1 text-left table-header-4 text-xs border-white ring-1 ring-white  pb-1"
                                :displaytext=group.description />

                            <GridTextView v-model="state.view_male[group.sequence_header]"
                                class="sm:col-span-2 text-right border-l border-b border-grey pb-1"
                                :entrystatus="group.male" />

                            <GridTextView v-model="state.view_female[group.sequence_header]"
                                class="sm:col-span-2 text-right border-l border-b border-grey pb-1"
                                :entrystatus="group.female" />

                            <GridTextView v-model="state.view_total[group.sequence_header]"
                                class="sm:col-span-2 text-right border-l border-b border-grey pb-1"
                                :entrystatus="group.total" />


                            <GridCell v-model="state.view_remarks[group.sequence_header]"
                                class="sm:col-span-4 px-1 table-header-4 text-center text-xs border-l  border-b border-grey pb-1"
                                :entrystatus="group.remarks"
                                :displaytext="'The Quick brown fox jumps over the lazy dogs near the bank of the river '" />

                        </template>
                        <GridCell
                            class="sm:col-span-16 flex rounded-b-lg bg-green-500 justify-center text-sm text-black  rounded-left border-white  border-l  pb-2"
                            :displaytext="''" />

                        <GridCell class="sm:col-span-12 pb-6" :displaytext="''" />
                        <GridCell class="sm:col-span-12 pb-6" :displaytext="''" />
                        <GridCell class="sm:col-span-5 pb-6" :displaytext="''" />

                        <GridCell class="sm:col-span-1 pb-6" :displaytext="''" />
                        <button
                            class="sm:col-span-3 block rounded-md primary-green px-3 py-2 text-center text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mr-8"
                            @click="changeViewdata">
                            Load
                        </button>
                        <button
                            class="sm:col-span-3 block rounded-md primary-green px-3 py-2 text-center text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            @click="closeViewModal">
                            Close
                        </button>

                    </div>
                </form>
            </ModalSaveform>

            <!-- Add Modal -->
            <ModalSaveform :show="state.isAddModalOpen" :close="state.closeAddEntryModal" :title="'Add Entry'">
                <form @submit.prevent="verifyclosing">
                    <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-16  border-solid border-grey  pb-6">

                        <GridCell
                            class="sm:col-span-16 flex rounded-t-lg bg-green-700 justify-center text-sm text-black  border-white  border-l  pb-3"
                            :displaytext="''" />

                        <GridCell
                            class="sm:col-span-1 flex bg-yellow-400 justify-center text-xl text-black   border-white  border-l border-r border-b pb-1"
                            :displaytext="'1'" />

                        <GridCell
                            class="sm:col-span-5 flex justify-center items-left text-md text-white table-header-text  border-white  border-r border-b pb-1"
                            :displaytext="'MATERNAL CARE & SERVICES'" />

                        <GridCell
                            class="sm:col-span-10 flex justify-center items-left text-md text-white table-header-text  border-white  border-r border-b pb-1"
                            :displaytext="'MATERNAL DELIVERIES'" />
                        <GridCell
                            class="sm:col-span-6 text-center table-header-4 border-white border-l border-b border-grey pb-1"
                            :displaytext="'INDICATOR'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
                            :displaytext="'MALE'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
                            :displaytext="'FEMALE'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-white  border-l border-b border-grey pb-1"
                            :displaytext="'TOTAL'" />

                        <GridCell
                            class="sm:col-span-4 text-center table-header-4 border-white border-l border-b border-r border-grey pb-1"
                            :displaytext="'REMARKS'" />

                        <template v-for="group in state.Selected_Rights_entry_config_group.data">
                            <GridCell
                                class="sm:col-span-1 px-2 text-left table-header-4 text-xs border-white ring-1 ring-white  pb-1"
                                :displaytext="'1.1.1'" />

                            <GridCell
                                class="sm:col-span-5 text-left table-header-4 border-l text-xs border-b border-grey  ring-1 ring-white  pb-1"
                                :displaytext=group.description />
                            <GridTextEntry v-model="state.male[group.sequence_header]"
                                class="sm:col-span-2 text-right border-l border-b border-grey  pb-2"
                                :displaytext="'male'" :entrystatus="group.male" />
                            <GridTextEntry v-model="state.female[group.sequence_header]"
                                class="sm:col-span-2 text-right  border-l border-b border-grey  pb-2"
                                :displaytext="'female'" :entrystatus="group.female" />
                            <GridTextEntry v-model="state.total[group.sequence_header]"
                                class="sm:col-span-2 text-right border-l border-b border-grey  pb-2"
                                :displaytext="'total'" :entrystatus="group.total" />

                            <GridTextArea v-model="state.remarks[group.sequence_header]"
                                class="sm:col-span-4 text-center border-l border-r border-b border-grey focus:outline-none pb-2"
                                :displaytext="'remarks'" />

                        </template>

                        <GridCell
                            class="sm:col-span-16 flex rounded-b-lg bg-green-500 justify-center text-sm text-black  rounded-left border-white  border-l  pb-2"
                            :displaytext="''" />
                        <GridCell class="sm:col-span-12 pb-6" :displaytext="''" />
                        <GridCell class="sm:col-span-10 pb-6 text-xl font-bold" :displaytext=state.report_schedule />
                        <GridCell class="sm:col-span-4 pb-6" :displaytext="''" />
                        <GridCell class="sm:col-span-2 pb-6" :displaytext="''" />
                        <button
                            class="sm:col-span-2 block rounded-md primary-green px-3 py-2 text-center text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mr-8"
                            @click="closeAddEntryModal">
                            Cancel
                        </button>

                        <button :disabled="state.buttoncompute"
                            class="sm:col-span-2 block rounded-md primary-green px-3 py-2 text-center text-md font-semibold text-white shadow-sm disabled:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mr-8"
                            @click="computeAddEntryModal">
                            Compute
                        </button>

                        <button :disabled="state.buttonsavenew"
                            class="sm:col-span-2 block rounded-md primary-green px-3 py-2 text-center text-md font-semibold text-white shadow-sm disabled:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            @click="SaveAddEntryModal">
                            Save
                        </button>


                    </div>

                </form>
            </ModalSaveform>

            <!-- Edit Modal -->
            <ModalSaveform :show="state.isEditModalOpen" :close="state.closeEditModal" :title="'Edit Entry'">
                <form @submit.prevent="verifyclosing">
                    <div
                        class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-16  border-solid border-grey border-t pb-4">


                        <GridCell
                            class="sm:col-span-16 flex rounded-t-lg bg-green-700 justify-center text-sm text-black  rounded-left border-white  border-l  pb-1"
                            :displaytext="''" />

                        <GridCell
                            class="sm:col-span-1 flex bg-yellow-400 justify-center text-xl text-black   border-white  border-l border-r border-b pb-1"
                            :displaytext=state.Selected_Rights_entry_config_group.data[0].group />

                        <GridCell
                            class="sm:col-span-5 flex justify-center items-left text-md text-white table-header-text  border-white  border-r border-b pb-1"
                            :displaytext="'MATERNAL CARE & SERVICES'" />

                        <GridCell
                            class="sm:col-span-10 flex justify-center items-left text-md text-white table-header-text  border-white  border-r border-b pb-1"
                            :displaytext="'MATERNAL CARE & SERVICES'" />
                        <GridCell
                            class="sm:col-span-6 text-center table-header-4 border-white border-l border-b border-grey pb-1"
                            :displaytext="'INDICATOR'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
                            :displaytext="'MALE'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
                            :displaytext="'FEMALE'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-white  border-l border-b border-grey pb-1"
                            :displaytext="'TOTAL'" />

                        <GridCell
                            class="sm:col-span-4 text-center table-header-4 border-white border-l border-b border-r border-grey pb-1"
                            :displaytext="'REMARKS'" />

                        <template v-for="group in state.Selected_Rights_entry_config_group.data">

                            <GridCell
                                class="sm:col-span-1 px-2 text-left table-header-4 text-xs border-white ring-1 ring-white  pb-1"
                                :displaytext="'1.1.1'" />

                            <GridCell
                                class="sm:col-span-5 text-left px-1 text-sm table-header-4 border-l border-b border-white  ring-1 ring-white pb-3"
                                :displaytext=group.description />
                            <GridTextEdit v-model="state.edit_male[group.sequence_header]"
                                class="sm:col-span-2 text-right border-l border-b border-grey pb-2"
                                :displaytext="'male'" :entrystatus="group.male" />
                            <GridTextEdit v-model="state.edit_female[group.sequence_header]"
                                class="sm:col-span-2 text-right border-l border-b border-grey pb-2"
                                :displaytext="'female'" :entrystatus="group.female" />
                            <GridTextEdit v-model="state.edit_total[group.sequence_header]"
                                class="sm:col-span-2 text-right border-l border-b border-grey pb-2"
                                :displaytext="'total'" :entrystatus="group.total" />

                            <GridTextArea v-model="state.edit_remarks[group.sequence_header]"
                                class="sm:col-span-4 text-center border-l border-r border-b border-grey focus:outline-none pb-2"
                                :displaytext="'remarks'" />

                        </template>

                        <GridCell
                            class="sm:col-span-16 flex rounded-b-lg bg-green-500 justify-center text-sm text-black  rounded-left border-white  border-l  pb-2"
                            :displaytext="''" />

                        <GridCell class="sm:col-span-12 pb-6" :displaytext="''" />
                        <GridCell class="sm:col-span-12 pb-6" :displaytext="''" />
                        <GridCell class="sm:col-span-6 pb-6" :displaytext="''" />
                        <button
                            class="sm:col-span-2 block rounded-md primary-green px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mr-8"
                            @click="closeEditModal">
                            Cancel
                        </button>
                        <button :disabled="state.buttoncomputeEdit"
                            class="sm:col-span-2 block rounded-md primary-green px-3 py-2 text-center text-md font-semibold text-white shadow-sm disabled:bg-gray-300 hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mr-8"
                            @click="computeEditEntryModal">
                            Compute
                        </button>
                        <button :disabled="state.buttonsaveEdit"
                            class="sm:col-span-2 block rounded-md primary-green px-3 py-2 text-center text-md font-semibold text-white shadow-sm disabled:bg-gray-300 hover:bg-green-500 focus-visible:outline focus-visible-outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            @click="SaveEditEntryModal">
                            Save
                        </button>
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

            <ModalAlert :show="state.isUploadModalOpen" :close="state.closeUploadModal" :title=state.alertmessage>



                <FormExelUpload />


                <GridCell class="sm:col-span-10 " :displaytext="''" />

                <div class="flex justify-center items-center p-4 gap-x-4">


                    <button
                        class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 p-4 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                        @click="closeUploadModal"> Upload </button>




                    <button
                        class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 p-4 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                        @click="closeUploadModal"> Close </button>
                </div>


            </ModalAlert>




        </div>


        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <!-- <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Group No. </th>

                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Indicator</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Agency</th>

                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Report Submission</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Action</th>

                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="Rights_entry_config in state.Selected_Rights_entry_config.data"
                                    v-bind:key=Rights_entry_config.id @click="getclicked(Rights_entry_config)">

                                    <template v-if="Rights_entry_config.tier_level == 1">
                                        <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            <span
                                                class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-center rounded-2xl border border-green-400 bg-green-500  font-large text-black">
                                                {{ Rights_entry_config.group }}
                                            </span>
                                        </td>

                                        <td class="py-4 pl-4 pr-3 text-md font-medium text-gray-900 sm:pl-6">
                                            {{ Rights_entry_config.description }}
                                        </td>





                                        
                                        <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            <span v-bind:key=Rights_entry_config.agency_id
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
                                                {{ Rights_entry_config.is_annual == 1 ? 'Annualy' : 'Quarterly' }}
                                            </span>

                                            <span v-if="Rights_entry_config.is_annual == 0"
                                                class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-center rounded-2xl  border-red-200 bg-red-200  font-large text-black">
                                                {{ Rights_entry_config.is_annual == 1 ? 'Annualy' : 'Quarterly' }}
                                            </span>

                                        </td>

                                      

                                        <td v-if="Rights_entry_config.agency_id === state.currentUser || state.roles.name == 'ADMIN'"
                                            class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            <FormDropdown>
                                                <MenuItem v-if="state.roles.allow_view == 1" :key="'view'">
                                                <NuxtLink @click="openViewModal"
                                                    class="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 bg-white-100 dark:bg-white-900 dark:text-black hover:text-white hover:bg-blue-700">
                                                    View Entries
                                                </NuxtLink>
                                                </MenuItem>

                                                <MenuItem v-if="state.roles.allow_add == 1" :key="'add'">
                                                <NuxtLink @click="openAddEntryModal"
                                                    class="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 bg-white-100 dark:bg-white-900 dark:text-black hover:text-white hover:bg-blue-700">
                                                    Add Entry
                                                </NuxtLink>
                                                </MenuItem>

                                                <MenuItem v-if="state.roles.allow_edit == 1" :key="'edit'">
                                                <NuxtLink @click="openEditModal"
                                                    class="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 bg-white-100 dark:bg-white-900 dark:text-black hover:text-white hover:bg-blue-700">
                                                    Edit Entry
                                                </NuxtLink>
                                                </MenuItem>

                                                <MenuItem
                                                    v-if="state.roles.allow_edit == 1 && Rights_entry_config.group == 1"
                                                    :key="'upload'">
                                                <NuxtLink @click="openUploadModal"
                                                    class="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 bg-white-100 dark:bg-white-900 dark:text-black hover:text-white hover:bg-blue-700">
                                                    Upload Excel
                                                </NuxtLink>
                                                </MenuItem>

                                            </FormDropdown>
                                        </td>

                                    </template>
                                </tr>
                            </tbody>
                        </table> -->

                        <table class="min-w-full border border-gray-300 rounded-xl overflow-hidden">
                            <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
                                <tr>
                                    <th class="px-4 py-2 text-left w-3/4">Description</th>
                                    <th class="px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                <!-- CATEGORY LEVEL -->
                                <template v-for="category in categories" :key="category.id">
                                    <tr class="border-b hover:bg-gray-50 cursor-pointer transition"
                                        @click="toggleCategory(category.id)">
                                        <td class="px-4 py-3 font-medium flex items-center gap-2">
                                            <svg :class="[
                                                'w-4 h-4 transform transition-transform duration-200',
                                                expandedCategories.includes(category.id) ? 'rotate-90' : ''
                                            ]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                            {{ category.description }}
                                        </td>
                                        <td class="px-4 py-3 text-sm text-blue-600">
                                            {{ expandedCategories.includes(category.id) ? 'Hide Subcategories' : 'Show Subcategories' }}
                                        </td>
                                    </tr>

                                    <!-- SUBCATEGORY LEVEL -->
                                    <TransitionGroup name="fade" tag="template">
                                        <tr v-for="subcategory in category.indicator_subcategories"
                                            :key="`sub-${subcategory.id}`"
                                            v-show="expandedCategories.includes(category.id)" class="bg-gray-50">
                                            <td colspan="2"
                                                class="pl-8 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                                                @click="toggleSubcategory(subcategory.id)">
                                                <svg :class="[
                                                    'w-4 h-4 transform transition-transform duration-200',
                                                    expandedSubcategories.includes(subcategory.id) ? 'rotate-90' : ''
                                                ]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M9 5l7 7-7 7" />
                                                </svg>
                                                {{ subcategory.name }}
                                            </td>
                                        </tr>

                                        <!-- GROUP LEVEL -->
                                        <tr v-for="group in subcategory.indicator_groups" :key="`grp-${group.id}`"
                                            v-show="expandedSubcategories.includes(subcategory.id)">
                                            <td colspan="2"
                                                class="pl-16 py-1 text-sm text-gray-700 bg-gray-100 border-b border-gray-200">
                                                • {{ group.name }}
                                            </td>
                                        </tr>
                                    </TransitionGroup>
                                </template>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>

    </div>

</template>

<script setup>

import { MenuItem } from '@headlessui/vue'

import {indicatorService} from '~/components/api/IndicatorCategoryService';

import { reportDetailsService } from '~/components/api/ReportDetailsService';
import { reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService';
import { Childrens_rightsService } from '~/components/api/Rights';
import { rolesService } from '~/components/api/Roles';
import { useUserStore } from '~/store/user'
import { report_yearService } from '~/components/api/ReportYears';

const userStore = useUserStore()

let currentPage = 1;
definePageMeta({
    layout: 'main'
})

const state = reactive({

    Rights: [],

    currentUser: '', //userStore.currentUser,

    isViewModalOpen: false,
    isAddModalOpen: false,
    isEditModalOpen: false,
    isAlertModalOpen: false,
    isUploadModalOpen: false,
    alertmessage: '',
    successcount: '',
    errorcount: '',
    errormessage: '',

    buttoncompute: false,
    buttonsavenew: true,

    report_schedule: '',



    buttoncomputeEdit: false,
    buttonsaveEdit: true,

    roles: [{}],


    male: [{}],
    female: [{}],
    total: [{}],
    grand_total: [{}],
    remarks: [{}],

    edit_ids: [{}],
    edit_female: [{}],
    edit_total: [{}],
    edit_male: [{}],
    edit_grand_total: [{}],
    edit_remarks: [{}],

    view_male: [{}],
    view_female: [{}],
    view_total: [{}],
    view_grand_total: [{}],
    view_remarks: [{}],
    view_selected_datasource: 1,

    view_male_projected: [{}],
    view_female_projected: [{}],
    view_total_projected: [{}],
    view_grand_total_projected: [{}],
    view_remarks_projected: [{}],

    totaled_from: [{}],
    test: [{}],

    selected_entry_type: 'Actual',
    selected_view_entry_type: 'Projected',
    selected_year_id: 1,
    datasource_id: 0,
    datasources: [],

    selected_edit_entry_type: 'Actual',
    edit_selected_datasource: 0,

    selected_rights_id: 1,
    selected_sequence_header: '',
    selected_description: '',
    selected_group: 0,
    selected_agency_id: 0,
    selected_submission: '',

    report_details: [],
    report_years: [],

    selected_group_header: '',
    Selected_Rights_entry_config_parent: [],
    Selected_Rights_entry_config_group: [],
    selected_year: '',

    clicked_Rights_entry_config: [],
    Selected_Rights_entry_config: [],
    Rights_entry_config: [],
    Rights_entry_config1: [],
    Rights_entry_config2: [],
    Rights_entry_config3: [],
    Rights_entry_config4: [],
    Rights_entry_config5: [],
    Rights_entry_config6: [],

    Rights_detail_filtered: [],

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
        years: [
            { value: '1', label: 'Jan - Dec 2024', year: '2024' },
            { value: '2', label: 'Jan - Dec 2025', year: '2025' },

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


// options: {
//      },

onMounted(() => {
    fetchreportyear()
    fetchRights()
    
    fetchrole()
    fetchRights_entry_config()

})

async function fetchreportyear() {
    try {
        const response = await report_yearService.getReportYears()
        //console.log(response)
        if (response.data) {

            state.report_years.data = response.data
            var data = [];
            var datasources = [];
            if (state.report_years.data != null) {

                datasources = state.report_years.data

                for (const i in datasources) {
                    const value = datasources[i].id;
                    if (!datasources.includes(value)) {

                        if (datasources[i].status == 1) {
                            data[i] = { "value": datasources[i].id, "label": datasources[i].name, "year": datasources[i].year };
                        }
                    }
                }
                state.options.years = data;
                //console.log(state.options.report_years)
            }

        }
    } catch (error) {
        //console.log(error)
    }
}

function changeYear() {
    state.selected_year_id = state.selected_year_id
    state.selected_year = state.options.years.find(year => year.value === state.selected_year_id)?.year || '';
    console.log('selected_year = ', state.selected_year)
}




async function fetchrole() {
    try {

        //console.log('userStore.getUser.userRole.role_id',userStore.getUser.userRole.role_id)
        
        const response = await rolesService.getRole(userStore.getUser.userRole.role_id)
        
        //console.log('response',response)
        state.currentUser = userStore.getUser.userRole.agency_id
        // console.log('user_agency', state.currentUser)
        // console.log(state.currentUser.id)
        // console.log('userRole', userStore.getUser.userRole.name)
        // console.log('user_role_id', state.roles)

        if (response.data) {
            state.roles = response.data

            //console.log(state.roles)
        }
    } catch (error) {
        console.log(error)
    }
}


function openAlertModal(group, alertmessage, group_header, errorcount, successcount) {
    state.isAlertModalOpen = true;
    state.alertmessage = alertmessage;
    state.group = group;
    state.group_header = group_header;
    state.errorcount = errorcount;
    state.successcount = successcount;
}

function closeAlertModal() {
    state.isAlertModalOpen = false
}

function closeUploadModal() {
    state.isUploadModalOpen = false
}

function getclicked(Rights_entry_config) {

    state.selected_sequence_header = Rights_entry_config.sequence_header
    state.selected_agency_id = Rights_entry_config.agency_id
    state.selected_description = Rights_entry_config.description
    state.selected_group_header = Rights_entry_config.group_header
    state.datasource_id = Rights_entry_config.agency_id
    state.selected_group = Rights_entry_config.group
    state.Selected_Rights_entry_config_group.data = state.Rights_entry_config.data.filter(Rights_entry_config => Rights_entry_config.group === state.selected_group)
    state.selected_submission = Rights_entry_config.is_annual
    state.report_schedule = (Rights_entry_config.is_annual == 1 ? 'Annualy' : 'Quarterly')
    //console.log('state.report_schedule', state.report_schedule)


}


function fetchIndicatorsConfig(){


}


function changeData() {


    switch (state.selected_rights_id) {
        case (0):
            state.Selected_Rights_entry_config = state.Rights_entry_config
            break;
        case (1):
            state.Selected_Rights_entry_config = state.Rights_entry_config1
            break;
        case (2):
            state.Selected_Rights_entry_config = state.Rights_entry_config2
            break;
        case (3):
            state.Selected_Rights_entry_config = state.Rights_entry_config3
            break;
        case (4):
            state.Selected_Rights_entry_config = state.Rights_entry_config4
            break;
        case (5):
            state.Selected_Rights_entry_config = state.Rights_entry_config5
            break;
        case (6):
            state.Selected_Rights_entry_config = state.Rights_entry_config6
            break;
        default:
            state.Selected_Rights_entry_config = state.Rights_entry_config
        //console.log(state.Selected_Rights_entry_config)

    }
}

async function fetchRights() {
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
        for (const i in state.Rights.data) {

            data[i] = { "value": state.Rights.data[i].id, "label": state.Rights.data[i].description };

        }

        state.options.rights = data;
        //console.log( state.options.rights)

    } catch (error) {
        //console.log(error)
    }
}

async function fetchRights_entry_config() {
    try {
        //   
        const response = await indicatorService.getIndicatorCategories()
        console.log(response)
        if (response.data) {

            const filteredData = response.data.filter(item =>
                item.sequence_header !== '0' && item.parent_entry !== 0
            );
            state.Rights_entry_config.data = filteredData;

            console.log('filteredData', filteredData)


            // state.Rights_entry_config1.data = filteredData.filter(rights_id1 => rights_id1.rights_id === 1); // from copilot
            // state.Rights_entry_config2.data = filteredData.filter(rights_id1 => rights_id1.rights_id === 2);
            // state.Rights_entry_config3.data = filteredData.filter(rights_id1 => rights_id1.rights_id === 3);
            // state.Rights_entry_config4.data = filteredData.filter(rights_id1 => rights_id1.rights_id === 4);
            // state.Rights_entry_config5.data = filteredData.filter(rights_id1 => rights_id1.rights_id === 5);
            // state.Rights_entry_config6.data = filteredData.filter(rights_id1 => rights_id1.rights_id === 6);

            for (let i = 1; i <= 6; i++) {
                state[`Rights_entry_config${i}`].data = filteredData.filter(
                    item => item.rights_id === i
                );
            }

            console.log('state.Rights_entry_config1', state.Rights_entry_config1)


         }
   
     } catch (error) {
         console.log(error)
     }
}


//---------------------------------------------------View Entry Functions--------------------------------------------------------------

function openViewModal() {
    //fetchReports_Details();
    clearViewData();

    state.isViewModalOpen = true;
}

function clearViewData() {
    // state.view_male = [],
    // state.view_female = [],
    // state.view_total = [],
    // state.view_grand_total = [],
    // state.view_remarks = []

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
        //console.log(error)
    }
}

function changeViewdata() {
    clearViewData()
    fetchReports_Details_Actuals()
    fetchReports_Details_Projected()

}

async function fetchReports_Details_Actuals() {
    try {

        const response = await reportDetailsGroupsService.getReportDetailsGroups()


        state.Rights_detail_filtered.data = response.data.filter(filtered_detail => filtered_detail.group_id === state.selected_group && filtered_detail.entry_type === 'Actual' && filtered_detail.report_year_id === state.selected_year_id && filtered_detail.is_active === 1)
        //console.log( 'filtered - actual', state.Rights_detail_filtered)

        if (state.Rights_detail_filtered) {
            state.report_details.data = state.Rights_detail_filtered.data

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
                //alert('No data found for ACTUAL Entries. ')  
            }


        }
    } catch (error) {
        //console.log(error)
    }
}

async function fetchReports_Details_Projected() {
    try {
        // let params = {
        //     group_id: state.selected_group,
        //     report_year_id: state.selected_year_id,
        //     is_active: 1,
        //     entry_type: state.selected_view_entry_type,
        //     group_agency_datasource_id: 0 //state.view_selected_datasource
        // }


        //const response = await reportDetailsService.getReportDetails(params)
        const response = await reportDetailsGroupsService.getReportDetailsGroups()


        state.Rights_detail_filtered.data = response.data.filter(filtered_detail => filtered_detail.group_id === state.selected_group && filtered_detail.entry_type === state.selected_view_entry_type && filtered_detail.report_year_id === state.selected_year_id && filtered_detail.is_active === 1)

        //console.log( 'filtered - projected', state.Rights_detail_filtered)
        //console.log('view - response projected', response)
        //console.log('view - params projected', state.selected_view_entry_type)

        if (response.data) {
            state.report_details.data = state.Rights_detail_filtered.data

            if (state.report_details.data) {

                for (const c in state.report_details.data) {
                    state.view_female_projected[state.report_details.data[c].sequence_header] = state.report_details.data[c].female;
                    state.view_male_projected[state.report_details.data[c].sequence_header] = state.report_details.data[c].male;
                    state.view_total_projected[state.report_details.data[c].sequence_header] = state.report_details.data[c].total;
                    state.view_grand_total_projected[state.report_details.data[c].sequence_header] = state.report_details.data[c].grand_total;
                    state.view_remarks_projected[state.report_details.data[c].sequence_header] = state.report_details.data[c].remarks;

                    // for actual
                }

            } else {
                //alert('No data found for this Projected Entry. ')
            }




        }
    } catch (error) {
        //console.log(error)
    }
}

function closeViewModal() {
    state.isViewModalOpen = false

}

//---------------------------------------------------View Entry Functions--------------------------------------------------------------




//---------------------------------------------------Add Entry Functions--------------------------------------------------------------

async function check_fetchReports_Details_Add() {


    for (let i = state.Selected_Rights_entry_config_group.data.length - 1; i >= 0; i--) {
        var totaled_to = state.Selected_Rights_entry_config_group.data[i].totaled_to;
        var totaled_from = state.Selected_Rights_entry_config_group.data[i].totaled_from;
        var sequence_header = state.Selected_Rights_entry_config_group.data[i].sequence_header;
        if (totaled_from != 'NA') {
            state.total[sequence_header] = 0;
            state.male[sequence_header] = 0;
            state.female[sequence_header] = 0;
            state.grand_total[sequence_header] = 0;
        }
        if (totaled_to == 'NA' && totaled_from != 'NA') {
            state.total[sequence_header] = 0;
            state.male[sequence_header] = 0;
            state.female[sequence_header] = 0;
            state.grand_total[sequence_header] = 0;
        }
    }
    try {

        const response = await reportDetailsGroupsService.getReportDetailsGroups()

        //  console.log('response -add', response)
        //  console.log('year for annual -add',  state.report_years.data[state.selected_year_id].year) 
        //  console.log('state.selected_year_id -add',  state.selected_year_id)    
        //  console.log('state.selected_submission -add',  state.selected_submission) 


        if (state.selected_submission == 1) { // if annual
            state.Rights_detail_filtered.data = response.data.filter(filtered_detail => filtered_detail.group_id === state.selected_group && filtered_detail.entry_type === state.selected_entry_type && filtered_detail.report_year === state.selected_year && filtered_detail.is_active === 1)
        } else { // if quarterly
            state.Rights_detail_filtered.data = response.data.filter(filtered_detail => filtered_detail.group_id === state.selected_group && filtered_detail.entry_type === state.selected_entry_type && filtered_detail.report_year_id === state.selected_year_id && filtered_detail.is_active === 1)
        }


        //  console.log('year for annual -add',  state.report_years.data[state.selected_year_id].year)   
        //  console.log('state.selected_entry_type -add',  state.selected_entry_type) 
        //  console.log('state.selected_year_id -add',  state.selected_year_id)  
        //  console.log('state.Rights_detail_filtered.data -add - check' ,state.Rights_detail_filtered.data)

        if (state.Rights_detail_filtered.data.length > 0 && state.selected_submission == 0) {
            alert('Entry Type ' + state.selected_entry_type + ' has been found, Please select another entry type or Edit the existing entry.')
        }
        else if (state.Rights_detail_filtered.data.length > 0 && state.selected_submission == 1) {
            alert('Entry Type ' + state.selected_entry_type + ' has been found for the year ' + state.selected_year + ', Please select another entry type or Edit the existing entry.')
        } else {
            state.buttonsavenew = false;
        }
    } catch (error) {
        console.log('catch error in checking', error)
    }
}



async function saveReportDetails() {



    var successcount = 0;
    var errorcount = 0;

    if (state.datasource_id == 0) {
        alert("Please select a datasource.")
        //openAlertModal(state.group, 'Please select a datasource.', state.group_header, errorcount, successcount)

        return;
    }

    for (let i = 0; i < state.Selected_Rights_entry_config_group.data.length; i++) {
        try {
            let true_grand_total = 0

            if (state.Selected_Rights_entry_config_group.data[i].tier_level == 1) {

                true_grand_total = state.grand_total[state.Selected_Rights_entry_config_group.data[i].sequence_header]

            } else {
                // this should be changed for those entries that are not human count.
                //true_grand_total = 0
                //-----------------------------------------------------------    
            }
            let params = {

                sequence_header: state.Selected_Rights_entry_config_group.data[i].sequence_header,
                male: state.male[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                female: state.female[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                total: state.total[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                grand_total: true_grand_total,
                remarks: state.remarks[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                entry_type: state.selected_entry_type,
                rights_entry_config_id: state.Selected_Rights_entry_config_group.data[i].id,
                report_year_id: state.selected_year_id,
                agency_id: state.datasource_id,
                group_id: state.Selected_Rights_entry_config_group.data[i].group,
                group_agency_datasource_id: state.datasource_id,
                is_active: 1,
                report_schedule: state.report_schedule
                //report_year: state.options.report_years[state.selected_year_id].year,
            }

            //console.log('params', params)
            const response = await reportDetailsService.createReportDetails(params);
            if (response.data) {
                successcount = successcount + 1;
                //successAlert("Success!", 'Successfully Added to database.')
            } else {
                errorcount = errorcount + 1;
            }

        } catch (error) {
            //console.log('error', error)
            errorcount = errorcount + 1;
            alert("Error in saving data. Please check the values you entered.")
            state.isAddModalOpen = false
        }
    }
    if (successcount > 0) {
        //successAlert("Success!", 'Successfully Added to database.')
        state.successcount = successcount;
        state.errorcount = errorcount;
        openAlertModal(state.group, 'Successfully Added to the database.', state.group_header, errorcount, successcount)
        state.isAddModalOpen = false
    }


    //state.buttonsavenew = true;

}




function SaveAddEntryModal() {

    saveReportDetails()
    state.buttonsavenew = true;

}



function clearData() {
    state.male = [],
        state.female = [],
        state.total = [],
        state.grand_total = [],
        state.remarks = []

    try {

        for (let i = 0; i < state.Selected_Rights_entry_config_group.data.length; i++) {

            state.male[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
            state.female[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
            state.total[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
            state.grand_total[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
        }
    }
    catch (error) {
        //console.log(error)
    }
}


function computeAddEntryModal() {

    check_fetchReports_Details_Add()
    //console.log(' state.selected_entry_type', state.selected_entry_type)
    compute_vertical()
    //state.buttonsavenew
    //state.buttonsavenew = false

}

function compute_vertical() {
    console.log('compute_vertical')
    for (let i = state.Selected_Rights_entry_config_group.data.length - 1; i >= 0; i--) {
        var totaled_to = state.Selected_Rights_entry_config_group.data[i].totaled_to;
        var totaled_from = state.Selected_Rights_entry_config_group.data[i].totaled_from;
        var sequence_header = state.Selected_Rights_entry_config_group.data[i].sequence_header;
        if (totaled_to == 'NA') {

        } else {
            if (totaled_from != 'NA') {
                state.total[sequence_header] = 0;
                console.log('compute_vertical 2')
            } else {

            }

        }
    }

    for (let i = state.Selected_Rights_entry_config_group.data.length - 1; i >= 0; i--) {
        var totaled_to = state.Selected_Rights_entry_config_group.data[i].totaled_to;
        var totaled_from = state.Selected_Rights_entry_config_group.data[i].totaled_from;
        var sequence_header = state.Selected_Rights_entry_config_group.data[i].sequence_header;

        // if (state.Selected_Rights_entry_config_group.data[i].grand_totaL != '2') {

        // } else {

        if (totaled_to == 'NA') {
            if (totaled_from == 'NA') {
                console.log('compute_vertical 3')

                if (parseFloat(state.male[sequence_header]) == 0 && parseFloat(state.female[sequence_header]) == 0) {
                    state.grand_total[sequence_header] = state.total[sequence_header];
                    console.log('compute_vertical 4', state.total[sequence_header], state.grand_total[sequence_header])

                } else {
                    state.total[sequence_header] = parseFloat(state.male[sequence_header]) + parseFloat(state.female[sequence_header]);
                    state.grand_total[sequence_header] = state.total[sequence_header];
                    console.log('compute_vertical 5', state.male[sequence_header], state.female[sequence_header])
                }

            }

        } else {
            for (let x = state.Selected_Rights_entry_config_group.data.length - 1; x >= 0; x--) {
                if (state.Selected_Rights_entry_config_group.data[x].sequence_header == totaled_to) {
                    console.log('compute_vertical 6')

                    state.male[totaled_to] = parseFloat(state.male[totaled_to]) + parseFloat(state.male[sequence_header]);
                    state.female[totaled_to] = parseFloat(state.female[totaled_to]) + parseFloat(state.female[sequence_header]);

                    state.total[sequence_header] = parseFloat(state.male[sequence_header]) + parseFloat(state.female[sequence_header]);
                    state.grand_total[sequence_header] = state.total[sequence_header]

                    state.total[totaled_to] = parseFloat(state.male[totaled_to]) + parseFloat(state.female[totaled_to]);
                    state.grand_total[totaled_to] = state.total[totaled_to]
                }
            }
        }
        // }


    }
    console.log('compute_vertical 7')
}

function closeAddEntryModal() {
    state.isAddModalOpen = false
    clearData();
}


function openAddEntryModal() {
    // state.selected_datasourece =     

    clearData();
    //state.buttonsavenew = false;
    //console.log('state.Selected_Rights_entry_config_group', state.Selected_Rights_entry_config_group)

    var size = Object.keys(state.Selected_Rights_entry_config_group.data).length;

    for (let i = 0; i < size; i++) {
        state.totaled_from[state.Selected_Rights_entry_config_group.data[i].sequence_header] = state.Selected_Rights_entry_config_group.data[i].totaled_from;

    }

    console.log(state.totaled_from)

    // for (let i = size; i > size; i--) {
    //     console.log(state.totaled_from[i])

    // } 
    state.isAddModalOpen = true;
    state.buttoncompute = false;
    state.buttonsavenew = true;
}



//---------------------------------------------------Add Entry Functions--------------------------------------------------------------

//---------------------------------------------------Edit Entry Functions--------------------------------------------------------------

function openEditModal() {
    state.isEditModalOpen = true;
    state.buttoncomputeEdit = false;
    initial_clear_data()
    fetchReports_Details_Edit()
}

function openUploadModal() {
    state.isUploadModalOpen = true;
    // state.buttoncomputeEdit = false;
    // initial_clear_data()
    // fetchReports_Details_Edit()
}

async function fetchReports_Details_Edit() {

    initial_clear_data()

    try {
        // let params = {
        //     group_id: state.selected_group,
        //     report_year_id: state.selected_year_id,
        //     is_active: 1,
        //     entry_type: state.selected_edit_entry_type,
        //     group_agency_datasource_id: 0 //state.edit_selected_datasource
        // }

        //const response = await reportDetailsService.getReportDetails(params)
        const response = await reportDetailsGroupsService.getReportDetailsGroups()
        state.Rights_detail_filtered.data = response.data.filter(filtered_detail => filtered_detail.group_id === state.selected_group && filtered_detail.entry_type === state.selected_edit_entry_type && filtered_detail.report_year_id === state.selected_year_id && filtered_detail.is_active === 1)
        //console.log('edit - response', state.Rights_detail_filtered)     

        if (state.Rights_detail_filtered.data) {
            state.report_details.data = state.Rights_detail_filtered.data


            //console.log(state.report_details.data)
            for (const c in state.report_details.data) {



                state.edit_ids[state.report_details.data[c].sequence_header] = state.report_details.data[c].id;
                state.edit_female[state.report_details.data[c].sequence_header] = state.report_details.data[c].female;
                state.edit_male[state.report_details.data[c].sequence_header] = state.report_details.data[c].male;
                state.edit_total[state.report_details.data[c].sequence_header] = state.report_details.data[c].total;
                state.edit_grand_total[state.report_details.data[c].sequence_header] = state.report_details.data[c].grand_total;
                state.edit_remarks[state.report_details.data[c].sequence_header] = state.report_details.data[c].remarks;


            }




        }
        else {
            alert('No data found for Entry Type: ' + state.selected_edit_entry_type + '. Please select another entry type.')

        }
    } catch (error) {
        //console.log(error)
    }
}



function computeEditEntryModal() {

    compute_verticalEdit()

    state.buttonsaveEdit = false

}


function clear_totaled_EditData() {

    try {

        for (let i = 0; i < state.Selected_Rights_entry_config_group.data.length; i++) {

            var totaled_to = state.Selected_Rights_entry_config_group.data[i].totaled_to;
            var totaled_from = state.Selected_Rights_entry_config_group.data[i].totaled_from;

            if (totaled_to == 'NA' && totaled_from == 'NA') {

                state.edit_male[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.edit_female[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.edit_total[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.edit_grand_total[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.edit_remarks[state.Selected_Rights_entry_config_group.data[i].sequence_header] = ''
            }

        }
    }
    catch (error) {
        //console.log(error)
    }
}


function initial_clear_data() { // this function is used to clear the data before computing the edit entry modal
    try {

        for (let i = 0; i < state.Selected_Rights_entry_config_group.data.length; i++) {

            var totaled_to = state.Selected_Rights_entry_config_group.data[i].totaled_to;
            var totaled_from = state.Selected_Rights_entry_config_group.data[i].totaled_from;
            state.edit_male[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
            state.edit_female[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
            state.edit_total[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
            state.edit_grand_total[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
            state.edit_remarks[state.Selected_Rights_entry_config_group.data[i].sequence_header] = ''

        }
    }
    catch (error) {
        //console.log(error)
    }
}


function compute_verticalEdit() {


    for (let i = state.Selected_Rights_entry_config_group.data.length - 1; i >= 0; i--) {
        var totaled_to = state.Selected_Rights_entry_config_group.data[i].totaled_to;
        var totaled_from = state.Selected_Rights_entry_config_group.data[i].totaled_from;
        var sequence_header = state.Selected_Rights_entry_config_group.data[i].sequence_header;


        if (totaled_from != 'NA') {

            state.edit_total[sequence_header] = 0;
            state.edit_male[sequence_header] = 0;
            state.edit_female[sequence_header] = 0;
            state.edit_grand_total[sequence_header] = 0;
        }

        if (totaled_to == 'NA' && totaled_from != 'NA') {

            state.edit_total[sequence_header] = 0;
            state.edit_male[sequence_header] = 0;
            state.edit_female[sequence_header] = 0;
            state.edit_grand_total[sequence_header] = 0;
        }
    }

    for (let i = state.Selected_Rights_entry_config_group.data.length - 1; i >= 0; i--) {
        var totaled_to = state.Selected_Rights_entry_config_group.data[i].totaled_to;
        var totaled_from = state.Selected_Rights_entry_config_group.data[i].totaled_from;
        var sequence_header = state.Selected_Rights_entry_config_group.data[i].sequence_header;

        if (totaled_to == 'NA') {
            if (totaled_from == 'NA') {
                state.edit_total[sequence_header] = parseFloat(state.edit_male[sequence_header]) + parseFloat(state.edit_female[sequence_header]);
                state.edit_grand_total[sequence_header] = state.edit_total[sequence_header];
            }

        } else {
            for (let x = state.Selected_Rights_entry_config_group.data.length - 1; x >= 0; x--) {
                if (state.Selected_Rights_entry_config_group.data[x].sequence_header == totaled_to) {
                    state.edit_male[totaled_to] = parseFloat(state.edit_male[totaled_to]) + parseFloat(state.edit_male[sequence_header]);
                    state.edit_female[totaled_to] = parseFloat(state.edit_female[totaled_to]) + parseFloat(state.edit_female[sequence_header]);
                    state.edit_total[sequence_header] = parseFloat(state.edit_male[sequence_header]) + parseFloat(state.edit_female[sequence_header]);
                    state.edit_grand_total[sequence_header] = state.edit_total[sequence_header]
                    state.edit_total[totaled_to] = parseFloat(state.edit_male[totaled_to]) + parseFloat(state.edit_female[totaled_to]);
                    state.edit_grand_total[totaled_to] = state.edit_total[totaled_to]
                }
            }
        }
    }
}

async function SaveEditEntryModal() {
    var successcount = 0;
    var errorcount = 0;
    var true_grand_total = 0;

    //console.log('state.Selected_Rights_entry_config_group.data', state.Selected_Rights_entry_config_group.data)
    for (let i = 0; i < state.Selected_Rights_entry_config_group.data.length; i++) {
        try {


            if (state.Selected_Rights_entry_config_group.data[i].tier_level == 1) {
                true_grand_total = state.edit_grand_total[state.Selected_Rights_entry_config_group.data[i].sequence_header]
            } else {
                true_grand_total = 0
            }

            let params = {

                male: state.edit_male[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                female: state.edit_female[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                total: state.edit_total[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                grand_total: true_grand_total,
                remarks: ' ' + state.edit_remarks[state.Selected_Rights_entry_config_group.data[i].sequence_header],
            }


            console.log('params', params)

            const response = await reportDetailsService.updateReportDetails(params, state.edit_ids[state.Selected_Rights_entry_config_group.data[i].sequence_header]);
            if (response.data) {
                successcount = successcount + 1;
                //console.log('success', response.data) 
            }

        } catch (error) {
            //state.errormessage = error.response.data.message
            alert("Error in saving data. Please check the values you entered.", error)
            //console.log('error', error)
            errorcount = errorcount + 1;
        }
    }
    if (successcount > 0) {
        state.successcount = successcount;
        state.errorcount = errorcount;
        openAlertModal(state.group, 'Successfully Added to the database.', state.group_header, errorcount, successcount)
        closeEditModal()
    } else {
        openAlertModal(state.group, state.errormessage, state.group_header, errorcount, successcount)
    }
}



function closeEditModal() {
    state.isEditModalOpen = false

}


//---------------------------------------------------Edit Entry Functions--------------------------------------------------------------

//---------------------------------------------------New Indicator--------------------------------------------------------------

const categories = ref([
  {
    id: 1,
    description: 'MATERNAL CARE & SERVICES',
    indicator_subcategories: [
      {
        id: 101,
        name: 'Prenatal Care',
        indicator_groups: [
          { id: 1001, name: 'Blood Pressure Check' },
          { id: 1002, name: 'Ultrasound Screening' },
        ],
      },
      {
        id: 102,
        name: 'Postnatal Care',
        indicator_groups: [
          { id: 1003, name: 'Home Visits' },
          { id: 1004, name: 'Lactation Counseling' },
        ],
      },
    ],
  },
  {
    id: 2,
    description: 'CHILD CARE & SERVICES',
    indicator_subcategories: [
      {
        id: 201,
        name: 'Nutrition',
        indicator_groups: [
          { id: 2001, name: 'Feeding Program' },
          { id: 2002, name: 'Vitamin A Supplementation' },
        ],
      },
      {
        id: 202,
        name: 'Immunization',
        indicator_groups: [
          { id: 2003, name: 'Polio Vaccine' },
          { id: 2004, name: 'Hepatitis B Vaccine' },
        ],
      },
    ],
  },
])

// Track expanded states
const expandedCategories = ref([])
const expandedSubcategories = ref([])

const toggleCategory = (id) => {
  if (expandedCategories.value.includes(id)) {
    expandedCategories.value = expandedCategories.value.filter((x) => x !== id)
  } else {
    expandedCategories.value.push(id)
  }
}

const toggleSubcategory = (id) => {
  if (expandedSubcategories.value.includes(id)) {
    expandedSubcategories.value = expandedSubcategories.value.filter((x) => x !== id)
  } else {
    expandedSubcategories.value.push(id)
  }
}
//---------------------------------------------------New Indicator--------------------------------------------------------------
</script>
