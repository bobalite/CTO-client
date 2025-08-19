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
            <FormSelect name="selected_report_type" v-model="state.selected_graph_type" :options="selected_graph_type"
              @click="changeGraphType()" />
          </div>
        </div>
      </div>

    </div>

    <template v-if="state.selected_graph_type == 'none'">
      <PrintHeader />

      <template v-for="selected_right in state.Selected_Rights_entry_config_values">

        <template v-if="selected_right.tier_level == 1">
          <PrintRowheader v-if="selected_right.tier_level == 1" :group_number="selected_right.group"
            :group_header="selected_right.group_header" :datasource="selected_right.agency_id"
            :is_annual="selected_right.is_annual" />

          <PrintRow :indicator="selected_right.description" :male=1 :female=1 :total=1
            :grand_total="selected_right.grand_total" :actual_male="selected_right.actual_male || ''"
            :actual_female="selected_right.actual_male || ''" :actual_total="''"
            :actual_grand_total=selected_right.actual_grand_total :projected_male="''" :projected_female="''"
            :projected_total="''" :projected_grand_total=selected_right.projected_grand_total :national_proj_male="''"
            :national_proj_female="''" :national_proj_total="''"
            :national_proj_grand_total=selected_right.national_proj_grand_total />

        </template>
        <PrintRow v-if="selected_right.tier_level != 1" :indicator="selected_right.description"
          :male="selected_right.male" :female="selected_right.female" :total="selected_right.total"
          :grand_total="selected_right.grand_total" :actual_male=selected_right.actual_male
          :actual_female=selected_right.actual_female :actual_total=selected_right.actual_total
          :actual_grand_total=selected_right.actual_grand_total :projected_male=selected_right.projected_male
          :projected_female=selected_right.projected_female :projected_total=selected_right.projected_total
          :projected_grand_total=selected_right.projected_grand_total
          :national_proj_male=selected_right.national_proj_male
          :national_proj_female=selected_right.national_proj_female
          :national_proj_total=selected_right.national_proj_total
          :national_proj_grand_total=selected_right.national_proj_grand_total />



      </template>
    </template>


    <template v-if="state.selected_graph_type == 'type1'">
      <template v-for="selected_right in state.Selected_Rights_entry_config_values">

        <template v-if="selected_right.tier_level == 1">
          <div class="p-6 py-4 bg-white border-gray-500 border-b-2 border-t-2 border-l-2 border-r-2">
            <PrintGraphheader :group_number="selected_right.group" :group_header="selected_right.group_header"
              :datasource="selected_right.agency_id" :is_annual="selected_right.is_annual" />

            <PrintGraphrow :GraphData=state.graph_accomplishment[selected_right.group] :Years=years
              :key="state.refresh_graphs_toggle" />
          </div>
        </template>
      </template>
    </template>
    <template v-if="state.selected_graph_type != 'type2'">
      <!-- <div class="mt-6">
        <ApexCharts ref="chart" width="90%" height="350" type="area" :options="state.populationHoriOptions"
          :series="state.graphseries_all" :title.text="'Actual vs Projected and National Projected Comparisons'" />
      </div> -->
    </template>
    <PrintFooter />
    <button @click="printChart" class="print:hidden mt-4 bg-blue-500 text-white px-4 py-2 rounded">
      Print Report
    </button>
  </div>
</template>

<script setup>

