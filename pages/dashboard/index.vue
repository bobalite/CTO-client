<template>
  <!---------------------------------changes ------------------------------------------->

  <header class="w-full bg-white shadow px-4 py-1 flex items-center justify-between z-1">
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
        <a href="#" @click.prevent=change_right_id(tab.name)
          :class="[
                        'flex items-center justify-center p-2 rounded-t-md transition-colors',
                        state.activeTab === tab.name ? 'bg-green-200 text-green-900 shadow-inner' : 'hover:bg-gray-200 text-gray-600']">
          <span v-if="tab.name == 'Survival'">
            <IconMaterialSurvival />
          </span>
          <span v-if="tab.name == 'Development'">
            <IconMaterialSchool />
          </span>
          <span v-if="tab.name == 'Protection'">
            <IconMaterialPolice />
          </span>
          <span v-if="tab.name == 'Participation'">
            <IconMaterialParticipation />
          </span>
          <span v-if="tab.name == 'Governance'">
            <IconMaterialGovernance />
          </span>
          <span v-if="tab.name == 'General Information'">
            <IconMaterialGenInfo />
          </span>
        </a>
      </li>
    </div>


    <!-- Settings on far right -->
    <li class="list-none">
      <a href="#" class="flex items-center justify-center p-2 rounded-t-md hover:bg-gray-200"
        @click.prevent="openSlideModal(1)">
        <span>
          <IconMaterialSettings />
        </span>
      </a>
    </li>
  </ul>




  <main class="flex-1 z-5 p-6 overflow-y-auto bg-green-200 text-green-900">
    <h2 class="text-lg font-semibold ">{{ state.activeTab }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <div class="bg-green-300 text-gray-800 p-1 rounded-lg shadow sm:col-span-1 -z-1">
        <GraphsDataCompletion :key="state.refresh_graphs_toggle" :passed_data="state.passed_data"
          :displaytext="'Data Completion'" :report_year="'2025'">
        </GraphsDataCompletion>
      </div>

      <div class="bg-green-300 text-gray-800 p-4 rounded-lg shadow sm:col-span-1">
        <GraphsDataSources :key="state.refresh_graphs_toggle" :passed_data="state.passed_data"
          :displaytext="' Data Sources'" :report_year="'2025'">
        </GraphsDataSources>

      </div>
      <div class="bg-green-300 text-black p-4 rounded-lg shadow sm:col-span-2">
        <GraphsDataStatistics :key="state.refresh_graphs_toggle" :passed_data="state.passed_data"
          :displaytext="' Data Sources'" :report_year="'2025'">
        </GraphsDataStatistics>
      </div>


    </div>
  </main>


  <!----------------------------------changes ------------------------------------------------------------>

  <div class="flex h-screen">
    <!-- Left: Main Content -->
    <div class="flex-1 flex flex-col">

      <!------------------------------------------------------------------------------------------------------->
      <div v-if="state.loading == false"
        class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12 bg-green-200 border-solid border-grey pb-4 pt-4">

        <!-- -------------survival group----------------- -->

        <GraphsSurvivalMaternalServices v-if="state.activeTab === 'Survival'"   :key="`maternal-${state.report_year_id}`"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="'Maternal Deliveries'" :report_year="state.year" :report_years="state.report_years" >
        </GraphsSurvivalMaternalServices>

        <GraphsSurvivalMortality v-if="state.activeTab === 'Survival'" :key="state.refresh_graphs_toggle"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="'Mortality Rates'" :report_year="state.report_year">
        </GraphsSurvivalMortality>

        <GraphsSurvivalNutritionalPreSchool v-if="state.activeTab === 'Survival'" :key="state.refresh_graphs_toggle"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="'Mortality Rates'" :report_year="state.report_year">
        </GraphsSurvivalNutritionalPreSchool>

        <GraphsSurvivalNutritionalSchoolChildren v-if="state.activeTab === 'Survival'"
          :key="state.refresh_graphs_toggle" :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="'Mortality Rates'" :report_year="state.report_year">
        </GraphsSurvivalNutritionalSchoolChildren>

        <GraphsSurvivalAccess v-if="state.activeTab === 'Survival'" :key="state.refresh_graphs_toggle"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="'Access to Sanitation Facilities and Safe Water Supply'" :report_year="state.report_year">
        </GraphsSurvivalAccess>

        <GraphsSurvivalHIV v-if="state.activeTab === 'Survival'" :key="state.refresh_graphs_toggle"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :report_year="state.report_year">
        </GraphsSurvivalHIV>



        <!-- -----------development group---------------- -->

        <GraphsDevelopmentEarlyChildhood v-if="state.activeTab === 'Development'" :key="state.refresh_graphs_toggle"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="' Net Enrolment rate:'" :report_year="state.report_year" :passed_year_data="state.report_years">
        </GraphsDevelopmentEarlyChildhood>

        <GraphsDevelopmentEnrolment v-if="state.activeTab === 'Development'" :key="state.refresh_graphs_toggle"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="' Net Enrolment rate:'" :report_year="state.report_year" :passed_year_data="state.report_years">
        </GraphsDevelopmentEnrolment>


        <GraphsDevelopmentOSCY v-if="state.activeTab === 'Development'" :key="state.refresh_graphs_toggle"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="' Net Enrolment rate:'" :report_year="state.report_year" :passed_year_data="state.report_years">
        </GraphsDevelopmentOSCY>

        <!-- -----protection group---------------- -->

        <GraphsProtectionChildrenInNeed v-if="state.activeTab === 'Protection'" :key="state.refresh_graphs_toggle"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :report_year="state.report_year" :passed_year_data="state.report_years">
        </GraphsProtectionChildrenInNeed>

        <GraphsProtectionChildrenInConflict v-if="state.activeTab === 'Protection'" :key="state.refresh_graphs_toggle"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :report_year="state.report_year" :passed_year_data="state.report_years">
        </GraphsProtectionChildrenInConflict>




        <!-- -------participation group---------------- -->

        <GraphsParticipationChildrens v-if="state.activeTab === 'Participation'" :key="state.refresh_graphs_toggle"
          :passed_data="state.passed_data"
          class="sm:col-span-4 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="'Total Number of BCPC with child representatives, by type of selection process:'"
          :report_year="state.report_year" :passed_year_data="state.report_years">
        </GraphsParticipationChildrens>

        <!-- -------governance group---------------- -->
      
     
        <GraphsGovernanceLocalCouncil v-if="state.activeTab === 'Governance'" :key="state.refresh_graphs_toggle"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="'Total Number of BCPC with child representatives, by type of selection process:'"
          :report_year="state.report_year" :passed_year_data="state.report_years">
        </GraphsGovernanceLocalCouncil>


        <!-- -------general information group---------------- -->

        <GraphsGeneralInformation v-if="state.activeTab === 'General Information'" :key="state.refresh_graphs_toggle"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="'Total Number of BCPC with child representatives, by type of selection process:'"
          :report_year="state.report_year" :passed_year_data="state.report_years">
        </GraphsGeneralInformation>


        <!-- <GraphsGrp68 v-if="state.activeTab === 'General Information'" :key="state.refresh_graphs_toggle"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="' Total population of children, by sex, by age group'" :report_year="state.report_year">
        </GraphsGrp68> -->

      </div>


    </div>

    <!-- Right Aside -->
    <!-- <aside class="w-36 bg-green-200 border-l shadow-lg p-4 overflow-y-auto">
      <h3 class="text-lg font-bold mb-4">Trends</h3>
      <p class="text-sm text-gray-600"></p>


      <TrendsPregnancy v-if="state.showGraphsGrp03 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-6 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="''" :report_year="state.report_year">
      </TrendsPregnancy>

    </aside> -->
  </div>
  <!------------------------------------------------------------------------------------------------------->



  <ModalSlide :show="state.isSlideModalOpen" :close="closeSlideModal" :title="'Select Dashboard Widget'"
    :dialogClass="'flex h-full flex-col divide-y divide-black bg-opacity-90 bg-green-900 rounded-md shadow-xl mt-[4rem]'"
    :buttonClass="'relative rounded-md bg-green-600 text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500'"
    :tittleClass="'text-2xl text-right font-bold leading-tight tracking-tight text-black'">
    <div class="mt-8 flow-root ">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-left sm:px-6 lg:px-8">
          <div class="overflow-hidden px-3 py-3.5 shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">

            <div class="inline-block min-w-full py-2 align-left sm:px-6 lg:px-8">
              <button @click="saveDashboardSettings()"
                class="rounded-md px-6 py-2 bg-green-900 text-white  font-semibold shadow-md hover:bg-green-600 hover:text-white transition-colors duration-200">Save
                Dashboard Settings</button>
            </div>



            <table class="table-fixed w-full bg-opacity-90">
              <thead class="bg-green-800 text-white" pl-4> Survival Widgets.
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800">
                    <GridCheckbox v-model="state.showGraphsGrp01" :value="state.showGraphsGrp01" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800" :displaytext="'Group 1: Teenage Pregnancy'" />
                  </th>
                </tr>

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800">
                    <GridCheckbox v-model="state.showGraphsGrp02" :value="state.showGraphsGrp02" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800"
                      :displaytext="'Group 2: Total number of nutritionally-at-risk pregnant women (PW)'" />
                  </th>
                </tr>

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800">
                    <GridCheckbox v-model="state.showGraphsGrp03" :value="state.showGraphsGrp03" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800" :displaytext="'Group 3: Proportion/percentage of nutritionally-at-risk PW'" />
                  </th>
                </tr>
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800">
                    <GridCheckbox v-model="state.showGraphsGrp04" :value="state.showGraphsGrp04" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800"
                      :displaytext="'Group 4: Total number of PW with at least 4 pre-natal check-ups'" />
                  </th>
                </tr>
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800">
                    <GridCheckbox v-model="state.showGraphsGrp05" :value="state.showGraphsGrp05" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800"
                      :displaytext="'Group 5: Proportion/percentage of PW with at least 4 pre-natal check-ups'" />
                  </th>
                </tr>

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800">
                    <GridCheckbox v-model="state.showGraphsGrp06" :value="state.showGraphsGrp06" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800"
                      :displaytext="'Group 6: Total Number of deliveries attended by skilled health professionals'" />
                  </th>
                </tr>



              </thead>
              <thead class="bg-green-800 text-white" pl-4> Development Widgets.

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 ">
                    <GridCheckbox v-model="state.showGraphsGrp37" :value="state.showGraphsGrp37" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 " :displaytext="'Group 37: Net Enrolment rate:'" />
                  </th>
                </tr>

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 ">
                    <GridCheckbox v-model="state.showGraphsGrp45" :value="state.showGraphsGrp45" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 "
                      :displaytext="'Group 45: Total number of Out- of- school children and youth (OSCY)'" />
                  </th>
                </tr>



              </thead>

              <thead class="bg-green-800 text-white" pl-4> Protection Widgets.

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 ">
                    <GridCheckbox v-model="state.showGraphsGrp48" :value="state.showGraphsGrp48" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 "
                      :displaytext="'Group 48: Total number of violence against children cases, by type of violence'" />
                  </th>
                </tr>

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 ">
                    <GridCheckbox v-model="state.showGraphsGrp49" :value="state.showGraphsGrp49" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 "
                      :displaytext="'Group 49: Total number of violence against children cases resolved, by type of violence'" />
                  </th>

                </tr>

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 ">
                    <GridCheckbox v-model="state.showGraphsGrp50" :value="state.showGraphsGrp50" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 "
                      :displaytext="'Group 50: Total number of reported Children In-Need of Special Protection (CNSP) cases'" />
                  </th>

                </tr>
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 ">
                    <GridCheckbox v-model="state.showGraphsGrp55" :value="state.showGraphsGrp55" :dissabled="false" />
                  </th>

                  <th>
                    <GridCell class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 "
                      :displaytext="'Group 55: Total Number of Crimes Committed by Children, by type/category of crime committed:'" />
                  </th>

                </tr>
              </thead>
              <thead class="bg-green-800 text-white" pl-4> Participation Widgets.
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 ">
                    <GridCheckbox v-model="state.showGraphsGrp59" :value="state.showGraphsGrp59" :dissabled="false" />
                  </th>

                  <th>
                    <GridCell class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 "
                      :displaytext="'Group 59: Total Number of BCPC with child representatives, by type of selection process:'" />
                  </th>

                </tr>
              </thead>
              <thead class="bg-green-800 text-white" pl-4> Governance Widgets.

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 ">
                    <GridCheckbox v-model="state.showGraphsGrp65" :value="state.showGraphsGrp65" :dissabled="false" />
                  </th>

                  <th>
                    <GridCell class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 "
                      :displaytext="'Group 65: Established and updated database on children, with all of the following disaggregated information on children'" />
                  </th>

                </tr>
              </thead>
              <thead class="bg-green-800 text-white" pl-4> General Information Widgets.
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 ">
                    <GridCheckbox v-model="state.showGraphsGrp68" :value="state.showGraphsGrp68" :dissabled="false"
                      :displaytext="'Group 68'" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left text-sm font-semibold text-white 
             rounded-md bg-green-800 " :displaytext="'Group 68: Total population of children, by sex, by age group'" />
                  </th>
                </tr>



              </thead>

            </table>
          </div>
        </div>
      </div>


    </div>

  </ModalSlide>


</template>

<script setup>
import { reportDetailsService } from '~/components/api/ReportDetailsService'
import { reportDetailsExcelService } from '~/components/api/ReportDetailsExcelService';
import {useUserStore} from '~/store/user'
import {userDashboardWidgetsService } from '~/components/api/UserDashboardWidgetsService'; 
import {report_yearService } from '~/components/api/ReportYears';
import {reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService'; 
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';



const userStore = useUserStore()


//console.log(userStore.getUser.user_dashboard_widgets)


definePageMeta({
    layout: 'main'
})





onMounted(() => {
  fetchreportyear()
  fetchData()
  get_year_details()
  getexceldata()
 
  //loop_through_user_widgets()
  
})




// Sidebar items
let tabs = [
    { name: 'Survival', icon: 'monitor_heart' },       // ❤️ (replace with better fit)
    { name: 'Development', icon: 'school' }, // 📈
    { name: 'Protection', icon: 'local_police' },     // 🔒
    { name: 'Participation', icon: 'diversity_3' },    // 👥
    { name: 'Governance', icon: 'account_balance' },        // ⚖️
    { name: 'General Information', icon: 'info' } // ℹ️
]

// Track which tab is active


const state = reactive({

    activeTab: tabs[0].name,
    loading: true,
    user_dashboard_widgets: userStore.getUser.user_dashboard_widgets,
    user_id: userStore.getUser.id,

    right_id: 1,

    passed_data: [],
    group_details: [],
    exceldata: [],

    isPageLoading: false,
    isSlideModalOpen: false,
    options: {
      report_years:[
            {value: '1', label: 'Jan - Dec 2024', year: '2024' },
            {value: '2', label: 'Jan - Dec 2025', year: '2025' },

        ],},
    report_year: 1,
    report_year_id: 1,


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
  //fetchUserDashboardWidgets()
  //loop_through_user_widgets()
 
   state.isSlideModalOpen = false
}


function change_selected_year(opt){

  // state.current_user_role = state.roles.data[ state.selected_user_role -1]
  console.log('state.report_year', state.report_year)
  console.log('state.options.report_years.length', state.options.report_years.length)

  if (opt == 1){

    if (state.report_year < state.options.report_years.length ) {
      state.report_year++
    }
  } 
  
  if (opt == 2){
    if (state.report_year > 1) {
      state.report_year--
    }
  }

  state.year = state.report_years.value
  console.log('state. in change',state.year)
  //state.refresh_graphs01 = true

  if (state.refresh_graphs_toggle == false) {
    state.refresh_graphs_toggle = true
  } else {
    state.refresh_graphs_toggle = false
  } 

  refresh_graphs()
  console.log('report_year', state.report_year)
  
}

function change_right_id(tab_name){


  state.activeTab =  tab_name
  //console.log('right_id in change',right_id)
  
  if (state.activeTab === 'Survival') {
    state.right_id = 1
  } else if (state.activeTab === 'Development') {
    state.right_id = 2
  } else if (state.activeTab === 'Protection') {
    state.right_id = 3
  } else if (state.activeTab === 'Participation') {
    state.right_id = 4
  } else if (state.activeTab === 'Governance') {
    state.right_id = 5
  } else if (state.activeTab === 'General Information') {
    state.right_id = 6
  
  }
  console.log('right_id', state.right_id)
  refresh_data()
 
}


function refresh_data(){
  fetchData()
}


async function fetchData() {
  state.isPageLoading = true
 
   const params = {
      //indicator_group_id: props.group.group_no ?? null,
      report_year: Number(state.year),
      right_id: Number(state.right_id)
    }

  console.log('params', params) 
  const response = await reportDetailsGroupsService.getReportDetailsGroups(params)
  
  state.passed_data.data = response.data
  console.log('fetchData', state.passed_data)
  state.loading = false
 
}   



async function get_year_details() {
  try {
    
    const params = {
      //indicator_group_id: props.group.group_no ?? null,
      report_year: Number(state.year),
      report_year_id: Number(state.report_year),
    }

    const response = await reportDetailsService.getReportDetails(params)
    console.log('response params', params)
    //state.group_details = response
   
  } catch (err) {
    console.error('Error get_year_details:', err)
  }
}

async function getexceldata() {
  try {
    const params = {
      report_year_id: Number(state.report_year),
    }
    const response = await reportDetailsExcelService.getReportExcelDetails(params)
    state.exceldata = response
    console.log('getexceldata response', state.exceldata)
    
  } catch (err) {
    console.error('Error getexceldata:', err)
  }
 
}



async function deleteUserDashboardWidgets(){
  try{
     //await userDashboardWidgetsService.deleteUserDashboardWidgets(state.user_id);
   
    } catch (error) {
        //console.log(error)
        state.errorcount = state.errorcount + 1;
    }
}

// function loopthroughNewSettings(){

//   //console.log('loop thru start')

//   if (state.showGraphsGrp01) {
//     SaveUserDashboardWidgets(1)
//   }
//   if (state.showGraphsGrp02) {
//     SaveUserDashboardWidgets(2)
//   }
//   if (state.showGraphsGrp03) {  
//     SaveUserDashboardWidgets(3)
//   }
//   if (state.showGraphsGrp04) {
//     SaveUserDashboardWidgets(4) 
//   }
//   if (state.showGraphsGrp05) {  
//     SaveUserDashboardWidgets(5) 
//   }
//   if (state.showGraphsGrp06) {  
//     SaveUserDashboardWidgets(6) 

//   }
//   if (state.showGraphsGrp37) {  
//     SaveUserDashboardWidgets(37) 

//   }
//   if (state.showGraphsGrp45) {  
//     SaveUserDashboardWidgets(45) 

//   }
//   if (state.showGraphsGrp48) {  
//     SaveUserDashboardWidgets(48) 

//   }
//   if (state.showGraphsGrp49) {  
//     SaveUserDashboardWidgets(49) 

//   }
//   if (state.showGraphsGrp50) {  
//     SaveUserDashboardWidgets(50) 

//   }
//   if (state.showGraphsGrp55) {  
//     SaveUserDashboardWidgets(55) 

//   }                        

//   if (state.showGraphsGrp59) {  
//     SaveUserDashboardWidgets(59) 

//   } 
//   if (state.showGraphsGrp65) {  
//     SaveUserDashboardWidgets(65) 

//   }
//   if (state.showGraphsGrp68) {  
//     SaveUserDashboardWidgets(68) 

//   } 
//   if (state.showGraphsGrp70) {  
//     SaveUserDashboardWidgets(70) 

//   } 
//   if (state.showGraphsGrp71) {  
//     SaveUserDashboardWidgets(71) 

//   }
//   if (state.showGraphsGrp72) {  
//     SaveUserDashboardWidgets(72) 

//   }
//   if (state.showGraphsGrp73) {  
//     SaveUserDashboardWidgets(73) 

//   }
//   if (state.showGraphsGrp74) {  
//     SaveUserDashboardWidgets(74) 

//   }
//   if (state.showGraphsGrp75) {  
//     SaveUserDashboardWidgets(75) 

//   }  

    

// }


// async function SaveUserDashboardWidgets(group_id){ 

//   try {
//         let params = {
//             user_id: state.user_id,
//             group_id: group_id,

//         }
//         const response = await userDashboardWidgetsService.createUserDashboardWidget(params);
      

//     } catch (error) {
//         //console.log(error)
//         state.errorcount = state.errorcount + 1;
//     }finally {
//         //console.log('saved user dashboard widget', group_id)
//     }

   

// }




async function fetchreportyear() {
    try {
           const response = await report_yearService.getReportYears()


        if (response.data) {
            
            state.report_years.data = response.data

            console.log('fetchreportyear report years', state.report_years.data)
            var data = [];
            var datasources = [];
            if (state.report_years.data != null) {
                
                datasources = state.report_years.data

                for (const i in datasources) {
                    const value = datasources[i].id;
                    if (!datasources.includes(value)) {

                        if(datasources[i].status == 1){
                        data[i] = { "value": datasources[i].id, "label": datasources[i].name, "year": datasources[i].year  };
                        }
                    }
                }
                state.options.report_years = data;
                
            }

        }
    } catch (error) { 
        //console.log(error)
    }

    console.log(state.options.report_years)
}




async function fetchUserDashboardWidgets() {
  try {
    const response = await userDashboardWidgetsService.getUserDashboardWidget(state.user_id);

    if (response.data) {
            state.user_dashboard_widgets.data = response.data
            //console.log( state.user_dashboard_widgets.data)
        }
        else{
            state.user_dashboard_widgets = []
            //console.log( 'empty',state.user_dashboard_widgets.data)

        }
    
  } catch (error) {
    
  }
    
   
}

function refresh_graphs(){
  //console.log('refresh graphs')
  destroy_graphs()
  //fetchUserDashboardWidgets()
  //loop_through_user_widgets()

}

async function destroy_graphs(){

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



function loop_through_user_widgets(){

  
  //console.log( 'loop', state.user_dashboard_widgets)

  for (let i = 0; i < state.user_dashboard_widgets.length; i++) {
    const group_id = state.user_dashboard_widgets[i].group_id;
    //console.log('group_id', group_id)
    
    if (group_id === 1) {
      state.showGraphsGrp01 = true
    } else if (group_id === 2)  {
      state.showGraphsGrp02 = true
    } else if (group_id === 3)  {
      state.showGraphsGrp03 = true
    } else if (group_id === 4)  {
      state.showGraphsGrp04 = true
    } else if (group_id === 5)  {
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
    }else if (group_id === 70) {
      state.showGraphsGrp70 = true
    }else if (group_id === 71) {
      state.showGraphsGrp71 = true
    }else if (group_id === 72) {
      state.showGraphsGrp72 = true
    }else if (group_id === 73) {
      state.showGraphsGrp73 = true
    }else if (group_id === 74) {
      state.showGraphsGrp74 = true
    }else if (group_id === 75) {
      state.showGraphsGrp75 = true
    }

}}



function pageLoads(value) {
    state.isPageLoading = value
}

function printWindow(){
  window.print();
}
</script>

<style>
@media print {
  body {
    background: white;
  }

  /* Optional: prevent page breaks inside chart */
  .apexcharts-canvas {
    page-break-inside: avoid;
  }
}
</style>