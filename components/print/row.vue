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

          <div class="sm:col-span-1 text-right  border-r-2 border-l  border-b pb-6"  
            :class="state.options.cell_color.find(cell => cell.value === props.grand_total)?.color">
           {{ props.actual_grand_total }}
        </div>


         <div class="sm:col-span-1 text-right  border-l-2  border-b pb-6"  
            :class="state.options.cell_color.find(cell => cell.value === props.male)?.color">
           {{ props.projected_male }}
        </div>

         <div class="sm:col-span-1 text-right  border-l  border-b pb-6"  
            :class="state.options.cell_color.find(cell => cell.value === props.female)?.color">
           {{ props.projected_female }}
        </div>

         <div class="sm:col-span-1 text-right  border-l  border-b pb-6"  
            :class="state.options.cell_color.find(cell => cell.value === props.total)?.color">
           {{ props.projected_total }}
        </div>

          <div class="sm:col-span-1 text-right  border-r-2 border-l  border-b pb-6"  
            :class="state.options.cell_color.find(cell => cell.value === props.grand_total)?.color">
           {{ props.projected_grand_total }}
        </div>


        <div class="sm:col-span-1 text-right  border-l  border-b pb-6"  
            :class="state.options.cell_color.find(cell => cell.value === props.male)?.color">
           {{ props.national_proj_male }}
        </div>

         <div class="sm:col-span-1 text-right  border-l  border-b pb-6"  
            :class="state.options.cell_color.find(cell => cell.value === props.female)?.color">
           {{ props.national_proj_female }}
        </div>

         <div class="sm:col-span-1 text-right  border-l  border-b pb-6"  
            :class="state.options.cell_color.find(cell => cell.value === props.total)?.color">
           {{ props.national_proj_total }}
        </div>

          <div class="sm:col-span-1 text-right  border-r-2 border-l  border-b pb-6"  
            :class="state.options.cell_color.find(cell => cell.value === props.grand_total)?.color">
           {{ props.national_proj_grand_total }}
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
    },actual_grand_total:{
        type: [String, Number],
        required: false,
        default: ''
    }, projected_male:{
        type: [String, Number],
        required: false,
        default: ''
    }, projected_female:{
        type: [String, Number],
        required: false,
        default: ''
    },projected_total:{
        type: [String, Number],
        required: false,
        default: ''
    },projected_grand_total:{
        type: [String, Number],
        required: false,
        default: ''
    }, national_proj_male:{
        type: [String, Number],
        required: false,
        default: ''
    }, national_proj_female:{
        type: [String, Number],
        required: false,
        default: ''
    },national_proj_total:{
        type: [String, Number],
        required: false,
        default: ''
    },national_proj_grand_total:{
       type: [String, Number],
        required: false,
        default: ''
    },remarks:{
        type: String,
        required: false,
        default: ''
    },datasource:{
        type: String,
        required: false,
        default: ''
    },male : {
        type: [String, Number],
        required: false,
        default: ''
    },female : {
        type: [String, Number],
        required: false,
        default: ''
    },total : {
        type: [String, Number],
        required: false,
        default: ''
    },grand_total : {
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