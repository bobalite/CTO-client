<template>
    <div class="min-h-screen flex flex-col bg-gray-100">
        <!-- Top Navbar -->
        <header class="w-full bg-white shadow px-4 py-1 flex items-center justify-between">
            <!-- Left side: Title + Year Selector -->
            <div class="flex items-center space-x-4">
                <h1 class="text-xl font-bold ">My Dashboard</h1>

                <FormYearSelector v-model="state.report_year" :options="state.options.report_years"
                    :change-selected-year="change_selected_year" />
            </div>

            <div class="flex items-center space-x-4">

            </div>

            <!-- Mobile Toggle -->
            <button @click="toggleSidebar" class="md:hidden px-3 py-2 rounded bg-gray-200 hover:bg-gray-300">
                ☰
            </button>

        </header>

        <!-- Tabs -->
        <ul class="flex justify-between w-full items-center m-0 p-0">
            <!-- Left group of tabs -->
            <div class="flex space-x-4">
                <li v-for="tab in tabs" :key="tab.name" class="list-none">
                    <a href="#" @click.prevent="activeTab = tab.name" :class="[
                        'flex items-center justify-center p-2 rounded-t-md transition-colors',
                        activeTab === tab.name
                            ? 'bg-green-100 text-green-900 shadow-inner'
                            : 'hover:bg-gray-200 text-gray-600'
                    ]">
                        <span class="material-icons text-xl">{{ tab.icon }}</span>
                    </a>
                </li>
            </div>


            <!-- Settings on far right -->
            <li class="list-none">
                <a href="#" class="flex items-center justify-center p-2 rounded-t-md hover:bg-gray-200"
                    @click.prevent="openSlideModal(1)">
                    <span class="material-icons text-xl">settings</span>
                </a>
            </li>
        </ul>

        <!-- Main Content -->
        <main class="flex-1 z-0 p-6 overflow-y-auto bg-green-100 text-green-900">
            <h2 class="text-lg font-semibold ">{{ activeTab.name }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
                <div class="bg-white text-black p-4 rounded-lg shadow">
                    Data Completion
                </div>
                <div class="bg-white text-black p-4 rounded-lg shadow">
                    Data Sources
                </div>
                <div class="bg-white text-black p-4 rounded-lg shadow">
                   Top Performing Indicator  
                </div>
                <div class="bg-white text-black p-4 rounded-lg shadow">
                    Poorest Performing Indicator
                </div>
                <div class="bg-white text-black p-4 rounded-lg shadow">
                     Overall Data Completion
                </div>
            </div>

            <div>

                <div v-if="state.loading == false"
                    class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12  border-solid border-grey border-t pb-4 pt-4">

                    <GraphsGrp01 v-if="state.showGraphsGrp01 == true" :key="state.refresh_graphs_toggle"
                        :passed_data="state.passed_data"
                        class="sm:col-span-4 text-xl font-bold text-black text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-700  rounded-xl border-blue-900 border-t border-b border-l border-r"
                        :displaytext="'TEENAGE PREGNANCY'" :report_year="state.report_year"
                        :passed_year_data="state.report_years">
                    </GraphsGrp01>

                    <GraphsGrp02 v-if="state.showGraphsGrp02 == true" :key="state.refresh_graphs_toggle"
                        :passed_data="state.passed_data"
                        class="sm:col-span-4 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
                        :displaytext="'Total number of nutritionally-at-risk pregnant women (PW)'"
                        :report_year="state.report_year">
                    </GraphsGrp02>
                </div>
            </div>


        </main>

        <ModalSlide :show="state.isSlideModalOpen" :close="closeSlideModal" :title="'Select Dashboard Widget'"
            :dialogClass="'flex h-full flex-col divide-y divide-black bg-opacity-90 bg-green-900 rounded-md shadow-xl mt-[4rem]'"
            :buttonClass="'relative rounded-md bg-green-600 text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500'"
            :tittleClass="'text-2xl text-right font-bold leading-tight tracking-tight text-black'">
            <div class="mt-8 px-6">
                <!-- Save Button -->
                <div class="mb-4">
                    <button @click="saveDashboardSettings()"
                        class="rounded-md px-6 py-2 bg-green-900 text-white font-semibold shadow-md hover:bg-green-600 hover:text-white transition-colors duration-200">
                        Save Dashboard Settings
                    </button>
                </div>
                <table class="table-fixed w-full bg-opacity-90">
                    <thead class="bg-green-800 text-white" pl-4> Survival Widgets.
                        <tr>
                            <th scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800">
                                <GridCheckbox v-model="state.showGraphsGrp01" :value="state.showGraphsGrp01"
                                    :dissabled="false" />
                            </th>
                            <th>
                                <GridCell
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800"
                                    :displaytext="'Group 1: Teenage Pregnancy'" />
                            </th>
                        </tr>
                        <tr>
                            <th scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800">
                                <GridCheckbox v-model="state.showGraphsGrp02" :value="state.showGraphsGrp02"
                                    :dissabled="false" />
                            </th>
                            <th>
                                <GridCell
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800"
                                    :displaytext="'Group 2: Total number of nutritionally-at-risk pregnant women (PW)'" />
                            </th>
                        </tr>
                        <tr>
                            <th scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800">
                                <GridCheckbox v-model="state.showGraphsGrp03" :value="state.showGraphsGrp03"
                                    :dissabled="false" />
                            </th>
                            <th>
                                <GridCell
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800"
                                    :displaytext="'Group 3: Proportion/percentage of nutritionally-at-risk PW'" />
                            </th>
                        </tr>
                        <tr>
                            <th scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800">
                                <GridCheckbox v-model="state.showGraphsGrp04" :value="state.showGraphsGrp04"
                                    :dissabled="false" />
                            </th>
                            <th>
                                <GridCell
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800"
                                    :displaytext="'Group 4: Total number of PW with at least 4 pre-natal check-ups'" />
                            </th>
                        </tr>
                        <tr>
                            <th scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800">
                                <GridCheckbox v-model="state.showGraphsGrp05" :value="state.showGraphsGrp05"
                                    :dissabled="false" />
                            </th>
                            <th>
                                <GridCell
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800"
                                    :displaytext="'Group 5: Proportion/percentage of PW with at least 4 pre-natal check-ups'" />
                            </th>
                        </tr>
                        <tr>
                            <th scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800">
                                <GridCheckbox v-model="state.showGraphsGrp06" :value="state.showGraphsGrp06"
                                    :dissabled="false" />
                            </th>
                            <th>
                                <GridCell
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800"
                                    :displaytext="'Group 6: Total Number of deliveries attended by skilled health professionals'" />
                            </th>
                        </tr>
                    </thead>
                    <thead class="bg-green-800 text-white" pl-4> Development Widgets.
                        <tr>
                            <th scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 ">
                                <GridCheckbox v-model="state.showGraphsGrp37" :value="state.showGraphsGrp37"
                                    :dissabled="false" />
                            </th>
                            <th>
                                <GridCell
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 "
                                    :displaytext="'Group 37: Net Enrolment rate:'" />
                            </th>
                        </tr>
                        <tr>
                            <th scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 ">
                                <GridCheckbox v-model="state.showGraphsGrp45" :value="state.showGraphsGrp45"
                                    :dissabled="false" />
                            </th>
                            <th>
                                <GridCell
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 "
                                    :displaytext="'Group 45: Total number of Out- of- school children and youth (OSCY)'" />
                            </th>
                        </tr>
                    </thead>
                    <thead class="bg-green-800 text-white" pl-4> Protection Widgets.
                        <tr>
                            <th scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 ">
                                <GridCheckbox v-model="state.showGraphsGrp48" :value="state.showGraphsGrp48"
                                    :dissabled="false" />
                            </th>
                            <th>
                                <GridCell
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 "
                                    :displaytext="'Group 48: Total number of violence against children cases, by type of violence'" />
                            </th>
                        </tr>
                        <tr>
                            <th scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 ">
                                <GridCheckbox v-model="state.showGraphsGrp49" :value="state.showGraphsGrp49"
                                    :dissabled="false" />
                            </th>
                            <th>
                                <GridCell
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 "
                                    :displaytext="'Group 49: Total number of violence against children cases resolved, by type of violence'" />
                            </th>
                        </tr>
                        <tr>
                            <th scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 ">
                                <GridCheckbox v-model="state.showGraphsGrp50" :value="state.showGraphsGrp50"
                                    :dissabled="false" />
                            </th>
                            <th>
                                <GridCell
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 "
                                    :displaytext="'Group 50: Total number of reported Children In-Need of Special Protection (CNSP) cases'" />
                            </th>
                        </tr>
                        <tr>
                            <th scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 ">
                                <GridCheckbox v-model="state.showGraphsGrp55" :value="state.showGraphsGrp55"
                                    :dissabled="false" />
                            </th>
                            <th>
                                <GridCell
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 "
                                    :displaytext="'Group 55: Total Number of Crimes Committed by Children, by type/category of crime committed:'" />
                            </th>
                        </tr>
                    </thead>
                    <thead class="bg-green-800 text-white" pl-4> Participation Widgets.
                        <tr>
                            <th scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 ">
                                <GridCheckbox v-model="state.showGraphsGrp59" :value="state.showGraphsGrp59"
                                    :dissabled="false" />
                            </th>
                            <th>
                                <GridCell
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 "
                                    :displaytext="'Group 59: Total Number of BCPC with child representatives, by type of selection process:'" />
                            </th>
                        </tr>
                    </thead>
                    <thead class="bg-green-800 text-white" pl-4> Governance Widgets.
                        <tr>
                            <th scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 ">
                                <GridCheckbox v-model="state.showGraphsGrp65" :value="state.showGraphsGrp65"
                                    :dissabled="false" />
                            </th>
                            <th>
                                <GridCell
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 "
                                    :displaytext="'Group 65: Established and updated database on children, with all of the following disaggregated information on children'" />
                            </th>
                        </tr>
                    </thead>
                    <thead class="bg-green-800 text-white" pl-4> General Information Widgets.
                        <tr>
                            <th scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 ">
                                <GridCheckbox v-model="state.showGraphsGrp68" :value="state.showGraphsGrp68"
                                    :dissabled="false" :displaytext="'Group 68'" />
                            </th>
                            <th>
                                <GridCell
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-white rounded-md bg-green-800 "
                                    :displaytext="'Group 68: Total population of children, by sex, by age group'" />
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </ModalSlide>
    </div>
</template>

<script setup>

definePageMeta({
    layout: 'main'
})

import { ref } from 'vue'



// Sidebar items
const tabs = [
    { name: 'Survival', icon: 'favorite' },       // ❤️ (replace with better fit)
    { name: 'Development', icon: 'trending_up' }, // 📈
    { name: 'Protection', icon: 'security' },     // 🔒
    { name: 'Participation', icon: 'groups' },    // 👥
    { name: 'Governance', icon: 'gavel' },        // ⚖️
    { name: 'General Information', icon: 'info' } // ℹ️
]

// Track which tab is active
const activeTab = ref(tabs[0])

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
}

