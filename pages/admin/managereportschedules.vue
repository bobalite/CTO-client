<template>
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">CREATE AND CONFIGURE REPORT SCHEDULES</h1>
        
    </div>

    <div class="px-4 sm:px-6 lg:px-8">

        <!-- <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <GraphsTimeline :displaytext="'Quarterly Report Schedules for 2025'"
                            class="sm:col-span-9 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r" />


                    </div>

                </div>
            </div>
        </div> -->

        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">

                        <!--                    <h2 class="  text-base font-semibold leading-6 text-gray-900">Status:</h2>
                        <div
                            class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-10  border-solid border-grey border-t pb-4 pt-4">
                            <GraphsGrp02 v-if="true" :key="state.refresh_graphs_toggle"
                                class="sm:col-span-3 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
                                :displaytext="'CURRENT QUARTER STATUS'" :report_year="state.report_year">
                            </GraphsGrp02>

                            <GraphsGrp02 v-if="true" :key="state.refresh_graphs_toggle"
                                class="sm:col-span-3 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
                                :displaytext="'ANNUAL COMPLETION STATUS'" :report_year="state.report_year">
                            </GraphsGrp02>
                        </div> -->

                    </div>

                </div>
            </div>

        </div>

        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-1 lg:px-1">
                    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">

                        <template v-if="state.logged_user_role.allow_manage_users == 1">
                            <button type="button"
                                class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                @click="openAddScheduleModal">Add
                                New Schedule</button>
                        </template>

                    </div>

                </div>
            </div>
        </div>

        <div class="sm:flex sm:items-center">

            <ModalDisplayform :show="state.isAddModalOpen" :close="state.closeAddModal" :title="'Add New Schedule'">
                <div class="p-6 sm:p-8">
                    <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <!-- Header -->
                        <div class="border-b border-slate-200 px-6 py-4">
                            <p class="text-sm font-medium text-slate-500">Schedule Information</p>
                            <p class="mt-1 text-base font-semibold text-slate-900">
                                Define the schedule details below
                            </p>
                        </div>

                        <!-- Body -->
                        <div class="max-h-[65vh] overflow-y-auto px-6 py-6">
                            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <!-- Year -->
                                <div>
                                    <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Year
                                    </label>
                                    <GridSelect v-model="state.year" :displaytext="state.year"
                                        :options="state.year_options" @click="set_other_fields"
                                        class="mt-1 w-full rounded-lg bg-white" />
                                </div>

                                <!-- Name -->
                                <div>
                                    <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Name
                                    </label>
                                    <GridSelect v-model="state.name" :displaytext="state.name"
                                        :options="state.name_options" @click="set_other_fields"
                                        class="mt-1 w-full rounded-lg bg-white" />
                                </div>

                                <!-- Description -->
                                <div class="sm:col-span-2">
                                    <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Description
                                    </label>
                                    <GridText2 v-model="state.description" :displaytext="state.description"
                                        class="mt-1 w-full rounded-lg bg-white" />
                                </div>

                                <!-- Status -->
                                <div>
                                    <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Status
                                    </label>
                                    <GridSelect v-model="state.status" :displaytext="state.status"
                                        :options="state.status_options" class="mt-1 w-full rounded-lg bg-white" />
                                </div>

                                <!-- Date Start -->
                                <div>
                                    <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Date Start
                                    </label>
                                    <GridDate v-model="state.date_start" :displaytext="state.date_start"
                                        class="mt-1 w-full rounded-lg bg-white" />
                                </div>

                                <!-- Date End -->
                                <div>
                                    <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Date End
                                    </label>
                                    <GridDate v-model="state.date_end" :displaytext="state.date_end"
                                        class="mt-1 w-full rounded-lg bg-white" />
                                </div>

                                <!-- Submission Deadline -->
                                <div>
                                    <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Submission Deadline
                                    </label>
                                    <GridDate v-model="state.submition_deadline" :displaytext="state.submition_deadline"
                                        class="mt-1 w-full rounded-lg bg-white" />
                                </div>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div
                            class="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
                            <button type="button"
                                class="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 sm:w-auto"
                                @click="cancelAddModal">
                                Cancel
                            </button>

                            <button type="button"
                                class="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 sm:w-auto"
                                @click="SaveNewSchedule">
                                Save Schedule
                            </button>
                        </div>
                    </div>
                </div>
            </ModalDisplayform>


            <ModalDisplayform :show="state.isEditModalOpen" :close="state.closeEditModal"
                :title="'Edit Selected Schedule'">
                <div class="max-h-[70vh] overflow-y-auto p-6">

                    <!-- Grid: 2 columns on desktop, 1 on mobile -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">

                        <!-- ======= Year ======= -->
                        <div class="flex items-center">
                            <label class="w-40 text-md font-medium">Year:</label>
                            <GridText2 v-model="state.year" :displaytext="state.year" :function="check_errors"
                                :disabled="true" class="flex-1 bg-white" />
                        </div>

                        <!-- ======= Name ======= -->
                        <div class="flex items-center">
                            <label class="w-40 text-md font-medium">Name:</label>
                            <GridText2 v-model="state.name" :displaytext="state.name" :function="check_errors"
                                :disabled="true" class="flex-1 bg-white" />
                        </div>

                        <!-- ======= Description ======= -->
                        <div class="flex items-center">
                            <label class="w-40 text-md font-medium">Description:</label>
                            <GridText2 v-model="state.description" :displaytext="state.description"
                                class="flex-1 bg-white" />
                        </div>

                        <!-- ======= Status ======= -->
                        <div class="flex items-center">
                            <label class="w-40 text-md font-medium">Status:</label>
                            <GridSelect v-model="state.status" :displaytext="state.status"
                                :options="state.status_options" class="flex-1 bg-white" />
                        </div>

                        <!-- ======= Date Start ======= -->
                        <div class="flex items-center">
                            <label class="w-40 text-md font-medium">Date Start:</label>
                            <GridDate v-model="state.date_start" :displaytext="state.date_start"
                                class="flex-1 bg-white" />
                        </div>

                        <!-- ======= Date End ======= -->
                        <div class="flex items-center">
                            <label class="w-40 text-md font-medium">Date End:</label>
                            <GridDate v-model="state.date_end" :displaytext="state.date_end" class="flex-1 bg-white" />
                        </div>

                        <!-- ======= Submission Deadline ======= -->
                        <div class="flex items-center">
                            <label class="w-40 text-md font-medium">Submission Deadline:</label>
                            <GridDate v-model="state.submition_deadline" :displaytext="state.submition_deadline"
                                class="flex-1 bg-white" />
                        </div>

                    </div>

                    <!-- ========== BUTTONS ========== -->
                    <div class="flex justify-end gap-4 mt-10">
                        <button class="rounded-md bg-gray-300 px-4 py-2 font-medium text-black hover:bg-gray-400"
                            @click="closeEditModal">
                            Cancel
                        </button>

                        <button class="rounded-md bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-500"
                            @click="saveEditModal">
                            Save Changes
                        </button>
                    </div>

                </div>
            </ModalDisplayform>



        </div>

        <div class="px-4 sm:px-6 lg:px-8">
            <div class="sm:flex sm:items-center">

            </div>
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
                                        Name</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Description</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Year</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Date Start</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Date End</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Status</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Submition Deadline
                                    </th>

                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="reportyears in state.report_years.data"
                                    @click="table_row_getclicked(reportyears)" :key="reportyears.id">
                                    <td
                                        class="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                                        {{ reportyears.name }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                                        {{ reportyears.description }}
                                    </td>

                                    <td class="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                                        {{ reportyears.year }}
                                    </td>

                                    <td class="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                                        {{ reportyears.date_start }}
                                    </td>

                                    <td class="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                                        {{ reportyears.date_end }}
                                    </td>

                                    <td v-if="reportyears.status == 1"
                                        class="whitespace-nowrap px-3 py-4 text-left text-sm text-green-500">Open
                                    </td>
                                    <td v-else-if="reportyears.status == 2"
                                        class="whitespace-nowrap px-3 py-4 text-left text-sm text-red-500">
                                        Close - In waiting
                                    </td>

                                    <td v-else-if="reportyears.status == 0"
                                        class="whitespace-nowrap px-3 py-4 text-left text-sm text-red-500">
                                        Encoding Locked
                                    </td>

                                    <td class="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                                        {{ reportyears.submition_deadline }}
                                    </td>

                                    <template v-if="state.logged_user_role.allow_manage_users == 1">
                                        <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-8">
                                            <FormDropdown>



                                                <MenuItem :key="'edit'">
                                                <NuxtLink @click="openEditModal" class="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 bg-white-100 dark:bg-white-900
                                                         dark:text-black hover:text-white hover:bg-blue-700">
                                                    Edit Schedule
                                                </NuxtLink>
                                                </MenuItem>




                                            </FormDropdown>
                                        </td>
                                    </template>
                                    <template v-else>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hover:">...
                                        </td>
                                    </template>





                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- <Pagination :data="state.users" @previous="previous" @next="next" /> -->
                </div>
            </div>
        </div>




    </div>
