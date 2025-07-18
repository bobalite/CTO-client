<template>
   
    <GridCard
        class="sm:col-span-4 text-xl font-bold  text-left m-1 pl-2 border-1 border-solid border-blue-black bg-green-100 rounded-xl border-blue-900 border-t border-b border-l border-r ">
        <h1 class="text-1xl font-bold">Group 3. Proportion/percentage of nutritionally-at-risk PW</h1>
        <h1 class="text-1xl font-bold"></h1>
        <h1 class="text-4xl text-center font-bold"></h1>
        <h1 class="text-7xl text-center font-bold">{{state.prevalence}} %</h1>
        <h1 class="text-md text-center font-bold border-solid decoration-red-50 border-blue-black border-t"></h1>
      </GridCard>
      

    
</template>

<script setup>

const props = defineProps({
    class: {
        type: String,
        required: true,
        default: 'border-solid',
    },
    displaytext:{
        type: String,
        required: false,
    },group_id:{
        type: String,
        required: false,
    },report_year:{
        type: Number,
        required: false,
    },passed_data: {
        type: Object,
        required: true,
    }
  
})

onMounted(() => {
    
    fetchReports_Details_Actuals()
})

const state = reactive({
report_details: [],
prevalence: 0,
})


async function fetchReports_Details_Actuals() { // main fetching function for actuals
  try {
    await props.passed_data.data

    state.report_details.data = props.passed_data.data  
    
    for (const c in state.report_details.data) {

      if (state.report_details.data[c].sequence_header == '1.1.3' && state.report_details.data[c].entry_type == 'Actual' && state.report_details.data[c].report_year_id == props.report_year) {
        state.prevalence = parseFloat(state.prevalence) + parseFloat(state.report_details.data[c].total)

        //console.log('state.prevalence', state.prevalence)
      }
    }
  } catch (error) {

    //state.graphSeries = [0, 0, 0]
  }
}

</script>