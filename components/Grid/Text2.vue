<template>
   
        <input v-if="disabled" type="text"  :name="props.name" @input="updateValue($event)"
            :value="props.modelValue" :disabled="props.disabled" 
            class="block w-full bg-black border-0 px-3 py-1.5 pr-10 text-gray-900 ring-1 ring-inset placeholder:text-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-500 sm:text-base sm:leading-6"
             />
            
        <input v-else type="text"  :name="props.name" @input="updateValue($event)"
            :value="props.displaytext" :disabled="props.disabled" :placeholder="props.displaytext"
            class="block w-full border-0 px-3 py-1.5 pr-10 text-gray-900 ring-1 ring-inset placeholder:text-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-500 sm:text-base sm:leading-6"
             />


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
    },displaytext:{
        type: String,
        required: false
    }
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event: any) {
    emit('update:modelValue', event.target.value)
}

</script>