<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
           <div class="w-full sm:max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <h2 class="text-lg font-semibold mb-4">{{ modalTitle }}</h2>



                <div
                    class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-16  border-solid border-grey border-t pb-4 max-h-[80vh] overflow-y-auto">

                    <GridCell
                        class="sm:col-span-16 flex rounded-t-lg bg-green-700 justify-center text-sm text-black  rounded-left border-white  border-l  pb-1"
                        :displaytext=props.category />

                    <GridCell
                        class="sm:col-span-1 flex bg-yellow-400 justify-center text-xl text-black   border-white  border-l border-r border-b pb-1"
                        :displaytext=props.group.group_no />

                    <GridCell
                        class="sm:col-span-15 flex justify-center items-left text-md text-white table-header-text  border-white  border-r border-b pb-1"
                        :displaytext="props.subcategory" />

                   
                    <GridCell
                        class="sm:col-span-6 text-center table-header-4 border-white border-l border-b border-grey pb-1"
                        :displaytext="'INDICATOR'" />
                    <GridCell
                        class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
                        :displaytext="'MALE'" />
                    <GridCell
                        class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
                        :displaytext="'FEMALE'" />
                    <GridCell
                        class="sm:col-span-2 text-center table-header-4 border-white  border-l border-b border-grey pb-1"
                        :displaytext="'TOTAL'" />

                    <GridCell
                        class="sm:col-span-4 text-center table-header-4 border-white border-l border-b border-r border-grey pb-1"
                        :displaytext="'REMARKS'" />


                        <template v-for="el in group.indicator_group_elements">

                            <GridCell
                                class="sm:col-span-1 px-2 text-left table-header-4 text-xs border-white ring-1 ring-white  pb-1"
                                :displaytext=el.indicator_no />

                            <GridCell
                                class="sm:col-span-5 px-1 text-left table-header-4 text-xs border-white ring-1 ring-white  pb-1"
                                :displaytext=el.description />

                            <GridTextEntry v-model="state.male[el.indicator_no]"
                                class="sm:col-span-2 text-right border-l border-b border-grey pb-1"
                                :entrystatus="el.male" />

                            <GridTextEntry v-model="state.female[el.indicator_no]"
                                class="sm:col-span-2 text-right border-l border-b border-grey pb-1"
                                :entrystatus="el.female" />

                            <GridTextEntry v-model="state.total[el.indicator_no]"
                                class="sm:col-span-2 text-right border-l border-b border-grey pb-1"
                                :entrystatus="el.total" />


                            <GridTextArea v-model="state.remarks[el.indicator_no]"
                                class="sm:col-span-4 px-1 table-header-4 text-center text-xs border-l  border-b border-grey pb-1"
                                :entrystatus="el.remarks"
                                :displaytext="''" />

                        </template>

                </div>
              

                <div class="mt-6 flex justify-end gap-2">
                    <button class="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300" @click="$emit('close')">
                        Close
                    </button>

                    <!-- Add Entry button -->
                    <button v-if="mode === 'add'"
                        class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-500">
                        Add New Element
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

interface IndicatorElement {
  indicator_no: string
  description?: string
  value_type: 'count' | 'rate_nocalc' | 'sum' | 'percentage'
  summed_from?: string
  divisor?: string | number
  male?: number
  female?: number
  total?: number
  remarks?: string
}

interface IndicatorGroup {
  group_no: string
  indicator_group_elements: IndicatorElement[]
}

const props = defineProps<{
  show: boolean
  mode?: string
  group: IndicatorGroup
  category?: string
  subcategory?: string
}>()

const emit = defineEmits(['close'])
const modalTitle = 'Add Entry'

const state = reactive<{
  male: Record<string, number>
  female: Record<string, number>
  total: Record<string, number>
  remarks: Record<string, string>
}>({
  male: {},
  female: {},
  total: {},
  remarks: {},
})

// ✅ Initialize state defaults
watch(
  () => props.group,
  (group) => {
    if (!group || !group.indicator_group_elements) return
    group.indicator_group_elements.forEach((el) => {
      const key = el.indicator_no
      state.male[key] = state.male[key] ?? 0
      state.female[key] = state.female[key] ?? 0
      state.total[key] = state.total[key] ?? 0
      state.remarks[key] = state.remarks[key] ?? ''
    })
  },
  { immediate: true }
)

// ✅ Compute totals dynamically
let computeTimer: ReturnType<typeof setTimeout> | null = null

watch(
  () => [state.male, state.female],
  () => {
    if (computeTimer) clearTimeout(computeTimer)
    computeTimer = setTimeout(() => {
      props.group.indicator_group_elements.forEach((el) => {
        const key = el.indicator_no
        const vt = el.value_type

        if (vt === 'count') {
          // total = male + female
          const male = Number(state.male[key]) || 0
          const female = Number(state.female[key]) || 0
          state.total[key] = male + female
        }

        if (vt === 'sum' && el.summed_from) {
          const refs = el.summed_from
            .split(';')
            .map((r) => r.trim())
            .filter(Boolean)

          const sumMale = refs.reduce((acc, ref) => acc + (Number(state.male[ref]) || 0), 0)
          const sumFemale = refs.reduce((acc, ref) => acc + (Number(state.female[ref]) || 0), 0)
          const sumTotal = refs.reduce((acc, ref) => acc + (Number(state.total[ref]) || 0), 0)

          state.male[key] = sumMale
          state.female[key] = sumFemale
          state.total[key] = sumTotal
        }

        if (vt === 'percentage' && el.summed_from) {
          const refs = el.summed_from
            .split(';')
            .map((r) => r.trim())
            .filter(Boolean)

          if (refs.length >= 2) {
            const numeratorKey = refs[0]
            const denominatorKey = refs[1]
            const divisor = Number(el.divisor) || 100

            // 🧮 Compute percentage for male
            const numMale = Number(state.male[numeratorKey]) || 0
            const denMale = Number(state.male[denominatorKey]) || 0
            state.male[key] =
              denMale !== 0 ? parseFloat(((numMale / denMale) * divisor).toFixed(2)) : 0

            // 🧮 Compute percentage for female
            const numFemale = Number(state.female[numeratorKey]) || 0
            const denFemale = Number(state.female[denominatorKey]) || 0
            state.female[key] =
              denFemale !== 0 ? parseFloat(((numFemale / denFemale) * divisor).toFixed(2)) : 0

            // 🧮 Compute percentage for total
            const numTotal = Number(state.total[numeratorKey]) || 0
            const denTotal = Number(state.total[denominatorKey]) || 0
            state.total[key] =
              denTotal !== 0 ? parseFloat(((numTotal / denTotal) * divisor).toFixed(2)) : 0
          }
        }
      })
    }, 100)
  },
  { deep: true }
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>