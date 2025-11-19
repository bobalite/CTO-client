<template>
    <div :class=props.class >
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
    displaytext:{
        type: [String, Number],
        required: false,
    }
  
})

//sm:col-span-4
</script>