<template>
  <transition name="fade">
    <div v-if="props.show" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        class="w-full sm:max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <h2 class="text-lg font-semibold mb-4">{{ props.modalTitle }}</h2>

        <div
          class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-16 border-solid border-grey border-t pb-4 max-h-[80vh] overflow-y-auto">

          <!-- Header Row -->
          <GridCell
            class="sm:col-span-1 flex bg-yellow-400 justify-center text-xl text-black border-white border-l border-b pb-1"
            :displaytext="props.selected_year" />

          <GridCell
            class="sm:col-span-15 flex  bg-green-700 justify-center text-sm text-black border-white border-r pb-1"
            :displaytext="props.category" />

          <GridCell
            class="sm:col-span-1 flex bg-yellow-400 justify-center text-md text-black border-white border-l border-r border-b pb-1"
            :displaytext="'No. ' + (groupLocal?.group_no ?? '')" />

          <GridCell
            class="sm:col-span-15 flex justify-center items-left text-md text-white table-header-text border-white border-r border-b pb-1"
            :displaytext="props.subcategory" />

          <!-- Column Headers -->
          <GridCell class="sm:col-span-1 px-2 text-center table-header-4 text-xs border-white ring-1 ring-white pb-1"
            :displaytext="'TYPE'" />

          <GridCell class="sm:col-span-6 text-center table-header-4 border-white border-l border-b border-grey pb-1"
            :displaytext="'INDICATOR'" />
          <GridCell class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
            :displaytext="'MALE'" />
          <GridCell class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
            :displaytext="'FEMALE'" />
          <GridCell class="sm:col-span-2 text-center table-header-4 border-white border-l border-b border-grey pb-1"
            :displaytext="'TOTAL'" />
          <GridCell
            class="sm:col-span-3 text-center table-header-4 border-white border-l border-b border-r border-grey pb-1"
            :displaytext="'REMARKS'" />

          <!-- Data Rows -->
          <template v-if="groupLocal && groupLocal.indicator_group_elements" v-for="el in groupLocal.indicator_group_elements" :key="el.indicator_no">
            <template v-if="el.value_type !== 'excel'">
              <GridCell class="sm:col-span-1 px-2 text-left table-header-4 text-xs border-white ring-1 ring-white pb-1"
                :displaytext="el.submition_type" />

              <GridCell class="sm:col-span-6 px-1 text-left table-header-4 text-xs border-white ring-1 ring-white pb-1"
                :displaytext="el.indicator_no + ' ' + el.description" />

              <GridTextEntry v-model="state.male[el.indicator_no]"
                class="sm:col-span-2 text-right border-l border-b border-grey pb-1" :entrystatus="el.male" />

              <GridTextEntry v-model="state.female[el.indicator_no]"
                class="sm:col-span-2 text-right border-l border-b border-grey pb-1" :entrystatus="el.female" />

              <GridTextEntry v-model="state.total[el.indicator_no]"
                class="sm:col-span-2 text-right border-l border-b border-grey pb-1" :entrystatus="el.total" />

              <GridTextArea v-model="state.remarks[el.indicator_no]"
                class="sm:col-span-3 px-1 table-header-4 text-center text-xs border-l border-b border-grey pb-1"
                :entrystatus="el.remarks" :displaytext="''" />
            </template>

            <template v-else>
              <GridCell class="sm:col-span-1 px-2 text-left table-header-4 text-xs border-white ring-1 ring-white pb-1"
                :displaytext="el.submition_type" />

              <GridCell class="sm:col-span-6 px-1 text-left table-header-4 text-xl border-white ring-1 ring-white pb-1"
                :displaytext="el.indicator_no + ' ' + el.description" />

              <!-- Excel upload component; emits "excel-loaded" with { indicator_no, rows } -->
              <FormExelUpload
                :displaytext="el.indicator_no + ' ' + el.description"
                :indicatorNo="el.indicator_no"
                v-if="el.value_type === 'excel'"
                @excel-loaded="handleExcelData"
                class="sm:col-span-6 px-1 table-header-4 text-center text-xs border-l border-t-4 border-b border-grey pb-1"
              />

              <GridTextArea v-model="state.remarks[el.indicator_no]"
                class="sm:col-span-3 px-1 table-header-4 text-center text-xs border-l border-b border-grey pb-1"
                :entrystatus="el.remarks" :displaytext="''" />
            </template>
          </template>

          <GridCell
            class="sm:col-span-16 flex  bg-green-700 justify-center text-sm text-black border-white border-r pb-1" />
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 flex justify-end gap-2">
          <button class="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300" @click="emitClose">
            Cancel
          </button>

          <button @click="computeTotals" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Compute Totals
          </button>

          <button v-if="props.mode === 'add'" class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-500"
            @click="saveIndicators">
            Save Indicator Data
          </button>
        </div>
      </div>
    </div>
  </transition>

  <transition name="fade">
    <div v-if="isSaving" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]">
      <div class="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center gap-3 text-center">
        <svg class="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <p class="text-lg font-semibold text-gray-700">Saving data...</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