</template>

<script setup>
import moment from 'moment';
import { useUserStore } from '~/store/user'
import { rolesService } from '~/components/api/Roles';
import { report_yearService } from '~/components/api/ReportYears';
import { MenuItem } from '@headlessui/vue';

const testdate = new Date('2025-01-01');
const state = reactive({
    report_year: 2025,
    report_years: [],
    current_report_year: [],

    refresh_graphs_toggle: 0,
    logged_user_role: {},
    isAddModalOpen: false,


    isEditModalOpen: false,
    isDisableModalOpen: false,
    isDeleteModalOpen: false,

    name_error: 2,

    name: '',
    description: 'Annual Childrens Rights Report for DILG',
    initiated_by: '1',
    year: '',
    date_start: testdate,
    date_end: testdate,
    status: '',
    submition_deadline: testdate,

    status_options: [
        { value: 0, label: 'Encoding Locked' },
        { value: 1, label: 'Open' },
        { value: 2, label: 'Close - In waiting' },

    ],

    name_options: [
        { value: '1st Quarter Report', label: '1st Quarter Report' },
        { value: '2nd Quarter Report', label: '2nd Quarter Report' },
        { value: '3rd Quarter Report', label: '3rd Quarter Report' },
        { value: '4th Quarter Report', label: '4th Quarter Report' },
        { value: 'Custumized Date', label: 'Custumized Date' },
    ],

    year_options: [
        { value: 2021, label: '2021' },
        { value: 2022, label: '2022' },
        { value: 2023, label: '2023' },
        { value: 2024, label: '2024' },
        { value: 2025, label: '2025' },
        { value: 2026, label: '2026' },
        { value: 2027, label: '2027' },
        { value: 2028, label: '2028' },
        { value: 2029, label: '2029' },
    ],

    //OptionsPieDatasource.series.data


})

