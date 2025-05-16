<template>
    <div :class=props.class>
        <input :type="props.inputtype" :disabled="props.disabled" :name="props.name" :id="props.inputId" :autocomplete="props.inputautocomplete" :class="props.inputclass">
        <!-- {{ props.displaytext }} -->
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
    },
    name:{
        type: String,
        required: false,
    },
    inputtype:{
        type: String,
        required: false,
        default: 'text'
    },
    inputclass:{
        type: String,
        required: false,
        default:'block w-full rounded-md border-0 px-3 py-1.5 pr-10 text-violet-900 shadow-sm ring-1 ring-inset ring-violet-600 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6'
        
    },
    inputId :{
        type: String,
        required: true,
    },
    inputautocomplete:{
        type: String,
        required: false,
        default: false,
    },
    disabled:{
        type: Boolean,
        default: false

    }
})
</script>