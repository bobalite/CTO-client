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
              @update:modelValue="changeYear()" />
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

    <PrintHeader />


    <template v-for="selected_right in state.Selected_Rights_entry_config_values">

      <template v-if="selected_right.tier_level == 1">
        <PrintRowheader v-if="selected_right.tier_level == 1" :group_number="selected_right.group"
          :group_header="selected_right.group_header" :datasource="selected_right.agency_id"
          :is_annual="selected_right.is_annual" />

        <PrintRow :indicator="selected_right.description" :male="selected_right.male" :female="selected_right.female"
          :total="selected_right.total" :grand_total="selected_right.grand_total"
          :actual_male=selected_right.actual_male :actual_female=selected_right.actual_female
          :actual_total=selected_right.actual_total :actual_grand_total=selected_right.actual_grand_total
          :projected_male=selected_right.projected_male :projected_female=selected_right.projected_female
          :projected_total=selected_right.projected_total :projected_grand_total=selected_right.projected_grand_total
          :national_proj_male=selected_right.national_proj_male
          :national_proj_female=selected_right.national_proj_female
          :national_proj_total=selected_right.national_proj_total
          :national_proj_grand_total=selected_right.national_proj_grand_total />


      </template>
      <PrintRow v-if="selected_right.tier_level != 1" :indicator="selected_right.description" :male="selected_right.male" :female="selected_right.female"
          :total="selected_right.total" :grand_total="selected_right.grand_total"
          :actual_male=selected_right.actual_male :actual_female=selected_right.actual_female
          :actual_total=selected_right.actual_total :actual_grand_total=selected_right.actual_grand_total
          :projected_male=selected_right.projected_male :projected_female=selected_right.projected_female
          :projected_total=selected_right.projected_total :projected_grand_total=selected_right.projected_grand_total
          :national_proj_male=selected_right.national_proj_male
          :national_proj_female=selected_right.national_proj_female
          :national_proj_total=selected_right.national_proj_total
          :national_proj_grand_total=selected_right.national_proj_grand_total />
    </template>


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

    <PrintFooter />



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
    //fetchRights_entry_config()
    fetchrole()
    //fetchReports_Details_Actuals()
   
   
})

