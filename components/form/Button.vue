<template>
    <button type="button"
        class="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-2 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        :disabled="props.disabled">
        <slot name="icon-left" />
        <slot />
        <slot name="icon-right" />
        {{ props.text }}
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    buttonStyle: {
        type: String,
        required: false,
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
    text: {
        type: String,
        required: false,
    },
})
</script>