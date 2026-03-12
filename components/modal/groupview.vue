<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        class="w-full sm:max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative"
      >
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          ×
        </button>

        <h2 class="text-lg font-semibold mb-4">{{ props.modalTitle }}  i am group View</h2>

        <div
          class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-16 border-solid border-grey border-t pb-4 max-h-[80vh] overflow-y-auto"
        >
          <!-- Header Row -->
          <GridCell
            class="sm:col-span-1 flex bg-yellow-400 justify-center text-xl text-black border-white border-l border-b pb-1"
            :displaytext="props.selected_year"
          />

          <GridCell
            class="sm:col-span-15 flex bg-green-700 justify-center text-sm text-black border-white border-r pb-1"
            :displaytext="props.category"
          />

          <GridCell
            class="sm:col-span-1 flex bg-yellow-400 justify-center text-xl text-black border-white border-l border-r border-b pb-1"
            :displaytext="String(props.group?.group_no ?? '')"
          />

          <GridCell
            class="sm:col-span-15 flex justify-center items-left text-md text-white table-header-text border-white border-r border-b pb-1"
            :displaytext="props.subcategory"
          />

          <!-- Normal Mode Header -->
          <template v-if="groupMode === 'normal'">
            <GridCellView
              class="sm:col-span-6 text-center table-header-4 border-white border-l border-b border-grey pb-1"
              displaytext="INDICATOR"
            />
            <GridCellView
              class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
              displaytext="MALE"
            />
            <GridCellView
              class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
              displaytext="FEMALE"
            />
            <GridCellView
              class="sm:col-span-2 text-center table-header-4 border-white border-l border-b border-grey pb-1"
              displaytext="TOTAL"
            />
            <GridCellView
              class="sm:col-span-4 text-center table-header-4 border-white border-l border-b border-r border-grey pb-1"
              displaytext="REMARKS"
            />
          </template>

          <!-- Excel Mode Header -->
          <template v-else-if="groupMode === 'excel'">
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
          </template>

          <!-- Data Rows -->
          <template v-for="el in props.group?.indicator_group_elements || []" :key="el.indicator_no">
            <!-- Normal row -->
            <template v-if="el.value_type !== 'excel'">
              <GridCell
                class="sm:col-span-1 px-2 text-left table-header-4 text-xs border-white ring-1 ring-white pb-1"
                :displaytext="el.indicator_no"
              />

              <GridCell
                class="sm:col-span-5 px-1 text-left table-header-4 text-xs border-white ring-1 ring-white pb-1"
                :displaytext="el.description"
              />

              <GridTextView
                v-model="state.male[el.indicator_no]"
                class="sm:col-span-2 text-right border-l border-b border-grey pb-1"
                :entrystatus="el.male"
              />

              <GridTextView
                v-model="state.female[el.indicator_no]"
                class="sm:col-span-2 text-right border-l border-b border-grey pb-1"
                :entrystatus="el.female"
              />

              <GridTextView
                v-model="state.total[el.indicator_no]"
                class="sm:col-span-2 text-right border-l border-b border-grey pb-1"
                :entrystatus="el.total"
              />

              <GridTextArea
                v-model="state.remarks[el.indicator_no]"
                class="sm:col-span-4 px-1 table-header-4 text-center text-xs border-l border-b border-grey pb-1"
                :entrystatus="el.remarks"
                displaytext=""
              />
            </template>

            <!-- Excel row -->
            <template v-else>
              <!-- Main indicator line -->
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

              <!-- Excel header line -->
              <GridCell
                class="sm:col-span-1 px-1 text-left table-header-4 text-xs bg-green-100 border-white ring-1 ring-white pb-1"
                :displaytext="state.header_name1 || ''"
              />

              <GridCell
                class="sm:col-span-12 px-1 text-left table-header-4 text-xs bg-green-100 border-white ring-1 ring-white pb-1"
                :displaytext="state.header_name2 || ''"
              />

              <GridCell
                class="sm:col-span-3 px-1 text-left table-header-4 text-xs bg-green-100 border-white ring-1 ring-white pb-1"
                :displaytext="state.header_name3 || ''"
              />

              <!-- Excel rows -->
              <template
                v-for="(row, rowIndex) in getExcelRows(el.indicator_no)"
                :key="row.id || `${el.indicator_no}-${rowIndex}`"
              >
                <GridCell
                  class="sm:col-span-1 px-1 text-left table-header-4 text-xs bg-green-100 border-white ring-1 ring-white pb-1"
                  :displaytext="row.header_value1"
                />

                <GridCell
                  class="sm:col-span-12 px-1 text-left table-header-4 text-xs bg-green-100 border-white ring-1 ring-white pb-1"
                  :displaytext="row.header_value2"
                />

                <GridCell
                  class="sm:col-span-3 px-1 text-left table-header-4 text-xs bg-green-100 border-white ring-1 ring-white pb-1"
                  :displaytext="row.header_value3"
                />
              </template>
            </template>
          </template>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <button class="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300" @click="$emit('close')">
            Close
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { reactive, onMounted, watch, computed } from 'vue'
import { reportDetailsService } from '~/components/api/ReportDetailsService'
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

