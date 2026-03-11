<template>
  <div v-if="bootReady" class="flex h-screen">
    <div class="flex-1 flex flex-col">
      <header class="w-full bg-white shadow px-4 py-1 flex items-center justify-between z-1">
        <div class="flex items-center space-x-4">
          <h1 class="text-xl font-bold">My Dashboard</h1>

          <FormYearSelector
            v-model="state.report_year"
            :options="state.options.report_years"
            :change-selected-year="change_selected_year"
          />
        </div>

        <button
          class="md:hidden px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
          @click="toggleSidebar?.()"
        >
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
                state.activeTab === tab.name
                  ? 'bg-green-200 text-green-900 shadow-inner'
                  : 'hover:bg-gray-200 text-gray-600'
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
      </ul>

      <main class="flex-1 z-5 p-6 overflow-y-auto bg-green-200 text-green-900">
        <h2 class="text-lg font-semibold">{{ state.activeTab }}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div class="bg-green-300 text-black p-4 rounded-lg shadow sm:col-span-2">
            <GraphsDataSources
              :title="state.activeTab + ' Data Sources '"
              :report_year="String(state.report_year || '')"
              :labels="datasourcePie.labels"
              :series="datasourcePie.series"
              :section="state.activeTab"
            />
          </div>

          <div class="bg-green-300 text-black p-4 rounded-lg shadow sm:col-span-2">
            <GraphsDataStatistics
              :data="state.completenessByKey"
              :selected_tab="state.activeTab"
              :indicator_config="state.rights_config_by_right[state.right_id] || []"
              :agencies="state.options.agencies"
              :report_year="String(state.report_year || '')"
            />
          </div>
        </div>

        <div
          class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12 bg-green-200 border-solid border-grey pb-4 pt-4"
        >
          <!-- Survival -->
          <GraphsSurvivalMaternalServices
            v-if="state.activeTab === 'Survival'"
            :key="graphsKey"
            :passed_data="state.passed_data"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-green-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />

          <GraphsChildCareAndServices
            v-if="state.activeTab === 'Survival'"
            :key="graphsKey"
            :passed_data="state.passed_data"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-green-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />

          <GraphsSurvivalMortality
            v-if="state.activeTab === 'Survival'"
            :key="graphsKey"
            :passed_data="state.passed_data"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-green-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />

          <GraphsSurvivalNutritionalPreSchool
            v-if="state.activeTab === 'Survival'"
            :key="annualGraphsKey"
            :passed_data="state.passed_data_annual"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-green-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />

          <GraphsSurvivalNutritionalSchoolChildren
            v-if="state.activeTab === 'Survival'"
            :key="annualGraphsKey"
            :passed_data="state.passed_data_annual"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-green-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />

          <GraphsSurvivalAccess
            v-if="state.activeTab === 'Survival'"
            :key="annualGraphsKey"
            :passed_data="state.passed_data_annual"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-green-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />

          <GraphsSurvivalHIV
            v-if="state.activeTab === 'Survival'"
            :key="graphsKey"
            :passed_data="state.passed_data"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-green-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />

          <!-- Development -->
          <GraphsDevelopmentEarlyChildhood
            v-if="state.activeTab === 'Development'"
            :key="annualGraphsKey"
            :passed_data="state.passed_data_annual"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-yellow-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />

          <GraphsDevelopmentEnrolment
            v-if="state.activeTab === 'Development'"
            :key="annualGraphsKey"
            :passed_data="state.passed_data_annual"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-yellow-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />

          <GraphsDevelopmentOSCY
            v-if="state.activeTab === 'Development'"
            :key="annualGraphsKey"
            :passed_data="state.passed_data_annual"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-yellow-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />

          <!-- Protection -->
          <GraphsProtectionChildrenInNeed
            v-if="state.activeTab === 'Protection'"
            :key="graphsKey"
            :passed_data="state.passed_data"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-blue-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />

          <GraphsProtectionChildrenInConflict
            v-if="state.activeTab === 'Protection'"
            :key="graphsKey"
            :passed_data="state.passed_data"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-blue-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />

          <!-- Participation -->
          <GraphsParticipationChildrens
            v-if="state.activeTab === 'Participation'"
            :key="annualGraphsKey"
            :passed_data="state.passed_data_annual"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-blue-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />

          <!-- Governance -->
          <GraphsGovernanceLocalCouncil
            v-if="state.activeTab === 'Governance'"
            :key="graphsKey"
            :passed_data="state.passed_data"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-red-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />

          <!-- General Information -->
          <GraphsGeneralInformation
            v-if="state.activeTab === 'General Information'"
            :key="graphsKey"
            :passed_data="state.passed_data"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-green-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />

          <GraphsGerneralInformationCivilReg
            v-if="state.activeTab === 'General Information'"
            :key="graphsKey"
            :passed_data="state.passed_data"
            class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-green-100 rounded-xl border-blue-900"
            :report_year="String(state.report_year || '')"
            :report_years="state.report_years"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, watch } from "vue";
