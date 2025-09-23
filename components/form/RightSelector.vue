<template>
  <div class="flex justify-between items-center mt-4">
    <div class="inline-block origin-left scale-95 w-3/4">
      <div class="flex items-center gap-1 text-sm py-1 px-2 transform scale-90 origin-left">
        <!-- Previous -->
        <button
          @click="() => handleClick(2)"
          :class="[
            'flex items-center justify-center bg-green-700 rounded hover:bg-green-900 transition h-full px-2 py-2',
            isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''
          ]"
          :disabled="isPrevDisabled"
        >
          <ChevronLeftIcon class="h-8 w-4 text-gray-200" aria-hidden="true" />
        </button>

        <!-- Current -->
        <div
          class="min-w-[30rem] px-2 py-2 bg-white rounded-lg shadow border text-center font-semibold flex items-center justify-center whitespace-nowrap text-xl"
        >
          {{ currentLabel }}
        </div>

        <!-- Next -->
        <button
          @click="() => handleClick(1)"
          :class="[
            'flex items-center justify-center bg-green-700 rounded hover:bg-green-900 transition h-full px-2 py-2',
            isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''
          ]"
          :disabled="isNextDisabled"
        >
          <ChevronRightIcon class="h-8 w-4 text-gray-200" aria-hidden="true" />
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
    required: false
  },
  modelValue: {
    type: Number,
    required: true
  },
  // now expects your change_data function
  change_data: {
    type: Function,
    required: false
  }
})

// Emits for v-model fallback
const emit = defineEmits(['update:modelValue'])

const currentLabel = computed(() => {
  try {
    return props.options.find(item => item.value === props.modelValue)?.label || 'Select Right'
  } catch (error) {
    return 'Select Right'
  }
})

const isPrevDisabled = computed(() =>
  props.options?.length ? props.modelValue <= 1 : true
)
const isNextDisabled = computed(() =>
  props.options?.length ? props.modelValue >= props.options.length : true
)

// When user clicks a chevron
function handleClick(opt) {
  if (props.change_data && typeof props.change_data === 'function') {
    // call the parent's change_data function
    props.change_data(opt)
  } else {
    // fallback: update modelValue via v-model
    let newVal = props.modelValue
    if (opt === 1 && props.modelValue < props.options.length) newVal++
    if (opt === 2 && props.modelValue > 1) newVal--
    emit('update:modelValue', newVal)
  }
}
</script>
