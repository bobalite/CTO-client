<template>
    <input type="date" :name="props.name"
        class="block w-full rounded-md border-0 px-3 py-2 text-violet-900 ring-1 ring-inset ring-violet-600 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
        :value="props.modelValue" @input="updateValue($event)" />
</template>0

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