/* eslint-disable no-console */
import { reactive, ref, onMounted, watch, toRaw } from 'vue'
import { reportDetailsService } from '~/components/api/ReportDetailsService';
import { reportDetailsExcelService } from '~/components/api/ReportDetailsExcelService';

// --- emits & props ---
const emit = defineEmits(['close'])
const props = defineProps({
  show: Boolean,
  mode: String,
  modalTitle: String,
  category: String,
  subcategory: String,
  group: Object,
  selected_year: [String, Number],
  selected_year_id: [String, Number],
})

// --- reactive state ---
const isSaving = ref(false)
const groupLocal = ref(null) // local copy/reference
const excelUploads = reactive({}) // keyed by indicator_no

const state = reactive({
  male: {},
  female: {},
  total: {},
  remarks: {},
})

// ---------- Initialize state from group ----------
function initStateFromGroup(g) {
  groupLocal.value = g || null
  state.male = {}
  state.female = {}
  state.total = {}
  state.remarks = {}

  if (!g || !Array.isArray(g.indicator_group_elements)) return

  g.indicator_group_elements.forEach(el => {
    const id = el.indicator_no
    if (!id) return
    state.male[id] = Number(el.male_value ?? el.default_male ?? 0)
    state.female[id] = Number(el.female_value ?? el.default_female ?? 0)
    state.total[id] = Number(el.total_value ?? el.default_total ?? 0)
    state.remarks[id] = el.remarks ?? ''
    if (excelUploads[id]) delete excelUploads[id]
  })
}

// ---------- Lifecycle ----------
onMounted(() => {
  if (props.group) initStateFromGroup(props.group)
  if (props.show) get_group_details()
})

watch(() => props.show, (newVal) => { if (newVal) get_group_details() })
watch(() => props.group, (newGroup) => initStateFromGroup(newGroup))

// ---------- Fetch group details ----------
async function get_group_details() {
  try {
    const g = props.group
    if (!g) return
    initStateFromGroup(g)

    const params = {
      indicator_group_id: g.group_no ?? g.id ?? null,
      report_year: Number(props.selected_year),
      report_year_id: Number(props.selected_year_id),
    }

    const response = await reportDetailsService.getReportDetails(params)
    if (response?.data && Array.isArray(response.data)) {
      response.data.forEach(item => {
        const id = item.indicator_no
        if (!id) return
        state.male[id] = Number(item.male ?? state.male[id] ?? 0)
        state.female[id] = Number(item.female ?? state.female[id] ?? 0)
        state.total[id] = Number(item.total ?? state.total[id] ?? 0)
        state.remarks[id] = item.remarks ?? state.remarks[id] ?? ''
      })
    }
  } catch (err) {
    console.error('Error fetching group details:', err)
  }
}

// ---------- Handle Excel upload ----------
function handleExcelData(payload) {
  if (!payload || !payload.indicator_no) return
  excelUploads[payload.indicator_no] = payload.rows || []
  console.log('Excel uploaded for', payload.indicator_no, payload.rows)
}

