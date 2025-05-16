<template>
    <textarea rows="2" :name="props.name" :value="props.modelValue" @input="updateValue($event)"
        class="block w-full resize-none rounded-md border-0 px-3 py-1.5 text-violet-900 shadow-sm ring-1 ring-inset ring-violet-600 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6" />
</template>

<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event) {
    emit('update:modelValue', event.target.value)
}
</script>