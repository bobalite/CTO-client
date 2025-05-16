<template>
    <label :for="props.for" v-if="props.label" class="block text-sm font-medium leading-6 text-gray-900">{{
        props.label }}
        <span v-if="required" class="text-red-500">*</span></label>
</template>


<script setup>
const props = defineProps({
    for: {
        type: String,
        required: false,
    },
    label: {
        type: String,
        required: false,
    },
    required: {
        type: Boolean,
        default: false
    }
})
</script>