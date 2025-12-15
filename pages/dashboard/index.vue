<template>
  <header class="w-full bg-white shadow px-4 py-1 flex items-center justify-between z-1">
    <div class="flex items-center space-x-4">
      <h1 class="text-xl font-bold">My Dashboard</h1>

      <FormYearSelector
        v-model="state.report_year"
        :options="state.options.report_years"
        :change-selected-year="change_selected_year"
      />
    </div>

    <div class="flex items-center space-x-4"></div>

    <button @click="toggleSidebar" class="md:hidden px-3 py-2 rounded bg-gray-200 hover:bg-gray-300">
      ☰
    </button>
  </header>

  <ul class="flex justify-between w-full items-center m-0 p-0">
    <div class="flex space-x-4">
      <li v-for="tab in tabs" :key="tab.name" class="list-none">
        <a
          href="#"
          @click.prevent="change_right_id(tab.name)"
          :class="[
            'flex items-center justify-center p-2 rounded-t-md transition-colors',
            state.activeTab === tab.name ? 'bg-green-200 text-green-900 shadow-inner' : 'hover:bg-gray-200 text-gray-600'
          ]"
        >
          <span v-if="tab.name == 'Survival'"><IconMaterialSurvival /></span>
          <span v-if="tab.name == 'Development'"><IconMaterialSchool /></span>
          <span v-if="tab.name == 'Protection'"><IconMaterialPolice /></span>
          <span v-if="tab.name == 'Participation'"><IconMaterialParticipation /></span>
          <span v-if="tab.name == 'Governance'"><IconMaterialGovernance /></span>
          <span v-if="tab.name == 'General Information'"><IconMaterialGenInfo /></span>
        </a>
      </li>
    </div>

    <!-- <li class="list-none">
      <a href="#" class="flex items-center justify-center p-2 rounded-t-md hover:bg-gray-200" @click.prevent="openSlideModal(1)">
        <span><IconMaterialSettings /></span>
      </a>
    </li> -->
  </ul>

  <main class="flex-1 z-5 p-6 overflow-y-auto bg-green-200 text-green-900">
    <h2 class="text-lg font-semibold">{{ state.activeTab }}</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div class="bg-green-300 text-gray-800 p-1 rounded-lg shadow sm:col-span-1 -z-1">
        <GraphsDataCompletion
          :key="graphsKey"
          :passed_data="state.passed_data"
          :displaytext="'Data Completion'"
          :report_year="String(state.report_year || '')"
        />
      </div>

      <div class="bg-green-300 text-gray-800 p-4 rounded-lg shadow sm:col-span-1">
        <GraphsDataSources
          :key="graphsKey"
          :passed_data="state.passed_data"
          :displaytext="' Data Sources'"
          :report_year="String(state.report_year || '')"
        />
      </div>

      <div class="bg-green-300 text-black p-4 rounded-lg shadow sm:col-span-2">
        <GraphsDataStatistics
          :key="graphsKey"
          :passed_data="state.passed_data"
          :displaytext="' Data Sources'"
          :report_year="String(state.report_year || '')"
        />
      </div>
    </div>
  </main>

  <div class="flex h-screen">
    <div class="flex-1 flex flex-col">
      <div
        v-if="state.loading == false"
        class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12 bg-green-200 border-solid border-grey pb-4 pt-4"
      >
        <GraphsSurvivalMaternalServices
           v-if="state.activeTab === 'Survival'" 
          :key="graphsKey"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid border-blue-black bg-green-100 rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="'Maternal Deliveries'"
          :report_year="String(state.report_year || '')"
          :report_years="state.report_years"
        />


         <GraphsChildCareAndServices v-if="state.activeTab === 'Survival'"    :key="graphsKey"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="'Maternal Deliveries'" 
          :report_year="String(state.report_year || '')"
          :report_years="state.report_years" 
         />


         <GraphsSurvivalMortality v-if="state.activeTab === 'Survival'" :key="graphsKey"
         :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="''" 
          :report_year="String(state.report_year || '')"
          :report_years="state.report_years" >
        </GraphsSurvivalMortality>

         <GraphsSurvivalNutritionalPreSchool v-if="state.activeTab === 'Survival'" :key="graphsKey"
          :passed_data="state.passed_data_annual"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
           :report_year="String(state.report_year || '')" 
           :report_years="state.report_years">
        </GraphsSurvivalNutritionalPreSchool>

         <GraphsSurvivalNutritionalSchoolChildren v-if="state.activeTab === 'Survival'"
          :key="graphsKey" :passed_data="state.passed_data_annual"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :report_year="String(state.report_year || '')" 
          :report_years="state.report_years">
        </GraphsSurvivalNutritionalSchoolChildren>

        <GraphsSurvivalAccess v-if="state.activeTab === 'Survival'" :key="graphsKey"
          :passed_data="state.passed_data_annual"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
           :report_year="String(state.report_year || '')" 
           :report_years="state.report_years">
        </GraphsSurvivalAccess>

         <GraphsSurvivalHIV v-if="state.activeTab === 'Survival'" :key="graphsKey"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :report_year="String(state.report_year || '')" 
          :report_years="state.report_years">
        </GraphsSurvivalHIV>

         <GraphsDevelopmentEarlyChildhood v-if="state.activeTab === 'Development'" :key="graphsKey"
          :passed_data="state.passed_data_annual"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-yellow-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :report_year="String(state.report_year || '')" 
          :report_years="state.report_years">
        </GraphsDevelopmentEarlyChildhood>

        <GraphsDevelopmentEnrolment v-if="state.activeTab === 'Development'" :key="graphsKey"
          :passed_data="state.passed_data_annual"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-yellow-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          ::report_year="String(state.report_year || '')" 
           :report_years="state.report_years">
        </GraphsDevelopmentEnrolment>

        <GraphsDevelopmentOSCY v-if="state.activeTab === 'Development'" :key="graphsKey"
          :passed_data="state.passed_data_annual"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-yellow-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :report_year="String(state.report_year || '')" 
          :report_years="state.report_years">
        </GraphsDevelopmentOSCY>

        <GraphsProtectionChildrenInNeed v-if="state.activeTab === 'Protection'" :key="graphsKey"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-blue-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :report_year="String(state.report_year || '')" 
          :report_years="state.report_years">
        </GraphsProtectionChildrenInNeed>

        <GraphsProtectionChildrenInConflict v-if="state.activeTab === 'Protection'" :key="graphsKey"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-blue-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :report_year="String(state.report_year || '')" 
          :report_years="state.report_years">
        </GraphsProtectionChildrenInConflict>

         <GraphsParticipationChildrens v-if="state.activeTab === 'Participation'" :key="graphsKey"
          :passed_data="state.passed_data_annual"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-blue-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="'Total Number of BCPC with child representatives, by type of selection process:'"
          :report_year="String(state.report_year || '')" 
          :report_years="state.report_years">
        </GraphsParticipationChildrens>

        <GraphsGovernanceLocalCouncil v-if="state.activeTab === 'Governance'" :key="graphsKey"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-red-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="'Total Number of BCPC with child representatives, by type of selection process:'"
           :report_year="String(state.report_year || '')" 
            :report_years="state.report_years">
        </GraphsGovernanceLocalCouncil>

        <GraphsGeneralInformation v-if="state.activeTab === 'General Information'" :key="graphsKey"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
          :displaytext="'Total Number of BCPC with child representatives, by type of selection process:'"
          :report_year="String(state.report_year || '')" 
          :report_years="state.report_years">
        </GraphsGeneralInformation>


      </div>
    </div>
  </div>

  <!-- <ModalSlide
    :show="state.isSlideModalOpen"
    :close="closeSlideModal"
    :title="'Select Dashboard Widget'"
    :dialogClass="'flex h-full flex-col divide-y divide-black bg-opacity-90 bg-green-900 rounded-md shadow-xl mt-[4rem]'"
    :buttonClass="'relative rounded-md bg-green-600 text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500'"
    :tittleClass="'text-2xl text-right font-bold leading-tight tracking-tight text-black'"
  >
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-left sm:px-6 lg:px-8">
          <div class="overflow-hidden px-3 py-3.5 shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <div class="inline-block min-w-full py-2 align-left sm:px-6 lg:px-8">
              <button
                @click="saveDashboardSettings()"
                class="rounded-md px-6 py-2 bg-green-900 text-white font-semibold shadow-md hover:bg-green-600 hover:text-white transition-colors duration-200"
              >
                Save Dashboard Settings
              </button>
            </div>

          
            <table class="table-fixed w-full bg-opacity-90">
           
            </table>
          </div>
        </div>
      </div>
    </div>
  </ModalSlide> -->
