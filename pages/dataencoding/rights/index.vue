<template>

    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">ENCODE DATA INDICATORS</h1>

    </div>
    <div class="mt-8 flow-root">

        <div class="flex gap2 sm:gap-3 items-center">
            <div class="flex-1">
                <FormYearSelector v-model="state.selected_year_id" :options="state.options.years"
                    :change-selected-year="changeYear()" />

                <FormRightSelector :options="state.options.rights" v-model="state.selected_rights_id"
                            @click="changeData" />
            </div>
            <div class="flex-1">

            </div>
        </div>
    </div>

    <div class="p-6">
        <table class="min-w-full border border-gray-300 rounded-xl overflow-hidden">
            <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                    <th class="px-4 py-2 text-left w-3/4">Indicator</th>
                    <th class="px-4 py-2 text-left">Actions</th>
                </tr>
            </thead>

            <tbody>
                <!-- CATEGORY LEVEL -->
                <template v-for="category in categories" :key="category.id">
                    <tr class="border-b hover:bg-gray-50 cursor-pointer transition"
                        @click="toggleCategory(category.id)">
                        <td class="px-4 py-3 font-medium flex items-center gap-2">
                            <svg :class="['w-4 h-4 transform transition-transform duration-200', expandedCategories.includes(category.id) ? 'rotate-90' : '']"
                                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            {{ category.description }}
                        </td>

                    </tr>

                    <!-- SUBCATEGORY LEVEL -->
                    <template v-if="expandedCategories.includes(category.id)">
                        <template v-for="subcategory in category.indicator_subcategories" :key="subcategory.id">
                            <tr class="bg-gray-50 border-b">
                                <td colspan="2" class="pl-8 py-2 flex items-center justify-between  cursor-pointer"
                                    @click="toggleSubcategory(subcategory.id)">
                                    <div class="flex items-center gap-2">
                                        <svg :class="['w-4 h-4 transform transition-transform duration-200', expandedSubcategories.includes(subcategory.id) ? 'rotate-90' : '']"
                                            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                        {{ subcategory.description }}
                                    </div>
                                </td>
                            </tr>

                            <!-- GROUP LEVEL -->
                            <tr>
                                <td colspan="2" class="p-0 bg-gray-50 border-b">
                                    <transition name="slide-fade">
                                        <div v-show="expandedSubcategories.includes(subcategory.id)"
                                            class="pl-16 py-2 text-sm text-gray-700 overflow-hidden">
                                            <template v-for="group in subcategory.indicator_groups" :key="group.id">
                                                <div class="py-2 pl-4 border-l border-gray-300 cursor-pointer  rounded"
                                                    @click.stop="toggleGroup(group.id)">
                                                    <div class="flex items-center justify-between">
                                                        <div class="flex items-center gap-2 font-semibold">
                                                            <svg :class="['w-3 h-3 transform transition-transform duration-200', expandedGroups.includes(group.id) ? 'rotate-90' : '']"
                                                                fill="none" stroke="currentColor" stroke-width="2"
                                                                viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M9 5l7 7-7 7" />
                                                            </svg>
                                                            Group {{ group.group_no }} 
                                                        </div>

                                                    </div>

                                                    <!-- GROUP ELEMENTS -->
                                                    <transition name="slide-fade">
                                                        <div v-show="expandedGroups.includes(group.id)"
                                                            class="pl-8 py-2 text-gray-600 space-y-1">
                                                            <ul class="list-disc pl-4">
                                                                <li v-for="element in group.indicator_group_elements"
                                                                    :key="element.id"
                                                                    class="py-1 flex justify-between items-center group hover:bg-green-400 rounded">
                                                                    <div>
                                                                        <span class="font-semibold">{{
                                                                            element.indicator_no }}
                                                                        </span>
                                                                        {{ element.description }}
                                                                        <span class="text-xs text-gray-400 ml-2">({{
                                                                            element.value_type }})</span>
                                                                    </div>
                                                                    <div
                                                                        class="flex gap-2 opacity-0 group-hover:opacity-100 transition">

                                                                        <button
                                                                            class="text-xs bg-green-700 text-white px-2 py-0.5 rounded hover:bg-green-500 hover:text-black"
                                                                            @click.stop="openAddElementModal(group, element)">
                                                                            Add Entry
                                                                        </button>

                                                                        <button
                                                                            class="text-xs bg-green-700 text-white px-2 py-0.5 rounded hover:bg-green-500 hover:text-black"
                                                                            @click.stop="openEditElementModal(group, element)">
                                                                            Edit Entry
                                                                        </button>
                                                                        <button
                                                                            class="text-xs bg-green-700 text-white px-2 py-0.5 rounded hover:bg-green-500 hover:text-black"
                                                                            @click.stop="deleteElement(group, element)">
                                                                            Delete Entry
                                                                        </button>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </transition>
                                                </div>
                                            </template>
                                        </div>
                                    </transition>
                                </td>
                            </tr>
                        </template>
                    </template>
                </template>
            </tbody>
        </table>

        <!-- MODAL -->
        <transition name="fade">
            <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg shadow-lg w-96 p-6">
                    <h2 class="text-lg font-semibold mb-4">
                        {{ modalMode === 'add' ? 'Add New Element' : 'Edit Element' }}
                    </h2>

                    <form @submit.prevent="saveElement">
                        <div class="space-y-3">
                            <div>
                                <label class="text-sm font-medium">Indicator No</label>
                                <input v-model="modalData.indicator_no" type="text"
                                    class="w-full border px-2 py-1 rounded" />
                            </div>
                            <div>
                                <label class="text-sm font-medium">Description</label>
                                <textarea v-model="modalData.description"
                                    class="w-full border px-2 py-1 rounded"></textarea>
                            </div>
                            <div>
                                <label class="text-sm font-medium">Value Type</label>
                                <input v-model="modalData.value_type" type="text"
                                    class="w-full border px-2 py-1 rounded" />
                            </div>
                            <div>
                                <label class="text-sm font-medium">Total</label>
                                <input v-model.number="modalData.total" type="number"
                                    class="w-full border px-2 py-1 rounded" />
                            </div>
                        </div>

                        <div class="flex justify-end gap-2 mt-4">
                            <button type="button" class="px-3 py-1 rounded border" @click="closeModal">Cancel</button>
                            <button type="submit" class="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {indicatorService} from '~/components/api/IndicatorCategoryService';
