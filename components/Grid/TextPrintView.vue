<template>

      
    <input  type="text" v-if="props.entrystatus == 0" :name="props.name" @input="updateValue($event)"
        :value="'NA'" :disabled="true"
        class="block w-full  bg-gray-300 border-white px-3 py-1.5 pr-1 text-gray-900 ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-white text-right"
        readonly="true" />    
   
    <input type="text" v-else-if="props.entrystatus == 1" :name="props.name" @input="updateValue($event)"
        :value="props.modelValue"  :disabled="true" 
        class="block w-full bg-green-100 border-white px-3 py-1.5 pr-1 text-gray-900 ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-500 text-right"
        readonly="false"/>
    
    <input  type="text"  v-else-if="props.entrystatus == 2" :name="props.name" @input="updateValue($event)"  
        :value="props.modelValue" :disabled="true"
        class="block w-full  bg-green-100 border border-white px-3 py-1.5 pr-1 text-gray-900 ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-white text-right"
        readonly="false" />    
 
        
    <input  type="text" v-else-if="props.entrystatus == 3" :name="props.name" @input="updateValue($event)"
        :value="props.modelValue" :disabled="true" 
        class="block w-full  bg-green-100 border-white px-3 py-1.5 pr-1 ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-white font-bold text-right"
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


<!-- <template>
 
  <span
    class="hidden print:block w-full min-w-0 px-1 py-0.5 text-[10px] leading-tight text-right
           whitespace-normal break-words"
    :class="printBgClass"
  >
    {{ displayValue }}
  </span>

 
  <input
    v-if="props.entrystatus == 0"
    type="text"
    :name="props.name"
    :value="'NA'"
    disabled
    readonly
    class="print:hidden block w-full bg-gray-300 border-white px-3 py-1.5 text-gray-900
           ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-white
           text-xs text-right"
  />

  <input
    v-else-if="props.entrystatus == 1"
    type="text"
    :name="props.name"
    :value="displayValue"
    disabled
    class="print:hidden block w-full bg-green-100 border-white px-3 py-1.5 text-gray-900
           ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-500
           text-xs text-right"
    readonly
  />

  <input
    v-else-if="props.entrystatus == 2"
    type="text"
    :name="props.name"
    :value="displayValue"
    disabled
    class="print:hidden block w-full bg-green-100 border border-white px-3 py-1.5 text-gray-900
           ring-1 ring-white placeholder:text-gray-300 focus:ring-1 focus:ring-white
           text-xs text-right"
    readonly
  />

  <input
    v-else-if="props.entrystatus == 3"
    type="text"
    :name="props.name"
    :value="displayValue"
    disabled
    class="print:hidden block w-full bg-green-100 border-white px-3 py-1.5 ring-1 ring-white
           placeholder:text-gray-300 focus:ring-1 focus:ring-white text-xs font-bold text-right"
    readonly
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: false },
  modelValue: { type: [String, Number], default: '' },
  disabled: { type: Boolean, default: false },
  entrystatus: { type: [String, Number], default: 0 },
  data_type: { type: String, default: 'text' },
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event: any) {
  emit('update:modelValue', event.target.value)
}

const displayValue = computed(() => {
  const v = props.entrystatus == 0 ? 'NA' : props.modelValue
  return v === null || v === undefined ? '' : String(v)
})

const printBgClass = computed(() => {
  // Optional: mimic your background colors in print
  if (Number(props.entrystatus) === 0) return 'bg-gray-300'
  return 'bg-green-100'
})
</script> -->