</template>

<script setup>
import { reactive, computed, onMounted } from "vue";
import { reportDetailsService } from "~/components/api/ReportDetailsService";
import { reportDetailsExcelService } from "~/components/api/ReportDetailsExcelService";
import { useUserStore } from "~/store/user";
import { userDashboardWidgetsService } from "~/components/api/UserDashboardWidgetsService";
import { report_yearService } from "~/components/api/ReportYears";
import { reportDetailsGroupsService } from "~/components/api/ReportDetailsGroupsService";

const userStore = useUserStore();

definePageMeta({ layout: "main" });

import { watch } from "vue";




let tabs = [
  { name: "Survival", icon: "monitor_heart" },
  { name: "Development", icon: "school" },
  { name: "Protection", icon: "local_police" },
  { name: "Participation", icon: "diversity_3" },
  { name: "Governance", icon: "account_balance" },
  { name: "General Information", icon: "info" }
];



const state = reactive({
  activeTab: tabs[0].name,
  loading: true,

  user_dashboard_widgets: userStore.getUser.user_dashboard_widgets,
  user_id: userStore.getUser.id,

  right_id: 1,

  passed_data_annual: [],
  passed_data: [],

  group_details: [],
  exceldata: [],

  isPageLoading: false,
  isSlideModalOpen: false,

  // YEAR OPTIONS ONLY
  options: {
    report_years: []
  },

  // report_year is now the actual YEAR (e.g. 2025)
  report_year: null,

  // keep raw list if other components still use it
  report_years: { data: [] },

  

  ShowGraphSurvivalMaternalService: true,

  showGraphsGrp01: false,
  showGraphsGrp02: false,
  showGraphsGrp03: false,
  showGraphsGrp04: false,
  showGraphsGrp05: false,
  showGraphsGrp06: false,
  showGraphsGrp37: false,
  showGraphsGrp45: false,
  showGraphsGrp48: false,
  showGraphsGrp49: false,
  showGraphsGrp50: false,
  showGraphsGrp55: false,
  showGraphsGrp59: false,
  showGraphsGrp65: false,
  showGraphsGrp68: false,
  showGraphsGrp70: false,
  showGraphsGrp71: false,
  showGraphsGrp72: false,
  showGraphsGrp73: false,
  showGraphsGrp74: false,
  showGraphsGrp75: false,
  showGraphsGrp76: false,
  showGraphsGrp77: false,
  showGraphsGrp78: false
});





