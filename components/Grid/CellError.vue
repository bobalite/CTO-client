<template>
    <div :class=props.class >
        <p v-if="props.error">
            {{ props.error }}
        </p>
       
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    class: {
        type: String,
        required: false,
        default: 'border-solid sm:col-span-1 text-xs text-red-500',
    },
    displaytext:{
        type: String,
        required: false,
    },
    error:{
        type: String,
        required: false,
    }
  
})

//sm:col-span-4
</script>