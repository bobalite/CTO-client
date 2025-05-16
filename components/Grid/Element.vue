<template>
    <div v-if="elementtype === 'input'" :class=props.class>
        <input modelValue="model" type='text'  :name="props.name" :id="props.inputId"  :class="props.inputclass " >
    </div>
    <div v-if="elementtype === 'input-readonly'" :class=props.class>
        <input v-model="model" type='text' :name="props.name" :id="props.inputId"  :class="props.input_readonlyclass " :readonly=true>
    </div>
    <div v-if="elementtype === 'input-datasource'" :class=props.class>
        <input v-model="model" :type="props.elementtype" :name="props.name" :id="props.inputId"  :class="props.input_datasourceclass " >
    </div>

    <div v-if="elementtype === 'input-comment'" :class=props.class>
        <input v-model="model" type='text' :name="props.name" :id="props.inputId"  :class="props.input_commentclass"  >
    </div>

    <div v-if="elementtype === 'input-commentyellow'" :class=props.class>
        <input v-model="model" type='text' :name="props.name" :id="props.inputId"  :class="props.input_commentclassyellow"  >
    </div>

    <div v-if="elementtype === 'input-commentgreen'" :class=props.class>
        <input v-model="model" type='text' :name="props.name" :id="props.inputId"  :class="props.input_commentclassgreen"  :readonly=true >
    </div>
    <div v-if="elementtype === 'text'" :class=props.class>
        {{ props.displaytext }}
    </div>
    <div v-if="elementtype === 'checkbox'" :class=props.class>
        <input type='checkbox' :name="props.name" :id="props.inputId"  >
        {{ props.displaytext }}
    </div>
    <div v-if="elementtype === 'spacer'" :class=props.class>
        {{ props.displaytext }}
    </div>
    <div v-if="elementtype === 'spacer-indented'" :class=props.class>
            <div class = 'mx-4'>
                {{ props.displaytext }}
            </div>
    </div>
    <div v-if="elementtype === 'textarea'" :class=props.class>
        <input v-model="model"  :type="props.elementtype" :name="props.name" :id="props.inputId"  class="block w-full resize-none rounded-md border-0 px-3 py-1.5 text-violet-900 shadow-sm ring-1 ring-inset ring-violet-600 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6">
        {{ props.displaytext }}
    </div>
</template>



<script setup lang="ts">

const model = defineModel()

const props = defineProps({
    class: {
        type: String,
        required: true,
    },
    displaytext:{
        type: String,
        required: false,
    },

    placeholder:{
        type: String,
        required: false,
        default:''
    },

    inputvalue:{
        type: Number,
        required: false,
        
        
    },

    inputId:{
        type: String,
        required: false,
        
        
    },

    name:{
        type: String,
        required: false,
    },
    elementtype:{
        type: String,
        required: false,
        default: 'text'
    },

    input_commentclass:{
        type: String,
        required: false,
        default:' w-full border-b-2 border-blue-900 px-3 py-1.5 pr-10 text-violet-900 shadow-sm  ring-violet-600 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-white-100'
        
    },

    input_commentclassyellow:{
        type: String,
        required: false,
        default:' w-full border-b-2 border-blue-900 px-3 py-1.5 pr-10 text-violet-900 shadow-sm  ring-violet-600 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-yellow-200'
        
    },

    input_commentclassgreen:{
        type: String,
        required: false,
        default:' w-full border-b-2 border-blue-900 px-3 py-1.5 pr-10 text-violet-900 shadow-sm  ring-violet-600 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-green-100'
        
    },
    
    inputclass:{
        type: String,
        required: false,
        default:'block w-full rounded-md border-0 px-3 py-1.5 pr-10 text-violet-900 shadow-sm ring-1 ring-inset ring-violet-600 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-yellow-100'
        
    },
    input_readonlyclass:{
        type: String,
        required: false,
        default:'block w-full rounded-md border-0 px-3 py-1.5 pr-10 text-violet-900 shadow-sm ring-1 ring-inset ring-violet-600 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-green-100'
        
    },
    input_datasourceclass:{
        type: String,
        required: false,
        default:'block w-full rounded-md border-0 px-3 py-1.5 pr-10 text-violet-900 shadow-sm ring-1 ring-inset ring-violet-600 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-gray-100'
        
    }
   
 
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event: any) {
    emit('update:modelValue', event.target.value)
}

</script>