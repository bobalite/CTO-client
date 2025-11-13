<template>
  <button
    type="button"
    @click="cancel_entry"
    class="block rounded-md bg-green-800 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
  >
    {{ displaytext }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
    required: false,
    default: 'border-solid',
  },
  displaytext: {
    type: String,
    required: false,
  },
  close: {
    type: Boolean,
    default: true,
  },
})

function cancel_entry() {
  // your logic here
}
</script>
