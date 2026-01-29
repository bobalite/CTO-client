<template>
  <!-- SCREEN ONLY: FILTER / CONTROLS -->
  <div class="print:hidden flex items-center justify-between mt-6 px-4">
    <div class="flow-root w-full">
      <div class="mt-8 flow-root">
        <div class="flex gap-3 items-center">
          <div class="flex-1">
            <FormYearSelector v-model="state.report_year" :options="state.options.years"
              :change-selected-year="change_selected_year" />

            <FormRightSelector v-model="state.selected_rights_id" :options="state.options.rights" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- PRINT ROOT -->
  <div class="report-print-root">
    <PrintHeader />

    <!-- CATEGORY -->
    <template v-for="category in categories" :key="category.id">
      <PrintRowcategory :description="category.description" />

      <!-- SUBCATEGORY -->
      <template v-for="subcategory in (category.indicator_subcategories || [])" :key="subcategory.id">
        <!-- ⬇⬇⬇ FIXED GRID (SMALLER LEFT COLUMN) -->
        <div class="grid grid-cols-[110px_1fr] gap-2 border-t border-gray-300 py-2 items-start
                 overflow-visible h-auto print:gap-1 print:py-1">
          <!-- LEFT: SUBCATEGORY LABEL -->
          <div class="flex items-start px-2 print:px-1">
            <div class="subcategory-label w-full text-xs leading-tight
                     print:text-[10px] print:leading-tight">
              {{ subcategory.description }}
            </div>
          </div>

          <!-- RIGHT: GROUPS -->
          <div class="space-y-3">
            <template v-for="group in (subcategory.indicator_groups || [])" :key="group.id">
              <div v-if = "group.encoding_type !=='ExcellUpload'" class="border border-gray-300 rounded p-2 print-avoid-break">
                <!-- GROUP HEADER -->
                <div class="font-semibold text-sm print:text-xs mb-1">
                  Group {{ group.group_no }}
                </div>

                <!-- GROUP GRID (NO SCROLL, FULL HEIGHT) -->
                <div class="mt-2 grid grid-cols-1 sm:grid-cols-16 gap-0 border-t border-grey pb-3
                         overflow-visible h-auto">

                  <GridCell class="sm:col-span-15 text-center text-xs border-r border-b" displaytext="" />

                  <GridCell class="sm:col-span-6 text-center text-xs border-l border-b" displaytext="INDICATOR" />
                  <GridCell class="sm:col-span-2 text-center text-xs border-l border-b" displaytext="MALE" />
                  <GridCell class="sm:col-span-2 text-center text-xs border-l border-b" displaytext="FEMALE" />
                  <GridCell class="sm:col-span-2 text-center text-xs border-l border-b" displaytext="TOTAL" />
                  <GridCell class="sm:col-span-4 text-center text-xs border-l border-b border-r"
                    displaytext="REMARKS" />

                  <template v-for="el in group.indicator_group_elements" :key="el.id">
                    <GridCell class="sm:col-span-1 px-1 text-xs border-l border-b break-words"
                      :displaytext="el.indicator_no" />
                  
                    <GridCell class="sm:col-span-5 px-1 text-xs border-b break-words" :displaytext="el.description" />
                    
                    <GridTextPrintView class="sm:col-span-2 border-l border-b" :entrystatus="el.male"
                      :modelValue="state.male[String(el.indicator_no).trim()] ?? ''" />
                    
                    <GridTextPrintView class="sm:col-span-2 border-l border-b" :entrystatus="el.female"
                      :modelValue="state.female[String(el.indicator_no).trim()] ?? ''" />
                    
                    <GridTextPrintView class="sm:col-span-2 border-l border-b" :entrystatus="el.total"
                     :modelValue="state.total[String(el.indicator_no).trim()] ?? ''" />

                    <GridTextPrintAreaViewReadonly class="sm:col-span-4 px-1 text-xs border-l border-b border-r break-words"
                      :entrystatus="el.remarks" :modelValue="state.remarks[String(el.indicator_no).trim()] ?? ''" />
                  </template>


                </div>
             </div>
              <div v-else-if="group.encoding_type === 'ExcellUpload'"
                class="border border-gray-300 rounded p-2 print-avoid-break">
                <!-- GROUP HEADER FOR EXCEL UPLOAD-->
                <div class="font-semibold text-sm print:text-xs mb-1">
                  Group {{ group.group_no }} (Data uploaded via Excel)

                  <div class="border rounded-xl p-2 md:col-span-2">
                    <h3 class="text-base font-bold mb-2">
                      {{group.description}}
                    </h3>

                    <!-- 2 quarters per row -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div v-for="(qid, idx) in state.quarterIds" :key="'infant-quarter-' + qid"
                        class="border rounded-xl p-3">
                        <div class="text-sm font-semibold mb-2 text-center">
                          {{ state.quarterNames?.[idx] ?? `Q${idx + 1}` }}
                        </div>

                        <div v-if="(state.infantListByQuarter?.[qid]?.length ?? 0) === 0"
                          class="text-xs opacity-70 text-center py-6">
                          No data.
                        </div>

                        <div v-else class="grid grid-cols-12 gap-3 items-start">
                          <!-- LEFT: List -->
                          <div class="col-span-12 md:col-span-7">
                            <ul class="space-y-1 text-xs">
                              <li v-for="item in state.infantListByQuarter[qid]"
                                :key="'infant-' + qid + '-' + item.rank" class="flex items-start gap-2 leading-tight"
                                :title="item.disease">
                                <div class="w-6 shrink-0 text-right font-semibold">
                                  {{ item.rank }}.
                                </div>

                                <div class="min-w-0 flex-1">
                                  <div class="font-medium truncate">
                                    {{ item.disease }}
                                  </div>
                                  <div class="text-[10px] opacity-70">
                                    {{ item.count }} · {{ item.pct }}%
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>


                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </template>
          </div>
        </div>
      </template>
    </template>

    <PrintFooter />

    <button @click="printChart" class="print:hidden mt-4 bg-blue-600 text-white px-4 py-2 rounded">
      Print Report
    </button>
  </div>
