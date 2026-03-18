<template>
  <div v-if="isPageBlocked" class="p-6">
    <div class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 font-semibold">
      You do not have permission to view this page.
    </div>
  </div>

  <template v-else>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">ENCODE DATA INDICATORS</h1>
    </div>

    <div class="mt-8 flow-root">
      <div class="flex gap2 sm:gap-3 items-center">
        <div class="flex-1">
          <FormYearSelector
            v-model="state.selected_year_id"
            :options="state.options.years"
          />

          <FormRightSelector
            :options="state.options.rights"
            v-model="state.selected_rights_id"
            @click="changeData"
          />
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
          <template v-for="category in filteredCategories" :key="category.id">
            <!-- CATEGORY LEVEL -->
            <tr
              class="border-b hover:bg-gray-50 cursor-pointer transition"
              @click="toggleCategory(category.id)"
            >
              <td class="px-4 py-3 font-medium flex items-center gap-2">
                <svg
                  :class="[
                    'w-4 h-4 transform transition-transform duration-200',
                    expandedCategories.includes(category.id) ? 'rotate-90' : ''
                  ]"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {{ category.description }}
              </td>
              <td></td>
            </tr>

            <!-- SUBCATEGORY LEVEL -->
            <template v-if="expandedCategories.includes(category.id)">
              <template
                v-for="subcategory in category.indicator_subcategories"
                :key="subcategory.id"
              >
                <tr class="bg-gray-50 border-b">
                  <td
                    colspan="2"
                    class="pl-8 py-2 flex items-center justify-between cursor-pointer"
                    @click="toggleSubcategory(subcategory.id)"
                  >
                    <div class="flex items-center gap-2">
                      <svg
                        :class="[
                          'w-4 h-4 transform transition-transform duration-200',
                          expandedSubcategories.includes(subcategory.id) ? 'rotate-90' : ''
                        ]"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                      >
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
                      <div
                        v-show="expandedSubcategories.includes(subcategory.id)"
                        class="pl-16 py-2 text-sm text-gray-700 overflow-hidden"
                      >
                        <template
                          v-for="group in subcategory.indicator_groups"
                          :key="group.id"
                        >
                          <template v-if="hasVisibleElements(group)">
                            <div
                              class="py-2 pl-4 border-l border-gray-300 cursor-pointer rounded"
                              @click.stop="toggleGroup(group.id)"
                            >
                              <!-- GROUP HEADER + ACTIONS -->
                              <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2 font-semibold">
                                  <svg
                                    :class="[
                                      'w-3 h-3 transform transition-transform duration-200',
                                      expandedGroups.includes(group.id) ? 'rotate-90' : ''
                                    ]"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                  >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                                  Group {{ group.group_no }}
                                </div>

                                <div class="flex gap-2 pr-4">
                                  <button
                                    v-if="canAddEntry(group)"
                                    class="text-xs bg-green-700 text-white px-2 py-0.5 rounded hover:bg-green-500 hover:text-black"
                                    @click.stop="openGroupModal('add', sanitizedGroup(group), category.description, subcategory.description)"
                                  >
                                    Add Entry
                                  </button>

                                  <button
                                    v-if="canViewEntries(group)"
                                    class="text-xs bg-blue-700 text-white px-2 py-0.5 rounded hover:bg-blue-500 hover:text-black"
                                    @click.stop="openGroupModal('view', sanitizedGroup(group), category.description, subcategory.description)"
                                  >
                                    View Entries
                                  </button>
                                </div>
                              </div>

                              <!-- GROUP ELEMENTS -->
                              <transition name="slide-fade">
                                <div
                                  v-show="expandedGroups.includes(group.id)"
                                  class="pl-8 py-2 text-gray-600 space-y-1"
                                >
                                  <ul class="list-disc pl-4">
                                    <li
                                      v-for="element in visibleElements(group)"
                                      :key="element.id"
                                      class="py-1"
                                    >
                                      <span
                                        v-if="getAgency(element.agency_id)"
                                        class="ml-2 text-xs text-white px-2 py-0.5 rounded"
                                        :class="getAgency(element.agency_id).color"
                                      >
                                        {{ getAgency(element.agency_id).label }}
                                      </span>

                                      <span class="font-semibold pl-3">
                                        {{ element.indicator_no }}
                                      </span>
                                      {{ element.description }}
                                      <span class="text-xs text-gray-400 ml-2">
                                        ({{ element.value_type }})
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </transition>
                            </div>
                          </template>
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

      <ModalGroupadd
        :modalTitle="'Add / Edit Entries'"
        :show="showGroupadd"
        :mode="modalMode"
        :group="selectedGroup"
        :category="selectedCategoryDesc"
        :subcategory="selectedSubcategoryDesc"
        :selected_year_id="state.selected_year_id"
        :selected_year="state.selected_year"
        @close="showGroupadd = false"
      />

      <ModalGroupview
        :modalTitle="'View Data Entries'"
        :show="showGroupview"
        :mode="modalMode"
        :group="selectedGroup"
        :category="selectedCategoryDesc"
        :subcategory="selectedSubcategoryDesc"
        :selected_year_id="state.selected_year_id"
        :selected_year="state.selected_year"
        @close="showGroupview = false"
      />
    </div>
  </template>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { indicatorService } from '~/components/api/IndicatorCategoryService'
