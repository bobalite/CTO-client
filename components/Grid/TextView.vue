<template>
   
    <input type="text" v-if="props.entrystatus == 1" :name="props.name" @input="updateValue($event)"
        :value="props.modelValue"  :disabled="true" 
        class="block w-full bg-green-200 border-white px-3 py-1 text-gray-900 placeholder:text-gray-300 focus:outline-none sm:text-base sm:leading-6"
        readonly="false"/>
    
    <input  type="text"  v-else-if="props.entrystatus == 2" :name="props.name" @input="updateValue($event)"  
        :value="props.modelValue" :disabled="true"
         class="block w-full bg-green-600 border-white px-3 py-1 text-gray-900 placeholder:text-gray-300 focus:outline-none text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        readonly="false" />    
   
    <input  type="text" v-else-if="props.entrystatus == 0" :name="props.name" @input="updateValue($event)"
        :value="props.modelValue" :disabled="true"
         class="block w-full bg-black border-white px-3 py-1 text-black focus:outline-none text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        readonly="true" />    
        
    <input  type="text" v-else-if="props.entrystatus == 3" :name="props.name" @input="updateValue($event)"
        :value="props.modelValue" :disabled="true" 
        class="block w-full bg-green-300 border-white px-1 py-1 text-black focus:outline-none text-sm "
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