const graphsKey = computed(() => `${state.activeTab}-${state.report_year}`);

onMounted(async () => {
  await fetchreportyear(); // must run first to set default year
  await fetchData();
  await getexceldata();
});




let fetchSeq = 0;

watch(
  () => state.report_year,
  async (val, oldVal) => {
    if (!val || val === oldVal) return;

    const seq = ++fetchSeq;
    state.isPageLoading = true;

    await fetchData();
    if (seq !== fetchSeq) return;

    await getexceldata();
    if (seq !== fetchSeq) return;

    state.isPageLoading = false;
  }
);




function openSlideModal() {
  state.isSlideModalOpen = true;
}
function closeSlideModal() {
  state.isSlideModalOpen = false;
}

function saveDashboardSettings() {
  deleteUserDashboardWidgets();
  loopthroughNewSettings();
  fetchUserDashboardWidgets();
  state.isSlideModalOpen = false;
}

// opt: 1 = next, 2 = prev (based on your existing component behavior)
function change_selected_year(opt) {
  const opts = state.options.report_years.filter(Boolean);
  if (!opts.length) return;

  const currentIndex = opts.findIndex(o => o.value === state.report_year);
  const idx = currentIndex === -1 ? 0 : currentIndex;

  if (opt === 1 && idx < opts.length - 1) {
    state.report_year = opts[idx + 1].value;
  } else if (opt === 2 && idx > 0) {
    state.report_year = opts[idx - 1].value;
  }
}

