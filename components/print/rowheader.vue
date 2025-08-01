<template>


    <div class="mt-0 grid grid-cols-1 gap-x-0 gap-y-0 table-header-4 sm:grid-cols-20">

    <GridCell
        class="sm:col-span-3 text-center  border-white border-l border-r border-t border-b pb-0"
        :displaytext="'GROUP: ' +  props.group_number" /> 

   <GridCell
        class="sm:col-span-14 text-center border-white border-t border-l  border-r border-b pb-6"
        :displaytext="props.group_header" /> 

     <GridCell
        class="sm:col-span-3 text-center  border-white border-t border-r border-l border-b pb-0"
        :displaytext="''" />    
         
     


    </div>

</template>
<script setup>
 const props = defineProps({
  group_number: {
    type: String,
    required: false,
    default: ''
  },
  group_header: {
    type: String,
    required: false,
    default: ''
  }
    });

</script>