import { ref, nextTick } from 'vue'
import { Rights_entry_configServices } from '~/components/api/Rights_entry_configService';
import { reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService';
import { Childrens_rightsService } from '~/components/api/Rights';
import { rolesService } from '~/components/api/Roles';
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
let currentPage = 1;

const dummyPercentageActualvsLocal = [84.8, 88.4, 91.1, 85.6, 75, 97]
const dummyPercentageActualvsNAtional = [88.3, 100, 96.8, 91.4, 125, 104]

let years = []

let Actuals = [0, 0, 0, 0, 0]
let Projected = [0, 0, 0, 0, 0]
let NationalProjected = [0, 0, 0, 0, 0]

const chartOptions = {
  chart: {
    type: 'line',
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
  },
  xaxis: {
    categories: years
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
  generateYears()
  
  fetchRights()
  fetchrole()
 

})

//--------------------------non-reactive variables----------------------------

let Rights_entry_config = []
let Rights_entry_config1 = []
let Rights_entry_config2 = []
let Rights_entry_config3 = []
let Rights_entry_config4 = []
let Rights_entry_config5 = []
let Rights_entry_config6 = []


const selected_graph_type = [
  { value: 'none', label: 'DILG Format' },
  { value: 'type1', label: 'Accomplishment Statistics' },
  { value: 'type2', label: 'Dashboard Graphs' }
]

const agencies = [
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

const entry_type = [
  { value: 'Actual', label: 'Actual' },
  { value: 'Projected', label: 'Projected' },
  { value: 'National Projected', label: 'National Projected' },
]

//--------------------------reactive variables----------------------------

const state = reactive({

  graphseries_all: [],
  graph_accomplishment: [],
  


  selected_rights_id: 1,
  selected_year_id: 0,
  selected_year: 2025,
  refresh_graphs_toggle: 0,
  selected_quarter: '',
  Rights: [],
  selected_graph_type: 'none',
  passed_data: [],

  actuals: [],
  projected: [],
  national_projected: [],
  remarks: [],


  Selected_Rights_entry_config: [],
  Selected_Rights_entry_config_group: [],

  Selected_Rights_entry_config_values: [],

  Actuals: [],
  Projected: [],
  NationalProjected: [],

  options: {

    report_years: [
      { value: 2025, label: '2025' },
      { value: 2024, label: '2024' },

    ],

    years: [
      { value: '1', label: 'Jan - Dec 2024' },
      { value: '2', label: 'Jan - Dec 2025' },

    ],

  },


  showGraphsGrp01: true,
  report_years: [],
  year: '2025',
  report_year: 1,

  populationHoriOptions: {
    chart: {
      type: 'line',
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
    },
    colors: ['#0891b2',
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

      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold'
      }
    },

    series: [{
      name: 'Accomplishment',
      data: Actuals
    }, {
      name: 'Projected (Local) ',
      data: Projected
    }, {
      name: 'Projected (National) ',
      data: NationalProjected
    }
    ],
    series_percentage: [{
      name: 'Accomplishment Vs Local',
      data: dummyPercentageActualvsLocal

    }, {
      name: 'Accomplishment Vs National',
      data: dummyPercentageActualvsNAtional
    }
    ],
    xaxis: {
      categories: years
    },
  },


})



//-----------------------------------------------// Props and reactive state----------------------------

function changeData() {


  //console.log('changeData', state.selected_rights_id)
  switch (state.selected_rights_id) {
    case (0):

      state.Selected_Rights_entry_config = Rights_entry_config
      break;
    case (1):

      state.Selected_Rights_entry_config = Rights_entry_config1
      break;
    case (2):

      state.Selected_Rights_entry_config = Rights_entry_config2
      break;
    case (3):

      state.Selected_Rights_entry_config = Rights_entry_config3
      break;
    case (4):

      state.Selected_Rights_entry_config = Rights_entry_config4
      break;
    case (5):

      state.Selected_Rights_entry_config = Rights_entry_config5
      break;
    case (6):

      state.Selected_Rights_entry_config = Rights_entry_config6
      break;
    default:

      state.Selected_Rights_entry_config = Rights_entry_config
    // console.log('Selected_Rights_entry_config', state.Selected_Rights_entry_config)
  }
  //console.log('Selected_Rights_entry_config', state.Selected_Rights_entry_config)

  if (state.refresh_graphs_toggle == false) {
    state.refresh_graphs_toggle = true
  } else {
    state.refresh_graphs_toggle = false
  }



  arrange_data()

  state.Actuals = [1331, 1570, 980, 950, 1440]
  state.Projected = [1540, 1970, 1444, 1333, 1222]
  state.NationalProjected = [1560, 1740, 1554, 1450, 1650]


  state.graphseries_all[0] = { name: "Actuals", data: state.Actuals };
  state.graphseries_all[1] = { name: "Projected", data: state.Projected };
  state.graphseries_all[2] = { name: "NationalProjected", data: state.NationalProjected };

}



function changeGraphType() {
  if (state.selected_graph_type === 'none') {
    state.showGraphsGrp01 = false;
  } else {
    state.showGraphsGrp01 = true;
  }
}



function changeYear() {

  try {
    state.selected_year = state.options.report_years[state.selected_year_id - 1].label
    state.selected_quarter = state.options.report_years[state.selected_year_id - 1].label
  } catch (error) {
    state.selected_year = 0
  }
  //console.log('changeYear state.selected_year_id', state.selected_year_id)
  //console.log('changeYear state.selected_year', state.selected_year)

  //arrange_data()
  fetchRights_entry_config()
  
  ArangeGraphData()
  


}

async function fetchRights() {
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
    for (const i in state.Rights.data) {

      data[i] = { "value": state.Rights.data[i].id, "label": state.Rights.data[i].description };

    }

    state.options.rights = data;
    console.log(state.options.rights)

  } catch (error) {
    console.log(error)
  }
}

