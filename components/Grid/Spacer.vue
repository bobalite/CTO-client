<template>
    <div :class=props.class>
        {{ props.displaytext }}
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    class: {
        type: String,
        required: true,
    },
    displaytext:{
        type: String,
        required: false,
    }
  
})

//sm:col-span-4
</script>