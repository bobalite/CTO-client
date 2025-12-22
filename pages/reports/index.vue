<template>

  <!-- SCREEN ONLY: FILTER / CONTROLS -->
  <div class="print:hidden flex items-center justify-between mt-6 px-4">
    <div class="flow-root w-full">
      <!-- Controls -->
      <div class="mt-8 flow-root">
        <div class="flex gap2 sm:gap-3 items-center">
         <div class="flex-1">
            <FormYearSelector v-model="state.selected_year_id" :options="state.options.years"
              :change-selected-year="changeYear()" />
            <FormRightSelector :options="state.options.rights" v-model="state.selected_rights_id"
              @update:modelValue="changeData" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <PrintHeader />

    <!-- CATEGORY -->
    <template v-for="category in categories" :key="category.id">
      <PrintRowcategory :description="category.description" />

      <!-- SUBCATEGORY -->
      <template v-for="subcategory in (category.indicator_subcategories || [])" :key="subcategory.id">
        <div class="grid grid-cols-[160px_1fr] gap-4 border-t border-gray-300 py-3 items-stretch">
          <!-- LEFT: SUBCATEGORY LABEL -->
          <div class="flex items-center px-3">
            <div class="subcategory-label w-full">
              {{ subcategory.description }}
            </div>
          </div>

          <!-- RIGHT: GROUPS -->
          <div class="space-y-3">
            <template v-for="group in (subcategory.indicator_groups || [])" :key="group.id">
              <div class="border border-gray-300 rounded p-2">
                <!-- GROUP HEADER -->
                <div class="font-semibold text-sm mb-2">
                  Group {{ group.group_no }}
                </div>

                <!-- GROUP ELEMENTS -->
                <div class="space-y-1">
                  <template v-for="el in (group.indicator_group_elements || [])" :key="el.id">
                    <PrintRowIndicator :indicator_no="el.indicator_no" :description="el.description"
                      :agency="getAgency(el.agency_id)?.label" :submission_type="el.submition_type"
                      :encoding_type="group.encoding_type" :male="el.male" :female="el.female" :total="el.total"
                      :remarks="el.remarks" />
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </template>

    <PrintFooter />

    <!-- PRINT BUTTON -->
    <button @click="printChart" class="print:hidden mt-4 bg-blue-600 text-white px-4 py-2 rounded">
      Print Report
    </button>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, nextTick } from 'vue'
import { indicatorService } from '~/components/api/IndicatorCategoryService'
import { useUserStore } from '~/store/user'
import { Childrens_rightsService } from '~/components/api/Rights';

definePageMeta({ layout: 'main' })

const userStore = useUserStore()


/* ------------------ STATE ------------------ */



const state = reactive({

  Selected_Rights_entry_config: { data: [] },
  Rights: [],
  Rights_entry_config: [],
  report_years: [],
  selected_year: '',
  selected_year_id: 1,
  selected_rights_id: 1,
  categories: [],

  Rights_entry_config: [],
  Rights_entry_config1: [],
  Rights_entry_config2: [],
  Rights_entry_config3: [],
  Rights_entry_config4: [],
  Rights_entry_config5: [],
  Rights_entry_config6: [],
  //Selected_Rights_entry_config: [],




  options: {
    years: [
      { value: '1', label: 'Jan - Dec 2024', year: '2024' },
      { value: '2', label: 'Jan - Dec 2025', year: '2025' },
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
  }

})
/* ------------------ COMPUTED ------------------ */

const categories = computed(() => {
  return state.Selected_Rights_entry_config.data || []
})

/* ------------------ HELPERS ------------------ */

const getAgency = (id) => {
  return [
    { value: 1, label: 'SOCC' },
    { value: 2, label: 'CHO' },
    { value: 3, label: 'DepEd' },
    { value: 4, label: 'CSWDO' },
  ].find(a => a.value === id)
}

/* ------------------ FETCH ------------------ */

onMounted(async () => {
  const response = await indicatorService.getIndicatorCategories()
  state.Selected_Rights_entry_config = { data: response.data }
  fetchreportyear()
  fetchRights()
  fetchrole()
  fetchRights_entry_config()
})

/* ------------------ PRINT ------------------ */

const printChart = async () => {
  await nextTick()
  setTimeout(() => window.print(), 200)
}

function changeYear() {
  state.selected_year_id = state.selected_year_id
  state.selected_year = state.options.years.find(year => year.value === state.selected_year_id)?.year || '';
  console.log('selected_year_id = ', state.selected_year_id)
  fetchRights()
}

async function fetchreportyear() {
    try {
        const response = await report_yearService.getReportYears()
        //console.log(response)
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
                state.options.years = data;
                //console.log(state.options.report_years)
            }

        }
    } catch (error) {
        //console.log(error)
    }
}


function changeData() {
  const id = Number(state.selected_rights_id) || 0

  // dynamically build the key
  const key = id === 0 ? 'Rights_entry_config' : `Rights_entry_config${id}`

  // safely assign if exists, else fallback
  state.Selected_Rights_entry_config = state[key] || state.Rights_entry_config

  console.log('Selected_Rights_entry_config:', state.Selected_Rights_entry_config)
}

async function fetchRights() {
    try {
        const response = await Childrens_rightsService.getRights()

        if (response.data) {
            state.Rights.data = response.data
            //console.log(state.Rights.data[0].description)
        }
        var data = [];
        for (const i in state.Rights.data) {
            data[i] = { "value": state.Rights.data[i].id, "label": state.Rights.data[i].description };
        }
        state.options.rights = data;
        console.log('state.options.rights', state.options.rights)
    } catch (error) {
        console.log('fetchRights error', error)
    }
}



</script>

<style scoped>
.subcategory-label {
  font-size: 0.95rem;
  font-weight: 800;
  line-height: 1.35;

  text-align: left;

  /* wrapping + overflow safety */
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  max-width: 100%;

  color: #111827;
  /* gray-900 */
}
</style>