import { rolesService } from '~/components/api/Roles'
import { useUserStore } from '~/store/user'
import { report_yearService } from '~/components/api/ReportYears'
import { Childrens_rightsService } from '~/components/api/Rights'

const userStore = useUserStore()

definePageMeta({
  layout: 'main',
  middleware: ['auth-only'],
})

const state = reactive({
  Rights: { data: [] },
  Rights_entry_config: [],
  report_years: { data: [] },

  selected_year: '',
  selected_year_id: 1,
  selected_rights_id: 1,
  categories: [],

  Rights_entry_config1: [],
  Rights_entry_config2: [],
  Rights_entry_config3: [],
  Rights_entry_config4: [],
  Rights_entry_config5: [],
  Rights_entry_config6: [],

  Selected_Rights_entry_config: { data: [] },

  roles: null,
  currentUser: null,

  options: {
    years: [
      { value: '1', label: 'Jan - Dec 2024', year: '2024' },
      { value: '2', label: 'Jan - Dec 2025', year: '2025' },
    ],
    rights: [],
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
  },
})

const expandedCategories = ref([])
const expandedSubcategories = ref([])
const expandedGroups = ref([])
const showGroupadd = ref(false)
const showGroupview = ref(false)

const selectedGroup = ref(null)
const modalMode = ref('add')
const selectedCategoryDesc = ref('')
const selectedSubcategoryDesc = ref('')

const currentRoleName = computed(() => {
  return (
    state.roles?.name ||
    userStore?.getUser?.userRole?.name ||
    ''
  ).toUpperCase()
})

const currentAgencyId = computed(() => {
  return Number(
    state.currentUser?.id ??
    state.currentUser ??
    userStore?.getUser?.userRole?.agency_id ??
    0
  )
})

const isAdminLike = computed(() =>
  ['ADMIN', 'SUPER_USER'].includes(currentRoleName.value)
)

const isAgencyUser = computed(() => currentRoleName.value === 'AGENCY_USER')
const isAgencyLimitedUser = computed(() => currentRoleName.value === 'AGENCY_LIMITED_USER')
const isGuestOrBlocked = computed(() =>
  ['GUEST_USER', 'BLOCKED_USER'].includes(currentRoleName.value)
)

const isPageBlocked = computed(() => isGuestOrBlocked.value)

const rawCategories = computed(() => state.Selected_Rights_entry_config.data || [])

const filteredCategories = computed(() => {
  if (isPageBlocked.value) return []

  return rawCategories.value
    .map(category => {
      const filteredSubcategories = (category.indicator_subcategories || [])
        .map(subcategory => {
          const filteredGroups = (subcategory.indicator_groups || [])
            .filter(group => hasVisibleElements(group))

          return {
            ...subcategory,
            indicator_groups: filteredGroups,
          }
        })
        .filter(subcategory => (subcategory.indicator_groups || []).length > 0)

      return {
        ...category,
        indicator_subcategories: filteredSubcategories,
      }
    })
    .filter(category => (category.indicator_subcategories || []).length > 0)
})

const getAgency = (id) => {
  return state.options.agencies.find(a => Number(a.value) === Number(id)) || null
}

function visibleElements(group) {
  const elements = group?.indicator_group_elements || []

  if (isAdminLike.value) {
    return elements
  }

  if (isAgencyUser.value || isAgencyLimitedUser.value) {
    return elements.filter(
      element => Number(element.agency_id) === Number(currentAgencyId.value)
    )
  }

  return []
}

function hasVisibleElements(group) {
  return visibleElements(group).length > 0
}

