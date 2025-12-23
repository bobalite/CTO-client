<template>
  <!-- SCREEN ONLY: FILTER / CONTROLS -->
  <div class="print:hidden flex items-center justify-between mt-6 px-4">
    <div class="flow-root w-full">
      <div class="mt-8 flow-root">
        <div class="flex gap-3 items-center">
          <div class="flex-1">
            <FormYearSelector v-model="state.selected_year_id" :options="state.options.years"
            :change-selected-year="changeYear" />

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
      <template
        v-for="subcategory in (category.indicator_subcategories || [])"
        :key="subcategory.id"
      >
        <!-- ⬇⬇⬇ FIXED GRID (SMALLER LEFT COLUMN) -->
        <div
          class="grid grid-cols-[110px_1fr] gap-2 border-t border-gray-300 py-2 items-start
                 overflow-visible h-auto print:gap-1 print:py-1"
        >
          <!-- LEFT: SUBCATEGORY LABEL -->
          <div class="flex items-start px-2 print:px-1">
            <div
              class="subcategory-label w-full text-xs leading-tight
                     print:text-[10px] print:leading-tight"
            >
              {{ subcategory.description }}
            </div>
          </div>

          <!-- RIGHT: GROUPS -->
          <div class="space-y-3">
            <template
              v-for="group in (subcategory.indicator_groups || [])"
              :key="group.id"
            >
              <div class="border border-gray-300 rounded p-2 print-avoid-break">
                <!-- GROUP HEADER -->
                <div class="font-semibold text-sm print:text-xs mb-1">
                  Group {{ group.group_no }}
                </div>

                <!-- GROUP GRID (NO SCROLL, FULL HEIGHT) -->
                <div
                  class="mt-2 grid grid-cols-1 sm:grid-cols-16 gap-0 border-t border-grey pb-3
                         overflow-visible h-auto"
                >
                  
                  <GridCell
                    class="sm:col-span-15 text-center text-xs border-r border-b"
                    displaytext=""
                  />

                  <GridCell class="sm:col-span-6 text-center text-xs border-l border-b" displaytext="INDICATOR" />
                  <GridCell class="sm:col-span-2 text-center text-xs border-l border-b" displaytext="MALE" />
                  <GridCell class="sm:col-span-2 text-center text-xs border-l border-b" displaytext="FEMALE" />
                  <GridCell class="sm:col-span-2 text-center text-xs border-l border-b" displaytext="TOTAL" />
                  <GridCell class="sm:col-span-4 text-center text-xs border-l border-b border-r" displaytext="REMARKS" />

                  <template v-for="el in group.indicator_group_elements" :key="el.id">
                    <GridCell
                      class="sm:col-span-1 px-1 text-xs border-l border-b break-words"
                      :displaytext="el.indicator_no"
                    />
                    <GridCell
                      class="sm:col-span-5 px-1 text-xs border-b break-words"
                      :displaytext="el.description"
                    />
                    <GridTextPrintView class="sm:col-span-2 border-l border-b" :entrystatus="el.male"/>
                    <GridTextPrintView class="sm:col-span-2 border-l border-b" :entrystatus="el.female"/>
                    <GridTextPrintView class="sm:col-span-2 border-l border-b" :entrystatus="el.female"/>
                    <GridTextPrintArea class="sm:col-span-4 px-1 text-xs border-l border-b border-r break-words" :entrystatus="el.remarks"
                    />
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </template>

    <PrintFooter />

    <button
      @click="printChart"
      class="print:hidden mt-4 bg-blue-600 text-white px-4 py-2 rounded"
    >
      Print Report
    </button>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, nextTick, watch } from 'vue'
import { indicatorService } from '~/components/api/IndicatorCategoryService'
import { Childrens_rightsService } from '~/components/api/Rights'
import { report_yearService } from '~/components/api/ReportYears';

definePageMeta({ layout: 'main' })

