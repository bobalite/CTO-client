<template>
 <div class="mt-6">
              <ApexChartref="chart" width="90%" height="350" type="area" :options="state.populationHoriOptions"
                :series="state.graphseries_all"
                />
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
    GraphData: {
        type: Object,
        required: false,
        default: () => []
    },Years: {
        type: Array,
        required: false,
        default: () => []
    }
  
});

let Actuals = []
let Projected = []
let NationalProjected = []





onMounted(() => {
  //generateYears()
  //statyears = props.Years 
  arrangedata()
 
});



const state = reactive({

  years:  [],
  graphseries_all: [],

  populationHoriOptions: {
    chart: {
      type: 'area',
      stacked: false,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },   colors: ['#0891b2',
      '#164e63',
      '#4f46e5',
      '#312e81',
      '#c026d3',
      '#701a75',
      '#db2777',
      '#9d174d'],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'smooth'
    },

    title: {
      text: 'Actual vs Projected and National Projected Comparisons',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold'
      }
    },

    xaxis: {
      categories: props.Years 
    },
    tooltip: {
      shared: true,
      intersect: false
    }
  }
});


function arrangedata() {
  state.graphseries_all[0] = { name: "Actuals", data: props.GraphData['Actuals'] };
  state.graphseries_all[1] = { name: "Projected", data: props.GraphData['Projected'] };
  state.graphseries_all[2] = { name: "NationalProjected", data: props.GraphData['NationalProjected'] };
}


</script>