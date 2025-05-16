<template>
    
        <input type="text"  :name="props.name" @input="updateValue($event)"
            :value="props.modelValue" :disabled="props.disabled"
            class='block w-full rounded-md border-0 px-3 py-1.5 pr-2 text-violet-900 shadow-sm ring-1 ring-inset ring-violet-600 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-green-100'
            readonly="true"/>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <!-- <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" /> -->
        </div>
    
</template>


<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: false,
    },
    modelValue: String,
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