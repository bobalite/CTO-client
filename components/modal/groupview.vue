<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        class="w-full sm:max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <h2 class="text-lg font-semibold mb-4">{{ props.modalTitle }}</h2>

        <div
          class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-16 border-solid border-grey border-t pb-4 max-h-[80vh] overflow-y-auto">
          <!-- Header Row -->
          
          <GridCell
            class="sm:col-span-1 flex bg-yellow-400  justify-center text-xl text-black border-white border-l border-b pb-1"
            :displaytext="props.selected_year" />
          
            <GridCell
            class="sm:col-span-15 flex  bg-green-700 justify-center text-sm text-black border-white border-r pb-1"
            :displaytext="category" />

          <GridCell
            class="sm:col-span-1 flex bg-yellow-400 justify-center text-xl text-black border-white border-l border-r border-b pb-1"
            :displaytext="group.group_no" />

          <GridCell
            class="sm:col-span-15 flex justify-center items-left text-md text-white table-header-text border-white border-r border-b pb-1"
            :displaytext="subcategory" />

          <!-- Column Headers -->
          <GridCell class="sm:col-span-6 text-center table-header-4 border-white border-l border-b border-grey pb-1"
            :displaytext="'INDICATOR'" />
          <GridCell class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
            :displaytext="'MALE'" />
          <GridCell class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
            :displaytext="'FEMALE'" />
          <GridCell class="sm:col-span-2 text-center table-header-4 border-white border-l border-b border-grey pb-1"
            :displaytext="'TOTAL'" />
          <GridCell
            class="sm:col-span-4 text-center table-header-4 border-white border-l border-b border-r border-grey pb-1"
            :displaytext="'REMARKS'" />

          <!-- Data Rows -->
          <template v-for="el in group.indicator_group_elements" :key="el.indicator_no">
            <GridCell class="sm:col-span-1 px-2 text-left table-header-4 text-xs border-white ring-1 ring-white pb-1"
              :displaytext="el.indicator_no" />
            <GridCell class="sm:col-span-5 px-1 text-left table-header-4 text-xs border-white ring-1 ring-white pb-1"
              :displaytext="el.description" />

            <GridTextEntry v-model="state.male[el.indicator_no]"
              class="sm:col-span-2 text-right border-l border-b border-grey pb-1" :entrystatus="el.male" />

            <GridTextEntry v-model="state.female[el.indicator_no]"
              class="sm:col-span-2 text-right border-l border-b border-grey pb-1" :entrystatus="el.female" />

            <GridTextEntry v-model="state.total[el.indicator_no]"
              class="sm:col-span-2 text-right border-l border-b border-grey pb-1" :entrystatus="el.total" />

            <GridTextArea v-model="state.remarks[el.indicator_no]"
              class="sm:col-span-4 px-1 table-header-4 text-center text-xs border-l border-b border-grey pb-1"
              :entrystatus="el.remarks" :displaytext="''" />
          </template>
        </div>

        <!-- Action Buttons -->
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
import { reactive } from 'vue'
import { reportDetailsService } from '~/components/api/ReportDetailsService';

const props = defineProps({
  show: Boolean,
  mode: String,
  modalTitle: String,
  category: String,
  subcategory: String,
  group: Object,
  selected_year: [String, Number],
  selected_year_id: [String, Number], // ✅ flexible, but we'll coerce to Number later
})

onMounted(() => {
  if (props.show) {
    get_group_details()
  }
})

watch(() => props.show, (newVal) => {
  if (newVal) get_group_details()
})


// --- Local reactive state ---
const state = reactive({
  male: {},
  female: {},
  total: {},
  remarks: {},
})

// Initialize state
if (props.group?.indicator_group_elements) {
  props.group.indicator_group_elements.forEach(el => {
    state.male[el.indicator_no] = el.male_value ?? 0
    state.female[el.indicator_no] = el.female_value ?? 0
    state.total[el.indicator_no] = el.total_value ?? 0
    state.remarks[el.indicator_no] = el.remarks ?? ''
  })
}

async function get_group_details() {
  try {
    const group = props.group

    const params = {
      indicator_group_id: group.group_no ?? null, // dynamic group number
      report_year: Number(props.selected_year),
    }

    console.log('Fetching with params:', params)

    const response = await reportDetailsService.getReportDetails(params)
    console.log('Response:', response)

    if (response.data && Array.isArray(response.data)) {
      response.data.forEach((item) => {
        const indicatorNo = item.indicator_no
        if (!indicatorNo) return

        state.male[indicatorNo] = item.male ?? 0
        state.female[indicatorNo] = item.female ?? 0
        state.total[indicatorNo] = item.total ?? 0
        state.remarks[indicatorNo] = item.remarks ?? ''
      })
    }
  } catch (error) {
    console.error('Error fetching rights entry config:', error)
  }
}

// async function get_group_details() {
//     try {

//         const group = props.group

//         //indicator_group_id
//         //report_year

       
//         const group_id_detail = group.group_no ? group.group_no : null      
//           let params = {
//             indicator_group_id: 6,
//             report_year: Number(props.selected_year),
//         }

//         console.log('group no:', group_id_detail)
//         console.log('params no:', params)
//         const response = await reportDetailsService.getReportDetails(params)
//         console.log('response', response)

//         if (response.data) {
        
//         }
//     } catch (error) {
//         console.error('Error fetching rights entry config:', error)
//     }
// }






</script>

