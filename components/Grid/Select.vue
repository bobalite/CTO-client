<template>
  <Multiselect  v-model=model :close-on-select="true" :searchable="false" :options="props.options"
      :canClear="props.canClear" :placeholder="props.placeholder" :class="props.class" />
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'

const model = defineModel()
const props = defineProps({
  canClear: {
      type: Boolean,
      required: false,
      default: true
  },
  options: {
      type: Object,
      required: true,
  },
  searchable: {
      type: Boolean,
      required: false,
      default: true
  },
  placeholder: {
      type: String,
      required: false,
      default: 'Select option'
  },
  class: {
      type: String,
      required: false,
      default: 'bg-green-100'
    
  }, 
    
})

//const emit = defineEmits(['update:modelValue'])
// const emit = defineEmits(['update:modelValue'])

// function updateValue(event: any) {
// emit('update:modelValue', event.target.value)
// }
</script>