async function fetchRights_entry_config() {

  try {

    const response = await Rights_entry_configServices.getRights_entry_config()

    if (response.data) {
      Rights_entry_config.data = response.data.filter(rights_id1 => rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
      Rights_entry_config1.data = response.data.filter(rights_id1 => rights_id1.rights_id === 1 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
      Rights_entry_config2.data = response.data.filter(rights_id1 => rights_id1.rights_id === 2 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
      Rights_entry_config3.data = response.data.filter(rights_id1 => rights_id1.rights_id === 3 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
      Rights_entry_config4.data = response.data.filter(rights_id1 => rights_id1.rights_id === 4 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
      Rights_entry_config5.data = response.data.filter(rights_id1 => rights_id1.rights_id === 5 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
      Rights_entry_config6.data = response.data.filter(rights_id1 => rights_id1.rights_id === 6 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)

    }
  } catch (error) {
    console.log(error)
  }


  try {
    const response = await reportDetailsGroupsService.getReportDetailsGroups() // data is all of the entries and not filltered by rights_id
    if (response) {
      //console.log('fetchRights_entry_config -- response', response.data)
      state.passed_data.data = []
      //state.passed_data.data = response.data
      for (const item of response.data) {

        if (item.report_year == state.selected_year_id) { // this is done to filter the data by report_year 
          state.passed_data.data.push(item)
        }

      }

      //console.log('fetchRights_entry_config -- passed_data', state.passed_data.data)
      //console.log('years', state.options.years)




    }

  } catch (error) {
    console.log(error)
  }

  //--------------------------------------------- arrange_data-----------
  try { // this is done to sum the values of the same sequence_header, entry_type, report_year and grand_total mainly for quarterly reports
    state.actuals = []
    // console.log('fetchRights_entry_config -- 1', state.Rights_entry_config)
    // console.log('fetchReports_Details_Actuals passed_data -- 2', state.passed_data)
    // console.log('arrange_data ; state.passed_data --3', state.passed_data)
    const seen = new Map();
    const uniqueData = [];
    const graphData = [];

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


        graphData.push({
          sequence_header: item.sequence_header,
          entry_type: item.entry_type,
          report_year: item.report_year

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
    //console.log('arrange_data ; state.actuals.data --4', uniqueData)
    //console.log('arrange_data ; state.actuals.data --5', state.actuals.data)
  } catch (error) {
    console.log(error)

  }

  const year = state.selected_year_id === 0 ? 2025 : state.selected_year_id;
  console.log('year -- 8', year)

  state.Selected_Rights_entry_config_values = [];


  try {

    for (const indicator of state.Selected_Rights_entry_config.data) {
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
        actual_male: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual')?.male || 0,
        actual_female: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual')?.female || 0,
        actual_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual')?.total || 0,
        actual_grand_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual')?.grand_total || '',
        projected_male: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected')?.male || 0,
        projected_female: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected')?.female || 0,
        projected_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected')?.total || 0,
        projected_grand_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected')?.grand_total || '',
        national_proj_male: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected')?.male || 0,
        national_proj_female: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected')?.female || 0,
        national_proj_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected')?.total || 0,
        national_proj_grand_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected')?.grand_total || '',
        remarks: 'test',

      })

    }

    //console.log('Selected_Rights_entry_config_values --6', state.Selected_Rights_entry_config_values)

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
    // console.log('fetchRights_entry_config -- 1', state.Rights_entry_config)
    // console.log('fetchReports_Details_Actuals passed_data -- 2', state.passed_data)
    // console.log('arrange_data ; state.passed_data --3', state.passed_data)
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
    // console.log('arrange_data ; state.actuals.data --4', uniqueData)
    // console.log('arrange_data ; state.actuals.data --5', state.actuals.data)    
  } catch (error) {
    console.log(error)

  }

  const year = state.selected_year_id === 0 ? 2025 : state.selected_year_id;
  //console.log('year -- 8', year)

  state.Selected_Rights_entry_config_values = [];


  try {

    for (const indicator of state.Selected_Rights_entry_config.data) {
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
        actual_male: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual')?.male || 0,
        actual_female: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual')?.female || 0,
        actual_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual')?.total || 0,
        actual_grand_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Actual')?.grand_total || '',
        projected_male: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected')?.male || 0,
        projected_female: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected')?.female || 0,
        projected_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected')?.total || 0,
        projected_grand_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'Projected')?.grand_total || '',
        national_proj_male: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected')?.male || 0,
        national_proj_female: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected')?.female || 0,
        national_proj_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected')?.total || 0,
        national_proj_grand_total: state.actuals.data.find(cell => cell.sequence_header === indicator.sequence_header && cell.entry_type === 'National Projected')?.grand_total || '',
        remarks: 'test',

      })





    }



  } catch (error) {
    console.log(error)
  }

  ArangeGraphData()
  

}





//------------------------------------------------------------------------------------------------------

function ArangeGraphData() {
  
  try {

    for (const indicator of Rights_entry_config.data) {

      if (indicator.tier_level == 1) {

        if (!state.graph_accomplishment[indicator.group]) 
          state.graph_accomplishment[indicator.group] = {} // create group if it doesn't exist

          if (!state.graph_accomplishment[indicator.group]['Actuals']) 
            state.graph_accomplishment[indicator.group]['Actuals'] = {} // create Actuals if it doesn't exist
          state.graph_accomplishment[indicator.group]['Actuals'] = [0,0,0,0,0]
          if (!state.graph_accomplishment[indicator.group]['Projected']) 
            state.graph_accomplishment[indicator.group]['Projected'] = {} // create Projected if it doesn't exist
          state.graph_accomplishment[indicator.group]['Projected'] = [0,0,0,0,0]
          if (!state.graph_accomplishment[indicator.group]['NationalProjected']) 
            state.graph_accomplishment[indicator.group]['NationalProjected'] = {} // create NationalProjected if it doesn't exist
           state.graph_accomplishment[indicator.group]['NationalProjected'] = [0,0,0,0,0]

        for (let i = 0; i < years.length; i++) {

           state.graph_accomplishment[indicator.group]['Actuals'][i] =  state.actuals.data.find(cell =>
               cell.sequence_header === indicator.sequence_header &&
               cell.entry_type === 'Actual' &&
               cell.report_year === years[i]
             )?.grand_total || 0

           state.graph_accomplishment[indicator.group]['Projected'][i] =  state.actuals.data.find(cell =>
               cell.sequence_header === indicator.sequence_header &&
               cell.entry_type === 'Projected' &&
               cell.report_year === years[i]
               )?.grand_total || 0
           
           state.graph_accomplishment[indicator.group]['NationalProjected'][i] = state.actuals.data.find(cell =>
               cell.sequence_header === indicator.sequence_header &&
               cell.entry_type === 'National Projected' &&
               cell.report_year === years[i]
             )?.grand_total || 0

        }
      }
    }

  } catch (error) {
    console.log('ArangeGraphData error', error)
  }
}

function generateYears() {
  const currentYear = new Date().getFullYear()
  state.options.years = [] // clear first

  for (let i = 4; i >= 0; i--) {
    const year = currentYear - i
    years.push(String(currentYear - i))
    state.options.years.push({ value: year, label: String(year) })
  }


}

definePageMeta({
  layout: 'main'
})

</script>