const toggleDesktopSidebar = () => {
    desktopCollapsed.value = !desktopCollapsed.value
}


//import ApexCharts from 'vue3-apexcharts';
//import {Rights_entry_configServices } from '~/components/api/Rights_entry_configService'; 
import { useUserStore } from '~/store/user'
import { userDashboardWidgetsService } from '~/components/api/UserDashboardWidgetsService';
import { report_yearService } from '~/components/api/ReportYears';
import { reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService';
// import { HomeIcon, HeartIcon, ShieldIcon, UsersIcon, SettingsIcon } from "@heroicons/vue/24/solid"

// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';

const userStore = useUserStore()


//console.log(userStore.getUser.user_dashboard_widgets)


definePageMeta({
    layout: 'main'
})



onMounted(() => {
    fetchreportyear()
    fetchData()

    loop_through_user_widgets()

})



const state = reactive({


    sidebarOpen: false, // mobile
    desktopCollapsed: false,
    loading: true,
    activeTab: 'Survival',

    user_dashboard_widgets: userStore.getUser.user_dashboard_widgets,
    user_id: userStore.getUser.id,

    passed_data: [],

    isPageLoading: false,
    isSlideModalOpen: false,
    options: {
        report_years: [
            { value: '1', label: 'Jan - Dec 2024', year: '2024' },
            { value: '2', label: 'Jan - Dec 2025', year: '2025' },

        ],
    },
    report_year: 1,

    report_years: [],
    year: '2025',

    refresh_graphs_toggle: false,
    showGraphsGrp01: false,
    showGraphsGrp02: false,
    showGraphsGrp03: false,
    showGraphsGrp04: false,
    showGraphsGrp05: false,
    showGraphsGrp06: false,
    showGraphsGrp37: false, //
    showGraphsGrp45: false,
    showGraphsGrp48: false,//
    showGraphsGrp49: false,
    showGraphsGrp50: false,
    showGraphsGrp55: false,
    showGraphsGrp59: false,//
    showGraphsGrp65: false,//
    showGraphsGrp68: false,//
    showGraphsGrp70: false,//
    showGraphsGrp71: false,
    showGraphsGrp72: false,
    showGraphsGrp73: false,
    showGraphsGrp74: false,
    showGraphsGrp75: false,
    showGraphsGrp76: false,
    showGraphsGrp77: false,
    showGraphsGrp78: false,

})

function openSlideModal() {
    state.isSlideModalOpen = true
}
function closeSlideModal() {
    state.isSlideModalOpen = false
}


function saveDashboardSettings() {

    deleteUserDashboardWidgets()
    loopthroughNewSettings()
    fetchUserDashboardWidgets()
    loop_through_user_widgets()

    state.isSlideModalOpen = false
}


function change_selected_year(opt) {

    // state.current_user_roles = state.roles.data[ state.selected_user_role -1]
    console.log('state.report_year', state.report_year)
    console.log('state.options.report_years.length', state.options.report_years.length)

    if (opt == 1) {

        if (state.report_year < state.options.report_years.length) {
            state.report_year++
        }
    }

    if (opt == 2) {
        if (state.report_year > 1) {
            state.report_year--
        }
    }

    state.year = state.report_years.value
    //console.log('state. in change',state.year)
    //state.refresh_graphs01 = true

    if (state.refresh_graphs_toggle == false) {
        state.refresh_graphs_toggle = true
    } else {
        state.refresh_graphs_toggle = false
    }

    refresh_graphs()
    //console.log('report_year', state.report_year)

}





async function fetchData() {
    state.isPageLoading = true
    const response = await reportDetailsGroupsService.getReportDetailsGroups()
    state.passed_data.data = response.data
    //console.log('fetchData', state.passed_data)
    state.loading = false

}


async function deleteUserDashboardWidgets() {
    try {
        await userDashboardWidgetsService.deleteUserDashboardWidgets(state.user_id);

    } catch (error) {
        //console.log(error)
        state.errorcount = state.errorcount + 1;
    }
}

function loopthroughNewSettings() {

    //console.log('loop thru start')

    if (state.showGraphsGrp01) {
        SaveUserDashboardWidgets(1)
    }
    if (state.showGraphsGrp02) {
        SaveUserDashboardWidgets(2)
    }
    if (state.showGraphsGrp03) {
        SaveUserDashboardWidgets(3)
    }
    if (state.showGraphsGrp04) {
        SaveUserDashboardWidgets(4)
    }
    if (state.showGraphsGrp05) {
        SaveUserDashboardWidgets(5)
    }
    if (state.showGraphsGrp06) {
        SaveUserDashboardWidgets(6)

    }
    if (state.showGraphsGrp37) {
        SaveUserDashboardWidgets(37)

    }
    if (state.showGraphsGrp45) {
        SaveUserDashboardWidgets(45)

    }
    if (state.showGraphsGrp48) {
        SaveUserDashboardWidgets(48)

    }
    if (state.showGraphsGrp49) {
        SaveUserDashboardWidgets(49)

    }
    if (state.showGraphsGrp50) {
        SaveUserDashboardWidgets(50)

    }
    if (state.showGraphsGrp55) {
        SaveUserDashboardWidgets(55)

    }

    if (state.showGraphsGrp59) {
        SaveUserDashboardWidgets(59)

    }
    if (state.showGraphsGrp65) {
        SaveUserDashboardWidgets(65)

    }
    if (state.showGraphsGrp68) {
        SaveUserDashboardWidgets(68)

    }
    if (state.showGraphsGrp70) {
        SaveUserDashboardWidgets(70)

    }
    if (state.showGraphsGrp71) {
        SaveUserDashboardWidgets(71)

    }
    if (state.showGraphsGrp72) {
        SaveUserDashboardWidgets(72)

    }
    if (state.showGraphsGrp73) {
        SaveUserDashboardWidgets(73)

    }
    if (state.showGraphsGrp74) {
        SaveUserDashboardWidgets(74)

    }
    if (state.showGraphsGrp75) {
        SaveUserDashboardWidgets(75)

    }



}


async function SaveUserDashboardWidgets(group_id) {

    try {
        let params = {
            user_id: state.user_id,
            group_id: group_id,

        }
        const response = await userDashboardWidgetsService.createUserDashboardWidget(params);


    } catch (error) {
        //console.log(error)
        state.errorcount = state.errorcount + 1;
    } finally {
        //console.log('saved user dashboard widget', group_id)
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

                        if (datasources[i].status == 1) {
                            data[i] = { "value": datasources[i].id, "label": datasources[i].name, "year": datasources[i].year };
                        }
                    }
                }
                state.options.report_years = data;

            }

        }
    } catch (error) {
        //console.log(error)
    }

    //console.log(state.options.report_years)
}

