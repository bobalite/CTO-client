<template>
  <!-- SCREEN ONLY: FILTER / CONTROLS -->
  <div class="print:hidden flex items-center justify-between mt-6 px-4">
    <div class="flow-root w-full">
      <div class="mt-8 flow-root">
        <div class="flex gap-3 items-center">
          <div class="flex-1">
            <FormYearSelector
              v-model="state.report_year"
              :options="state.options.years"
              :change-selected-year="change_selected_year"
            />
            <FormRightSelector
              v-model="state.selected_rights_id"
              :options="state.options.rights"
            />
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
        <div
          class="grid grid-cols-[110px_1fr] gap-2 border-t border-gray-300 py-2 items-start
                 overflow-visible h-auto print:gap-1 print:py-1"
        >
          <!-- LEFT: SUBCATEGORY LABEL -->
          <div class="flex items-start px-2 print:px-1">
            <div class="subcategory-label w-full text-xs leading-tight print:text-[10px] print:leading-tight">
              {{ subcategory.description }}
            </div>
          </div>

          <!-- RIGHT: GROUPS -->
          <div class="space-y-3">
            <template v-for="group in (subcategory.indicator_groups || [])" :key="group.id">
              <div class="border border-gray-300 rounded p-2 print-avoid-break">
                <div class="font-semibold text-sm print:text-xs mb-2">
                  Group {{ group.group_no }}
                </div>

                <!-- ✅ NORMAL TABLE: ALWAYS SHOW ALL ELEMENTS (including excel ones) -->
                <div
                  v-if="(group.indicator_group_elements || []).length"
                  class="mt-2 grid grid-cols-1 sm:grid-cols-16 gap-0 border-t border-grey pb-3 overflow-visible h-auto"
                >
                  <GridCell class="sm:col-span-15 text-center text-xs border-r border-b" displaytext="" />

                  <!-- ✅ HEADER: INDICATOR / MALE / FEMALE / TOTAL / REMARKS / AGENCY (one line) -->
                  <GridCell class="sm:col-span-6 text-center text-xs border-l border-b" displaytext="INDICATOR" />
                  <GridCell class="sm:col-span-2 text-center text-xs border-l border-b" displaytext="MALE" />
                  <GridCell class="sm:col-span-2 text-center text-xs border-l border-b" displaytext="FEMALE" />
                  <GridCell class="sm:col-span-2 text-center text-xs border-l border-b" displaytext="TOTAL" />
                  <GridCell class="sm:col-span-3 text-center text-xs border-l border-b" displaytext="REMARKS" />
                  <GridCell
                    class="sm:col-span-1 text-center text-xs border-l border-b border-r"
                    displaytext="AGENCY"
                  />

                  <template v-for="el in (group.indicator_group_elements || [])" :key="el.id">
                    <GridCell
                      class="sm:col-span-1 px-1 text-xs border-l border-b break-words"
                      :displaytext="el.indicator_no"
                    />

                    <!-- ✅ INDICATOR description reduced by 1 col to make space for AGENCY -->
                    <GridCell
                      class="sm:col-span-5 px-1 text-xs border-b break-words"
                      :displaytext="el.description"
                    />

                    <GridTextPrintView
                      class="sm:col-span-2 border-l border-b"
                      :entrystatus="el.male"
                      :modelValue="state.male[String(el.indicator_no).trim()] ?? ''"
                    />

                    <GridTextPrintView
                      class="sm:col-span-2 border-l border-b"
                      :entrystatus="el.female"
                      :modelValue="state.female[String(el.indicator_no).trim()] ?? ''"
                    />

                    <GridTextPrintView
                      class="sm:col-span-2 border-l border-b"
                      :entrystatus="el.total"
                      :modelValue="state.total[String(el.indicator_no).trim()] ?? ''"
                    />

                    <!-- ✅ REMARKS reduced to 3 cols -->
                    <GridTextPrintAreaViewReadonly
                      class="sm:col-span-3 px-1 text-xs border-l border-b break-words"
                      :entrystatus="el.remarks"
                      :modelValue="state.remarks[String(el.indicator_no).trim()] ?? ''"
                    />

                    <!-- ✅ AGENCY (same row) -->
                    <div class="sm:col-span-1 border-l border-b border-r px-1 flex items-center justify-center">
                      <span
                        v-if="agencyMeta(el.agency_id).label"
                        class="inline-flex items-center px-2 py-[2px] rounded-full border text-[10px] font-semibold leading-none"
                        :class="agencyMeta(el.agency_id).color"
                      >
                        {{ agencyMeta(el.agency_id).label }}
                      </span>
                      <span v-else class="text-gray-400 text-[10px]">—</span>
                    </div>
                  </template>
                </div>

                <div v-else class="text-xs opacity-70">
                  No elements.
                </div>

                <!-- ✅ EXCEL LISTS: SHOW ONLY FOR EXCEL ELEMENTS -->
                <div v-if="excelElements(group).length" class="space-y-4 mt-4">
                  <div
                    v-for="el in excelElements(group)"
                    :key="'excel-' + el.id"
                    class="border rounded-xl p-2"
                  >
                    <div class="font-semibold text-sm print:text-xs mb-2">
                      {{ el.indicator_no }} {{ el.description }} (Excel)
                    </div>

                    <!-- 2 quarters per row -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        v-for="(qid, idx) in state.quarterIds"
                        :key="String(el.indicator_no) + '-q-' + qid"
                        class="border rounded-xl p-3"
                      >
                        <div class="text-sm font-semibold mb-2 text-center">
                          {{ state.quarterNames?.[idx] ?? `Q${idx + 1}` }}
                        </div>

                        <div
                          v-if="getExcelList(el.indicator_no, qid).length === 0"
                          class="text-xs opacity-70 text-center py-6"
                        >
                          No data.
                        </div>

                        <div v-else class="grid grid-cols-12 gap-3 items-start">
                          <div class="col-span-12">
                            <ul class="space-y-1 text-xs">
                              <li
                                v-for="item in getExcelList(el.indicator_no, qid)"
                                :key="String(el.indicator_no) + '-' + qid + '-' + item.rank"
                                class="flex items-start gap-2 leading-tight"
                                :title="item.disease"
                              >
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
                <!-- /excel lists -->
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
import { reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService'
import { reportDetailsExcelService } from '~/components/api/ReportDetailsExcelService'

definePageMeta({ layout: 'main' })

const state = reactive({
  allCategories: [],
  selected_rights_id: null,

  report_year: null,

  reportYearRows: [],
  quarterIds: [],
  quarterNames: [],

  passed_data: [],
  loading: true,

  male: {},
  female: {},
  total: {},
  remarks: {},

  exceldata: [],
  excelListByIndicatorQuarter: {},

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
  ],

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

/* ----------------------- AGENCY BADGE ----------------------- */
function agencyMeta(agencyId) {
  const id = Number(agencyId)
  const a = state.agencies.find(x => Number(x.value) === id)
  if (!a) return { label: '', color: 'bg-gray-200 border-gray-300 text-gray-800' }
  return { label: a.label, color: `${a.color} text-white` }
}

/* ----------------------- FETCH OPTIONS ----------------------- */

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

    state.reportYearRows = rows

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
      state.quarterIds = []
      state.quarterNames = []
      return
    }

    const currentYear = new Date().getFullYear()
    state.report_year = uniqueYears.includes(currentYear) ? currentYear : uniqueYears[0]
  } catch (error) {
    console.error('fetchreportyear error', error)
    state.options.years = []
    state.report_year = null
    state.reportYearRows = []
    state.quarterIds = []
    state.quarterNames = []
  }
}

