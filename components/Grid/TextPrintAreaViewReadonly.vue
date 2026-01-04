<template>
    <textarea rows="2" :name="props.name" :value="props.modelValue" @input="updateValue($event)"
    class="block w-full bg-stat5 border-white px-3 py-1.5 pr-10 text-gray-900 ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-white text-sm text-left" />
</template>

<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: false,
    },
    modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event:any) {
    emit('update:modelValue', event.target.value)
}
</script>