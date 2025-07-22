<template>
   <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12  border-solid border-grey border-t pb-4 pt-4">


      <div class="sm:col-span-12 text-xl font-bold text-left m-1 pl-2 border-1 border-solid border-blue-black bg-green-100 rounded-xl border-blue-900 border-t border-b border-l border-r">
        <h1 class="text-center">Accomplishment Report</h1>
        
       <h2 v-for="detail in state.report_details.data" class="text-center">Selected Group: {{ detail.entry_type }}</h2>
      
      </div>

      

      <button class="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 no-print" @click="showgraph1()">
        Generate Printout
      </button>
    

      <button class="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 no-print" @click="printpage()">
        Print This Page
      </button>
    
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {report_yearService } from '~/components/api/ReportYears';
import {reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService'; 
import {useUserStore} from '~/store/user'

const userStore = useUserStore()

const route = useRoute()
const name = route.query.name || 'Friend'
const message = route.query.message || '(No message)'

const state = reactive({
  selected_group: 1,
  showGraphsGrp01: false,
  refresh_graphs_toggle: 0,
  passed_data: [],
  report_years: [],
  report_year: 1,
  Tracked_details: [],
  report_details: []
  //report_year: new Date().getFullYear(),
})

onMounted(() => {
  // Ensure the page is ready for printing
  fetchreportyear()
  fetchReports_Details_Actuals()
  document.title = `Accomplishment - ${name}`

  console.log('Accomplishment page mounted with name:', name)
  console.log('state.selected_group', state.selected_group)
  console.log('state.passed_data', state.passed_data)
  console.log('state.report_years', state.report_years)
  console.log('state.report_year', state.report_year)
  console.log('state.refresh_graphs_toggle', state.refresh_graphs_toggle)
})

function printpage() {
  window.print()
}

function showgraph1() {
  state.showGraphsGrp01 = true
  state.refresh_graphs_toggle += 1
  console.log('showgraph1 called, refresh_graphs_toggle:', state.refresh_graphs_toggle)
}

async function fetchReports_Details_Actuals() {
  try {
    const response = await reportDetailsGroupsService.getReportDetailsGroups()
    console.log('fetchReports_details_Actual Response', response)
    
    if (response.data) {
      
      state.report_details.data = response.data
      state.passed_data.data = response.data
      // console.log('state.report_details.data = ', state.report_details.data)
      if (state.report_details) {
        const seen = new Set();
        var data = [];
        for (const item of state.report_details.data) {
          const key = `${item.group_id}|${item.entry_type}|${item.report_year}|${item.grand_total} `;
          //console.log('key = ', key)
          if (!seen.has(key)) {
            seen.add(key)
            data.push({
              group_id: item.group_id,
              entry_type: item.entry_type,
              report_year_id: item.report_year_id,
              report_year: item.report_year,
              grand_total: item.grand_total
            });
          }
        }
        state.Tracked_details = data;
        console.log('Tracked_details = ', state.Tracked_details)
      } else {
        alert('No data found for Tracker. ')
      }
    } 
  } catch (error) {
    console.log('error',error)
  }
}


async function fetchreportyear() {
  try {
    const response = await report_yearService.getReportYears()
    if (response.data) {
      state.report_years.data = response.data
      var data = [];
      var datasources = [];
      if (state.report_years.data != null) {
        datasources = state.report_years.data
        for (const i in datasources) {
          const value = datasources[i].id;
          if (!datasources.includes(value)) {
            if (datasources[i].status == 1) {
              data[i] = { "value": datasources[i].id, "label": datasources[i].name, "year": datasources[i].year };
            }
          }
        }
        state.options.report_years = data;
        //console.log('report_years = ', state.options.report_years.data)
      }
    }
  } catch (error) {
    //console.log(error)
  }
}

</script>

<style>
@media print {
  .no-print {
    display: none !important;
  }

  body {
    zoom: 0.9; /* Optional: Scale down for printing */
  }

  html, body {
    background: white !important;
    margin: 0;
    padding: 0;
  }
}
</style>