const state = reactive({
  male: {},
  female: {},
  total: {},
  remarks: {},

  exceldata: [],
  header_name1: '',
  header_name2: '',
  header_name3: '',
  submission_type: '',
})

const groupMode = computed(() => {
  if (!props.group || !props.group.indicator_group_elements) return 'normal'

  const allExcel = props.group.indicator_group_elements.every((el) => el.value_type === 'excel')
  const noneExcel = props.group.indicator_group_elements.every((el) => el.value_type !== 'excel')

  if (allExcel) return 'excel'
  if (noneExcel) return 'normal'
  return 'mixed'
})

function isOpenOrAnnual(submissionType) {
  const s = String(submissionType ?? '').trim().toLowerCase()
  return s === 'open' || s === 'annual'
}

function initializeState() {
  if (!props.group) return

  state.male = {}
  state.female = {}
  state.total = {}
  state.remarks = {}
  state.exceldata = []
  state.header_name1 = ''
  state.header_name2 = ''
  state.header_name3 = ''

  props.group.indicator_group_elements.forEach((el) => {
    const key = el.indicator_no
    state.male[key] = el.male_value ?? 0
    state.female[key] = el.female_value ?? 0
    state.total[key] = el.total_value ?? 0
    state.remarks[key] = '--'
  })

  state.submission_type = props.group?.indicator_group_elements?.[0]?.submition_type || ''
}

async function get_group_details() {
  try {
    if (!props.group) return

    const params = {
      // ✅ use DB primary key, not group_no
      indicator_group_id: props.group.id ?? null,
      report_year: Number(props.selected_year),
      report_year_id: Number(props.selected_year_id),
    }

    if (isOpenOrAnnual(state.submission_type)) {
      delete params.report_year_id
    }

    console.log('Loading report details with params', params)

    const response = await reportDetailsService.getReportDetails(params)
    console.log('response reportDetailsService', response)

    if (response?.data && Array.isArray(response.data)) {
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
    console.error('Error fetching report detail:', err)
  }
}

async function getexceldata() {
  try {
    if (!props.group) return

    const params = {
      // ✅ use DB primary key, not group_no
      indicator_group_id: props.group.id ?? null,
      report_year: Number(props.selected_year),
    }

    // ✅ quarterly gets report_year_id, open/annual does not
    if (!isOpenOrAnnual(state.submission_type)) {
      params.report_year_id = Number(props.selected_year_id)
    }

    console.log('Fetching excel data with params', params)

    const response = await reportDetailsExcelService.getReportExcelDetails(params)
    console.log('response reportDetailsExcelService', response)

    const rows = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response)
        ? response
        : []

    state.exceldata = rows

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

    console.log('state.exceldata', state.exceldata)
    console.log('header names', state.header_name1, state.header_name2, state.header_name3)
  } catch (err) {
    console.error('Error fetching report detail excel:', err)
  }
}

function getExcelRows(indicatorNo) {
  return state.exceldata.filter((row) => row.indicator_no === indicatorNo)
}

onMounted(async () => {
  if (props.show) {
    initializeState()
    await get_group_details()
    await getexceldata()
  }
})

watch(
  () => props.show,
  async (isOpen) => {
    if (isOpen) {
      initializeState()
      await get_group_details()
      await getexceldata()
    }
  }
)

watch(
  () => props.group,
  async () => {
    if (props.show) {
      initializeState()
      await get_group_details()
      await getexceldata()
    }
  },
  { deep: true }
)
</script>