function buildQuarterArrays() {
  const rows = Array.isArray(state.reportYearRows) ? state.reportYearRows : []
  const targetYear = Number(state.report_year)

  const filtered = rows
    .filter(r => Number(r.status) === 1 && Number(r.year) === targetYear)
    .sort((a, b) => Number(a.quarter ?? a.quarter_no ?? a.id) - Number(b.quarter ?? b.quarter_no ?? b.id))

  state.quarterIds = filtered.map(r => Number(r.id))

  state.quarterNames = filtered.map((r, idx) => {
    const qnum = Number(r.quarter ?? r.quarter_no)
    return `Q${Number.isFinite(qnum) ? qnum : (idx + 1)} ${r.year}`
  })
}

/* ----------------------- EXCEL ELEMENT HELPERS ----------------------- */

function isExcelElement(el) {
  return String(el?.value_type ?? '').toLowerCase() === 'excel'
}

function excelElements(group) {
  return (group?.indicator_group_elements || []).filter(isExcelElement)
}

/* ----------------------- NORMAL DATA MAPPING ----------------------- */

function toNumberOrNull(v) {
  if (v === null || v === undefined) return null
  if (typeof v === 'number' && Number.isFinite(v)) return v
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
  const parts = new Set(existing.split(' | ').map(x => x.trim()).filter(Boolean))
  parts.add(s)
  map[key] = Array.from(parts).join(' | ')
}

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

  for (const row of detailsOrGroups) {
    const key = String(row.indicator_no ?? '').trim()
    if (!key) continue
    addNumeric(state.male, key, row.male ?? row.male_value)
    addNumeric(state.female, key, row.female ?? row.female_value)
    addNumeric(state.total, key, row.total ?? row.total_value)
    addRemark(state.remarks, key, row.remarks ?? row.remarks_value)
  }
}

