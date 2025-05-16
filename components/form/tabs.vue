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
             
              <div
                v-for="element in elements"
                :key="element.id"
                class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                >
                <template >
                   
                      <GridSpacer v-if="element.show" :class="element.class" :displaytext="element.title"/>
                   
                </template>
              </div>
            </ul>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </template>


  
  <script setup>
  import { ref } from 'vue'
  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

//   const props = defineProps({
//     name: {
//         type: String,
//         required: true,
//     },
//     modelValue: String,
//     disabled: {
//         type: Boolean,
//         default: false,
//     },
//     categories:{
//       type: Object,
//       required:true
//     }
// })

  
  const categories = ref({
    Development: [
      {
        id: 1,
        InputType: 'none',
        InputName: 'none',
        InputLabel:'Number of fully immunized children',
        title:  '1.1. Percentage coverage of Fully Immunized Children (FIC) aged 12 months old',
        show:true,
        class:'sm:col-span-6'
        
      },
      {
        id: 2,
        title: "Number of fully immunized children ",
        show:true,
        InputName: 'Input_123',
        InputLabel:'Number of fully immunized children',
        InputType: 'text'
      },
      {
        id: 3,
        title: "Total population of 12 months old",
        show:true,
        InputName: 'totalPopulation12months',
        InputLabel:'Total population of 12 months old',
        InputType: 'text'
      },
      {
        id: 2,
        title: "Percentage Coverage",
        InputName: 'Input_123',
      },
      {
        id: 2,
        title: "Input4",
        InputName: 'Input_123',
      },
      {
        id: 2,
        title: "Input5",
        InputName: 'Input_123',
      },
      {
        id: 2,
        title: "Input6",
        InputName: 'Input_123',
      },
      {
        id: 2,
        title: "Input7",
        InputName: 'Input_123',
      },
      {
        id: 2,
        title: "Input8",
        InputName: 'Input_123',
      },
    ],
    Survival: [
      {
        id: 1,
        tabName: 'Rights to Survival', 
        title: 'Is tech making coffee better or worse?',
        InputName: 'Input_123',
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        InputName: 'Input_123',
      },
    ],
    Protection: [
      {
        id: 1,
        tabName: 'Rights to Participation', 
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        InputName: 'Input_123',
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        InputName: 'Input_123',
      },
    ],
    Participation: [
      {
        id: 1,
        tabName: 'Rights to Participation', 
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        InputName: 'Input_123',
      },
      {
        id: 2,
        tabName: 'Rights to Participation',
        title: "The worst advice we've ever heard about coffee",
        InputName: 'Input_123',
      },
    ],
   
  })
  </script>
  