import { report_yearService } from "~/components/api/ReportYears";
import { reportDetailsGroupsService } from "~/components/api/ReportDetailsGroupsService";
import { indicatorService } from "~/components/api/IndicatorCategoryService";
import { useUserStore } from "~/store/user";

definePageMeta({
  layout: "main",
  middleware: ["auth-only"],
});

const userStore = useUserStore();

const tabs = [
  { name: "Survival" },
  { name: "Development" },
  { name: "Protection" },
  { name: "Participation" },
  { name: "Governance" },
  { name: "General Information" },
];

const TAB_TO_RIGHT_ID = {
  Survival: 1,
  Development: 2,
  Protection: 3,
  Participation: 4,
  Governance: 5,
  "General Information": 6,
};

const GROUP_DEFS = [
  { group_no: 1,  right_id: 1, title: "MATERNAL DELIVERIES", submission_type: "quarterly", indicators: ["1.1"], expected_per_year: 4 },
  { group_no: 2,  right_id: 1, title: "MATERNAL DELIVERIES", submission_type: "quarterly", indicators: ["2.1","2.1.1","2.1.2","2.2"], expected_per_year: 16 },
  { group_no: 3,  right_id: 1, title: "PRENATAL CARE", submission_type: "quarterly", indicators: ["3.1","3.2","3.2.1","3.2.2"], expected_per_year: 16 },
  { group_no: 4,  right_id: 1, title: "FACILITY-BASED DELIVERIES", submission_type: "quarterly", indicators: ["4.1","4.1.1","4.1.2","4.1.3"], expected_per_year: 16 },
  { group_no: 5,  right_id: 1, title: "FACILITY-BASED DELIVERIES", submission_type: "quarterly", indicators: ["5.1","5.1.1","5.1.2","5.1.3"], expected_per_year: 16 },
  { group_no: 6,  right_id: 1, title: "POSTPARTUM CARE", submission_type: "quarterly", indicators: ["6.1","6.2","6.2.1","6.2.2"], expected_per_year: 16 },
  { group_no: 7,  right_id: 1, title: "BIRTH WEIGHT", submission_type: "quarterly", indicators: ["7.1","7.2","7.3"], expected_per_year: 12 },
  { group_no: 8,  right_id: 1, title: "INFANT BREASTFEEDING", submission_type: "quarterly", indicators: ["8.1","8.2"], expected_per_year: 8 },
  { group_no: 9,  right_id: 1, title: "CHILD IMMUNIZATION", submission_type: "quarterly", indicators: ["9.1","9.2","9.3"], expected_per_year: 12 },
  { group_no: 10, right_id: 1, title: "MATERNAL MORTALITY", submission_type: "quarterly", indicators: ["10.1","10.2"], expected_per_year: 8 },
  { group_no: 11, right_id: 1, title: "CHILD MORTALITY", submission_type: "quarterly", indicators: ["11.1","11.2","11.3","11.4","11.5","11.6"], expected_per_year: 24 },
  { group_no: 12, right_id: 1, title: "CHILD MORTALITY", submission_type: "quarterly", indicators: ["12.1","12.2"], expected_per_year: 8 },
  { group_no: 13, right_id: 1, title: "OPERATION TIMBANG (OPT) PLUS", submission_type: "open", indicators: ["13.1","13.2","13.3"], expected_per_year: 3 },
  { group_no: 14, right_id: 1, title: "NUTRITIONAL STATUS OF 0-59 MONTHS OLD CHILDREN", submission_type: "open", indicators: ["14.1","14.2","14.3","14.4","14.5","14.6","14.7","14.8","14.9","14.10","14.11","14.12","14.13","14.14","14.15","14.16","14.17","14.18"], expected_per_year: 18 },
  { group_no: 15, right_id: 1, title: "SCHOOL-BASED FEEDING PROGRAM (SBFP)", submission_type: "open", indicators: ["15.1"], expected_per_year: 1 },
  { group_no: 16, right_id: 1, title: "NUTRITIONAL STATUS OF KINDER TO GRADE 6 LEARNERS", submission_type: "open", indicators: ["16.1","16.2","16.3"], expected_per_year: 3 },
  { group_no: 17, right_id: 1, title: "NUTRITIONAL STATUS OF KINDER TO GRADE 6 LEARNERS", submission_type: "open", indicators: ["17.1","17.2","17.3"], expected_per_year: 3 },
  { group_no: 18, right_id: 1, title: "LOCAL HEALTH CENTERS", submission_type: "open", indicators: ["18.1"], expected_per_year: 1 },
  { group_no: 19, right_id: 1, title: "WATER & SANITATION SERVICES", submission_type: "open", indicators: ["19.1","19.2","19.3","19.4","19.5","19.6","19.7"], expected_per_year: 7 },
  { group_no: 20, right_id: 1, title: "WATER & SANITATION SERVICES", submission_type: "open", indicators: ["20.1","20.2","20.3"], expected_per_year: 3 },
  { group_no: 21, right_id: 1, title: "CHILDREN AFFECTED BY HIV/AIDS", submission_type: "quarterly", indicators: ["21.1","21.2"], expected_per_year: 8 },

  { group_no: 22, right_id: 2, title: "EARLY CHILDHOOD CARE AND DEVELOPMENT (ECCD)", submission_type: "open", indicators: ["22.1","22.2","22.2.1","22.2.2","22.3","22.4","22.5","22.6","22.7"], expected_per_year: 9 },
  { group_no: 23, right_id: 2, title: "STUDENT ENROLMENT", submission_type: "open", indicators: ["23.1","23.2","23.3","23.4","23.5"], expected_per_year: 5 },
  { group_no: 24, right_id: 2, title: "NET ENROLMENT", submission_type: "open", indicators: ["24.1","24.2","24.3","24.4"], expected_per_year: 4 },
  { group_no: 25, right_id: 2, title: "COMPLETION", submission_type: "open", indicators: ["25.1","25.2"], expected_per_year: 2 },
  { group_no: 26, right_id: 2, title: "SCHOOL LEAVER (DROP-OUT)", submission_type: "open", indicators: ["26.1","26.2"], expected_per_year: 2 },
  { group_no: 27, right_id: 2, title: "SECTORAL ENROLMENT (IP)", submission_type: "open", indicators: ["27.1","27.1.1","27.1.2","27.1.3","27.1.4"], expected_per_year: 5 },
  { group_no: 28, right_id: 2, title: "SECTORAL ENROLMENT (MORO)", submission_type: "open", indicators: ["28.1","28.1.1","28.1.2","28.1.3","28.1.4"], expected_per_year: 5 },
  { group_no: 29, right_id: 2, title: "SECTORAL ENROLMENT (CWSN/CWD)", submission_type: "open", indicators: ["29.1","29.1.1","29.1.2","29.1.3","29.1.4"], expected_per_year: 5 },
  { group_no: 30, right_id: 2, title: "ALTERNATIVE LEARNING SYSTEM", submission_type: "open", indicators: ["30.1","30.1.1","30.1.2","30.1.3","30.1.4"], expected_per_year: 5 },
  { group_no: 31, right_id: 2, title: "OUT OF SCHOOL CHILDREN", submission_type: "open", indicators: ["31.1","31.1.1","31.1.2","31.1.3"], expected_per_year: 4 },
  { group_no: 32, right_id: 2, title: "OUT OF SCHOOL CHILDREN AND YOUTH (OSCY)", submission_type: "open", indicators: ["32.1","32.2","32.3","32.4"], expected_per_year: 4 },

  { group_no: 33, right_id: 3, title: "CHILDREN AT-RISK", submission_type: "quarterly", indicators: ["33.1","33.2","33.3","33.4","33.5","33.6","33.7","33.8","33.9","33.10","33.11","33.12","33.13","33.14","33.15","33.16","33.17","33.18","33.19","33.20","33.21","33.22","33.23","33.24","33.25","33.26","33.27"], expected_per_year: 108 },
  { group_no: 34, right_id: 3, title: "PERMIT TO TRAVEL", submission_type: "quarterly", indicators: ["34.1","34.1.1","34.1.2"], expected_per_year: 12 },
  { group_no: 35, right_id: 3, title: "CHILD ABUSE (RA 7610)", submission_type: "quarterly", indicators: ["35.1","35.1.1","35.1.2","35.1.3","35.1.4","35.1.5","35.1.6"], expected_per_year: 28 },
  { group_no: 36, right_id: 3, title: "CHILD SEXUAL ABUSE", submission_type: "quarterly", indicators: ["36.1","36.1.1","36.1.2","36.1.3","36.1.4","36.1.5","36.1.6"], expected_per_year: 28 },
  { group_no: 37, right_id: 3, title: "CHILDREN IN-CONFLICT WITH THE LAW (CICL)", submission_type: "quarterly", indicators: ["37.1","37.1.1","37.1.2","37.1.3","37.1.4","37.1.5","37.1.6","37.1.7","37.1.8","37.1.9","37.1.10"], expected_per_year: 44 },
  { group_no: 38, right_id: 3, title: "CRIMES AGAINST PERSON COMMITTED BY CHILDREN", submission_type: "quarterly", indicators: ["38.1","38.1.1","38.1.2","38.1.3","38.1.4","38.1.5","38.1.6","38.1.7","38.1.8","38.1.9","38.1.10","38.1.11","38.1.12","38.1.13","38.1.14","38.1.15","38.1.16"], expected_per_year: 68 },
  { group_no: 39, right_id: 3, title: "CRIMES AGAINST PROPERTY COMMITTED BY CHILDREN", submission_type: "quarterly", indicators: ["39.1","39.1.1","39.1.2","39.1.3","39.1.4","39.1.5","39.1.6","39.1.7"], expected_per_year: 32 },
  { group_no: 40, right_id: 3, title: "CRIMES AGAINST PUBLIC ORDER COMMITTED BY CHILDREN", submission_type: "quarterly", indicators: ["40.1","40.1.1","40.1.2","40.1.3"], expected_per_year: 16 },
  { group_no: 41, right_id: 3, title: "CRIMES UNDER SPECIAL PENAL LAWS", submission_type: "quarterly", indicators: ["41.1","41.1.1","41.1.2","41.1.3","41.1.4","41.1.5","41.1.6","41.1.7","41.1.8"], expected_per_year: 36 },
  { group_no: 42, right_id: 3, title: "GRAND TOTAL CRIMES COMMITTED BY CHILDREN", submission_type: "quarterly", indicators: ["42.1"], expected_per_year: 4 },

  { group_no: 43, right_id: 4, title: "CHILD REPRESENTATION", submission_type: "open", indicators: ["43.1","43.1.1","43.1.2","43.2"], expected_per_year: 4 },

  { group_no: 44, right_id: 5, title: "LCPC FUNCTIONALITY", submission_type: "open", indicators: ["44.1","44.2","44.3","44.4","44.5","44.6"], expected_per_year: 6 },
  { group_no: 45, right_id: 5, title: "LOCAL INSTITUTIONS", submission_type: "open", indicators: ["45.1"], expected_per_year: 1 },

  { group_no: 46, right_id: 6, title: "GENERAL POPULATION", submission_type: "open", indicators: ["46.1","46.2","46.2.1","46.2.2","46.2.3","46.2.4","46.2.5","46.2.6","46.2.7","46.2.8","46.2.9","46.2.10","46.2.11","46.2.12","46.2.13","46.2.14","46.2.15","46.2.16","46.2.17","46.2.18"], expected_per_year: 20 },
  { group_no: 47, right_id: 6, title: "SECTORAL POPULATION (PWD & CHILD LABOR)", submission_type: "open", indicators: ["47.1","47.1.1","47.1.2","47.2"], expected_per_year: 4 },
  { group_no: 48, right_id: 6, title: "SECTORAL POPULATION (IP/MORO BY ETHNICITY)", submission_type: "open", indicators: ["48.1","48.2","48.3","48.4","48.5","48.6","48.7","48.8","48.9","48.10","48.11","48.12","48.13","48.14","48.15","48.16","48.17","48.18","48.19","48.20","48.21","48.22","48.23"], expected_per_year: 23 },
  { group_no: 49, right_id: 6, title: "CIVIL REGISTRATION", submission_type: "quarterly", indicators: ["49.1","49.2","49.3","49.4","49.5"], expected_per_year: 20 },
];