const userStore = useUserStore()

onMounted(() => {
    fetchreportyear()
    fetch_logged_user_role()

})


//moment.format('YYYY-MM-DD HH:mm:ss');
function set_other_fields() {
    console.log("state.name", state.name)
    //state.year =

    let year = state.year;
    console.log("state.year", state.year)
    if (state.name == '1st Quarter Report') {
        state.date_start = moment(new Date(year + '-01-01')).format('YYYY-MM-DD');
        state.date_end = moment(new Date(year + '-03-31')).format('YYYY-MM-DD');
        state.submition_deadline = moment(new Date(year + '-04-30')).format('YYYY-MM-DD');
    } else if (state.name == '2nd Quarter Report') {
        state.date_start = moment(new Date(year + '-04-01')).format('YYYY-MM-DD');
        state.date_end = moment(new Date(year + '-06-30')).format('YYYY-MM-DD');
        state.submition_deadline = moment(new Date(year + '-07-31')).format('YYYY-MM-DD');
    } else if (state.name == '3rd Quarter Report') {
        state.date_start = moment(new Date(year + '-07-01')).format('YYYY-MM-DD');
        state.date_end = moment(new Date(year + '-09-30')).format('YYYY-MM-DD');
        state.submition_deadline = moment(new Date(year + '-10-31')).format('YYYY-MM-DD');

    } else if (state.name == '4th Quarter Report') {
        state.date_start = moment(new Date(year + '-10-01')).format('YYYY-MM-DD');
        state.date_end = moment(new Date(year + '-12-31')).format('YYYY-MM-DD');
        state.submition_deadline = moment(new Date(year + '-01-31')).format('YYYY-MM-DD');
    } else if (state.name == 'Custumized Date') {
        console.log("state.name", state.name)
    }
}