const state = reactive({

  // Data

  male: {},
  female: {},
  total: {},
  remarks: {},
  header_value1: {},
  header_value2: {},
  header_value3: {},

  exceldata: [],
  header_name1: '',
  header_name2: '',
  header_name3: '',

 report_years: { data: [] },


  allCategories: [],
  selected_year_id: null,
  selected_year: '',
  selected_rights_id: null,
  options: {
    years: [
      { },
      
    ],
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

// function changeYear() {
//   const y = state.options.years.find(v => v.value === state.selected_year_id)
//   state.selected_year = y?.year || ''
// }

function changeYear() {
    state.selected_year_id = state.selected_year_id
    state.selected_year = state.options.years.find(year => year.value === state.selected_year_id)?.year || '';
    console.log('selected_year_id = ', state.selected_year_id)
}


watch(() => state.selected_year_id, changeYear)

async function fetchIndicatorCategories() {
  const res = await indicatorService.getIndicatorCategories()
  state.allCategories = res?.data || []
}

//details ------------------------------------------------------------------

const groupMode = computed(() => {
  if (!props.group || !props.group.indicator_group_elements) return 'normal'

  const allExcel = props.group.indicator_group_elements.every(el => el.value_type === 'excel')
  const noneExcel = props.group.indicator_group_elements.every(el => el.value_type !== 'excel')

  console.log('groupMode computation:', { allExcel, noneExcel })

  if (allExcel) return 'excel'
  if (noneExcel) return 'normal'
  return 'mixed'
})


/* ---------------------------------------------
   INIT STATE
---------------------------------------------- */
function initializeState() {
  if (!props.group) return

  props.group.indicator_group_elements.forEach(el => {
    const key = el.indicator_no
    state.male[key] = el.male_value ?? 0
    state.female[key] = el.female_value ?? 0
    state.total[key] = el.total_value ?? 0
    state.remarks[key] = el.remarks ?? ''
  })
}

/* ---------------------------------------------
   LOAD DB VALUES
---------------------------------------------- */
async function get_group_details() {
  try {
    if (!props.group) return

    const params = {
      indicator_group_id: props.group.group_no ?? null,
      report_year: Number(props.selected_year),
      report_year_id: Number(props.selected_year_id),
    }

    const response = await reportDetailsService.getReportDetails(params)
    console.log('response reportDetailsService', response)

    if (response.data && Array.isArray(response.data)) {
      response.data.forEach((item) => {
        const key = item.indicator_no
        if (!key) return

        state.male[key] = item.male ?? state.male[key]
        state.female[key] = item.female ?? state.female[key]
        state.total[key] = item.total ?? state.total[key]
        state.remarks[key] = item.remarks ?? state.remarks[key]
      })
    }
  } catch (err) {
    console.error('Error fetching report detail excel:', err)
  }
}


async function getexceldata() {
  try {
    if (!props.group) return

    const params = {
      indicator_group_id: props.group.group_no ?? null,
      report_year_id: Number(props.selected_year_id),
      
    }

    const response = await reportDetailsExcelService.getReportExcelDetails(params)
    console.log('response reportDetailsExcelService', response)

    // Decide shape once
    const rows = Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : []

    state.exceldata = rows
    console.log('state.exceldata', state.exceldata)

    const first = rows[0] ?? null

    if (first) {
      state.header_name1 = first.header_name1 ?? 'Value 1'
      state.header_name2 = first.header_name2 ?? 'Value 2'
      state.header_name3 = first.header_name3 ?? 'Value 3'
    } else {
      state.header_name1 = 'Value 1'
      state.header_name2 = 'Value 2'
      state.header_name3 = 'Value 3'
    }

    console.log('header names', state.header_name1, state.header_name2, state.header_name3)
  } catch (err) {
    console.error('Error fetching report detail excel:', err)
  }
}


async function fetchreportyear() {
  try {
    const response = await report_yearService.getReportYears()
    const rows = Array.isArray(response?.data) ? response.data : []

    // Keep only active years (status == 1), map to selector options
    const options = rows
      .filter(r => Number(r.status) === 1)
      .map(r => ({
        value: r.id,          // use number IDs consistently
        label: r.name,
        year: String(r.year),
      }))

    state.options.years = options

    // If nothing selected yet, pick first valid option
    if (!state.selected_year_id && state.options.years.length) {
      state.selected_year_id = state.options.years[0].value
      changeYear()
    }
  } catch (error) {
    console.error('fetchreportyear error', error)
    state.options.years = []
  }
}





//details ------------------------------------------------------------------


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

// onMounted(async () => {
  
//   fetchreportyear()
//   await fetchIndicatorCategories()
//   await fetchRights()
//   if (!state.selected_year_id) {
//     state.selected_year_id = state.options.years[0].value
//     changeYear()
//   }
   
//    initializeState()
//    get_group_details()
//    getexceldata()
// })

onMounted(async () => {
  await fetchreportyear()
  await fetchIndicatorCategories()
  await fetchRights()

  // No need for this block anymore; fetchreportyear handles default select:
  // if (!state.selected_year_id) { ... }

  changeYear()

  // WARNING: The code below references props, but this file has no props.
  // If this is truly reports/index.vue, these calls are wrong here.
  // initializeState()
  // get_group_details()
  // getexceldata()
})
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
