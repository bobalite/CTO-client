<template>
    <button type="button" @click="cancel_entry()"
        class="block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600">
        {{props.displaytext}}
    </button>
</template>

<script setup lang="ts">

const props = defineProps({
    class: {
        type: String,
        required: true,
        default: 'border-solid',
    },
    displaytext:{
        type: String,
        required: false,
    },
    close: {
        type: Boolean,
        default: true
        },
})

function cancel_entry(){
    //console.log('cancel_entry')
   // emit('update:modelValue', false)
}


//sm:col-span-4
</script>