import { rolesService } from '~/components/api/Roles';
import { useUserStore } from '~/store/user'
import { report_yearService } from '~/components/api/ReportYears';
import { Childrens_rightsService } from '~/components/api/Rights';


definePageMeta({
    layout: 'main'
})


onMounted(() => {
    fetchreportyear()
    fetchRights()
    
    //fetchrole()
    fetchRights_entry_config()

})

const categories = computed(() => state.Selected_Rights_entry_config.data)

const state = reactive({

    Rights: [],
    Rights_entry_config: [],
    report_years:[],
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
    Selected_Rights_entry_config: [],


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

function changeYear() {
    state.selected_year_id = state.selected_year_id
    state.selected_year = state.options.years.find(year => year.value === state.selected_year_id)?.year || '';
    console.log('selected_year = ', state.selected_year)
}



async function fetchRights_entry_config() {
  try {
    const response = await indicatorService.getIndicatorCategories()
    console.log(response)

    if (response.data) {
      // store all data
      state.Rights_entry_config = response.data

      // group data dynamically by right_id
      const grouped = {}

      response.data.forEach(item => {
        const id = item.right_id
        if (!grouped[id]) grouped[id] = []
        grouped[id].push(item)
      })

      // dynamically assign to state
      Object.entries(grouped).forEach(([id, items]) => {
        state[`Rights_entry_config${id}`] = { data: items }
      })

      console.log('Dynamic Rights_entry_config groups:', grouped)
      console.log('state.Rights_entry_config1', state.Rights_entry_config1)
    }
  } catch (error) {
    console.error('Error fetching rights entry config:', error)
  }
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
        console.log( 'state.options.rights',state.options.rights)
    } catch (error) {
        console.log('fetchRights error', error)
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



// ---------- DUMMY JSON resembling your Laravel response ----------




// const categories = ref([
//     {
//         id: 1,
//         description: "Education",
//         indicator_subcategories: [
//             {
//                 id: 11,
//                 description: "Primary Education",
//                 indicator_groups: [
//                     {
//                         id: 111,
//                         group_no: 1,
//                         encoding_type: "Numeric",
//                         indicator_group_elements: [
//                             { id: 1111, indicator_no: "1.1.1", description: "Enrollment Rate", value_type: "Percent", total: 100 },
//                             { id: 1112, indicator_no: "1.1.2", description: "Graduation Rate", value_type: "Percent", total: 90 },
//                         ],
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: 2,
//         description: "Health",
//         indicator_subcategories: [
//             {
//                 id: 21,
//                 description: "Public Health",
//                 indicator_groups: [
//                     {
//                         id: 211,
//                         group_no: 1,
//                         encoding_type: "Decimal",
//                         indicator_group_elements: [
//                             { id: 2111, indicator_no: "2.1.1", description: "Infant Mortality Rate", value_type: "Rate", total: 5.3 },
//                             { id: 2112, indicator_no: "2.1.2", description: "Life Expectancy", value_type: "Years", total: 72 },
//                         ],
//                     },
//                 ],
//             },
//         ],
//     },
// ])


// ---------------------------------------------------------------

// Expanded states
const expandedCategories = ref([])
const expandedSubcategories = ref([])
const expandedGroups = ref([])

// Modal data
const showModal = ref(false)
const modalMode = ref('add') // add | edit
const modalData = ref({})
const activeGroup = ref(null)

// Expansion logic
const toggleInArray = (arr, id) => {
    const index = arr.value.indexOf(id)
    index === -1 ? arr.value.push(id) : arr.value.splice(index, 1)
}
const toggleCategory = (id) => toggleInArray(expandedCategories, id)
const toggleSubcategory = (id) => toggleInArray(expandedSubcategories, id)
const toggleGroup = (id) => toggleInArray(expandedGroups, id)



const openAddElementModal = (group, element) => {
    activeGroup.value = group
    modalMode.value = 'Add Entry'
    modalData.value = { ...element }
    showModal.value = true
}

const openEditElementModal = (group, element) => {
    activeGroup.value = group
    modalMode.value = 'Edit Entry'
    modalData.value = { ...element }
    showModal.value = true
}
const closeModal = () => (showModal.value = false)

// CRUD actions
const saveElement = () => {
    if (modalMode.value === 'add') {
        const newElement = { id: Date.now(), ...modalData.value }
        activeGroup.value.indicator_group_elements.push(newElement)
    } else if (modalMode.value === 'edit') {
        const index = activeGroup.value.indicator_group_elements.findIndex(el => el.id === modalData.value.id)
        if (index !== -1) activeGroup.value.indicator_group_elements[index] = { ...modalData.value }
    }
    closeModal()
}
const deleteElement = (group, element) => {
    if (confirm(`Delete "${element.description}"?`)) {
        group.indicator_group_elements = group.indicator_group_elements.filter(el => el.id !== element.id)
    }
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 250ms cubic-bezier(.2, .8, .2, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
