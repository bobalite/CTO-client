<template>
    <div class="flex justify-between items-center mt-4">
        <div class="inline-block w-1/4">
            <div class="flex items-center gap-1 text-sm ">
                <!-- Previous -->
                <button @click="() => handleClick(2)" :class="[
                    'flex items-center justify-center bg-green-700 rounded hover:bg-green-900 transition h-full px-2 py-2',
                    isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''
                ]" :disabled="isPrevDisabled">
                    <ChevronLeftIcon class="h-6 w-3 text-white" aria-hidden="true" />
                </button>

                <!-- Current -->
                <div
                    class="min-w-[12rem] px-4 py-2 bg-white shadow border text-center font-semibold flex items-center justify-center whitespace-nowrap text-md">
                    {{ currentLabel }}
                </div>

                <!-- Next -->
                <button @click="() => handleClick(1)" :class="[
                    'flex items-center justify-center bg-green-700 rounded hover:bg-green-900 transition h-full px-2 py-2',
                    isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''
                ]" :disabled="isNextDisabled">
                    <ChevronRightIcon class="h-6 w-3 text-white" aria-hidden="true" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'

// Props
const props = defineProps({
    options: {
        type: Array,
        required: true
    },
    modelValue: {
        type: Number,
        required: true
    },
    // optional: pass your existing function (change_selected_year)
    changeSelectedYear: {
        type: Function,
        required: false
    }
})

// Emits for v-model fallback
const emit = defineEmits(['update:modelValue'])

const currentLabel = computed(() => {
    try {
         return props.options.find(item => item.value === props.modelValue)?.label || 'Select Quarter'
        
    } catch (error) {
     return 'Select Quarter'   
    }
   
})

const isPrevDisabled = computed(() => props.modelValue <= 1)
const isNextDisabled = computed(() => props.modelValue >= props.options.length)

// When user clicks a chevron
function handleClick(opt) {
    if (props.changeSelectedYear && typeof props.changeSelectedYear === 'function') {
        // call the parent's function you provided
        props.changeSelectedYear(opt)
    } else {
        // fallback: update modelValue via v-model
        let newVal = props.modelValue
        if (opt === 1 && props.modelValue < props.options.length) newVal++
        if (opt === 2 && props.modelValue > 1) newVal--
        emit('update:modelValue', newVal)
    }
}
</script>
