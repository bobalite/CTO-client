<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div
        class="w-full sm:max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative"
      >
        <h2 class="text-lg font-semibold mb-4">{{ modalTitle }}</h2>

        <div
          class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-16 border-solid border-grey border-t pb-4 max-h-[80vh] overflow-y-auto"
        >
          <!-- Header Row -->
          <GridCell
            class="sm:col-span-1 flex bg-yellow-400 justify-center text-xl text-black border-white border-l border-b pb-1"
            :displaytext="selected_year"
          />
          <GridCell
            class="sm:col-span-15 flex bg-green-700 justify-center text-sm text-black border-white border-r pb-1"
            :displaytext="category"
          />
          <GridCell
            class="sm:col-span-1 flex bg-yellow-400 justify-center text-xl text-black border-white border-l border-r border-b pb-1"
            :displaytext="group?.group_no"
          />
          <GridCell
            class="sm:col-span-15 flex justify-center items-left text-md text-white table-header-text border-white border-r border-b pb-1"
            :displaytext="subcategory"
          />

          <!-- Excel Mode Header -->
          <GridCellView
            class="sm:col-span-6 text-center table-header-4 border-l border-b border-grey pb-1"
            displaytext="INDICATOR"
          />
          <GridCellView
            class="sm:col-span-6 text-center table-header-4 border-l border-b border-grey pb-1"
            displaytext="VALUE (FROM EXCEL)"
          />
          <GridCellView
            class="sm:col-span-4 text-center table-header-4 border-l border-b border-r border-grey pb-1"
            displaytext="REMARKS"
          />

          <!-- Excel-only indicators -->
          <template v-for="el in excelIndicators" :key="el.indicator_no">
            <!-- Indicator + description row -->
            <GridTextView
              class="sm:col-span-1 px-2 text-center table-header-4 text-sm border-white ring-1 ring-white pb-1"
              v-model="el.indicator_no"
            />

            <GridTextView
              :entrystatus="2"
              class="sm:col-span-11 px-2 text-center table-header-4 text-sm border-white ring-1 ring-white pb-1"
              v-model="el.description"
            />

            <GridTextArea
              v-model="state.remarks[el.indicator_no]"
              class="sm:col-span-4 px-2 text-center table-header-4 text-xs border-white ring-1 ring-white pb-1"
              :entrystatus="el.remarks"
              displaytext=""
            />

            <!-- Excel column headers (from first row) -->
            <GridCell
              class="sm:col-span-1 px-1 text-left table-header-4 text-xs bg-green-100 border-white ring-1 ring-white pb-1"
              :displaytext="state.header_name1"
            />
            <GridCell
              class="sm:col-span-12 px-1 text-left table-header-4 text-xs bg-green-100 border-white ring-1 ring-white pb-1"
              :displaytext="state.header_name2"
            />
            <GridCell
              class="sm:col-span-3 px-1 text-left table-header-4 text-xs bg-green-100 border-white ring-1 ring-white pb-1"
              :displaytext="state.header_name3"
            />

            <!-- Excel rows for this indicator -->
            <template
              v-for="(row, rowIndex) in (excelRowsByIndicator[el.indicator_no] ?? [])"
              :key="row.id ?? `${el.indicator_no}-${rowIndex}`"
            >
              <GridCell
                class="sm:col-span-1 px-1 text-left table-header-4 text-xs bg-green-100 border-white ring-1 ring-white pb-1"
                :entrystatus="1"
                :displaytext="row.header_value1"
              />
              <GridCell
                class="sm:col-span-12 px-1 text-left table-header-4 text-xs bg-green-100 border-white ring-1 ring-white pb-1"
                :entrystatus="1"
                :displaytext="row.header_value2"
              />
              <GridCell
                class="sm:col-span-3 px-1 text-left table-header-4 text-xs bg-green-100 border-white ring-1 ring-white pb-1"
                :entrystatus="1"
                :displaytext="row.header_value3"
              />
            </template>
          </template>

          <!-- Optional: show message if no excel indicators -->
          <template v-if="excelIndicators.length === 0">
            <GridCell
              class="sm:col-span-16 px-2 py-3 text-center text-sm text-gray-600"
              displaytext="No Excel-upload indicators available for this group."
            />
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import { reportDetailsExcelService } from '~/components/api/ReportDetailsExcelService'

const props = defineProps({
  show: Boolean,
  modalTitle: String,
  category: String,
  subcategory: String,
  group: Object,
  selected_year: [String, Number],
  selected_year_id: [String, Number],
})

 //:report_year="String(state.report_year || '')" 
 //:report_years="state.report_years">

const state = reactive({
  remarks: {},
  exceldata: [],
  header_name1: 'Value 1',
  header_name2: 'Value 2',
  header_name3: 'Value 3',
})

const excelIndicators = computed(() => {
  return (props.group?.indicator_group_elements ?? []).filter(
    (el) => el?.value_type === 'excel'
  )
})

const excelRowsByIndicator = computed(() => {
  const map = Object.create(null)
  for (const row of state.exceldata) {
    const key = row?.indicator_no
    if (key == null) continue
    if (!map[key]) map[key] = []
    map[key].push(row)
  }
  return map
})

function initializeRemarks() {
  state.remarks = {}
  for (const el of excelIndicators.value) {
    const key = el.indicator_no
    state.remarks[key] = el.remarks ?? ''
  }
}

function normalizeRows(response) {
  if (Array.isArray(response?.data)) return response.data
  if (Array.isArray(response)) return response
  return []
}

function setHeaderNamesFromFirstRow(rows) {
  const first = rows[0]
  state.header_name1 = first?.header_name1 ?? 'Value 1'
  state.header_name2 = first?.header_name2 ?? 'Value 2'
  state.header_name3 = first?.header_name3 ?? 'Value 3'
}

async function loadExcelData() {
  if (!props.group?.group_no || !props.selected_year_id) {
    state.exceldata = []
    setHeaderNamesFromFirstRow([])
    return
  }

  const params = {
    indicator_group_id: props.group.group_no,
    report_year_id: Number(props.selected_year_id),
  }

  try {
    const response = await reportDetailsExcelService.getReportExcelDetails(params)
    const rows = normalizeRows(response)
    state.exceldata = rows
    setHeaderNamesFromFirstRow(rows)
  } catch (err) {
    // Fail closed: show empty table, no spam logs
    state.exceldata = []
    setHeaderNamesFromFirstRow([])
  }
}

watch(
  () => props.show,
  async (isOpen) => {
    if (!isOpen) return
    initializeRemarks()
    await loadExcelData()
  },
  { immediate: true }
)
</script>