const state = reactive({
  activeTab: tabs[0].name,
  right_id: TAB_TO_RIGHT_ID[tabs[0].name],

  loading: true,
  isPageLoading: false,

  passed_data: [],
  passed_data_annual: [],

  report_year: null,
  report_years: { data: [] },

  options: {
    report_years: [],
    agencies: [
      { value: 1, label: "SOCC", color: "bg-red-500 border-red-400" },
      { value: 2, label: "CHO", color: "bg-blue-500 border-blue-400" },
      { value: 3, label: "DepEd", color: "bg-green-500 border-green-400" },
      { value: 4, label: "CSWDO", color: "bg-yellow-500 border-yellow-400" },
      { value: 5, label: "CHED", color: "bg-purple-500 border-purple-400" },
      { value: 6, label: "DCPO", color: "bg-pink-500 border-pink-400" },
      { value: 7, label: "DILG", color: "bg-indigo-500 border-indigo-400" },
      { value: 8, label: "IGDD", color: "bg-teal-500 border-teal-400" },
      { value: 9, label: "CBO", color: "bg-orange-500 border-orange-400" },
      { value: 10, label: "CPDO", color: "bg-gray-500 border-gray-400" },
      { value: 11, label: "CCRO", color: "bg-lime-500 border-lime-400" },
      { value: 12, label: "CDRRMO", color: "bg-rose-500 border-rose-400" },
      { value: 13, label: "FCCDI", color: "bg-cyan-500 border-cyan-400" },
      { value: 14, label: "PSA", color: "bg-emerald-500 border-emerald-400" },
      { value: 15, label: "NCIP", color: "bg-fuchsia-500 border-fuchsia-400" },
    ],
  },

  rights_config_all: [],
  rights_config_by_right: {},
  completenessByKey: {},
});

