<template>

    <input v-if="props.entrystatus == 1" type="text" inputmode="numeric" pattern="[0-9]*" :name="props.name"
        :value="props.modelValue" @input="updateValue" @keydown="allowOnlyDigits"
        class="block w-full bg-green-200 border-white px-3 py-1 text-gray-900 placeholder:text-gray-300 focus:outline-none sm:text-base sm:leading-6" />

    <input v-else-if="props.entrystatus == 2" type="text" inputmode="numeric" pattern="[0-9]*" :name="props.name"
        :value="props.modelValue" @input="updateValue" @keydown="allowOnlyDigits"
        class="block w-full bg-green-600 border-white px-3 py-1 text-gray-900 placeholder:text-gray-300 focus:outline-none text-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        readonly />

    <input v-else-if="props.entrystatus == 0" type="text" :name="props.name" :value="props.modelValue" disabled readonly
        class="block w-full bg-black border-white px-3 py-1 text-gray-300 focus:outline-none text-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />

    <input v-else-if="props.entrystatus == 3" type="text" :name="props.name" :value="props.modelValue"
        @input="updateValue"
        class="block w-full bg-green-400 border-white px-1 py-1 text-black focus:outline-none text-md rounded-md" />



</template>


<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: false,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  entrystatus: {
    type: [String, Number],
    default: 0,
  },
  data_type: {
    type: String,
    default: 'text',
  },
  maxLength: {
    type: Number,
    default: 7, // 🧩 You can change this or pass it as a prop
  },
})

const emit = defineEmits(['update:modelValue'])

/**
 * Cleans the input to allow only digits and applies maxLength.
 */
function updateValue(event: Event) {
  const target = event.target as HTMLInputElement | null
  if (!target) return

  let value = target.value.replace(/[^\d%]/g, '') // allow digits + %
  value = value.replace(/(%)\1+/g, '%') // prevent double %

  // optional: move % to end if user types it in the middle
  value = value.replace('%', '') + (value.includes('%') ? '' : '')

  target.value = value
  emit('update:modelValue', value)
}

/**
 * Prevents invalid keypresses (letters, symbols, etc.)
 */
function allowOnlyDigits(event: KeyboardEvent) {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
  if (allowedKeys.includes(event.key)) return
  if (!/^\d$/.test(event.key)) {
    event.preventDefault()
  }
}
</script>