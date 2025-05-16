<template >
            <input type="checkbox" v-model=model :name="props.name" :id="props.inputId"  :checked="props.value" :disabled="props.dissabled" class="props.inputclass"> 
            
           
           
</template>

<script setup lang="ts">
const model = defineModel()
const props = defineProps({

    value:{
        type: Boolean,
        required: false,
        default: false
    },
    inputId:{
        type: String,
        required: false,
    },
    
    name:{
        type: String,
        required: false,
    },
    
   inputclass:{
        type: String,
        required: false,
        default:'border-green-600 pb-4 readonly'
    },
    dissabled:{
        type:Boolean,
        required: false,
        default: true
    }, displaytext:{
        type:String,
        required: false,
        default: ''
    }
})
</script>