const graphsKey = computed(() => `${state.activeTab}-${state.report_year}`);
const annualGraphsKey = computed(() => `${state.activeTab}-annual`);
const bootReady = computed(() => !!userStore?.getUser && state.loading === false);

onMounted(async () => {
  if (!userStore?.getUser) return;

  await fetchreportyear();
  await fetchIndicatorConfig();
  await fetchData();

  state.loading = false;
});

let fetchSeq = 0;
watch(
  () => state.report_year,
  async (val, oldVal) => {
    if (!val || val === oldVal) return;

    const seq = ++fetchSeq;
    state.isPageLoading = true;

    try {
      await fetchData();
    } finally {
      if (seq === fetchSeq) state.isPageLoading = false;
    }
  }
);

watch(
  () => [
    state.activeTab,
    state.right_id,
    state.report_year,
    state.passed_data,
    state.passed_data_annual,
    state.report_years.data,
  ],
  () => {
    state.completenessByKey = computeCompletenessByGroupDefs();
  },
  { deep: true }
);

function change_selected_year(opt) {
  const opts = state.options.report_years.filter(Boolean);
  if (!opts.length) return;

  const currentIndex = opts.findIndex((o) => o.value === state.report_year);
  const idx = currentIndex === -1 ? 0 : currentIndex;

  if (opt === 1 && idx < opts.length - 1) state.report_year = opts[idx + 1].value;
  else if (opt === 2 && idx > 0) state.report_year = opts[idx - 1].value;
}

