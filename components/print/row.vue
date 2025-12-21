<template>


    <div class="mt-0 grid grid-cols-1 table-header-4 gap-x-0 gap-y-0 sm:grid-cols-20">

        <GridCell class="sm:col-span-4 text-sm text-left  border-l border-r border-b  pb-6"
            :displaytext= "props.indicator" /> 

        <div class="sm:col-span-1 text-right  border-l  border-b pb-6"  
            :class="state.options.cell_color.find(cell => cell.value === props.male)?.color">
           {{ props.actual_male }}
        </div>

         <div class="sm:col-span-1 text-right  border-l  border-b pb-6"  
            :class="state.options.cell_color.find(cell => cell.value === props.female)?.color">
           {{ props.actual_female }}
        </div>

         <div class="sm:col-span-1 text-right  border-l  border-b pb-6"  
            :class="state.options.cell_color.find(cell => cell.value === props.total)?.color">
           {{ props.actual_total }}
        </div>

         
   
        <GridCell class="sm:col-span-2 text-center  border-white  border-r border-l border-b pb-6" :displaytext="props.datasource" />
        <GridCell class="sm:col-span-2 text-center border-white border-l border-r border-b pb-6" :displaytext="props.remarks" />
       
    </div>

</template>
<script setup>

const props = defineProps({
  indicator:{
    type: String,
    required: false,
    default: ''
  },
   group:{
        type: [String, Number],
        required: false,
        default: ''
    },
  
  actual_male:{
        type: [String, Number],
        required: false,
        default: ''
    }, actual_female:{
        type: [String, Number],
        required: false,
        default: ''
    },actual_total:{
        type: [String, Number],
        required: false,
        default: ''
    }
})

const state = reactive({
   
    options: {
      cell_color:  [
            { value: 1, color: 'bg-gray-400 ' },
            { value: 2, color: 'bg-white ' },
            { value: 5, color: 'bg-gray-100 ' },
            { value: 0, color: 'bg-gray-100 ' },
            
        ]
    }
  });  



</script>