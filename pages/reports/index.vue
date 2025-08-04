<template>
  <div>
    <div class="print:hidden sm:flex sm:items-center">

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

          <p>Select Report Type</p>
          <div>
            <FormSelect name="selected_report_type" v-model="state.selected_graph_type"
              :options="state.options.selected_graph_type" @click="changeGraphType()" />
          </div>
        </div>
      </div>

    </div>

    <PrintHeader  />


     <template v-for="selected_right in state.Selected_Rights_entry_config.data">

      <template v-if="selected_right.tier_level == 1">
        <PrintRowheader v-if="selected_right.tier_level == 1" :group_number="selected_right.group"
          :group_header="selected_right.group_header" :datasource="selected_right.agency_id" :is_annual = "selected_right.is_annual" />

        <!-- <PrintRow
          v-for="(row, index) in state.Selected_Rights_entry_config.data.filter(item => item.group_id === selected_right.group)"
          :key="index"
          :indicator="row.indicator"
         /> -->

         <template v-for="group_row in state.Selected_Rights_entry_config.data">
              <PrintRow v-if="group_row.group == selected_right.group" 
              :indicator = "group_row.description" 
              :male = "group_row.male" 
              :female = "group_row.female" 
              :total = "group_row.total" 
              :grand_total = "group_row.grand_total" 
              />
               
              
          </template> 

      </template>    

     


     </template>

<!-- 
    <PrintRowheader  />
    <PrintRow :indicator="'afasdf'" />
    <PrintRow :indicator="'teaadfst2'" />
    <PrintRow :indicator="'adffa'" /> -->


    <div v-if="state.selected_graph_type != 'none'" ref="printSection" class="p-6 bg-white">
      <ApexCharts ref="chart" width="90%" height="350" type="bar" :options="chartOptions" :series="series" />
    </div>


    <div v-if="state.selected_graph_type != 'none'" class="mt-6">
      <GraphsGrp01 v-if="state.showGraphsGrp01 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-4 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="'TEENAGE PREGNANCY'" :report_year="state.report_year" :passed_year_data="state.report_years">
      </GraphsGrp01>
    </div>



    <button @click="printChart" class="print:hidden mt-4 bg-blue-500 text-white px-4 py-2 rounded">
      Print Report
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
let currentPage = 1;

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

  selected_rights_id: 1,
  selected_year_id: 0,
  selected_year: 0,
  refresh_graphs_toggle: 0,
  selected_quarter: '',
  Rights:[],
  selected_graph_type: 'none',
  passed_data: [],

  Selected_Rights_entry_config: [],
  Selected_Rights_entry_config_group: [],

  Rights_entry_config: [],
  Rights_entry_config1: [],
  Rights_entry_config2: [],
  Rights_entry_config3: [],
  Rights_entry_config4: [],
  Rights_entry_config5: [],
  Rights_entry_config6: [],


  options: {
    entry_type: [
      { value: 'Actual', label: 'Actual' },
      { value: 'Projected', label: 'Projected' },
      { value: 'National Projected', label: 'National Projected' },
    ],

    report_years: [
      { year: 2020, label: '2020' },
      { year: 2021, label: '2021' },
      { year: 2022, label: '2022' },
      { year: 2023, label: '2023' }
    ],
    view_entry_type: [

      { value: 'Projected', label: 'Projected' },
      { value: 'National Projected', label: 'National Projected' },
    ],
    is_disabled: [
      { value: '1', label: 'Not Applicable' },
      { value: '2', label: 'Enabled' },
    ],
    years: [
      { value: '1', label: 'Jan - Dec 2024' },
      { value: '2', label: 'Jan - Dec 2025' },

    ],
    agencies: [
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
    ],

    selected_graph_type: [
      { value: 'none', label: 'DILG Format' },
      { value: 'type1', label: 'DILG Format + Dashboard Statistics' },
      { value: 'type2', label: 'DILG Format + Accomplishment Statistics' },
      { value: 'type3', label: 'All Options' },
      
    ],


  },


  showGraphsGrp01: true,
  
  report_years: [],
  year: '2025',
  report_year: 1,
})



//-----------------------------------------------// Props and reactive state----------------------------

function changeData(){


console.log('changeData', state.selected_rights_id)


    switch (state.selected_rights_id){
        case(0):
        state.Selected_Rights_entry_config  = state.Rights_entry_config
        break;
        case(1):
        state.Selected_Rights_entry_config  = state.Rights_entry_config1
        break;
        case(2):
        state.Selected_Rights_entry_config  = state.Rights_entry_config2
        break;
        case(3):
        state.Selected_Rights_entry_config  = state.Rights_entry_config3
        break;
        case(4):
        state.Selected_Rights_entry_config  = state.Rights_entry_config4
        break;
        case(5):
        state.Selected_Rights_entry_config  = state.Rights_entry_config5
        break;
        case(6):
        state.Selected_Rights_entry_config  = state.Rights_entry_config6
        break;
        default:
        state.Selected_Rights_entry_config  = state.Rights_entry_config
        console.log('Selected_Rights_entry_config', state.Selected_Rights_entry_config)

    }

     console.log('Selected_Rights_entry_config', state.Selected_Rights_entry_config)
}

function changeGraphType() {
    if (state.selected_graph_type === 'none') {
        state.showGraphsGrp01 = false;
    } else {
        state.showGraphsGrp01 = true;
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
        console.log( state.options.rights)

    } catch (error) {
        console.log(error)
    }
}

async function fetchRights_entry_config() {

  
    try {
        let params = {
            page: currentPage
        }
        const response = await Rights_entry_configServices.getRights_entry_config(params)
        console.log('fetchRights_entry_config',response)
        if (response.data) {
            state.Rights_entry_config.data = response.data.filter(rights_id1 => rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config1.data = response.data.filter(rights_id1 => rights_id1.rights_id === 1 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config2.data = response.data.filter(rights_id1 => rights_id1.rights_id === 2  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config3.data = response.data.filter(rights_id1 => rights_id1.rights_id === 3  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config4.data = response.data.filter(rights_id1 => rights_id1.rights_id === 4  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config5.data = response.data.filter(rights_id1 => rights_id1.rights_id === 5  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config6.data = response.data.filter(rights_id1 => rights_id1.rights_id === 6  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            console.log(state.Rights_entry_config1.data)
        }
    } catch (error) { 
        console.log(error)
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
        state.passed_data.data = response.data
       
        console.log('response e', response)
        
        // if (response.data) {

        //     console.log('response.data = ', response.data)
        //     state.report_details.data = response.data
            
        //     console.log('report_details = ', state.report_details.data)
        //     console.log('passed_data = ', state.passed_data)
        //       if (state.report_details) {
        //         const seen = new Set();
        //         var data = [];
        //        for (const item of state.report_details.data) {
        //             const key = `${item.group_id}|${item.entry_type}|${item.report_year}|${item.grand_total} `;
        //             //console.log('key = ', key)
        //             if (!seen.has(key)){
        //                  seen.add(key)
        //                 data.push({
        //                     group_id: item.group_id,
        //                     entry_type: item.entry_type,
        //                     report_year_id: item.report_year_id,
        //                     report_year: item.report_year,
        //                     grand_total: item.grand_total
        //                 });
        //             }
        //         }

        //         state.Tracked_details = data;
        //         console.log('Tracked_details = ', state.Tracked_details)
        //     } else {
        //         alert('No data found for Tracker. ')  
        //     }



        // }


    } catch (error) {
        console.log(error)
    }
}

//------------------------------------------------------------------------------------------------------

definePageMeta({
    layout: 'main'
})

</script>