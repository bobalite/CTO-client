<template>
  <div
    :class="[
      props.class,
      'min-w-0 whitespace-normal break-words print:whitespace-normal print:break-words'
    ]"
  >
    {{ props.displaytext }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
    required: false,
    default: 'border-solid',
  },
  displaytext: {
    type: [String, Number],
    required: false,
    default: '',
  },
})
</script>
