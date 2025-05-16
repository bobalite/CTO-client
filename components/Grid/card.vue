<template>
    <div :class=props.class >
        <div >
          
                <h3 class="text-lg font-bold border-1 border-solid border-blue-900  rounded-xl ">{{props.displaytext}}</h3>
                <slot/>
           
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    class: {
        type: String,
        required: true,
        default: 'border-solid',
    },
    displaytext:{
        type: String,
        required: false,
    }
  
})

//sm:col-span-4
</script>