// ---------- Compute totals ----------
function computeTotals() {
  const elems = groupLocal.value?.indicator_group_elements || []
  if (!elems.length) return

  elems.forEach(el => {
    const id = el.indicator_no
    if (!id) return
    const totalStatus = Number(el.total ?? el.total_status ?? 0)
    const maleStatus = Number(el.male ?? 1)
    const femaleStatus = Number(el.female ?? 1)

    if (el.value_type !== 'excel' && el.summed_from === 'na' && totalStatus === 2) {
      if (maleStatus === 0 && femaleStatus === 0) state.total[id] = 0
      else state.total[id] = (Number(state.male[id]) || 0) + (Number(state.female[id]) || 0)
    }
  })

  const maleMap = { ...toRaw(state.male) }
  const femaleMap = { ...toRaw(state.female) }
  const totalMap = { ...toRaw(state.total) }

  elems.forEach(el => {
    const id = el.indicator_no
    if (!id || !el.summed_from || el.summed_from === 'na') return

    const refs = el.summed_from.split(';').map(r => r.trim()).filter(Boolean)
    if (!refs.length) return

    if (el.value_type === 'sum') {
      state.male[id] = refs.reduce((a, r) => a + (Number(maleMap[r]) || 0), 0)
      state.female[id] = refs.reduce((a, r) => a + (Number(femaleMap[r]) || 0), 0)
      state.total[id] = refs.reduce((a, r) => a + (Number(totalMap[r]) || 0), 0)
    } else if (['percentage', 'ratio', 'rate'].includes(el.value_type)) {
      const ref1 = refs[0], ref2 = refs[1] ?? refs[0]
      const divisor = Number(el.divisor) || 1
      const maleDen = Number(maleMap[ref2]) || 0
      const femaleDen = Number(femaleMap[ref2]) || 0
      const totalDen = Number(totalMap[ref2]) || 0

      state.male[id] = maleDen ? Number((((Number(maleMap[ref1]) || 0) / maleDen) * divisor).toFixed(2)) : 0
      state.female[id] = femaleDen ? Number((((Number(femaleMap[ref1]) || 0) / femaleDen) * divisor).toFixed(2)) : 0
      state.total[id] = totalDen ? Number((((Number(totalMap[ref1]) || 0) / totalDen) * divisor).toFixed(2)) : 0
    }
  })
}

// ---------- Save indicators ----------
async function saveIndicators() {
  if (!groupLocal.value) { alert('No group to save.'); return }
  isSaving.value = true
  const reportYearId = Number(props.selected_year_id)
  let successCount = 0, errorCount = 0
  const existingRecords = []

  try {
    // 1️⃣ Save normal indicators
    for (const el of groupLocal.value.indicator_group_elements) {
      if (!el || !el.indicator_no || el.value_type === 'excel') continue
      const id = el.indicator_no
      const params = {
        indicator_no: id,
        male: Number(state.male[id]) || 0,
        female: Number(state.female[id]) || 0,
        total: Number(state.total[id]) || 0,
        remarks: state.remarks[id] || '',
        indicator_group_element_id: el.id,
        indicator_group_id: groupLocal.value.id,
        report_year_id: reportYearId,
        report_year: props.selected_year,
        is_active: 1,
      }

      try {
        const res = await reportDetailsService.createReportDetails(params)
        if (res?.exists && res?.existing_id) existingRecords.push({ id: res.existing_id, params })
        else successCount++
      } catch (err) { console.error('Error saving row', id, err); errorCount++ }
    }

    // 2️⃣ Bulk save Excel rows
    const bulkRows = []
    for (const el of groupLocal.value.indicator_group_elements) {
      if (!el || !el.indicator_no || el.value_type !== 'excel') continue
      const id = el.indicator_no
      const rows = excelUploads[id] || []
      if (!rows.length) continue

      rows.forEach(r => {
        const keys = Object.keys(r)
        bulkRows.push({
          report_year_id: reportYearId,
          indicator_no: String(id),
          indicator_group_element_id: el.id,
          indicator_group_id: groupLocal.value.id,
          header_name1: keys[0] ?? '',
          header_value1: Number(r[keys[0]]) || 0,
          header_name2: keys[1] ?? '',
          header_value2: String(r[keys[1]]) || '',
          header_name3: keys[2] ?? '',
          header_value3: Number(r[keys[2]]) || 0,
          is_active: 1,
          report_year: props.selected_year,
        })
      })
    }

    if (bulkRows.length) {
      try {
        await reportDetailsExcelService.saveExcelRows({ rows: bulkRows })
        successCount += bulkRows.length
      } catch (err) {
        console.error('Error saving Excel rows in bulk', err)
        errorCount += bulkRows.length
      }
    }

    // 3️⃣ Update existing normal rows if needed
    if (existingRecords.length > 0) {
      const confirmUpdate = confirm(`${existingRecords.length} record(s) already exist. Update them?`)
      if (confirmUpdate) {
        for (const item of existingRecords) {
          try { await reportDetailsService.updateReportDetails(item.params, item.id); successCount++ }
          catch (err) { console.error('Error updating existing record', item.id, err); errorCount++ }
        }
      }
    }

    alert(`Done: ${successCount} saved, ${errorCount} errors.`)
    emit('close')
  } catch (err) {
    console.error('Unexpected save error', err)
    alert('Unexpected error while saving.')
  } finally {
    isSaving.value = false
  }
}

// ---------- Emit close ----------
function emitClose() { emit('close') }
</script>
