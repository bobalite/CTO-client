<template>
    <div class="w-full  px-2 py-16 sm:px-0">
      <TabGroup>
        <!-- <GridTabList :categories = "props.categories"/> -->
        <TabList class="w-full flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab class="w-full"
            v-for="category in Object.keys(categories)"
            as="template"
            :key="category"
            v-slot="{ selected }"
          >
            <button
              :class="[
                'rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
              ]"
            >
              {{ category }}
            </button>
          </Tab>
        </TabList>
  
        <TabPanels class="mt-2">
          <TabPanel
            v-for="(elements, idx) in Object.values(categories)"
            :key="idx"
            :class="[
              'rounded-xl bg-white p-3',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            ]"
            >
            <ul>
              <li
                v-for="element in elements"
                :key="element.id"
                class="relative rounded-md  hover:bg-gray-100"
                >
                <!-- <GridText :class = "'sm:col-span-6'" :name="actual_data" :inputId="'actual_data'"   /> -->
               
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  
                  <div class=" grid sm:col-span-10">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">
                      <!-- {{ element.tabName }} -->
                        <h3 class="text-sm font-medium leading-5">
                          {{ element.title }}
                          
                        </h3>
                    </label> 
                    <div v-if="element.show">
                      <input type=element.InputType class="block rounded-md border-0 px-3 py-1.5 pr-10 text-gray-900 ring-1 ring-inset placeholder:text-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-500 sm:text-base sm:leading-6"
                      aria-invalid="true" >
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </template>


  
<script setup>
  
  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

  const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    modelValue: String,
    disabled: {
        type: Boolean,
        default: false,
    },
    categories:{
      type: Object,
      required:true
    },tabpanel:{
        type: Object,
        required:true

    }
})
</script>