function openAddScheduleModal() {

    state.isAddModalOpen = true;

}

function table_row_getclicked(reportyears) {


    state.current_report_year = reportyears
    state.name = reportyears.name
    state.description = reportyears.description
    state.initiated_by = reportyears.initiated_by
    state.year = reportyears.year
    state.date_start = reportyears.date_start
    state.date_end = reportyears.date_end
    state.status = reportyears.status
    state.submition_deadline = reportyears.submition_deadline

}

// function set_year(){
//     let NewDate = new Date(state.date_start);
//     state.year = NewDate.getFullYear();
//     console.log("state.year", state.year)
// }


function SaveNewSchedule() {
    SaveSchedule();
    state.isAddModalOpen = false;
}

function saveEditModal() {
    SaveEditSchedule();
    state.isEditModalOpen = false;
}


async function SaveSchedule() {

    try {
        
        let params = {
            name: state.name,
            description: state.description,
            initiated_by: state.initiated_by,
            year: state.year,
            date_start: state.date_start,
            date_end: state.date_end,
            status: state.status,
            submition_deadline: state.submition_deadline,
        }

        console.log(params);

        const response = await report_yearService.createReportYear(params);
        if (response.data) {
            state.successcount = state.successcount + 1;
            fetchreportyear()
            console.log("state.report_years.data after save", state.report_years.data)
        }
    } catch (error) {
        state.errorcount = state.errorcount + 1;
    }
}



async function SaveEditSchedule() {

    try {

        //state.year = new Date().getFullYear();
        //state.name = state.name + ' ' + state.year;



        let params = {
            name: state.name,
            description: state.description,
            initiated_by: state.initiated_by,
            year: state.year,
            date_start: state.date_start,
            date_end: state.date_end,
            status: state.status,
            submition_deadline: state.submition_deadline,
        }

        console.log('params', params);
        console.log('state.current_report_year.id', state.current_report_year.id);

        const response = await report_yearService.updateReportYear(state.current_report_year.id, params);
        if (response.data) {
            state.successcount = state.successcount + 1;
            fetchreportyear()
            console.log("state.report_years.data after save", state.report_years.data)
        }
    } catch (error) {
        state.errorcount = state.errorcount + 1;
    }
}


function openEditModal() {
    state.isEditModalOpen = true
}

function closeEditModal() {
    state.isEditModalOpen = false
}

function openDisableModal() {
    state.isDisableModalOpen = true
}

function openDeleteModal() {
    state.isDeleteModalOpen = true
}



function cancelAddModal() {
    state.isAddModalOpen = false;
}

async function fetch_logged_user_role() {
    try {

        const response = await rolesService.getRole(userStore.getUser.userRole.role_id)
        //console.log(response)
        if (response.data) {
            state.logged_user_role = response.data

            //console.log(state.current_user_role)
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
            var option_datasource = [];
            if (state.report_years.data != null) {

                datasources = state.report_years.data
                console.log("state.report_years.data", state.report_years.data)


            }

        }
    } catch (error) {
        console.log(error)
    }


}




const check_errors = computed(() => {

    try {
        if (state.name === '') {
            state.name_error = 2
        } else if (state.name.length <= 5) {
            state.name_error = 1
        }
        else if (state.name.length > 5) {
            state.name_error = 3
        } else {
            state.name_error = 0
        }

    } catch (error) {
        state.name_error = 2
    }
})




definePageMeta({
    layout: 'main'
})

</script>