async function fetchData() {
  if (!state.report_year) return

  state.loading = true
  try {
    const params = { report_year: Number(state.report_year) }
    const response = await reportDetailsGroupsService.getReportDetailsGroups(params)
    state.passed_data = response?.data || []
    mapValues(state.passed_data)
  } catch (e) {
    console.error('fetchData error', e)
    state.passed_data = []
    mapValues([])
  } finally {
    state.loading = false
  }
}

/* ----------------------- EXCEL DATA (PER INDICATOR + QUARTER) ----------------------- */

function toNum(v) {
  const n = Number(String(v ?? '').trim())
  return Number.isFinite(n) ? n : 0
}

function buildExcelListsByIndicatorQuarter(rows) {
  const quarterIds = (state.quarterIds ?? []).map(Number)
  const out = {}
  if (!quarterIds.length) return out

  const targetYear = Number(state.report_year)
  const scopedRows = rows.filter(r => {
    const y = Number(r?.year ?? r?.report_year ?? r?.report_year_value)
    return !Number.isFinite(y) || y === targetYear
  })

  const indicatorNos = Array.from(
    new Set(scopedRows.map(r => String(r?.indicator_no ?? '').trim()).filter(Boolean))
  )

  for (const indicatorNo of indicatorNos) {
    out[indicatorNo] = {}

    for (const qid of quarterIds) {
      const list = scopedRows
        .filter(r => {
          if (!r) return false
          if (String(r.indicator_no ?? '').trim() !== indicatorNo) return false
          return Number(r.report_year_id) === qid
        })
        .map(r => ({
          rank: toNum(r.header_value1),
          disease: String(r.header_value2 ?? '').trim(),
          count: toNum(r.header_value3),
        }))
        .filter(x => x.disease)
        .sort((a, b) => a.rank - b.rank)
        .slice(0, 10)

      const total = list.reduce((sum, x) => sum + x.count, 0)

      out[indicatorNo][qid] = list.map(x => ({
        ...x,
        pct: total > 0 ? Number(((x.count / total) * 100).toFixed(1)) : 0,
      }))
    }
  }

  return out
}

async function getexceldata() {
  try {
    const response = await reportDetailsExcelService.getReportExcelDetails()
    const rows = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response)
        ? response
        : []

    state.exceldata = rows
    state.excelListByIndicatorQuarter = buildExcelListsByIndicatorQuarter(rows)
  } catch (err) {
    console.error("Error fetching report detail excel:", err)
    state.exceldata = []
    state.excelListByIndicatorQuarter = {}
  }
}

function getExcelList(indicatorNo, quarterId) {
  const key = String(indicatorNo ?? '').trim()
  const qid = Number(quarterId)
  return state.excelListByIndicatorQuarter?.[key]?.[qid] ?? []
}

/* ----------------------- LIFECYCLE ----------------------- */

onMounted(async () => {
  await fetchreportyear()
  await fetchIndicatorCategories()
  await fetchRights()

  buildQuarterArrays()

  await fetchData()
  await getexceldata()
})

watch(
  () => state.report_year,
  async (val, oldVal) => {
    if (!val || val === oldVal) return
    buildQuarterArrays()
    await fetchData()
    await getexceldata()
  }
)
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
