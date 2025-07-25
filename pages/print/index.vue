<template>
  <div>
    <!-- <div class="print:hidden sm:flex sm:items-center">

      <div class="mt-8 flow-root">
        <p class="mb-1 text-lg font-normal text-gray-500 lg:text-xl sm:px-10 xl:px-1 dark:text-black">Children's
          Rights Situational Analysis (CRSA)</p>
        <div class="sm:flex-auto">
          <p>Select Report Year</p>
          <div>
            <FormSelect name="selected_year" v-model="state.selected_year_id" :options="state.options.report_years"
              @click="changeYear()" />
          </div>
        </div>

        <div class="sm:flex-auto">

          <p>Select Right</p>
          <div>
            <FormSelect :options="state.options.rights" v-model="state.selected_rights_id" @click="changeData()" />
          </div>
        </div>
        <div class="sm:flex-auto">

          <p>Select Graph Type</p>
          <div>
            <FormSelect name="selected_year" v-model="state.selected_graph_type"
              :options="state.options.selected_graph_type" />
          </div>
        </div>
      </div>

    </div> -->


    <div ref="printSection" class="p-6 bg-white">
      <ApexCharts ref="chart" width="90%" height="350" type="bar" :options="chartOptions" :series="series" />
    </div>

    <button @click="printChart" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
      Print Chart
    </button>
  </div>
</template>






<script setup>
import ApexCharts from 'vue3-apexcharts';
import { ref, nextTick } from 'vue'

import {Rights_entry_configServices } from '~/components/api/Rights_entry_configService'; 
import {reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService'; 
import {Childrens_rightsService } from '~/components/api/Rights'; 
import {rolesService } from '~/components/api/Roles'; 
import {useUserStore} from '~/store/user'
import {report_yearService } from '~/components/api/ReportYears'; 

const userStore = useUserStore()

const chartOptions = {
  chart: {
    id: 'vuechart-example'
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995]
  }
}

const series = [{
  name: 'Sales',
  data: [30, 40, 35, 50, 49]
}]

const printChart = async () => {
  await nextTick()
  setTimeout(() => {
    window.print()
  }, 500) // delay for chart render completion
}


onMounted(() => {
    fetchreportyear()
    fetchRights()
    fetchRights_entry_config()
    fetchrole()
    fetchReports_Details_Actuals()
   
})

const state = reactive({
  selected_year_id: 0,
  selected_year: 0,
  refresh_graphs_toggle: 0,
  selected_quarter: '',
  options: {
    report_years: [
      { year: 2020, label: '2020' },
      { year: 2021, label: '2021' },
      { year: 2022, label: '2022' },
      { year: 2023, label: '2023' }
    ]
  },
  showGraphsGrp01: true,
  passed_data: {},
  report_years: {}
})



//-----------------------------------------------// Props and reactive state----------------------------

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

                        if(datasources[i].status == 1){
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

function changeYear() {
   
    try {
        state.selected_year = state.options.report_years[state.selected_year_id - 1].year
        state.selected_quarter = state.options.report_years[state.selected_year_id - 1].label
    } catch (error) {
        state.selected_year = 0
    }

}

async function fetchRights(){
    try {
        let params = {
            page: currentPage
        }
        const response = await Childrens_rightsService.getRights(params)
       
        if (response.data) {
            state.Rights.data = response.data
            //console.log(state.Rights.data[0].description)
        }

       var data = [];
       for (const i in state.Rights.data){

        data[i] =  { "value":  state.Rights.data[i].id, "label": state.Rights.data[i].description };
        
        }

        state.options.rights = data;
        //console.log( state.options.rights)

    } catch (error) {
        //console.log(error)
    }
}

async function fetchRights_entry_config() {
    try {
        let params = {
            page: currentPage
        }
        const response = await Rights_entry_configServices.getRights_entry_config(params)
        //console.log(response)
        if (response.data) {
            state.Rights_entry_config.data = response.data.filter(rights_id1 => rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config1.data = response.data.filter(rights_id1 => rights_id1.rights_id === 1 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config2.data = response.data.filter(rights_id1 => rights_id1.rights_id === 2  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config3.data = response.data.filter(rights_id1 => rights_id1.rights_id === 3  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config4.data = response.data.filter(rights_id1 => rights_id1.rights_id === 4  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config5.data = response.data.filter(rights_id1 => rights_id1.rights_id === 5  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config6.data = response.data.filter(rights_id1 => rights_id1.rights_id === 6  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            //console.log(response.data)
        }
    } catch (error) { 
        //.log(error)
    }
}

async function fetchrole() {
    try {
       
        const response = await rolesService.getRole(userStore.getUser.user_roles.roles_id)
        //console.log(response)
        if (response.data) {
            state.roles = response.data
         
            //console.log(state.roles)
        }
    } catch (error) { 
        //console.log(error)
    }
}

async function fetchReports_Details_Actuals() {
    try {
       
        const response = await reportDetailsGroupsService.getReportDetailsGroups()
       
       
        //console.log(response)
        
        if (response.data) {
            state.report_details.data = response.data
            state.passed_data.data = response.data
              if (state.report_details) {
                const seen = new Set();
                var data = [];
               for (const item of state.report_details.data) {
                    const key = `${item.group_id}|${item.entry_type}|${item.report_year}|${item.grand_total} `;
                    //console.log('key = ', key)
                    if (!seen.has(key)){
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
        //console.log(error)
    }
}

//------------------------------------------------------------------------------------------------------

definePageMeta({
    layout: 'main'
})

</script>