const state = reactive({

  selected_rights_id: 1,
  selected_year_id: 0,
  selected_year: 2025,
  refresh_graphs_toggle: 0,
  selected_quarter: '',
  Rights:[],
  selected_graph_type: 'none',
  passed_data: [],

  actuals: [],
  projected: [],
  national_projected: [],
  remarks: [], 


  Selected_Rights_entry_config: [],
  Selected_Rights_entry_config_group: [],

  Rights_entry_config: [],
  Rights_entry_config1: [],
  Rights_entry_config2: [],
  Rights_entry_config3: [],
  Rights_entry_config4: [],
  Rights_entry_config5: [],
  Rights_entry_config6: [],

  Selected_Rights_entry_config_values: [],


  options: {
    entry_type: [
      { value: 'Actual', label: 'Actual' },
      { value: 'Projected', label: 'Projected' },
      { value: 'National Projected', label: 'National Projected' },
    ],

    report_years: [
      { value: 2025, label: '2025' },
      { value: 2024, label: '2024' },
    
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
       // console.log('Selected_Rights_entry_config', state.Selected_Rights_entry_config)
    }
     //console.log('Selected_Rights_entry_config', state.Selected_Rights_entry_config)




}

function changeGraphType() {
    if (state.selected_graph_type === 'none') {
        state.showGraphsGrp01 = false;
    } else {
        state.showGraphsGrp01 = true;
    }
}


async function fetchreportyear() {
    // try {
    //        const response = await report_yearService.getReportYears()
    //     if (response.data) {
            
    //         state.report_years.data = response.data
    //         var data = [];
    //         var datasources = [];
    //         if (state.report_years.data != null) {
                
    //             datasources = state.report_years.data

    //             for (const i in datasources) {
    //                 const value = datasources[i].id;
    //                 if (!datasources.includes(value)) {

    //                     if(datasources[i].status == 1){
    //                     data[i] = { "value": datasources[i].id, "label": datasources[i].name, "year": datasources[i].year };
    //                     }
    //                 }
    //             }
    //             state.options.report_years = data;
    //             //console.log('report_years = ', state.options.report_years.data)
    //         }

    //     }
    // } catch (error) { 
    //     //console.log(error)
    // }
}

function changeYear() {
   
    try {
        state.selected_year = state.options.report_years[state.selected_year_id - 1].label
        state.selected_quarter = state.options.report_years[state.selected_year_id - 1].label
    } catch (error) {
        state.selected_year = 0
    }
     console.log('changeYear state.selected_year_id', state.selected_year_id )
     console.log('changeYear state.selected_year', state.selected_year )

    //arrange_data()
    fetchRights_entry_config()

    
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
   
    const response = await Rights_entry_configServices.getRights_entry_config()
    
    if (response.data) {
      state.Rights_entry_config.data = response.data.filter(rights_id1 => rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
      state.Rights_entry_config1.data = response.data.filter(rights_id1 => rights_id1.rights_id === 1 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
      state.Rights_entry_config2.data = response.data.filter(rights_id1 => rights_id1.rights_id === 2 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
      state.Rights_entry_config3.data = response.data.filter(rights_id1 => rights_id1.rights_id === 3 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
      state.Rights_entry_config4.data = response.data.filter(rights_id1 => rights_id1.rights_id === 4 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
      state.Rights_entry_config5.data = response.data.filter(rights_id1 => rights_id1.rights_id === 5 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
      state.Rights_entry_config6.data = response.data.filter(rights_id1 => rights_id1.rights_id === 6 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)

    }
  } catch (error) {
    console.log(error)
  }


  try {
    const response = await reportDetailsGroupsService.getReportDetailsGroups() // data is all of the entries and not filltered by rights_id
    if (response) {
      console.log('fetchRights_entry_config -- response', response.data)
      state.passed_data.data = []
      //state.passed_data.data = response.data
     for (const item of response.data){

        if (item.report_year == state.selected_year_id) { // this is done to filter the data by report_year 
          state.passed_data.data.push(item)
        } 
       
      }

      
     
     
    }

  } catch (error) {
    console.log(error)
  }

//--------------------------------------------- arrange_data-----------
  try { // this is done to sum the values of the same sequence_header, entry_type, report_year and grand_total mainly for quarterly reports
  state.actuals = []
  console.log('fetchRights_entry_config -- 1', state.Rights_entry_config)
  console.log('fetchReports_Details_Actuals passed_data -- 2', state.passed_data)
  console.log('arrange_data ; state.passed_data --3', state.passed_data)
  const seen = new Map();
  const uniqueData = [];

  for (const item of state.passed_data.data) { 
    const key = `${item.report_year}|${item.entry_type}|${item.sequence_header}|${item.grand_total}`;

    if (!seen.has(key)) {
      // Add to uniqueData and track index in Map
      uniqueData.push({
        sequence_header: item.sequence_header,
        entry_type: item.entry_type,
        report_year: item.report_year,
        male: item.male,
        female: item.female,
        total: item.total,
        grand_total: item.grand_total
      });
      seen.set(key, uniqueData.length - 1); // Store index
    } else {
      // Duplicate found – sum the values
      const index = seen.get(key);
      uniqueData[index].male += item.male;
      uniqueData[index].female += item.female;
      uniqueData[index].total += item.total;
      uniqueData[index].grand_total += item.grand_total;
    }
  }

  state.actuals.data = uniqueData;
  console.log('arrange_data ; state.actuals.data --4', uniqueData)
  console.log('arrange_data ; state.actuals.data --5', state.actuals.data)    
  } catch (error) {
    console.log(error)
    
  }

  const year = state.selected_year_id === 0 ? 2025 : state.selected_year_id;
  console.log('year -- 8', year)

  state.Selected_Rights_entry_config_values = [];


  try {

    for (const indicator of state.Rights_entry_config.data) {
      state.Selected_Rights_entry_config_values.push({
        sequence_header: indicator.sequence_header,
        description: indicator.description,
        tier_level: indicator.tier_level,
        agency_id: indicator.agency_id,
        male: indicator.male,
        female: indicator.female,
        total: indicator.total,
        grand_total: indicator.grand_total,
        is_annual: indicator.is_annual,
        group_header: indicator.group_header,
        group: indicator.group,

        //state.options.agencies.find(agency => agency.value === props.datasource)?.label || 'Unknown Agency'
        actual_male: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual'  )?.male || 0,
        actual_female: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual' )?.female || 0,
        actual_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual' )?.total || 0,
        actual_grand_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual' )?.grand_total || '',
        projected_male: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected' )?.male || 0,
        projected_female:  state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected' )?.female || 0,
        projected_total:  state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected' )?.total || 0,
        projected_grand_total:  state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected' )?.grand_total || '',
        national_proj_male: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected' )?.male || 0, 
        national_proj_female: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected' )?.female || 0, 
        national_proj_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected' )?.total || 0, 
        national_proj_grand_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected' )?.grand_total || '', 
        remarks: 't4et',

      })

    }

    console.log('Selected_Rights_entry_config_values --6', state.Selected_Rights_entry_config_values)

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

function arrange_data() {
 try { // this is done to sum the values of the same sequence_header, entry_type, report_year and grand_total mainly for quarterly reports
  state.actuals = []
  state.Selected_Rights_entry_config_values = []
  console.log('fetchRights_entry_config -- 1', state.Rights_entry_config)
  console.log('fetchReports_Details_Actuals passed_data -- 2', state.passed_data)
  console.log('arrange_data ; state.passed_data --3', state.passed_data)
  const seen = new Map();
  const uniqueData = [];

  for (const item of state.passed_data.data) { 
    const key = `${item.report_year}|${item.entry_type}|${item.sequence_header}|${item.grand_total}`;

    if (!seen.has(key)) {
      // Add to uniqueData and track index in Map
      uniqueData.push({
        sequence_header: item.sequence_header,
        entry_type: item.entry_type,
        report_year: item.report_year,
        male: item.male,
        female: item.female,
        total: item.total,
        grand_total: item.grand_total
      });
      seen.set(key, uniqueData.length - 1); // Store index
    } else {
      // Duplicate found – sum the values
      const index = seen.get(key);
      uniqueData[index].male += item.male;
      uniqueData[index].female += item.female;
      uniqueData[index].total += item.total;
      uniqueData[index].grand_total += item.grand_total;
    }
  }

  state.actuals.data = uniqueData;
  console.log('arrange_data ; state.actuals.data --4', uniqueData)
  console.log('arrange_data ; state.actuals.data --5', state.actuals.data)    
  } catch (error) {
    console.log(error)
    
  }


  try {

    for (const indicator of state.Rights_entry_config.data) {
      state.Selected_Rights_entry_config_values.push({
        sequence_header: indicator.sequence_header,
        description: indicator.description,
        tier_level: indicator.tier_level,
        agency_id: indicator.agency_id,
        male: indicator.male,
        female: indicator.female,
        total: indicator.total,
        grand_total: indicator.grand_total,
        is_annual: indicator.is_annual,
        group_header: indicator.group_header,
        group: indicator.group,

        //state.options.agencies.find(agency => agency.value === props.datasource)?.label || 'Unknown Agency'

       
       
       
        actual_male: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual' && cell.report_year === state.selected_year_id)?.male || 0,
        actual_female: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual' && cell.report_year === state.selected_year_id)?.female || 0,
        actual_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual' && cell.report_year === state.selected_year_id)?.total || 0,
        actual_grand_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual' && cell.report_year === state.selected_year_id)?.grand_total || '',
        projected_male: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected' && cell.report_year === state.selected_year_id)?.male || 0,
        projected_female:  state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected' && cell.report_year === state.selected_year_id)?.female || 0,
        projected_total:  state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected' && cell.report_year === state.selected_year_id)?.total || 0,
        projected_grand_total:  state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected' && cell.report_year === state.selected_year_id)?.grand_total || '',
        national_proj_male: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected' && cell.report_year === state.selected_year_id)?.male || 0, 
        national_proj_female: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected' && cell.report_year === state.selected_year_id)?.female || 0, 
        national_proj_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected' && cell.report_year === state.selected_year_id)?.total || 0, 
        national_proj_grand_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected' && cell.report_year === state.selected_year_id)?.grand_total || '', 
        remarks: 't4et',

      })

    }

    console.log('Selected_Rights_entry_config_values --6', state.Selected_Rights_entry_config_values)

  } catch (error) {
    console.log(error)
  }

}



async function fetchReports_Details_Actuals() {
    try {
       
        const response = await reportDetailsGroupsService.getReportDetailsGroups() // data is all of the entries and not filltered by rights_id
       

        if (response) {
            
            state.passed_data.data = response.data
            console.log('fetchReports_Details_Actuals passed_data', state.passed_data)
             //arrange_data()
        }
       
       

        



    } catch (error) {
        console.log(error)
    }
}

//------------------------------------------------------------------------------------------------------

definePageMeta({
    layout: 'main'
})

</script>