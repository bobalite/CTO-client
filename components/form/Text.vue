<template>
    <div class="relative mt-2 rounded-md shadow-sm">
        <input type="text" :name="props.name" :disabled="props.disabled"
            class="block w-full rounded-md border-0 px-3 h-[2.6rem] text-blue-900 ring-1 ring-inset placeholder:text-gray-500 focus:ring-1 focus:ring-inset  ring-blue-600 sm:text-sm sm:leading-6"
            :placeholder="props.placeholder" :value="props.modelValue" @input="updateValue($event)" />
    </div>
</template>


<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    modelValue: String,
    placeholder: {
        type: String,
        required: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event: any) {
    emit('update:modelValue', event.target.value)
}
</script>