function change_right_id(tab_name) {
  state.activeTab = tab_name;
  state.right_id = TAB_TO_RIGHT_ID[tab_name] ?? 1;
}

async function fetchreportyear() {
  const response = await report_yearService.getReportYears();
  const rows = Array.isArray(response?.data) ? response.data : [];

  state.report_years.data = rows;

  const years = rows
    .filter((r) => Number(r?.status) === 1 && r?.year != null)
    .map((r) => Number(r.year))
    .filter((y) => Number.isFinite(y));

  const uniqueYears = [...new Set(years)].sort((a, b) => b - a);

  state.options.report_years = uniqueYears.map((y) => ({
    value: y,
    label: String(y),
    year: y,
  }));

  state.report_year = uniqueYears.length ? uniqueYears[0] : null;
}

async function fetchData() {
  const selectedYearParams = { report_year: Number(state.report_year) };

  const [responseFiltered, responseAnnual] = await Promise.all([
    reportDetailsGroupsService.getReportDetailsGroups(selectedYearParams),
    reportDetailsGroupsService.getReportDetailsGroups({}),
  ]);

  state.passed_data = Array.isArray(responseFiltered?.data) ? responseFiltered.data : [];
  state.passed_data_annual = Array.isArray(responseAnnual?.data) ? responseAnnual.data : [];

  state.completenessByKey = computeCompletenessByGroupDefs();
}

