<template>
   
    <input type="Number" v-if="props.entrystatus == 1" :name="props.name" @input="updateValue($event)"
        :value="props.modelValue"  :disabled="true" 
        class="block w-full bg-disable border-white px-3 py-1.5 pr-10 text-gray-900 ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-white sm:text-base sm:leading-6"
       readonly="false"/>
    
    <input  type="Number"  v-else-if="props.entrystatus == 2" :name="props.name" @input="updateValue($event)"  
        :value="props.modelValue" :disabled="false"
        class="block w-full bg-stat2 border-white px-3 py-1.5 pr-10 text-right text-gray-900 ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-white text-md font-bold "
          />    

    <input  type="Number" v-else-if="props.entrystatus == 0" :name="props.name" @input="updateValue($event)"
        :value="props.modelValue" :disabled="true"
        class="block w-full  bg-stat0 border-white px-3 py-1.5 pr-10 text-gray-900 ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-white text-md font-bold text-right"
         />    
        
    <input  type="Number" v-else-if="props.entrystatus == 5" :name="props.name" @input="updateValue($event)"
        :value="props.modelValue" :disabled="true" 
        class="block w-full  bg-grandtotal border-white px-3 py-1.5 pr-10 text-gray-900 ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-white text-md font-bold text-right"
        readonly="true"  />


</template>


<script setup lang="ts">
const props = defineProps({
name: {
    type: String,
    required: false,
},
modelValue: Number,
disabled: {
    type: Boolean,
    default: false,
},
entrystatus: {
    type: Number,
    default: 0,
},
data_type: {
    type: String,
    default: 'text',
}})

const emit = defineEmits(['update:modelValue'])

function updateValue(event: any) {
emit('update:modelValue', event.target.value)
}

</script>