async function fetchUserDashboardWidgets() {
    try {
        const response = await userDashboardWidgetsService.getUserDashboardWidget(state.user_id);

        if (response.data) {
            state.user_dashboard_widgets.data = response.data
            //console.log( state.user_dashboard_widgets.data)
        }
        else {
            state.user_dashboard_widgets = []
            //console.log( 'empty',state.user_dashboard_widgets.data)

        }

    } catch (error) {

    }


}

function refresh_graphs() {
    //console.log('refresh graphs')
    destroy_graphs()
    fetchUserDashboardWidgets()
    loop_through_user_widgets()

}

async function destroy_graphs() {

    state.showGraphsGrp01 = false
    state.showGraphsGrp02 = false
    state.showGraphsGrp03 = false
    state.showGraphsGrp04 = false
    state.showGraphsGrp05 = false
    state.showGraphsGrp06 = false
    state.showGraphsGrp37 = false //
    state.showGraphsGrp45 = false
    state.showGraphsGrp48 = false//
    state.showGraphsGrp49 = false
    state.showGraphsGrp50 = false
    state.showGraphsGrp55 = false
    state.showGraphsGrp59 = false//
    state.showGraphsGrp65 = false//
    state.showGraphsGrp68 = false//
    state.showGraphsGrp70 = false//
    state.showGraphsGrp71 = false
    state.showGraphsGrp72 = false
    state.showGraphsGrp73 = false
    state.showGraphsGrp74 = false
    state.showGraphsGrp75 = false
    state.showGraphsGrp76 = false
    state.showGraphsGrp77 = false
    state.showGraphsGrp78 = false

}