async function fetchIndicatorConfig() {
  const response = await indicatorService.getIndicatorCategories();
  const rows = Array.isArray(response?.data) ? response.data : [];
  state.rights_config_all = rows;

  const grouped = {};
  for (const item of rows) {
    const rid = Number(item?.right_id);
    if (!Number.isFinite(rid)) continue;
    if (!grouped[rid]) grouped[rid] = [];
    grouped[rid].push(item);
  }
  state.rights_config_by_right = grouped;

  state.completenessByKey = computeCompletenessByGroupDefs();
}

const activeIndicatorConfig = computed(() => state.rights_config_by_right?.[state.right_id] ?? []);

function buildAgencyDistributionFromConfig(configRoot, agencies) {
  const categories = Array.isArray(configRoot)
    ? configRoot
    : Array.isArray(configRoot?.data)
      ? configRoot.data
      : Array.isArray(configRoot?.data?.data)
        ? configRoot.data.data
        : [];

  const counts = new Map();

  for (const cat of categories) {
    const subs = Array.isArray(cat?.indicator_subcategories) ? cat.indicator_subcategories : [];
    for (const sub of subs) {
      const groups = Array.isArray(sub?.indicator_groups) ? sub.indicator_groups : [];
      for (const g of groups) {
        const els = Array.isArray(g?.indicator_group_elements) ? g.indicator_group_elements : [];
        for (const el of els) {
          const agencyId = Number(el?.agency_id);
          if (!Number.isFinite(agencyId) || agencyId <= 0) continue;
          counts.set(agencyId, (counts.get(agencyId) ?? 0) + 1);
        }
      }
    }
  }

  const getLabel = (id) => agencies.find((a) => Number(a?.value) === Number(id))?.label ?? `Agency ${id}`;

  const rows = Array.from(counts.entries())
    .map(([agencyId, count]) => ({ agencyId, label: getLabel(agencyId), count }))
    .sort((a, b) => b.count - a.count);

  return {
    labels: rows.map((r) => r.label),
    series: rows.map((r) => r.count),
    meta: rows,
  };
}

