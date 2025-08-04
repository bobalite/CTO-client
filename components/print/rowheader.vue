<template>


    <div class="mt-0 grid grid-cols-1 gap-x-0 gap-y-0 table-header-4 sm:grid-cols-20">

    <GridCell
        class="sm:col-span-4 text-center  border-white border-l border-r border-t border-b pb-0"
        :displaytext="'GROUP: ' +  props.group_number" /> 

   <GridCell
        class="sm:col-span-12 text-center border-white border-t border-l  border-r border-b pb-6"
        :displaytext="props.group_header" />
        
    <div
        class="sm:col-span-2 text-center  border-white border-t border-r border-l border-b pb-0 "
        :class=" state.options.agencies.find(agency => agency.value === props.datasource)?.color">
        {{ state.options.agencies.find(agency => agency.value === props.datasource)?.label || 'Unknown Agency' }}
    </div>

     <div
        class="sm:col-span-2 text-center  border-white  border-r border-b pb-0"
        :class="props.is_annual == 0 ? 'bg-yellow-300' : 'bg-green-100'">
        
        {{ props.is_annual == 0 ? 'Quarterly' : 'Annual' }}
      </div>   
     


    </div>

</template>
<script setup>
 const props = defineProps({
  group_number: {
    type: Number,
    required: false,
    default: ''
  },
  group_header: {
    type: String,
    required: false,
    default: ''
  },
  datasource: {
    type: Number,
    required: false,
    default: ''
  }, is_annual :{
    type: Number,
    required: false,
    default: false
  }
    });

  const state = reactive({
   
    options: {
      agencies:  [
            { value: 1, label: 'SOCC', color: 'bg-red-500 border-red-400' },
            { value: 2, label: 'CHO', color: 'bg-blue-500 border-blue-400' },
            { value: 3, label: 'DepEd', color: 'bg-green-500 border-green-400' },
            { value: 4, label: 'CSWDO', color: 'bg-yellow-500 border-yellow-400' },
            { value: 5, label: 'CHED', color: 'bg-purple-500 border-purple-400' },
            { value: 6, label: 'DCPO', color: 'bg-pink-500 border-pink-400' },
            { value: 7, label: 'DILG', color: 'bg-indigo-500 border-indigo-400' },
            { value: 8, label: 'IGDD', color: 'bg-teal-500 border-teal-400' },
            { value: 9, label: 'CBO', color: 'bg-orange-500 border-orange-400' },
            { value: 10, label: 'CPDO', color: 'bg-gray-500 border-gray-400' },
            { value: 11, label: 'CCRO', color: 'bg-lime-500 border-lime-400' },
            { value: 12, label: 'CDRRMO', color: 'bg-rose-500 border-rose-400' },
            { value: 13, label: 'FCCDI', color: 'bg-cyan-500 border-cyan-400' },
            { value: 14, label: 'PSA', color: 'bg-emerald-500 border-emerald-400' },
            { value: 15, label: 'NCIP', color: 'bg-fuchsia-500 border-fuchsia-400' },
        ]
    }
  });  

</script>