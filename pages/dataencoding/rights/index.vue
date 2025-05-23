<template>
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">ENCODE INDICATORS</h1>
        <div class="flex items-center space-x-4">
            <button class="btn btn-primary">Export</button>
            <button class="btn btn-primary">Print</button>
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
                        <FormSelect :options="state.options.rights "
                            v-model="state.selected_rights_id" @click="changeData()" />
                    </div>
                </div>
            </div>
           <!-- View Modal -->
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
                            class="sm:col-span-2 text-center table-header-4 border-white border-l border-b border-grey pb-6"
                            :displaytext="'INDICATOR'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-6"
                            :displaytext="'MALE'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-6"
                            :displaytext="'FEMALE'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-white  border-l border-b border-grey pb-6"
                            :displaytext="'TOTAL'" />
                        <GridCell class="sm:col-span-2 text-center table-header-4 border-white border-l  border-b border-grey pb-6"
                            :displaytext="'GRAND TOTAL'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-white border-l border-b border-r border-grey pb-6"
                            :displaytext="'REMARKS'" />

                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-white border-l  ring-1 ring-white border-b border-grey pb-6"
                            :displaytext="''" />
                        <GridCell
                            class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey                                                                                                                                                                     pb-6"
                            :displaytext="'ACTUAL'" />
                        <GridCell
                            class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey  pb-6"
                            :displaytext="'PROJECTED'" />
                        <GridCell
                            class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey pb-6"
                            :displaytext="'ACTUAL'" />
                        <GridCell class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey pb-6"
                            :displaytext="'PROJECTED'" />
                        <GridCell
                            class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey pb-6"
                            :displaytext="'ACTUAL'" />
                        <GridCell class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey pb-6"
                            :displaytext="'PROJECTED'" />
                        <GridCell
                            class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey pb-6"
                            :displaytext="'ACTUAL'" />
                            <GridCell
                            class="sm:col-span-1 text-center table-header-4 border-white border-l border-b pb-6"
                            :displaytext="'PROJECTED'" />
                        <GridCell
                            class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey pb-6"
                            :displaytext="'ACTUAL'" />
                        <GridCell
                            class="sm:col-span-1 text-center text-wrap table-header-4 border-white border-r border-l border-b border-grey pb-6"
                            :displaytext="'PROJECTED'" />


                        <template v-for="group in state.Selected_Rights_entry_config_group.data">
                            <GridCell
                                class="sm:col-span-2 text-left table-header-4 border-white ring-1 ring-white  pb-3"
                                :displaytext=group.description />

                            <GridTextView v-model="state.view_male[group.sequence_header]"
                                class="sm:col-span-1 text-right border-l border-b border-grey pb-2"
                                :entrystatus="group.male" />
                            <GridTextView v-model="state.view_male_projected[group.sequence_header]"
                                class="sm:col-span-1 text-right border-l border-b border-grey pb-2"
                                :entrystatus="group.male" />

                            <GridTextView v-model="state.view_female[group.sequence_header]"
                                class="sm:col-span-1 text-right border-l border-b border-grey pb-2"
                                :entrystatus="group.female" />
                            <GridTextView v-model="state.view_female_projected[group.sequence_header]"
                                class="sm:col-span-1 text-right border-l border-b border-grey pb-2"
                                :entrystatus="group.female" />

                            <GridTextView v-model="state.view_total[group.sequence_header]"
                                class="sm:col-span-1 text-right border-l border-b border-grey pb-2"
                                :entrystatus="group.total" />
                            <GridTextView v-model="state.view_total_projected[group.sequence_header]"
                                class="sm:col-span-1 text-right border-l border-b border-grey pb-2"
                                :entrystatus="group.total" />

                            <GridTextView v-model="state.view_grand_total[group.sequence_header]"
                                class="sm:col-span-1 text-right border-l border-b border-grey pb-2"
                                :entrystatus="group.grand_total" />
                            <GridTextView v-model="state.view_grand_total_projected[group.sequence_header]"
                                class="sm:col-span-1 text-right border-l border-b border-grey pb-2"
                                :entrystatus="group.grand_total" />

                            <GridTextView v-model="state.view_remarks[group.sequence_header]"
                                class="sm:col-span-1 text-center border-l  border-b border-grey pb-2"
                                :entrystatus="group.remarks" />
                            <GridTextView v-model="state.view_remarks_projected[group.sequence_header]"
                                class="sm:col-span-1 text-center border-l border-r border-b border-grey pb-2"
                                :entrystatus="group.remarks" />
                        </template>

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
                    <div
                        class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12  border-solid border-grey  border-t pb-4">

                        <GridCell
                            class="sm:col-span-4 text-xl table-header-1 text-center border-1 border-solid border-grey  border-l  pb-4"
                            :displaytext="'Select Entry Type:'" />
                        <GridSelect v-model="state.selected_entry_type" :options="state.options.entry_type"
                            :class="'sm:col-span-8 text-xl  text-center  border-2 border-solid border-r  border-grey  border-t  pb-4'" />
                        <GridCell
                            class="sm:col-span-4 text-xl table-header-1 text-center border-1 border-solid border-grey  border-l border-t pb-4"
                            :displaytext="'Select Datasource:'" />
                        <GridSelect v-model="state.datasource_id" :options="state.options.datasources"
                            :class="'sm:col-span-8 text-xl  text-center border-2 border-solid border-r  border-t border-grey  pb-4'" />

                        <GridCell
                            class="sm:col-span-12 text-xl text-center table-header-text text-white border-l border-r border-t border-b border-grey  pb-6"
                            :displaytext=state.selected_group_header />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-white ring-1 ring-white pb-6"
                            :displaytext="'INDICATOR'" />
                        <GridCell
                            class="sm:col-span-2 text-center  table-header-4 border-l border-b border-white ring-1 ring-white  pb-6"
                            :displaytext="'MALE'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-l border-b border-white ring-1 ring-white pb-6"
                            :displaytext="'FEMALE'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-l border-b border-white ring-1 ring-white  pb-6"
                            :displaytext="'TOTAL'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-l border-b border-white ring-1 ring-white pb-6"
                            :displaytext="'GRAND TOTAL'" />
                        <GridCell
                            class="sm:col-span-2  text-center table-header-4  border-l border-b border-white ring-1 ring-white pb-6"
                            :displaytext="'REMARKS'" />

                        <template v-for="group in state.Selected_Rights_entry_config_group.data">
                            <GridCell
                                class="sm:col-span-2 text-left table-header-4 border-l border-b border-grey  ring-1 ring-white  pb-3"
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
                            <GridTextEntry v-model="state.grand_total[group.sequence_header]"
                                class="sm:col-span-2 text-right border-l border-b border-grey  pb-2"
                                :displaytext="'grand total'" :entrystatus="group.grand_total" />
                            <GridTextArea v-model="state.remarks[group.sequence_header]"
                                class="sm:col-span-2 text-center border-l border-r border-b border-grey  pb-2"
                                :displaytext="'remarks'" />

                        </template>
                        <GridCell class="sm:col-span-12 pb-6" :displaytext="''" />
                        <GridCell class="sm:col-span-2 pb-6 text-xl font-bold" :displaytext="'Group:'" />
                        <GridCell class="sm:col-span-10 pb-6 text-xl font-bold"
                            :displaytext=state.Selected_Rights_entry_config_group.data[0].group />
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
                        class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12  border-solid border-grey border-t pb-4">

                        <GridCell
                            class="sm:col-span-4 text-xl table-header-1 text-center border-1 border-solid border-grey border-l  pb-4"
                            :displaytext="'Select Entry Type:'" />
                        <GridSelect v-model="state.selected_edit_entry_type" :options="state.options.entry_type"
                            :class="'sm:col-span-8 text-xl text-center border-2 border-solid border-r  border-grey border-t  pb-4'" @click="fetchReports_Details_Edit()"/>
                        <GridCell
                            class="sm:col-span-4 text-xl table-header-1 text-center border-1 border-solid border-white border-l border-t pb-4"
                            :displaytext="'Select Datasource:'" />
                        <FormSelect v-model="state.edit_selected_datasource" :options="state.options.datasources"
                            :class="'sm:col-span-8 text-xl  text-center bg-green-300  border-2 border-solid border-r  border-t border-grey pb-4'" @click="fetchReports_Details_Edit()" />

                        <GridCell
                            class="sm:col-span-12 text-xl text-center table-header-text text-white border-l border-r border-t border-b border-grey pb-6"
                            :displaytext=state.selected_group_header />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4  border-l  border-b border-white  ring-1 ring-white  pb-6"
                            :displaytext="'INDICATOR'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4  border-l  border-b border-white  ring-1 ring-white pb-6"
                            :displaytext="'MALE'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-l   border-b border-white  ring-1 ring-white pb-6"
                            :displaytext="'FEMALE'" />
                        <GridCell
                            class="sm:col-span-2  text-center table-header-4   border-l border-b border-white  ring-1 ring-white pb-6"
                            :displaytext="'TOTAL'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-l  border-b border-white  ring-1 ring-white pb-6"
                            :displaytext="'GRAND TOTAL'" />
                        <GridCell
                            class="sm:col-span-2 text-center table-header-4 border-l border-b border-r border-white  ring-1 ring-white pb-6"
                            :displaytext="'REMARKS'" />

                        <template v-for="group in state.Selected_Rights_entry_config_group.data">
                            <GridCell
                                class="sm:col-span-2 text-left table-header-4 border-l border-b border-white  ring-1 ring-white pb-3"
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
                            <GridTextEdit v-model="state.edit_grand_total[group.sequence_header]"
                                class="sm:col-span-2 text-right border-l border-b border-grey pb-2"
                                :displaytext="'grand total'" :entrystatus="group.grand_total" />
                            <GridTextArea v-model="state.edit_remarks[group.sequence_header]"
                                class="sm:col-span-2 text-center border-l border-r border-b border-grey pb-2"
                                :displaytext="'remarks'" />

                        </template>

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



                        <!-- <GridCell class="sm:col-span-7 pb-6" :displaytext="''" />


                        <button
                            class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                            @click="closeEditModal"> Cancel </button>
                        <GridCell class="sm:col-span-1 pb-6" :displaytext="''" />
                        <button
                            class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                            @click="closeEditModal"> Save </button> -->

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
                                    <th scope="col"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Group No. </th>

                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Description</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Datasources</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Action</th>

                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="Rights_entry_config in state.Selected_Rights_entry_config.data"
                                    v-bind:key=Rights_entry_config.id @click="getclicked(Rights_entry_config)">

                                    <template v-if ="Rights_entry_config.tier_level == 1">
                                        <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            <span
                                                class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-center rounded-2xl border border-red-400 bg-red-500  font-large text-black">
                                                {{ Rights_entry_config.group }}
                                            </span>
                                        </td>
             
                                        <td
                                        class="whitespace-nowrap py-4 pl-4 pr-3 text-md font-medium text-gray-900 sm:pl-6">
                                        {{ Rights_entry_config.description }}
                                        </td>

                                   
                                  


                                    <!-- agencies with color -->
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        <span 
                                            v-for="datasource in Rights_entry_config.datasources"
                                            v-bind:key=Rights_entry_config.datasources.agency_id
                                            class="h-20 w-20 px-2 py-1 shrink-5 items-center justify-center rounded-2xl border  font-large text-black mr-2 mb-2"
                                            :class="state.options.agencies.find(a => a.value === datasource.agency_id)?.color">
                                            <template v-for="agency in state.options.agencies">
                                                <template v-if="agency.value == datasource.agency_id">
                                                    {{ agency.label }}
                                                </template>
                                            </template>
                                        </span>
                                    </td>

                                    

                                    <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
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

                                        </FormDropdown>
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
import {reportDetailsService } from '~/components/api/ReportDetailsService'; 
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
        console.log(error)
    }
}




