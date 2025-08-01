<template>


    <div class="mt-0 grid grid-cols-1 table-header-4 gap-x-0 gap-y-0 sm:grid-cols-20">
        <GridCell class="sm:col-span-3 text-center border-white border-l border-r border-b  pb-6"
            :displaytext= "props.indicator" />

        <GridCell class="sm:col-span-1 text-center  border-white border-l  border-b" :displaytext="props.actual_male" />
        <GridCell class="sm:col-span-1 text-center  border-white border-l border-b  pb-6" :displaytext="props.actual_female" />
        <GridCell class="sm:col-span-1 text-center  border-white border-l border-b  pb-6" :displaytext="props.actual_total" />
        <GridCell class="sm:col-span-1 text-center border-white border-r-2 border-b border-l  pb-6" :displaytext="props.actual_grand_total" />
        <GridCell class="sm:col-span-1 text-center  border-white border-l border-b" :displaytext="props.projected_male" />
        <GridCell class="sm:col-span-1 text-center  border-white border-l border-b  pb-6" :displaytext="props.projected_female" />
        <GridCell class="sm:col-span-1 text-center  border-white border-l border-b  pb-6" :displaytext="props.projected_total" />
        <GridCell class="sm:col-span-1 text-center  border-white border-r-2 border-l border-b pb-6" :displaytext="props.projected_grand_total" />
        <GridCell class="sm:col-span-1 text-center  border-white border-l border-b " :displaytext="props.national_proj_male" />
        <GridCell class="sm:col-span-1 text-center  border-white border-l border-b  pb-6" :displaytext="props.national_proj_female" />
        <GridCell class="sm:col-span-1 text-center  border-white border-l border-b  pb-6" :displaytext="props.national_proj_total" />
        <GridCell class="sm:col-span-1 text-center  border-white border-r-2 border-l border-b pb-6" :displaytext="props.national_proj_grand_total" />
        <GridCell class="sm:col-span-2 text-center  border-white  border-r border-l border-b pb-6" :displaytext="props.datasource" />
        <GridCell class="sm:col-span-3 text-center border-white border-l border-r border-b pb-6" :displaytext="props.remarks" />
       
    </div>

</template>
<script setup>

const props = defineProps({
  indicator:{
    type: String,
    required: false,
    default: ''
  },
  
  actual_male:{
        type: String,
        required: false,
        default: ''
    }, actual_female:{
        type: String,
        required: false,
        default: ''
    },actual_total:{
        type: String,
        required: false,
        default: ''
    },actual_grand_total:{
        type: String,
        required: false,
        default: ''
    }, projected_male:{
        type: String,
        required: false,
        default: ''
    }, projected_female:{
        type: String,
        required: false,
        default: ''
    },projected_total:{
        type: String,
        required: false,
        default: ''
    },projected_grand_total:{
        type: String,
        required: false,
        default: ''
    }, national_proj_male:{
        type: String,
        required: false,
        default: ''
    }, national_proj_female:{
        type: String,
        required: false,
        default: ''
    },national_proj_total:{
        type: String,
        required: false,
        default: ''
    },national_proj_grand_total:{
        type: String,
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
    }

})



</script>