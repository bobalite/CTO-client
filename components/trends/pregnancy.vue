<template>

    <GridCard
        class="sm:col-span-4 font-bold text-left m-1 pl-2 border border-solid border-blue-black bg-green-200 rounded-xl shadow-lg">
        <div class="flex items-center justify-between text-left font-bold text-green-800">
            <div>
                <span class="text-sm font-bold">Pregnancy</span>
                <h1 class="text-xl font-bold">10,000</h1>
            </div>
            <div class="text-green-800">
                <IconMaterialDown class="w-10 h-10" />
            </div>
        </div>
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