const datasourcePie = computed(() =>
  buildAgencyDistributionFromConfig(activeIndicatorConfig.value, state.options.agencies)
);

function normalizeArray(raw) {
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  if (raw && raw.data && Array.isArray(raw.data.data)) return raw.data.data;
  return [];
}

function normStr(v) {
  return String(v ?? "").trim();
}

function toNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function getRowYear(row) {
  const direct = toNum(row?.report_year ?? row?.year);
  if (Number.isFinite(direct)) return direct;

  const ryId = toNum(row?.report_year_id);
  if (!Number.isFinite(ryId)) return NaN;

  const reportYears = normalizeArray(state.report_years);
  const match = reportYears.find((r) => Number(r?.id) === ryId);
  const my = toNum(match?.year);
  return Number.isFinite(my) ? my : NaN;
}

function normalizeSchedule(v) {
  return String(v ?? "").trim().toLowerCase();
}

function computeCompletenessByGroupDefs() {
  const rightId = Number(state.right_id);
  const selectedYear = Number(state.report_year);

  const detailsRows = normalizeArray(state.passed_data_annual).length
    ? normalizeArray(state.passed_data_annual)
    : normalizeArray(state.passed_data);

  const defs = GROUP_DEFS.filter((g) => Number(g.right_id) === rightId);

  const indicatorToGroupNo = new Map();
  for (const def of defs) {
    for (const ind of def.indicators ?? []) {
      indicatorToGroupNo.set(String(ind), Number(def.group_no));
    }
  }

  const openActual = new Map();
  const quarterlyActual = new Map();

  for (const row of detailsRows) {
    if (!row) continue;

    const rowYear = getRowYear(row);
    if (Number.isFinite(selectedYear) && Number.isFinite(rowYear) && rowYear !== selectedYear) continue;

    const ind = normStr(row?.indicator_no);
    if (!ind) continue;

    const groupNo = indicatorToGroupNo.get(ind);
    if (!Number.isFinite(groupNo)) continue;

    const total = toNum(row?.total);
    if (!Number.isFinite(total)) continue;

    const schedule = normalizeSchedule(row?.report_schedule);

    if (schedule === "quarterly") {
      const qid = row?.report_year_id;
      if (qid == null || String(qid).trim() === "") continue;
      const key = `${ind}|${qid}`;

      if (!quarterlyActual.has(groupNo)) quarterlyActual.set(groupNo, new Set());
      quarterlyActual.get(groupNo).add(key);
    } else {
      if (!openActual.has(groupNo)) openActual.set(groupNo, new Set());
      openActual.get(groupNo).add(ind);
    }
  }

  const out = {};

  for (const def of defs) {
    const groupNo = Number(def.group_no);
    const expected = Number(def.expected_per_year) || 0;

    let actual = 0;
    if (String(def.submission_type).toLowerCase() === "quarterly") {
      actual = quarterlyActual.get(groupNo)?.size ?? 0;
    } else {
      actual = openActual.get(groupNo)?.size ?? 0;
    }

    actual = Math.min(actual, expected);

    const percentage = expected > 0 ? Number(((actual / expected) * 100).toFixed(1)) : 0;

    const key = `r${rightId}_g${groupNo}`;
    out[key] = {
      subcategory_key: key,
      subcategory_label: def.title,
      tab_name: state.activeTab,
      report_year: Number.isFinite(selectedYear) ? selectedYear : null,
      expected,
      actual,
      percentage,
      submission_type: def.submission_type,
      group_no: groupNo,
    };
  }

  return out;
}
</script>

<style>
@media print {
  body { background: white; }
  .apexcharts-canvas { page-break-inside: avoid; }
}
</style>