</template>


<script setup>
import { reactive, computed, onMounted, nextTick, watch } from 'vue'

import { indicatorService } from '~/components/api/IndicatorCategoryService'
import { Childrens_rightsService } from '~/components/api/Rights'
import { report_yearService } from '~/components/api/ReportYears'

// ✅ YOU WERE MISSING THIS IMPORT (adjust path to your actual service file)
import { reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService'
import { reportDetailsExcelService } from "~/components/api/ReportDetailsExcelService";

definePageMeta({ layout: 'main' })

const state = reactive({
  allCategories: [],
  selected_rights_id: null,

  report_year: null,

  // fetched detail rows/groups for the selected year
  passed_data: [],
  loading: true,

  // maps keyed by indicator_no
  male: {},
  female: {},
  total: {},
  remarks: {},

  options: {
    years: [],
    rights: [],
  },
})

const categories = computed(() => {
  const id = Number(state.selected_rights_id)
  return id ? state.allCategories.filter(c => Number(c.right_id) === id) : []
})

const printChart = async () => {
  await nextTick()
  window.print()
}

function change_selected_year(opt) {
  const opts = state.options.years.filter(Boolean)
  if (!opts.length) return

  const currentIndex = opts.findIndex(o => o.value === state.report_year)
  const idx = currentIndex === -1 ? 0 : currentIndex

  if (opt === 1 && idx < opts.length - 1) {
    state.report_year = opts[idx + 1].value
  } else if (opt === 2 && idx > 0) {
    state.report_year = opts[idx - 1].value
  }
}

async function fetchIndicatorCategories() {
  const res = await indicatorService.getIndicatorCategories()
  state.allCategories = res?.data || []
}

async function fetchRights() {
  const res = await Childrens_rightsService.getRights()
  state.options.rights = (res?.data || []).map(r => ({
    value: r.id,
    label: r.description,
  }))

  if (!state.selected_rights_id && state.options.rights.length) {
    state.selected_rights_id = state.options.rights[0].value
  }
}

async function fetchreportyear() {
  try {
    const response = await report_yearService.getReportYears()
    const rows = Array.isArray(response?.data) ? response.data : []

    const years = rows
      .filter(r => Number(r.status) === 1 && r.year != null)
      .map(r => Number(r.year))
      .filter(y => Number.isFinite(y))

    const uniqueYears = [...new Set(years)].sort((a, b) => b - a)

    state.options.years = uniqueYears.map(y => ({
      value: y,
      label: String(y),
      year: y,
    }))

    if (!state.options.years.length) {
      state.report_year = null
      return
    }

    const currentYear = new Date().getFullYear()
    state.report_year = uniqueYears.includes(currentYear) ? currentYear : uniqueYears[0]
  } catch (error) {
    console.error('fetchreportyear error', error)
    state.options.years = []
    state.report_year = null
  }
}

/**
 * Robust mapper: handles two common API shapes:
 * A) response.data is flat rows: [{indicator_no, male, female, total, remarks}]
 * B) response.data is groups: [{indicator_group_elements:[{indicator_no, ...}]}]
 * 
 * 
 */


 function toNumberOrNull(v) {
  if (v === null || v === undefined) return null
  if (typeof v === 'number' && Number.isFinite(v)) return v

  // allow "1,234" / " 12 " etc.
  const s = String(v).trim().replace(/,/g, '')
  if (s === '') return null
  const n = Number(s)
  return Number.isFinite(n) ? n : null
}

function addNumeric(map, key, value) {
  const n = toNumberOrNull(value)
  if (n === null) return

  const existing = toNumberOrNull(map[key])
  map[key] = (existing ?? 0) + n
}

function addRemark(map, key, value) {
  const s = String(value ?? '').trim()
  if (!s) return

  const existing = String(map[key] ?? '').trim()
  if (!existing) {
    map[key] = s
    return
  }

  // avoid duplicate remark chunks
  const parts = new Set(existing.split(' | ').map(x => x.trim()).filter(Boolean))
  parts.add(s)
  map[key] = Array.from(parts).join(' | ')
}

/**
 * Groups by indicator_no and ADDS values across quarters (no overwrite).
 * Works with:
 *  - grouped shape: [{ indicator_group_elements: [...] }, ...]
 *  - flat rows:     [{ indicator_no, male, female, total, remarks, quarter }, ...]
 */


function mapValues(detailsOrGroups) {
  state.male = {}
  state.female = {}
  state.total = {}
  state.remarks = {}

  if (!Array.isArray(detailsOrGroups) || !detailsOrGroups.length) return

  const first = detailsOrGroups[0]
  const isGrouped = first && Array.isArray(first.indicator_group_elements)

  if (isGrouped) {
    for (const g of detailsOrGroups) {
      for (const el of (g.indicator_group_elements || [])) {
        const key = String(el.indicator_no ?? '').trim()
        if (!key) continue

        // pick the real value fields your API returns
        const maleVal = el.male_value ?? el.male_data ?? el.male
        const femaleVal = el.female_value ?? el.female_data ?? el.female
        const totalVal = el.total_value ?? el.total_data ?? el.total
        const remarksVal = el.remarks_value ?? el.remarks_data ?? el.remarks

        addNumeric(state.male, key, maleVal)
        addNumeric(state.female, key, femaleVal)
        addNumeric(state.total, key, totalVal)
        addRemark(state.remarks, key, remarksVal)
      }
    }
    return
  }

  // flat rows (most common when you truly have quarter rows)
  for (const row of detailsOrGroups) {
    const key = String(row.indicator_no ?? '').trim()
    if (!key) continue

    addNumeric(state.male, key, row.male ?? row.male_value)
    addNumeric(state.female, key, row.female ?? row.female_value)
    addNumeric(state.total, key, row.total ?? row.total_value)
    addRemark(state.remarks, key, row.remarks ?? row.remarks_value)
  }

  console.log('state.male', state.male)
}

async function fetchData() {
  if (!state.report_year) return

  state.loading = true
  try {
    const params = { report_year: Number(state.report_year) }
    const response = await reportDetailsGroupsService.getReportDetailsGroups(params)

    state.passed_data = response?.data || []

    // ✅ accumulate quarter values instead of overwriting
    mapValues(state.passed_data)
  } catch (e) {
    console.error('fetchData error', e)
    state.passed_data = []
    mapValues([])
  } finally {
    state.loading = false
  }
}

onMounted(async () => {
  
  await fetchreportyear()
  await fetchIndicatorCategories()
  await fetchRights()
  buildQuarterArrays()

  // fetch once initial year is set
  await fetchData()
  await getexceldata()
})

// ✅ refetch when year changes
watch(
  () => state.report_year,
  async (val, oldVal) => {
    if (!val || val === oldVal) return
    await fetchData()
    await getexceldata()
  }
)

function normalizeReportYears() {
  const raw = state.report_year;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  return [];
}

function buildQuarterArrays() {
  const allYears = normalizeReportYears();
  const targetYear = Number(state.report_year);

  const filtered = allYears
    .filter((q) => Number(q.year) === targetYear)
    .sort((a, b) => Number(a.quarter ?? a.id) - Number(b.quarter ?? b.id));

  state.quarterIds = filtered.map((q) => Number(q.id));
  state.quarterNames = filtered.map((q, index) => `Q${index + 1} ${q.year}`);

 
}


async function getexceldata() {
  try {
    const response = await reportDetailsExcelService.getReportExcelDetails();

    const rows = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response)
        ? response
        : [];

    state.exceldata = rows;

    const quarterIds = (state.quarterIds ?? []).map(Number);
    if (!quarterIds.length) {
      state.infantListByQuarter = {};
      state.u5ListByQuarter = {};
      state.infantPieByQuarter = {};
      state.u5PieByQuarter = {};
      return;
    }

    const toNum = (v) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };

    const buildListAndPieByQuarter = (indicatorNo) => {
      const listOut = {};
      const pieOut = {};

      for (const qid of quarterIds) {
        const list = rows
          .filter(
            (r) =>
              r &&
              String(r.indicator_no) === String(indicatorNo) &&
              Number(r.report_year_id) === qid
          )
          .map((r) => ({
            rank: toNum(r.header_value1),
            disease: String(r.header_value2 ?? ""),
            count: toNum(r.header_value3),
          }))
          .filter((x) => x.disease)
          .sort((a, b) => a.rank - b.rank)
          .slice(0, 10);

        const total = list.reduce((sum, x) => sum + x.count, 0);

        // list with pct
        listOut[qid] = list.map((x) => ({
          ...x,
          pct: total > 0 ? Number(((x.count / total) * 100).toFixed(1)) : 0,
        }));

        // pie uses same pct values
        pieOut[qid] = {
          labels: listOut[qid].map((x) => x.disease),
          series: listOut[qid].map((x) => Number(x.pct.toFixed(2))),
          total,
        };
      }

      return { listOut, pieOut };
    };

    const infant = buildListAndPieByQuarter("12.1");
    state.infantListByQuarter = infant.listOut;
    
    const u5 = buildListAndPieByQuarter("12.2");
    state.u5ListByQuarter = u5.listOut;
    
  } catch (err) {
    console.error("Error fetching report detail excel:", err);
    state.exceldata = [];
    state.infantListByQuarter = {};
    state.u5ListByQuarter = {}; 
    
  }
}

</script>




<style scoped>
.subcategory-label {
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: normal;
  word-break: break-word;
}

@media print {
  .subcategory-label {
    font-size: 10px;
    line-height: 1.15;
  }

  .report-print-root,
  .report-print-root * {
    overflow: visible !important;
    height: auto !important;
    max-height: none !important;
  }

  .print-avoid-break {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
  }
}
</style>
