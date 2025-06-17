<template>
    <div class="relative mt-2 rounded-md shadow-sm">
        <input type="email" :placeholder="props.placeholder" :name="props.name" @input="updateValue($event)"
            :value="props.modelValue" :disabled="props.disabled"
            class="block w-full rounded-md border-0 h-[2.6rem] px-3 py-1.5 pr-10 text-blue-900 ring-1 ring-inset placeholder:text-gray-500 focus:ring-1 focus:ring-inset ring-blue-500 sm:text-sm sm:leading-6"
            aria-invalid="true" aria-describedby="email-error" />
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <!-- <IconExclamation class="h-5 w-5 text-red-500" aria-hidden="true" /> -->
        </div>
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