async function fetchrole() {
    try {
       
        const response = await rolesService.getRole(userStore.getUser.user_roles.roles_id)
        //console.log(response)
        if (response.data) {
            state.roles = response.data
         
            console.log(state.roles)
        }
    } catch (error) { 
        console.log(error)
    }
}


function openAlertModal(group , alertmessage, group_header, errorcount, successcount) { 
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
    //fetchReports_Details();
    clearViewData();

    state.isViewModalOpen = true;
}

function clearViewData(){
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
            entry_type: 'Actual',//state.selected_view_entry_type,
            group_agency_datasource_id: state.view_selected_datasource
        }


        const response = await reportDetailsService.getReportDetails(params)
        //console.log(response)
        //console.log(params)
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
                //alert('No data found for ACTUAL Entries. ')  
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
          
            if (response.data.length > 0){

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
        console.log(error)
    }
}

function closeViewModal() {
    state.isViewModalOpen = false
    
}

//---------------------------------------------------View Entry Functions--------------------------------------------------------------




//---------------------------------------------------Add Entry Functions--------------------------------------------------------------
async function saveReportDetails(){

    var successcount = 0;
    var errorcount = 0;

    if (state.datasource_id == 0){
        alert("Please select a datasource.")
        //openAlertModal(state.group, 'Please select a datasource.', state.group_header, errorcount, successcount)
        
        return;
    }
    
   
    for (let i = 0; i < state.Selected_Rights_entry_config_group.data.length; i++) {
                 try {
                    let params = {

                        sequence_header: state.Selected_Rights_entry_config_group.data[i].sequence_header,
                        male: state.male[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                        female: state.female[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                        total: state.total[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                        grand_total: state.grand_total[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                        remarks: state.remarks[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                        entry_type: state.selected_entry_type,
                        rights_entry_config_id: state.Selected_Rights_entry_config_group.data[i].id,
                        report_year_id: state.selected_year_id, 
                        agency_id: state.datasource_id,
                        group_id: state.Selected_Rights_entry_config_group.data[i].group,
                        group_agency_datasource_id: state.datasource_id,
                        is_active: 1,
                    }
                   
                    console.log(params)
                    const response = await reportDetailsService.createReportDetails(params);
                     if (response.data) {
                        successcount = successcount + 1; 
                        //successAlert("Success!", 'Successfully Added to database.')
                     }   
       
                    } catch (error) {
                        console.log(error)
                        errorcount = errorcount + 1;
                    }
    }
    if (successcount > 0){
        //successAlert("Success!", 'Successfully Added to database.')
        state.successcount = successcount;
        state.errorcount = errorcount;
        openAlertModal(state.group, 'Successfully Added to the database.', state.group_header, errorcount, successcount)
        state.isAddModalOpen = false
    }
}

function SaveAddEntryModal(){

saveReportDetails()

}

function clearData(){
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
        console.log(error)
    }
}

function computeAddEntryModal(){
    compute_vertical()
    state.buttoncompute = true
    state.buttonsavenew = false

}

function compute_vertical(){
    
    for (let i = state.Selected_Rights_entry_config_group.data.length -1  ; i >= 0  ; i--) {
        var totaled_to = state.Selected_Rights_entry_config_group.data[i].totaled_to;
        var totaled_from = state.Selected_Rights_entry_config_group.data[i].totaled_from;
        var sequence_header = state.Selected_Rights_entry_config_group.data[i].sequence_header;
        if (totaled_to == 'NA'){

         
           
        }else{
            if (totaled_from != 'NA'){
          
             state.total[sequence_header] = 0;
          

            }else{
               
            }

        }
    }

    for (let i = state.Selected_Rights_entry_config_group.data.length -1  ; i >= 0  ; i--) {
        var totaled_to = state.Selected_Rights_entry_config_group.data[i].totaled_to;
        var totaled_from = state.Selected_Rights_entry_config_group.data[i].totaled_from;
        var sequence_header = state.Selected_Rights_entry_config_group.data[i].sequence_header;
        if (totaled_to == 'NA'){
            if (totaled_from == 'NA'){
                state.total[sequence_header] = parseFloat(state.male[sequence_header]) + parseFloat(state.female[sequence_header]);
                state.grand_total[sequence_header] = state.total[sequence_header];
            }

        } else {
            for (let x = state.Selected_Rights_entry_config_group.data.length - 1; x >= 0; x--) {
                if (state.Selected_Rights_entry_config_group.data[x].sequence_header == totaled_to) {

                    state.male[totaled_to] = parseFloat(state.male[totaled_to]) + parseFloat(state.male[sequence_header]);
                    state.female[totaled_to] = parseFloat(state.female[totaled_to]) + parseFloat(state.female[sequence_header]);

                    state.total[sequence_header] = parseFloat(state.male[sequence_header]) + parseFloat(state.female[sequence_header]);
                    state.grand_total[sequence_header] =  state.total[sequence_header]
                    
                    state.total[totaled_to] = parseFloat(state.male[totaled_to]) + parseFloat(state.female[totaled_to]);
                    state.grand_total[totaled_to]  = state.total[totaled_to] 
                }
            }
        }
    }
}

function closeAddEntryModal() {
    state.isAddModalOpen = false
   clearData();
}


function openAddEntryModal() {

clearData();
state.buttonsavenew = false;

var size = Object.keys(state.Selected_Rights_entry_config_group.data).length;
  for (let i = 0; i < size ; i++) {
    state.totaled_from[state.Selected_Rights_entry_config_group.data[i].sequence_header] = state.Selected_Rights_entry_config_group.data[i].totaled_from ;
    
    }

console.log(state.totaled_from)

for (let i = size; i > size; i--) {
    console.log(state.totaled_from[i])
    
} 
state.isAddModalOpen = true;
state.buttoncompute = false;
state.buttonsavenew = false;
}



//---------------------------------------------------Add Entry Functions--------------------------------------------------------------

//---------------------------------------------------Edit Entry Functions--------------------------------------------------------------

function openEditModal() {
    state.isEditModalOpen = true;
    state.buttoncomputeEdit = false;
    //fetchReports_Details_Edit()
}

async function fetchReports_Details_Edit() {

    clearEditData()

    try {
        let params = {
            group_id: state.selected_group,
            report_year_id: state.selected_year_id,
            is_active: 1,
            entry_type: state.selected_edit_entry_type,
            group_agency_datasource_id: state.edit_selected_datasource
        }
       
        const response = await reportDetailsService.getReportDetails(params)
        //console.log(response)
        //console.log(params)
        if (response.data) {
            state.report_details.data = response.data
          
            if (response) {
                for (const c in state.report_details.data) {
                    state.edit_ids[state.report_details.data[c].sequence_header] = state.report_details.data[c].id;
                    state.edit_female[state.report_details.data[c].sequence_header] = state.report_details.data[c].female;
                    state.edit_male[state.report_details.data[c].sequence_header] = state.report_details.data[c].male;
                    //state.edit_total[state.report_details.data[c].sequence_header] = state.report_details.data[c].total;
                    //state.edit_grand_total[state.report_details.data[c].sequence_header] = state.report_details.data[c].grand_total;
                    state.edit_remarks[state.report_details.data[c].sequence_header] = state.report_details.data[c].remarks;

                    // for actual
                }
            } else {
                //alert('No data found for ACTUAL Entries. ')  
            }
            

        }
    } catch (error) {
        console.log(error)
    }
}

function computeEditEntryModal(){
    compute_verticalEdit()
    state.buttoncomputeEdit = true
    state.buttonsaveEdit = false

}


function clearEditData(){
   
    try {
        
         for (let i = 0; i < state.Selected_Rights_entry_config_group.data.length; i++) {

                state.edit_male[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.edit_female[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.edit_total[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.edit_grand_total[state.Selected_Rights_entry_config_group.data[i].sequence_header] = 0
                state.edit_remarks[state.Selected_Rights_entry_config_group.data[i].sequence_header] = ''
                
                
                
         }
    }
    catch (error) {
        console.log(error)
    }
}


function compute_verticalEdit(){
    
    for (let i = state.Selected_Rights_entry_config_group.data.length -1  ; i >= 0  ; i--) {
        var totaled_to = state.Selected_Rights_entry_config_group.data[i].totaled_to;
        var totaled_from = state.Selected_Rights_entry_config_group.data[i].totaled_from;
        var sequence_header = state.Selected_Rights_entry_config_group.data[i].sequence_header;
        if (totaled_to == 'NA') {



        } else {
            if (totaled_from != 'NA') {

                state.edit_total[sequence_header] = 0;
                // state.edit_male[sequence_header] = 0;
                // state.edit_female[sequence_header] = 0;
                // state.edit_grand_total[sequence_header] = 0;


            } else {

            }

        }
    }

    for (let i = state.Selected_Rights_entry_config_group.data.length -1  ; i >= 0  ; i--) {
        var totaled_to = state.Selected_Rights_entry_config_group.data[i].totaled_to;
        var totaled_from = state.Selected_Rights_entry_config_group.data[i].totaled_from;
        var sequence_header = state.Selected_Rights_entry_config_group.data[i].sequence_header;
        if (totaled_to == 'NA'){
            if (totaled_from == 'NA'){
                state.edit_total[sequence_header] = parseFloat(state.edit_male[sequence_header]) + parseFloat(state.edit_female[sequence_header]);
                state.edit_grand_total[sequence_header] = state.edit_total[sequence_header];
            }

        } else {
            for (let x = state.Selected_Rights_entry_config_group.data.length - 1; x >= 0; x--) {
                if (state.Selected_Rights_entry_config_group.data[x].sequence_header == totaled_to) {
                    state.edit_male[totaled_to] = parseFloat(state.edit_male[totaled_to]) + parseFloat(state.edit_male[sequence_header]);
                    state.edit_female[totaled_to] = parseFloat(state.edit_female[totaled_to]) + parseFloat(state.edit_female[sequence_header]);
                    state.edit_total[sequence_header] = parseFloat(state.edit_male[sequence_header]) + parseFloat(state.edit_female[sequence_header]);
                    state.edit_grand_total[sequence_header] =  state.edit_total[sequence_header]
                    state.edit_total[totaled_to] = parseFloat(state.edit_male[totaled_to]) + parseFloat(state.edit_female[totaled_to]);
                    state.edit_grand_total[totaled_to]  = state.edit_total[totaled_to] 
                }
            }
        }
    }
}

async function SaveEditEntryModal(){

    var successcount = 0;
    var errorcount = 0;

    if (state.edit_selected_datasource == 0){
        alert("Please select a datasource.")
        //openAlertModal(state.group, 'Please select a datasource.', state.group_header, errorcount, successcount)
        
        return;
    }
    for (let i = 0; i < state.Selected_Rights_entry_config_group.data.length; i++) {
                 try {

                        //state.edit_remarks[state.Selected_Rights_entry_config_group.data[i].sequence_header]
                        // // var remarks = state.edit_remarks[state.Selected_Rights_entry_config_group.data[i].sequence_header]
                        // if (state.edit_remarks[state.Selected_Rights_entry_config_group.data[i].sequence_header].length = 0){
                        //    remarks = 'NA'

                      

                    let params = {

                        male: state.edit_male[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                        female: state.edit_female[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                        total: state.edit_total[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                        grand_total: state.edit_grand_total[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                        remarks: ' ' + state.edit_remarks[state.Selected_Rights_entry_config_group.data[i].sequence_header],
                       
                    }
                   
                    console.log(params)
                    const response = await reportDetailsService.updateReportDetails(params, state.edit_ids[state.Selected_Rights_entry_config_group.data[i].sequence_header]);
                     if (response.data) {
                        successcount = successcount + 1; 
                 
                     }   
       
                    } catch (error) {
                        state.errormessage = error.response.data.message
                        console.log(error)
                        errorcount = errorcount + 1;
                    }
    }
    if (successcount > 0){
        //successAlert("Success!", 'Successfully Added to database.')
        state.successcount = successcount;
        state.errorcount = errorcount;
        openAlertModal(state.group, 'Successfully Added to the database.', state.group_header, errorcount, successcount)
        closeEditModal()
    }else{
        openAlertModal(state.group, state.errormessage, state.group_header, errorcount, successcount)
    }

   


}



function closeEditModal() {
    state.isEditModalOpen = false
    
}


//---------------------------------------------------Edit Entry Functions--------------------------------------------------------------


</script>