function sanitizedGroup(group) {
  return {
    ...group,
    indicator_group_elements: visibleElements(group),
  }
}

function canAddEntry(group) {
  if (isGuestOrBlocked.value) return false

  if (isAdminLike.value) return true

  if (isAgencyUser.value) {
    return hasVisibleElements(group)
  }

  if (isAgencyLimitedUser.value) {
    return false
  }

  return false
}

function canViewEntries(group) {
  if (isGuestOrBlocked.value) return false

  if (isAdminLike.value) return true

  if (isAgencyUser.value || isAgencyLimitedUser.value) {
    return hasVisibleElements(group)
  }

  return false
}

onMounted(() => {
  fetchreportyear()
  fetchRights()
  fetchrole()
  fetchRights_entry_config()
})

async function fetchreportyear() {
  try {
    const response = await report_yearService.getReportYears()
    const src = Array.isArray(response?.data) ? response.data : []

    state.report_years.data = src

    const years = src
      .filter(item => Number(item?.status) === 1)
      .filter(item => Number(item?.encoding_locked ?? item?.is_locked ?? 0) === 0)
      .map(item => ({
        value: Number(item.id),
        label: item.name,
        year: String(item.year ?? ''),
      }))

    state.options.years = years

    if (!years.some(y => Number(y.value) === Number(state.selected_year_id))) {
      state.selected_year_id = years[0]?.value ?? 1
    }

    changeYear()
    changeData()
  } catch (error) {
    console.error('fetchreportyear error', error)
  }
}

function changeYear() {
  const found = (state.options.years || []).find(
    y => Number(y?.value) === Number(state.selected_year_id)
  )

  state.selected_year = found?.year ?? ''
}

async function fetchRights_entry_config() {
  try {
    const response = await indicatorService.getIndicatorCategories()

    if (response.data) {
      state.Rights_entry_config = response.data

      const grouped = {}

      response.data.forEach(item => {
        const id = item.right_id
        if (!grouped[id]) grouped[id] = []
        grouped[id].push(item)
      })

      Object.entries(grouped).forEach(([id, items]) => {
        state[`Rights_entry_config${id}`] = { data: items }
      })

      changeYear()
      changeData()
    }
  } catch (error) {
    console.error('Error fetching rights entry config:', error)
  }
}

async function fetchrole() {
  try {
    const roleId = userStore?.getUser?.userRole?.role_id
    const agencyId = userStore?.getUser?.userRole?.agency_id

    state.currentUser = agencyId

    const response = await rolesService.getRole(roleId)

    if (response.data) {
      state.roles = response.data
    }
  } catch (error) {
    console.log(error)
  }
}

async function fetchRights() {
  try {
    const response = await Childrens_rightsService.getRights()

    if (response.data) {
      state.Rights.data = response.data
    }

    state.options.rights = state.Rights.data.map(item => ({
      value: item.id,
      label: item.description,
    }))
  } catch (error) {
    console.log('fetchRights error', error)
  }
}

function changeData() {
  const id = Number(state.selected_rights_id) || 0
  const key = id === 0 ? 'Rights_entry_config' : `Rights_entry_config${id}`
  state.Selected_Rights_entry_config = state[key] || state.Rights_entry_config
}

const toggleInArray = (arr, id) => {
  const index = arr.value.indexOf(id)
  index === -1 ? arr.value.push(id) : arr.value.splice(index, 1)
}

const toggleCategory = (id) => toggleInArray(expandedCategories, id)
const toggleSubcategory = (id) => toggleInArray(expandedSubcategories, id)
const toggleGroup = (id) => toggleInArray(expandedGroups, id)

function openGroupModal(mode, group, categoryDesc = '', subcategoryDesc = '') {
  if (mode === 'add' && !canAddEntry(group)) return
  if (mode === 'view' && !canViewEntries(group)) return

  if (mode === 'add') {
    modalMode.value = mode
    selectedGroup.value = sanitizedGroup(group)
    showGroupadd.value = true
    selectedCategoryDesc.value = categoryDesc
    selectedSubcategoryDesc.value = subcategoryDesc
  }

  if (mode === 'view') {
    modalMode.value = mode
    selectedGroup.value = sanitizedGroup(group)
    showGroupview.value = true
    selectedCategoryDesc.value = categoryDesc
    selectedSubcategoryDesc.value = subcategoryDesc
  }
}

watch(() => state.selected_year_id, () => {
  changeYear()
  changeData()
})
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