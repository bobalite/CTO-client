<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
           <div class="w-full sm:max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <h2 class="text-lg font-semibold mb-4">{{ modalTitle }}</h2>



                <div
                    class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-16  border-solid border-grey border-t pb-4">

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
                                :entrystatus="1" />

                            <GridTextEntry v-model="state.female[el.indicator_no]"
                                class="sm:col-span-2 text-right border-l border-b border-grey pb-1"
                                :entrystatus="2" />

                            <GridTextEntry v-model="state.total[el.indicator_no]"
                                class="sm:col-span-2 text-right border-l border-b border-grey pb-1"
                                :entrystatus="0" />


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

<script setup>
import { computed } from 'vue'

const props = defineProps({
    show: { // true-false flag value
        type: Boolean,
        required: true,
    },
    mode: {  // 'add', 'edit', 'view' 
        type: String,
        required: false,
    },
    group: {  
        type: Object,
        required: true
    },
     category: {  
        type: String,
        required: false,
    },
     subcategory: {  
        type: String,
        required: false,
    },
})


const emit = defineEmits(['close'])

const modalTitle = 'Add Entry'


const state = reactive({

    male: [{}],
    female: [{}],
    total: [{}],
    grand_total: [{}],
    remarks: [{}],
    
})
 
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
