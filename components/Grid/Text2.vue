<template>
  <input
    type="text"
    :name="props.name"
    :value="props.modelValue"
    :disabled="props.disabled"
    :placeholder="props.displaytext ?? ''"
    @input="updateValue"
    class="block w-full border-0 px-3 py-1.5 pr-10 text-gray-900 ring-1 ring-inset placeholder:text-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-500 sm:text-base sm:leading-6"
    :class="props.disabled ? 'bg-black' : 'bg-white'"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: false },
  modelValue: { type: [String, Number], default: '' },
  disabled: { type: Boolean, default: false },
  displaytext: { type: String, required: false },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