function change_right_id(tab_name) {
  state.activeTab = tab_name;

  if (state.activeTab === "Survival") state.right_id = 1;
  else if (state.activeTab === "Development") state.right_id = 2;
  else if (state.activeTab === "Protection") state.right_id = 3;
  else if (state.activeTab === "Participation") state.right_id = 4;
  else if (state.activeTab === "Governance") state.right_id = 5;
  else if (state.activeTab === "General Information") state.right_id = 6;

  // do NOT call fetchData here unless tab changes the query
}

function refresh_data() {
  fetchData();
}

async function fetchData() {
  const params = { report_year: Number(state.report_year) };

  const response = await reportDetailsGroupsService.getReportDetailsGroups(params);
  state.passed_data = response.data; // <-- replace whole ref

  const response_annual = await reportDetailsGroupsService.getReportDetailsGroups();
  state.passed_data_annual = response_annual.data;

  

  state.loading = false;
}

async function getexceldata() {
  try {
    // CHANGED: use report_year, not report_year_id
    const params = {
      report_year: Number(state.report_year)
    };

    const response = await reportDetailsExcelService.getReportExcelDetails(params);
    state.exceldata = response;
  } catch (err) {
    console.error("Error getexceldata:", err);
  }
}

async function deleteUserDashboardWidgets() {
  try {
    // await userDashboardWidgetsService.deleteUserDashboardWidgets(state.user_id);
  } catch (error) {
    state.errorcount = (state.errorcount ?? 0) + 1;
  }
}

async function fetchreportyear() {
  try {
    const response = await report_yearService.getReportYears();
    const rows = response?.data ?? [];

    state.report_years.data = rows;

    const years = rows
      .filter(r => Number(r.status) === 1 && r.year != null)
      .map(r => Number(r.year))
      .filter(y => Number.isFinite(y));

    // Unique + sort DESC (so list shows newest first, but we won't auto-pick newest blindly)
    const uniqueYears = [...new Set(years)].sort((a, b) => b - a);

    state.options.report_years = uniqueYears.map(y => ({
      value: y,
      label: String(y),
      year: y,
    }));

    if (!state.options.report_years.length) return;

    // DEFAULT: current year if available, otherwise fallback to latest available year
    const currentYear = new Date().getFullYear();
    const hasCurrent = uniqueYears.includes(currentYear);

    state.report_year = hasCurrent ? currentYear : uniqueYears[0];
  } catch (error) {
    console.error(error);
  }
}

async function fetchUserDashboardWidgets() {
  try {
    const response = await userDashboardWidgetsService.getUserDashboardWidget(state.user_id);

    if (response.data) state.user_dashboard_widgets.data = response.data;
    else state.user_dashboard_widgets = [];
  } catch (error) {}
}

function refresh_graphs() {
  destroy_graphs();
}

async function destroy_graphs() {
  state.showGraphsGrp01 = false;
  state.showGraphsGrp02 = false;
  state.showGraphsGrp03 = false;
  state.showGraphsGrp04 = false;
  state.showGraphsGrp05 = false;
  state.showGraphsGrp06 = false;
  state.showGraphsGrp37 = false;
  state.showGraphsGrp45 = false;
  state.showGraphsGrp48 = false;
  state.showGraphsGrp49 = false;
  state.showGraphsGrp50 = false;
  state.showGraphsGrp55 = false;
  state.showGraphsGrp59 = false;
  state.showGraphsGrp65 = false;
  state.showGraphsGrp68 = false;
  state.showGraphsGrp70 = false;
  state.showGraphsGrp71 = false;
  state.showGraphsGrp72 = false;
  state.showGraphsGrp73 = false;
  state.showGraphsGrp74 = false;
  state.showGraphsGrp75 = false;
  state.showGraphsGrp76 = false;
  state.showGraphsGrp77 = false;
  state.showGraphsGrp78 = false;
}

function loopthroughNewSettings() {
  // left as-is (you didn’t include this function)
}

function pageLoads(value) {
  state.isPageLoading = value;
}

function printWindow() {
  window.print();
}
</script>

<style>
@media print {
  body {
    background: white;
  }
  .apexcharts-canvas {
    page-break-inside: avoid;
  }
}
</style>