function loop_through_user_widgets() {


    //console.log( 'loop', state.user_dashboard_widgets)

    for (let i = 0; i < state.user_dashboard_widgets.length; i++) {
        const group_id = state.user_dashboard_widgets[i].group_id;
        //console.log('group_id', group_id)

        if (group_id === 1) {
            state.showGraphsGrp01 = true
        } else if (group_id === 2) {
            state.showGraphsGrp02 = true
        } else if (group_id === 3) {
            state.showGraphsGrp03 = true
        } else if (group_id === 4) {
            state.showGraphsGrp04 = true
        } else if (group_id === 5) {
            state.showGraphsGrp05 = true
        } else if (group_id === 6) {
            state.showGraphsGrp06 = true
        } else if (group_id === 37) {
            state.showGraphsGrp37 = true
        } else if (group_id === 45) {
            state.showGraphsGrp45 = true
        } else if (group_id === 48) {
            state.showGraphsGrp48 = true
        } else if (group_id === 49) {
            state.showGraphsGrp49 = true
        } else if (group_id === 50) {
            state.showGraphsGrp50 = true
        } else if (group_id === 55) {
            state.showGraphsGrp55 = true
        } else if (group_id === 59) {
            state.showGraphsGrp59 = true
        } else if (group_id === 65) {
            state.showGraphsGrp65 = true
        } else if (group_id === 68) {
            state.showGraphsGrp68 = true
        } else if (group_id === 70) {
            state.showGraphsGrp70 = true
        } else if (group_id === 71) {
            state.showGraphsGrp71 = true
        } else if (group_id === 72) {
            state.showGraphsGrp72 = true
        } else if (group_id === 73) {
            state.showGraphsGrp73 = true
        } else if (group_id === 74) {
            state.showGraphsGrp74 = true
        } else if (group_id === 75) {
            state.showGraphsGrp75 = true
        }

    }
}



function pageLoads(value) {
    state.isPageLoading = value
}

function printWindow() {
    window.print();
}


</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

main::-webkit-scrollbar {
    width: 6px;
}

main::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
}
</style>
