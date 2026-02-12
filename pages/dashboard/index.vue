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
      <!-- ✅ Data Sources (Expected Ownership from config) -->
      <div class="bg-green-300 text-black p-4 rounded-lg shadow sm:col-span-2">
        <GraphsDataSources
          :title=" state.activeTab + ' Data Sources '"
          :report_year="String(state.report_year || '')"
          :labels="datasourcePie.labels"
          :series="datasourcePie.series"
          :section="state.activeTab"
        />
      </div>

      <!-- ✅ Completeness (computed parent-side, child only renders) -->
      <div class="bg-green-300 text-black p-4 rounded-lg shadow sm:col-span-2">
        <GraphsDataStatistics
          :data="state.completenessByKey"
          :selected_tab="state.activeTab"
          :indicator_config="state.rights_config_by_right[state.right_id] || []"
          :agencies="state.options.agencies"
        />
      </div>
    </div>
  </main>

  <div class="flex h-screen">
    <div class="flex-1 flex flex-col">
      <div
        v-if="!state.loading"
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
          :key="graphsKey"
          :passed_data="state.passed_data_annual"
          class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-green-100 rounded-xl border-blue-900"
          :report_year="String(state.report_year || '')"
          :report_years="state.report_years"
        />

        <GraphsSurvivalNutritionalSchoolChildren
          v-if="state.activeTab === 'Survival'"
          :key="graphsKey"
          :passed_data="state.passed_data_annual"
          class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-green-100 rounded-xl border-blue-900"
          :report_year="String(state.report_year || '')"
          :report_years="state.report_years"
        />

        <GraphsSurvivalAccess
          v-if="state.activeTab === 'Survival'"
          :key="graphsKey"
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
          :key="graphsKey"
          :passed_data="state.passed_data_annual"
          class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-yellow-100 rounded-xl border-blue-900"
          :report_year="String(state.report_year || '')"
          :report_years="state.report_years"
        />

        <GraphsDevelopmentEnrolment
          v-if="state.activeTab === 'Development'"
          :key="graphsKey"
          :passed_data="state.passed_data_annual"
          class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-yellow-100 rounded-xl border-blue-900"
          :report_year="String(state.report_year || '')"
          :report_years="state.report_years"
        />

        <GraphsDevelopmentOSCY
          v-if="state.activeTab === 'Development'"
          :key="graphsKey"
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
          :key="graphsKey"
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

        <!-- General Info -->
        <GraphsGeneralInformation
          v-if="state.activeTab === 'General Information'"
          :key="graphsKey"
          :passed_data="state.passed_data"
          class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid bg-green-100 rounded-xl border-blue-900"
          :report_year="String(state.report_year || '')"
          :report_years="state.report_years"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, watch } from "vue";
import { report_yearService } from "~/components/api/ReportYears";
import { reportDetailsGroupsService } from "~/components/api/ReportDetailsGroupsService";
import { indicatorService } from "~/components/api/IndicatorCategoryService";

definePageMeta({ layout: "main" });

const tabs = [
  { name: "Survival" },
  { name: "Development" },
  { name: "Protection" },
  { name: "Participation" },
  { name: "Governance" },
  { name: "General Information" }
];

const TAB_TO_RIGHT_ID = {
  "Survival": 1,
  "Development": 2,
  "Protection": 3,
  "Participation": 4,
  "Governance": 5,
  "General Information": 6
};

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

/** ----------------- boot ----------------- */
onMounted(async () => {
  await fetchreportyear();
  await fetchIndicatorConfig();
  await fetchData();
  state.loading = false;
});

/** ----------------- year watcher ----------------- */
let fetchSeq = 0;
watch(
  () => state.report_year,
  async (val, oldVal) => {
    if (!val || val === oldVal) return;

    const seq = ++fetchSeq;
    state.isPageLoading = true;

    await fetchData();
    if (seq !== fetchSeq) return;

    state.isPageLoading = false;
  }
);

/** ----------------- completeness recompute ----------------- */
watch(
  () => [
    state.activeTab,
    state.right_id,
    state.report_year,
    state.passed_data,
    state.passed_data_annual,
    state.report_years.data,
    state.rights_config_by_right
  ],
  () => {
    state.completenessByKey = computeCompletenessBySubcategory();
  },
  { deep: true }
);

/** ----------------- UI actions ----------------- */
function change_selected_year(opt) {
  const opts = state.options.report_years.filter(Boolean);
  if (!opts.length) return;

  const currentIndex = opts.findIndex(o => o.value === state.report_year);
  const idx = currentIndex === -1 ? 0 : currentIndex;

  if (opt === 1 && idx < opts.length - 1) state.report_year = opts[idx + 1].value;
  else if (opt === 2 && idx > 0) state.report_year = opts[idx - 1].value;
}

function change_right_id(tab_name) {
  state.activeTab = tab_name;
  state.right_id = TAB_TO_RIGHT_ID[tab_name] ?? 1;
}

