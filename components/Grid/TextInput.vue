<template >
        <input type="number" v-model=model :name="props.name" :id="props.inputId" :class="props.inputclass" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" >
</template>


<script setup lang="ts">
const model = defineModel()
const props = defineProps({
    class: 
    { 
        type: String,
        required: false,
         //default:'block w-full border-0 px-3 text-violet-900 shadow-sm ring-0 ring-inset ring-violet-600 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-yellow-100'
    },
    inputId:{
        type: String,
        required: false,
    },
    name:{
        type: String,
        required: false,
    },
   inputclass:{
        type: String,
        required: false,
        default:'block w-full border-0 px-3 text-violet-900 shadow-sm ring-1 ring-inset ring-violet-600 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-yellow-100'
    }

})



</script>