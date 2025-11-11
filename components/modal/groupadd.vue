<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        class="w-full sm:max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <h2 class="text-lg font-semibold mb-4">{{ modalTitle }}</h2>

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
            Cancel
          </button>

          <button @click="computeTotals" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Compute Totals
          </button>

          <button v-if="mode === 'add'" class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-500"
            @click="saveIndicators">
            Save Indicator Data
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { reactive } from 'vue'


 //state.selected_year_id = state.selected_year_id
 //   state.selected_year 

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

// --- Compute Function ---
const computeTotals = () => {
  // 1️⃣ Horizontal compute (row-level totals)
  props.group.indicator_group_elements.forEach(el => {
    const id = el.indicator_no
    const maleStatus = Number(el.male) ?? 1
    const femaleStatus = Number(el.female) ?? 1
    const totalStatus = Number(el.total) ?? 1

    // ✅ Skip horizontal compute if both male & female are disabled (status 0)


    if (el.summed_from == 'na' && !(maleStatus === 0 && femaleStatus === 0 ) && totalStatus === 2) {
      const male = Number(state.male[id]) || 0
      const female = Number(state.female[id]) || 0
      state.total[id] = male + female
    }else if(el.summed_from == 'na' && !(maleStatus === 1 && femaleStatus === 1 ) && totalStatus === 2){
      const male = Number(state.male[id]) || 0
      const female = Number(state.female[id]) || 0
      state.total[id] = male + female
    }
  }) // end Horizontal compute (row-level totals)

  
  
  
  //2️⃣ Vertical compute (summed_from)

  
  props.group.indicator_group_elements.forEach(el => {

    if (el.value_type === 'sum' && el.summed_from !== 'na') 
     {
      // Vertical SUM
      const refs = el.summed_from.split(';').map(r => r.trim())
      let maleSum = 0
      let femaleSum = 0
      let totalSum = 0

      refs.forEach(refNo => {
        maleSum += Number(state.male[refNo]) || 0
        femaleSum += Number(state.female[refNo]) || 0
        totalSum += Number(state.total[refNo]) || 0
      })

      state.male[el.indicator_no] = maleSum
      state.female[el.indicator_no] = femaleSum
      state.total[el.indicator_no] = totalSum

    }

    else if (el.value_type === 'percentage' && el.summed_from !== 'na') 
    {
      // Vertical PERCENTAGE
      const [ref1, ref2] = el.summed_from.split(';').map(r => r.trim())
      const divisor = Number(el.divisor) || 1


      const maleDen = Number(state.male[ref2]) || 0
      const femaleDen = Number(state.female[ref2]) || 0
      const totalDen = Number(state.total[ref2]) || 0

      state.male[el.indicator_no] =
        maleDen
          ? Number((((Number(state.male[ref1]) || 0) / maleDen) * divisor).toFixed(2))
          : 0

      state.female[el.indicator_no] =
        femaleDen
          ? Number((((Number(state.female[ref1]) || 0) / femaleDen) * divisor).toFixed(2))
          : 0

      state.total[el.indicator_no] =
        totalDen
          ? Number((((Number(state.total[ref1]) || 0) / totalDen) * divisor).toFixed(2))
          : 0
    } 
    
    else if (el.value_type === 'ratio' && el.summed_from !== 'na') 
    {
      // Vertical PERCENTAGE
      const [ref1, ref2] = el.summed_from.split(';').map(r => r.trim())
      const divisor = Number(el.divisor) || 1


      const maleDen = Number(state.male[ref2]) || 0
      const femaleDen = Number(state.female[ref2]) || 0
      const totalDen = Number(state.total[ref2]) || 0

      state.male[el.indicator_no] =
        maleDen
          ? Number((((Number(state.male[ref1]) || 0) / maleDen) * divisor).toFixed(2))
          : 0

      state.female[el.indicator_no] =
        femaleDen
          ? Number((((Number(state.female[ref1]) || 0) / femaleDen) * divisor).toFixed(2))
          : 0

      state.total[el.indicator_no] =
        totalDen
          ? Number((((Number(state.total[ref1]) || 0) / totalDen) * divisor).toFixed(2))
          : 0
    } 

    else if (el.value_type === 'rate' && el.summed_from !== 'na') 
    {
      // Vertical PERCENTAGE
      const [ref1, ref2] = el.summed_from.split(';').map(r => r.trim())
      const divisor = Number(el.divisor) || 1


      const maleDen = Number(state.male[ref2]) || 0
      const femaleDen = Number(state.female[ref2]) || 0
      const totalDen = Number(state.total[ref2]) || 0

      state.male[el.indicator_no] =
        maleDen
          ? Number((((Number(state.male[ref1]) || 0) / maleDen) * divisor).toFixed(2))
          : 0

      state.female[el.indicator_no] =
        femaleDen
          ? Number((((Number(state.female[ref1]) || 0) / femaleDen) * divisor).toFixed(2))
          : 0

      state.total[el.indicator_no] =
        totalDen
          ? Number((((Number(state.total[ref1]) || 0) / totalDen) * divisor).toFixed(2))
          : 0
    }

  })
}


const saveIndicators = async () => {
  try {
    // 🧠 Always ensure report_year_id is a Number
    const reportYearId = Number(props.selected_year_id)

    const payload = props.group.indicator_group_elements.map(el => ({
      indicator_no: el.indicator_no,
      male: Number(state.male[el.indicator_no]) || 0,
      female: Number(state.female[el.indicator_no]) || 0,
      total: Number(state.total[el.indicator_no]) || 0,
      remarks: state.remarks[el.indicator_no] || '',
      indicator_group_element_id: el.id,
      indicator_group_id: props.group.id,
      report_year_id: reportYearId,   // ✅ numeric, clean for Laravel
      is_active: true,
      created_by: 1, // TODO: replace with logged-in user ID
      updated_by: 1,
    }))

    console.log('Payload to be saved:', payload)

    // Example call to backend repo:
     await ReportDetailRepository.createReportDetails(payload)

  } catch (error) {
    console.error('Error saving indicators:', error)
  }
}
</script>