/** ----------------- fetchers ----------------- */
async function fetchreportyear() {
  const response = await report_yearService.getReportYears();
  const rows = Array.isArray(response?.data) ? response.data : [];

  state.report_years.data = rows;

  const years = rows
    .filter(r => Number(r?.status) === 1 && r?.year != null)
    .map(r => Number(r.year))
    .filter(Number.isFinite);

  const uniqueYears = [...new Set(years)].sort((a, b) => b - a);

  state.options.report_years = uniqueYears.map(y => ({ value: y, label: String(y), year: y }));

  state.report_year = uniqueYears[0] ?? null;
}

async function fetchData() {
  const params = { report_year: Number(state.report_year) };

  const response = await reportDetailsGroupsService.getReportDetailsGroups(params);
  state.passed_data = Array.isArray(response?.data) ? response.data : [];

  const responseAnnual = await reportDetailsGroupsService.getReportDetailsGroups();
  state.passed_data_annual = Array.isArray(responseAnnual?.data) ? responseAnnual.data : [];

  state.completenessByKey = computeCompletenessBySubcategory();
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

  state.completenessByKey = computeCompletenessBySubcategory();
}

/** ----------------- DataSources (Expected Ownership) ----------------- */
const activeIndicatorConfig = computed(() => state.rights_config_by_right?.[state.right_id] ?? []);

function buildAgencyDistributionFromConfig(configRoot, agencies) {
  const categories = Array.isArray(configRoot)
    ? configRoot
    : Array.isArray(configRoot?.data)
      ? configRoot.data
      : Array.isArray(configRoot?.data?.data)
        ? configRoot.data.data
        : [];

  const counts = new Map(); // agencyId -> count

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

  const getLabel = (id) =>
    agencies.find((a) => Number(a?.value) === Number(id))?.label ?? `Agency ${id}`;

  const rows = Array.from(counts.entries())
    .map(([agencyId, count]) => ({ agencyId, label: getLabel(agencyId), count }))
    .sort((a, b) => b.count - a.count);

  return {
    labels: rows.map((r) => r.label),
    series: rows.map((r) => r.count),
    meta: rows,
  };
}

const datasourcePie = computed(() => {
  return buildAgencyDistributionFromConfig(activeIndicatorConfig.value, state.options.agencies);
});

/** ----------------- completeness engine ----------------- */
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
  const y = row?.year ?? row?.report_year;
  if (y != null && y !== "") {
    const yn = Number(y);
    return Number.isFinite(yn) ? yn : NaN;
  }

  const ryId = toNum(row?.report_year_id);
  if (!Number.isFinite(ryId)) return NaN;

  const reportYears = normalizeArray(state.report_years);
  const match = reportYears.find(r => Number(r?.id) === ryId);
  const my = toNum(match?.year);
  return Number.isFinite(my) ? my : NaN;
}

function makeSubcategoryKey(rightId, categoryId, subId) {
  return `r${rightId}_c${categoryId}_s${subId}`;
}

function computeCompletenessBySubcategory() {
  const rightId = Number(state.right_id);
  const selectedYear = Number(state.report_year);

  const configTree = normalizeArray(state.rights_config_by_right?.[rightId] ?? []);

  const detailsRows = [
    ...normalizeArray(state.passed_data),
    ...normalizeArray(state.passed_data_annual),
  ];

  const expectedBySub = new Map();

  for (const cat of configTree) {
    const categoryId = cat?.id ?? null;
    const subs = Array.isArray(cat?.indicator_subcategories) ? cat.indicator_subcategories : [];

    for (const sub of subs) {
      const subId = sub?.id ?? null;
      if (!subId || !categoryId) continue;

      const key = makeSubcategoryKey(rightId, categoryId, subId);
      const label = normStr(sub?.description ?? "Subcategory");

      const expectedSet = new Set();
      const groups = Array.isArray(sub?.indicator_groups) ? sub.indicator_groups : [];
      for (const g of groups) {
        const els = Array.isArray(g?.indicator_group_elements) ? g.indicator_group_elements : [];
        for (const e of els) {
          const ind = normStr(e?.indicator_no);
          if (ind) expectedSet.add(ind);
        }
      }

      expectedBySub.set(key, { label, expectedSet });
    }
  }

  const actualSet = new Set();
  for (const row of detailsRows) {
    if (!row) continue;

    const rowYear = getRowYear(row);
    if (Number.isFinite(selectedYear) && rowYear !== selectedYear) continue;

    const ind = normStr(row?.indicator_no ?? row?.indicator);
    if (!ind) continue;

    const value = toNum(row?.total);
    if (!Number.isFinite(value)) continue;

    actualSet.add(ind);
  }

  const out = {};
  for (const [key, meta] of expectedBySub.entries()) {
    const expected = meta.expectedSet.size;

    let actual = 0;
    for (const ind of meta.expectedSet) {
      if (actualSet.has(ind)) actual += 1;
    }

    const percentage = expected > 0 ? Number(((actual / expected) * 100).toFixed(1)) : 0;

    out[key] = {
      subcategory_key: key,
      subcategory_label: meta.label,
      tab_name: state.activeTab,
      report_year: Number.isFinite(selectedYear) ? selectedYear : null,
      expected,
      actual,
      percentage,
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
