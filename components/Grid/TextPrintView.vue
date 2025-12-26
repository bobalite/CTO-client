<template>

      
    <input  type="text" v-if="props.entrystatus == 0" :name="props.name" @input="updateValue($event)"
        :value="'NA'" :disabled="true"
        class="block w-full  bg-gray-300 border-white px-3 py-1.5 pr-10 text-gray-900 ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-white text-md text-right"
        readonly="true" />    
   
    <input type="text" v-else-if="props.entrystatus == 1" :name="props.name" @input="updateValue($event)"
        :value="props.modelValue"  :disabled="true" 
        class="block w-full bg-green-100 border-white px-3 py-1.5 pr-10 text-gray-900 ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-500 sm:text-base sm:leading-6 text-right"
        readonly="false"/>
    
    <input  type="text"  v-else-if="props.entrystatus == 2" :name="props.name" @input="updateValue($event)"  
        :value="props.modelValue" :disabled="true"
        class="block w-full  bg-green-100 border border-white px-3 py-1.5 pr-10 text-gray-900 ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-white text-right"
        readonly="false" />    
 
        
    <input  type="text" v-else-if="props.entrystatus == 5" :name="props.name" @input="updateValue($event)"
        :value="props.modelValue" :disabled="true" 
        class="block w-full  bg-green-100 border-white px-3 py-1.5 pr-10 ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-white text-md font-bold text-right"
        readonly="true"/>


</template>

                                                                                                            
<script setup lang="ts">
const props = defineProps({
name: {
    type: String,
    required: false,
},
modelValue:  [String, Number],
disabled: {
    type: Boolean,
    default: false,
},
entrystatus: {
    type: [String, Number],
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