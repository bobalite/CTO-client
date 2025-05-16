<template>
    <div class=" w-full px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <div class="mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8">
                    <GridSpacer class="sm:col-span-8" :displaytext="'Annual Monitoring sheet'" />
                    <GridSpacer class="sm:col-span-8" :displaytext="'LGU: Davao City'" />
                    <GridSpacer class="sm:col-span-1" :displaytext="'Select Date'" />
                    <GridDate />
                    <GridSpacer class="sm:col-span-6"  />
                </div>
            </div>
        </div>
        <div class="w-full -mt-8 flow-root">
           <Tabs />
        </div>
    </div>
</template>

<script setup>
// import { graphService } from '~/components/api/GraphService';
import Tabs from '~/components/form/tabs.vue';
definePageMeta({
    layout: 'main'
})

const tabpanel = ref({
  tabbuttons:[{
    id:1,
    name:'test',
    tabicon: '',
    class: ''
  },{
    id:2,
    name: 'test2',
    tabicon: '',
    class: '',
  }
    

  ],
  tabcontent:[{

  }]

})

const categories = ref({
    Development: [
      {
        id: 1,
        title:  '1.1. Percentage coverage of Fully Immunized Children (FIC) aged 12 months old',
        show:false,
        InputName: 'none',
        InputLabel:'Number of fully immunized children',
        InputType: 'checkbox',
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