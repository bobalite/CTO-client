<template>

    <input type="text" v-if="props.entrystatus == 1" :name="props.name" @input="updateValue($event)"
        :value="props.modelValue" :disabled="true"
        class="block w-full bg-disable border-white px-3 py-1  text-gray-900  placeholder:text-gray-300 focus:outline-none
         sm:text-base sm:leading-6"
        readonly="false" />

    <input type="Number" v-else-if="props.entrystatus == 2" :name="props.name" @input="updateValue($event)"
        :value="props.modelValue" :disabled="false"
        class="block w-full bg-stat0 border-white px-3 py-1  text-gray-900  placeholder:text-gray-300 focus:outline-none
         text-md
         [appearance:textfield] 
         [&::-webkit-outer-spin-button]:appearance-none 
         [&::-webkit-inner-spin-button]:appearance-none" />

    <input type="Number" v-else-if="props.entrystatus == 0" :name="props.name" @input="updateValue($event)"
        :value="props.modelValue" :disabled="true"
        class="block w-full bg-stat0 border-white px-3 py-1  text-gray-900  placeholder:text-gray-300 focus:outline-none
         text-md
         [appearance:textfield] 
         [&::-webkit-outer-spin-button]:appearance-none 
         [&::-webkit-inner-spin-button]:appearance-none"
        readonly="true" />

    <input type="text" v-else-if="props.entrystatus == 5" :name="props.name" @input="updateValue($event)"
        class="block w-full  bg-green-200  border-white px-1 py-1  text-gray-900  placeholder:text-gray-300 focus:outline-none
         text-md "
        :disabled="true" readonly="true" />

    <!-- <input  type="Number" v-else-if="props.entrystatus == 5" :name="props.name" @input="updateValue($event)"
        class="block w-full  bg-green-200  border-white px-3 py-1 pr-1 text-gray-900  placeholder:text-gray-300 
         focus:ring-white text-xl "
        readonly="false"/> -->


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
     type: [String, Number],
    default: 0,
},
data_type: {
    type: String,
    default: 'text',
}})

const emit = defineEmits(['update:modelValue'])

function updateValue(event: any) {
 const numericValue = Number(event.target.value);
  emit('update:modelValue', isNaN(numericValue) ? null : numericValue);

//emit('update:modelValue', event.target.value)
}

</script>