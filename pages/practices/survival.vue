<template>
    <div>
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
            >
              <!--loop through elements--> 
              <div
                v-for="element in elements"
                :key="element.id"
                class="mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8"
                >
                  <div class="sm:col-span-8 ">
                    <h2 class="font-semibold leading-6 text-gray-900 sm:col-span-8 ">
                        {{ element.header1 }}
                    </h2>
                  </div>
                  <div class="sm:col-span-8 ">
                  
                  </div>

                  <div class="font-semibold leading-6 text-gray-900 sm:col-span-8 ">
                    <h2 >
                        {{ element.header2 }}
                    </h2>
                  </div>

                  <template v-if = "element.show" >
                    <template v-for="subelement in element.subelements">
                        <GridElement :class="subelement.class" :displaytext="subelement.subtext" :elementtype="subelement.type" :inputvalue="subelement.inputvalue" />
                    </template>
                  </template>
              </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
</div>
</template>

<script setup>
import { graphService } from '~/components/api/GraphService';
import { ref } from 'vue'
  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
  const categories = ref({
    Survival: [
      {
        id: 1,
        header1: 'Right of Children to Survival (15%)',
        header2:  '1.1. Percentage coverage of Fully Immunized Children (FIC) aged 12 months old',
        mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
        show:true,
        subelements: [
                      {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-4 '
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Actual Data',
                        class:  'sm:col-span-1 text-center'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Projected Data',
                        class:  'sm:col-span-1 text-center'
                     },
                     {//<GridSpacer class="sm:col-span-2" :displaytext="'Total'"/>
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Number of fully immunized children',
                        class:  'sm:col-span-4 mx-4'
                     },
                     {
                        type: 'input',
                        name: 'actual_data1',
                        inputId: 'actual_data1',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input',
                        name: '1.1-2projected_data',
                        inputId: '1.1-2projected_data',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Total population of 12 months old',
                        class:  'sm:col-span-4 mx-4'
                     },
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'spacer',
                        class:  'sm:col-span-2'
                     },//Percentage Coverage
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Percentage Coverage',
                        class:  'sm:col-span-4 mx-4'
                     }, {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-2'
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Insufficient supply due to logistical concern',
                        class:  'sm:col-span-8 mx-4',
                       
                        
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'No data',
                        class:  'sm:col-span-8 mx-4',
                       
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },
                     
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                       
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },
                  
                  
                    ]
      },
      {
        id: 1,
        header1: '',
        header2:  '1.2 Prevalence of malnutrition among children aged 0-59 months old',
        show:true,
        mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
        subelements: [
                      {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-4 '
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Actual Data',
                        class:  'sm:col-span-1 text-center'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Projected Data',
                        class:  'sm:col-span-1 text-center'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Actual number of 0-59 months weighed',
                        class:  'sm:col-span-4 mx-4'
                     },
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Total Population of 0-59 months old',
                        class:  'sm:col-span-4 mx-4'
                     },
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'bg-yellow-300 sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'spacer',
                        class:  'sm:col-span-2'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'OPT Plus Coverage (0-59 months)',
                        class:  'sm:col-span-4 mx-4'
                     }, {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-2'
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'No data',
                        class:  'sm:col-span-8 mx-4',
                        isReadOnly: true,
                        
                     },
                    
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'If OPT Plus coverage is at least 80%, proceed to the following section:',
                        class:  'sm:col-span-6 mx-4',
                       
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Nutritional Status',
                        class:  'sm:col-span-4 mx-4'
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Actual Data',
                        class:  'sm:col-span-1 text-center'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Prevalence',
                        class:  'sm:col-span-1 text-center'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'a. Stunted',
                        class:  'sm:col-span-4 mx-4'
                     },
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'b. Wasted',
                        class:  'sm:col-span-4 mx-4'
                     },
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'c. Overweight and Obese',
                        class:  'sm:col-span-4 mx-4'
                     }, {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-2'
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'No data',
                        class:  'sm:col-span-8 mx-4',
                        isReadOnly: true,
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },
                     
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                       
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },
                  
                  
                    ]
      },
      {
        id: 1,
        header1: '',
        header2:  '1.3 Percentage coverage of pregnant adolescents provided with prenatal and postpartum services',
        show:true,
        mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
        subelements: [
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: ' .',
                        class:  'sm:col-span-8'
                     },
                     
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Total Population of 10-19 years old (female adolescents)',
                        class:  'sm:col-span-4 mx-4'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Total Number of Pregnant Adolescents',
                        class:  'sm:col-span-4 mx-4'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                       
                     }, {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                       
                     }, {
                        type: 'spacer',
                        class:  'sm:col-span-2'
                     },//Percentage Coverage
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Prevalence of Adolecent Pregnancies',
                        class:  'sm:col-span-4 mx-4'
                     }, {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        
                     }, {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-2'
                     },
                    
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                       
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },
                  
                    ]
      },
      {
        id: 1,
        header1: '',
        header2:  '1.3.1 Percentage coverage of pregnant adolescents with prenatal services',
        show:true,
        mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
        subelements: [  {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Prenatal visits(at least 4)',
                        class:  'sm:col-span-8 mx-4'
                     },
                      {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-3 '
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Number of Pregnant Adolescents',
                        class:  'sm:col-span-1 text-center'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Adolescents with at least 4 prenatal visits',
                        class:  'sm:col-span-1 text-center'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Coverage',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '10-14 years old',
                        class:  'sm:col-span-2 mx-4'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     
                    
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '15-19 years old',
                        class:  'sm:col-span-3 mx-4'
                     },
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'spacer',
                        class:  'sm:col-span-2'
                     },//Percentage Coverage
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Total',
                        class:  'sm:col-span-3 mx-4'
                     }, {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Insufficient supply due to logistical concern',
                        class:  'sm:col-span-8 mx-4',
                        isReadOnly: true,
                        
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'No data',
                        class:  'sm:col-span-8 mx-4',
                        isReadOnly: true,
                        
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Note: For 2019, if the available data is consolidated for 10-19 years old only, encode in the space for the 15-19 years old data then leave a note in the Remarks section. ',
                        class:  'sm:col-span-5'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },

                    
                     
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                       
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },
                  
                  
                    ]
      },
      {
        id: 1,
        header1: '',
        header2:  '1.3.2 Percentage coverage of pregnant adolescents with postpartum services',
        show:true,
        mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
        subelements: [  {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Postpartum visits(at least 2)',
                        class:  'sm:col-span-8 mx-4'
                     },
                      {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-3 '
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'No. of Pregnant Adolescents who gave birth',
                        class:  'sm:col-span-1 text-center'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Adolescents with at least 2 postpartum visits',
                        class:  'sm:col-span-1 text-center'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Coverage',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '10-14 years old',
                        class:  'sm:col-span-2 mx-4'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     
                    
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '15-19 years old',
                        class:  'sm:col-span-3 mx-4'
                     },
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'spacer',
                        class:  'sm:col-span-2'
                     },//Percentage Coverage
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Total',
                        class:  'sm:col-span-3 mx-4'
                     }, {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'No reported livebirth among adolescents',
                        class:  'sm:col-span-8 mx-4',
                        isReadOnly: true,
                        
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'No data',
                        class:  'sm:col-span-8 mx-4',
                        isReadOnly: true,
                        
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'For 2019, if the available data is consolidated for 10-19 years old only, encode in the space for the 15-19 years old data then leave a note in the Remarks section.',
                        class:  'sm:col-span-5'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },

                    
                     
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                       
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },
                  
                  
                    ]
      },
      {
        id: 1,
        header1: '',
        header2:  'Remarks',
        show:true,
        mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
        subelements: [  {
                        type: 'textarea',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-8'
                     }
                  ]
      }
    
  
    ],
    Development: [
    {
      header1: 'Right of Children to Development (15%)',
      header2:  '2.1. Percentage coverage of children aged 3-4 years old provided with early childhood care and development (ECCD) services, both public and privately managed, and may be facility, home, or community-based',
      show:true,
      mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
      subelements: [  {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-8'
                     },
                      {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-4 '
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Number of Enrollees',
                        class:  'sm:col-span-1 text-center'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '% from total enrollees',
                        class:  'sm:col-span-1 text-center'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'a. Public Centers (i.e. Day Care, Child Development)',
                        class:  'sm:col-span-4 mx-4'
                     },
                   
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                   
                     
                    
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'b. Private Centers (i.e. Montessori)',
                        class:  'sm:col-span-4 mx-4'
                     },
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'spacer',
                        class:  'sm:col-span-2'
                     },//Percentage Coverage
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'c. Community-Based (i.e. SNPs, mobile learning)',
                        class:  'sm:col-span-4 mx-4'
                     }, {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     
                     {
                        type: 'spacer',
                        name: 'space',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'd. Other modalities implemented by the LGU, please specify:',
                        class:  'sm:col-span-3 mx-4'
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-5'
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                     {
                     type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2',
                        isReadOnly: true
                     }, 
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                    
                     {
                     type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                     type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 

                     {
                        type: 'spacer',
                        class:  'sm:col-span-2'
                     },

                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },

                     {
                     type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2',
                        isReadOnly: true
                     }, 
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                    
                     {
                     type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                     type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 




                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'No children aged 3-4 years old',
                        class:  'sm:col-span-8 mx-4',
                        isReadOnly: true,
                        
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'No data',
                        class:  'sm:col-span-5 mx-4',
                        isReadOnly: true,
                        
                     },
                     {
                     type: 'spacer',
                     name: 'space',
                     subtext: '',
                     class:  'sm:col-span-8',
                     }, 
                     {

                     type: 'spacer',
                     name: 'space',
                     subtext: '',
                     class:  'sm:col-span-6',
                     }, 
                     {

                     type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center',
                        isReadOnly: true
                     }, 
                     
                     {
                        type: 'spacer',
                        name: 'space',
                        class:  'sm:col-span-2'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Total Number of ECCD Enrollees',
                        class:  'sm:col-span-2'
                     },
                   
                     {
                     type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                     type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Total Population of 3-4 years old',
                        class:  'sm:col-span-2'
                     },
                 
                     {
                     type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                   
                     {
                     type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2'
                     },
                   
                  
                 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },

                    
                     
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                       
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },
                  
                  
                    ]
      },
      {   
      
      
      header2:  '2.2. Presence of ECCD services in all barangays, either private or publicly-managed, in any of the following modality - center/facility, home, community, or other modalities',
      show:true,
      mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
      subelements: [
                    
                   
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '2.2.1 Percentage of barangays with at least one (1) ECCD service',
                        class:  'sm:col-span-3 mx-4'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Percentage',
                        class:  'sm:col-span-1 text-center'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Number of barangays with at least 1 ECCD service',
                        class:  'sm:col-span-3'
                     },
                    

                     {
                     type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                     type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 


                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Total Number of barangays ',
                        class:  'sm:col-span-3 mx-4'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                     type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                   
                     {
                     type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'No data',
                        class:  'sm:col-span-8 mx-4',
                        isReadOnly: true,
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Note: For 2019, only the accreditation/recognition for public centers is required.  ',
                        class:  'sm:col-span-7'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-8'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'ECCD Services available (please fill-out)',
                        class:  'sm:col-span-8 mx-4'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Private Centers (i.e. Montessori)',
                        class:  'sm:col-span-2'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                     type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Other modalities, please specify:',
                        class:  'sm:col-span-3'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Number of Recognized Private Centers',
                        class:  'sm:col-span-2'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                     type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        
                     }, 
                     {
                     type: 'input-comment',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2',
                        
                     }, 

                   

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                    

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Community-Based (i.e. SNPs, mobile learning)',
                        class:  'sm:col-span-2'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                     type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                     type: 'input-comment',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2',
                        
                     }, 

                     //Early Stimulation (for 0-2 years old)
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Early Stimulation (for 0-2 years old)',
                        class:  'sm:col-span-2'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                     type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        
                     }, 
                     {
                     type: 'input-comment',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2',
                        
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                    

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },

                    
                     
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },

                   
                   ]
      },
      {
        id: 1,
        header1: '',
        header2:  '2.3 Percentage of out-of-school children and youth assisted for enrolment/re-enrolment to school, alternative learning system or other flexible learning options',
        show:true,
        mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
        subelements: [  {
                        type: 'spacer',
                        name: 'space',
                        subtext: '2.3.1. Percentage of children who have dropped out from school that were reintegrated in the academic year being audited',
                        class:  'sm:col-span-8 mx-4'
                     },
                      {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-3 '
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'a. Total number of school dropouts reintegrated in formal school',
                        class:  'sm:col-span-3 mx-4'
                     },
                    
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     
                    
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'b. Total number of school dropouts aged 5-17 years old',
                        class:  'sm:col-span-3 mx-4'
                     },
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'spacer',
                        class:  'sm:col-span-2'
                     },//Percentage Coverage
                  
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'No data',
                        class:  'sm:col-span-8 mx-4',
                        isReadOnly: true,
                        
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Percentage of school dropouts re-enrolled',
                        class:  'sm:col-span-3 mx-4'
                     },

                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                       
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-4'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },

                    
                     
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                       
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '2.3.2. Percentage of OSCY registered/enrolled to schools, ALS, or other  flexible learning options',
                        class:  'sm:col-span-8 mx-4'
                     },
                      {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-3 '
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Rate of OSCY',
                        class:  'sm:col-span-1 text-center'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },


                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Total number of OSCY aged 5-17 years old',
                        class:  'sm:col-span-2'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },
                   
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                       
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-3'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Total population of children aged 5-17 years old',
                        class:  'sm:col-span-3'

                     },
                  

                   
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                       
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },

                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                       
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'a. Number of OSCY enrolled in Elementary/Secondary School ',
                        class:  'sm:col-span-3'

                     },
                  

                   
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                       
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2'

                     },

                   

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'b. Number of OSCY enrolled in Alternative Learning System (ALS)',
                        class:  'sm:col-span-3'

                     },
                  

                   
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                       
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-3'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'c. Number of OSCY enrolled to other modalities/flexible learning options, please specify:',
                        class:  'sm:col-span-4'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-3'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },

                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-3 mx-4',
                       
                     },

                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                       
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-3'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-3 mx-4',
                       
                     },

                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                       
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-3'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'No data',
                        class:  'sm:col-span-5',
                        
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class: 'sm:col-span-1 text-center',
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-1',
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-1',
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Total Number of 5-17 years old OSCY assisted for enrollment',
                        class: 'sm:col-span-3',
                     },

                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                       
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-1',
                     },

                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                       
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-1',
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-4',
                     },
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                       
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-3',
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },

                    
                     
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },


                  

                   
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },
                  
                  
                    ]
      },
      {
        id: 1,
        header1: '',
        header2:  'Remarks',
        show:true,
        mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
        subelements: [  {
                        type: 'textarea',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-8'
                     }
                  ]
      }

   ],


    Protection: [
    {
        id: 1,
        header1: 'Right of Children to Protection (15%)',
        header2:  '3.1. Management of reported cases of children in need of special protection (CNSP)',
        show:true,
        mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
        subelements: [  {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: '3.1.1 Percentage coverage of Case Management',
                        class:  'sm:col-span-8'
                     },
                      {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-3 '
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2 text-center'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Coverage',
                        class:  'sm:col-span-1 text-center'
                     },
                    
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },


                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: 'Total number of Cases Managed',
                        class:  'sm:col-span-2 '

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2 text-center'

                     },


                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },


                     
                  
                    
                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: 'Total number of reported CNSP cases',
                        class:  'sm:col-span-3'
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },//Percentage Coverage
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'spacer',
                        class:  'sm:col-span-2'
                     },//Percentage Coverage

                   
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'No reported CNSP case',
                        class:  'sm:col-span-8 mx-4',
                        isReadOnly: true,
                        
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'No data',
                        class:  'sm:col-span-8 mx-4',
                        isReadOnly: true,
                        
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '3.1.2. Case management preparation',
                        class:  'sm:col-span-8 mx-4'
                     },


                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Prepared and signed by a trained registered social worker',
                        class:  'sm:col-span-3',
                        isReadOnly: true,
                        
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Prepared and signed by a registered social worker',
                        class:  'sm:col-span-3',
                        isReadOnly: true,
                        
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2'
                     },

                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },


                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Prepared and signed by a trained public social development worker',
                        class:  'sm:col-span-3',
                        isReadOnly: true,
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-4'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '3.1.3. Established referral network',
                        class:  'sm:col-span-4 mx-4'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'With established referral network',
                        class:  'sm:col-span-3',
                        isReadOnly: true,
                        
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2'
                     },

                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },
                  
                  
                    ]
      },
      {
        id: 1,
        header1: '',
        header2:  'Report Acceptors (check as applicable, for reference only)',
        show:true,
        mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
        subelements: [ 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'LSWDO ',
                        class:  'sm:col-span-3',
                        isReadOnly: true,
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'City/Municipal LCPC',
                        class:  'sm:col-span-3',
                        isReadOnly: true,
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'WCPD/WCPU ',
                        class:  'sm:col-span-3',
                        isReadOnly: true,
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'BCPC',
                        class:  'sm:col-span-3',
                        isReadOnly: true,
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'School CPC',
                        class:  'sm:col-span-3',
                        isReadOnly: true,
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'VAWC Desk',
                        class:  'sm:col-span-3',
                        isReadOnly: true,
                        
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Others, please specify:',
                        class:  'sm:col-span-8 mx-4'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     
                     {

                        type: 'input-comment',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     
                     {

                        type: 'input-comment',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Remarks',
                        class:  'sm:col-span-8 mx-4'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     
                     {

                        type: 'input-comment',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     
                     {

                        type: 'input-comment',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },


                    
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },
                  
                  
                    ]
      }
    ],
    Participation: [
    {
        id: 1,
        header1: 'Right of Children to Participation (15%)',
        header2:  '4.1 Child representation in the Local Council for the Protection of Children',
        show:true,
        mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
        subelements: [  {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: '4.1.1 Child Representative in the City/Municipality CPC',
                        class:  'sm:col-span-5'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'
                        
                     },
                      {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center'
                        
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'
                        
                     },
                  
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Executive Order',
                        class:  'sm:col-span-1',
                        
                        
                     },
                     {
                        type: 'input-comment',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-3',
                        
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: '4.1.2 Child Representative Selection Process at the City/Municipal level',
                        class:  'sm:col-span-6'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'

                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: "Thru Children's General Assembly",
                        class:  'sm:col-span-4',
                        
                        
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     
                    
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: "Appointed/Designated",
                        class:  'sm:col-span-4',
                        
                     },
                    
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: '4.1.3 Child Representative in the Barangay CPC',
                        class:  'sm:col-span-8'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Total Number of BCPCs with Child Representative',
                        class:  'sm:col-span-3'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Total Number of barangays',
                        class:  'sm:col-span-3'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'input',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Percentage of Barangays with Child Representative',
                        class:  'sm:col-span-3'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'input-comment',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
  
                     {
                        type: 'input-comment',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                       
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },
                  
                    ]
      },
      {
         id: 1,
        header1: '',
        header2:  "4.2 Development of program, project, activity (PPA) or policy with children's participation in the planning, implementation or monitoring phase",
        show:true,
        mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
        subelements: [
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Core PPA / Plan / Policy',
                        class:  'sm:col-span-2 text-center'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2 text-center'
                     },

                     
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Specific Activity Conducted',
                        class:  'sm:col-span-2 text-center'
                     },
                    
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score (Quantity)',
                        class:  'sm:col-span-1 text-center'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                    

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-right',
                        
                        
                     },
                     {
                        type: 'input-comment',
                        name: 'space',
                        inputvalue: 'Midterm Review and Evaluation of LCPC Committee on LDPC/LDIPC',
                        class:  'sm:col-span-3',
                        
                     }, 

                     {
                        type: 'input-comment',
                        name: 'space',
                        inputvalue: '',
                        class:  'sm:col-span-2',
                        
                     }, 
                     
                    
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },

                 

                    

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-right',
                        
                        
                     },
                     {
                        type: 'input-comment',
                        name: 'space',
                        inputvalue: "Citywide Children's Congress on November 24-25, 2022",
                        class:  'sm:col-span-3',
                        
                     }, 

                     {
                        type: 'input-comment',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 
                     
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2 text-center'

                     },
                     {

                        type: 'spacer',
                        name: 'space',
                        subtext: 'Other PPA / Plan / Policy:',
                        class:  'sm:col-span-2 text-center'

                     },

                     {

                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6 text-center'

                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-right',
                        
                        
                     },
                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        inputvalue: "Virtual Seminar-Workshop on Strengthening and Capability Building for the Identified Barangay Councils for the  Protection of Children ",
                        class:  'sm:col-span-3',
                        
                     }, 

                     {
                        type: 'input-comment',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 
                     
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2 text-center'

                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-right',
                        
                        
                     },
                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        inputvalue: "Capacity Building for Child Representatives on Meaningful Participation and Social Accountability (Virtual)",
                        class:  'sm:col-span-3',
                        
                     }, 

                     {
                        type: 'input-comment',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 
                     
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2 text-center'

                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-right',
                        
                        
                     },
                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        inputvalue: "Serbisyo Caravan 1st-3rd Congressional District",
                        class:  'sm:col-span-3',
                        
                     }, 

                     {
                        type: 'input-comment',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 
                     
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2 text-center'

                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-right',
                        
                        
                     },
                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        inputvalue: "Summer Festival for Children",
                        class:  'sm:col-span-3',
                        
                     }, 

                     {
                        type: 'input-comment',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 
                     
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2 text-center'

                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-right',
                        
                        
                     },
                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        inputvalue: "Annual Year-End Review and Evaluation of LCPC Committee",
                        class:  'sm:col-span-3',
                        
                     }, 

                     {
                        type: 'input-comment',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 
                     
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2 text-center'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Note:  Tick box for each item',
                        class:  'sm:col-span-2'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-5 text-center'

                     },


                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Specific role/involvement  of children in the activity:',
                        class:  'sm:col-span-2'

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Number of Activity/ies',
                        class:  'sm:col-span-1 text-center '

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2 text-center '

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score (Quantity)',
                        class:  'sm:col-span-1 text-center '

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center '

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center '

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext:'Child-led Advocacy',
                        class:  'sm:col-span-2 text-center',
                        
                     }, 

                     {
                        type: 'input-comment',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center '

                     },
                     {
                        type: 'input-readonly',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-1',
                        
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center '

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center '

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext:'Planning',
                        class:  'sm:col-span-2  text-center',
                        
                     }, 

                     {
                        type: 'input-comment',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center '

                     },
                   
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2 text-center '

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center '

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext:'Monitoring',
                        class:  'sm:col-span-2  text-center',
                        
                     }, 

                     {
                        type: 'input-comment',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center '

                     },
                   
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2 text-center '

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center '

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext:'Attendance',
                        class:  'sm:col-span-2  text-center',
                        
                     }, 

                     {
                        type: 'input-comment',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center '

                     },
                   
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2 text-center '

                     },


                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },
                     
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },
          ]

      },{

         id: 1,
        header1: '',
        header2:  'Remarks',
        show:true,
        mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
        subelements: [  {
                        type: 'textarea',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-8'
                     }]
      }
    ],
     
    Governance: [
    {
        id: 1,
        header1: 'Governance (40%)',
        header2:  '5.1. Database on children ',
        show:true,
        mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
        subelements: [  {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: '5.1.1 Established and updated database on children ',
                        class:  'sm:col-span-8'
                     },
                      {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 '
                        
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'With all of the following disaggregated information on children: ',
                        class:  'sm:col-span-4'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                  
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center '

                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Age',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Ethnicity',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'School Status (in/out)',
                        class:  'sm:col-span-1'

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2'
                     },
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     
                    
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Sex',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Disability',
                        class:  'sm:col-span-1',
                       
                     }, {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'No data',
                        class:  'sm:col-span-1',
                        
                     }, 
                     {
                        type: 'spacer',
                        class:  'sm:col-span-2'
                     },//Percentage Coverage
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '5.1.2 Annual Local State of Children Report',
                        class:  'sm:col-span-7 mx-4'
                     }, 

                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: "Report delivered/presented during National Children's Month Celebration",
                        class:  'sm:col-span-7',
                        isReadOnly: true,
                        
                     },
                    

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },

                    
                     
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                       
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },
                   
                   
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '5.2 Available and implemented Local Plans for Children ',
                        class:  'sm:col-span-8'
                     },
                      
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Local Development Plan or Local Action Plan for Children',
                        class:  'sm:col-span-5',
                        isReadOnly: true
                     }, 
                   
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center'
                     },
                    
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Comprehensive Local Juvenile Intervention Program (CLJIP)',
                        class:  'sm:col-span-5',
                        isReadOnly: true
                     }, 
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                   
                     
                    
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Integration of the Comprehensive Emergency Program for Children in the LDRRM Plan and budget',
                        class:  'sm:col-span-5'
                     },
                   
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },


                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },

                    
                     
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                       
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '5.3 Updated Local Code for Children adopting recently issued national laws on children ',
                        class:  'sm:col-span-8'
                     },
                      
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-center'

                     },
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Early Years Act (RA 10410)',
                        class:  'sm:col-span-5',
                        isReadOnly: true
                     }, 
                   
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Score',
                        class:  'sm:col-span-1 text-center'
                     },
                    
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Children’s Safety on Motorcycles Act (RA 10666)',
                        class:  'sm:col-span-5',
                        isReadOnly: true
                     }, 
                     {
                        type: 'input-readonly',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1',
                        isReadOnly: true
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                   
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Children’s Emergency Relief and Protection Act (RA 10821)',
                        class:  'sm:col-span-5'
                     },
                   
                   
                     {
                        type: 'spacer',
                        class:  'sm:col-span-2'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                   
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'National Mental Health Policy (RA 11036)',
                        class:  'sm:col-span-5'
                     },
                   
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                   
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Masustansyang Pagkain para sa Batang Pilipino (RA 11037)',
                        class:  'sm:col-span-5'
                     },
                   
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                   
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Kalusugan at Nutrisyon ng Magnanay Act (F1KD, RA 11148)',
                        class:  'sm:col-span-5'
                     },
                   
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                   
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Special Protection of Children Against Child Abuse, Exploitation and Discrimination Act (RA 9231)',
                        class:  'sm:col-span-5'
                     },
                   
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1'
                     },
                   
                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: 'Special Protection of Children in Situations of Armed Conflict Act (RA 11188)',
                        class:  'sm:col-span-5'
                     },
                   
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'spacer',
                        class:  'sm:col-span-1'
                     },


                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },

                    
                     
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                       
                     },
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: "5.4 Budget allocated and utilized for children's PPAs ",
                        class:  'sm:col-span-8'
                     },

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: "5.4.1 Approved Local Investment Program for Children or Annual Work and Financial Plan for Children (AWFPC) ",
                        class:  'sm:col-span-6'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: "Score ",
                        class:  'sm:col-span-1 text-center'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        class:  'sm:col-span-1'
                     },

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-1 text-right',
                        
                        
                     },

                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        inputvalue: "Resolution",
                        class:  'sm:col-span-2',
                        
                     }, 
                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        inputvalue: "APPROVING AND ADOPTING THE PROGRAMS/PROJECTS AND ACTIVITIES AS EMBODIED UNDER THE ANNUAL INVESTMENT PROGRAM (AIP) OF THE CITY OF DAVAO, FOR CALENDAR YEAR 2022, IN THE TOTAL AMOUNT OF ONE HUNDRED TWENTY-ONE BILLION EIGHT HUNDRED THIRTY-ONE MILLION ONE HUNDRED EIGHTY-NINE THOUSAND PESOS (P121,831,189,000.00) ",
                        class:  'sm:col-span-3',
                        
                     }, 

                     {
                        type: 'input-readonly',
                        name: 'space',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: "5.4.2 Budget allocation for children's PPAs",
                        class:  'sm:col-span-5'
                     },


                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: "",
                        class:  'sm:col-span-3'
                     },

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: "",
                        class:  'sm:col-span-5'
                     },


                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Allocation Rate',
                        class: 'sm:col-span-1 text-center',
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: "Score ",
                        class:  'sm:col-span-1 text-center'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: "",
                        class:  'sm:col-span-1 text-center'
                     },

                                  

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: "LGU's Total National Tax Allotment (NTA)",
                        class:  'sm:col-span-3 mx-4'
                     },

                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        class:  'sm:col-span-2',
                        
                     }, 
                   

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: "Budget Allocated for Children's PPAs",
                        class:  'sm:col-span-3 mx-4'
                     },

                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 
                     {
                        type: 'input-commentgreen',
                        name: 'space',
                        class:  'sm:col-span-1',
                        
                     }, 
                     {
                        type: 'input-readonly',
                        name: 'space',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: "5.4.3 Utilization of budget for children's PPAs",
                        class:  'sm:col-span-5'
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: "",
                        class:  'sm:col-span-3'
                     },

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: "Budget utilized for children's PPAs",
                        class:  'sm:col-span-3 mx-4'
                     },

                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     },
                     
                     {
                        type: 'input-commentgreen',
                        name: 'space',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'input-readonly',
                        name: 'space',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext: "(please fill out)",
                        class:  'sm:col-span-8'
                     },

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext:'Revenue from Real Property Tax Collection',
                        class:  'sm:col-span-3 mx-4',
                        
                     }, 

                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 
                     {
                        type: 'input-commentgreen',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-1',
                        
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2 text-center '

                     },

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext:'Budget allocated for the Special Education Fund',
                        class:  'sm:col-span-3 mx-4',
                        
                     }, 

                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 

                     {
                        type: 'input-commentgreen',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-1',
                        
                     }, 
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-2 text-center '

                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },

                     
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext:'5.5 Functional LCPCs',
                        class:  'sm:col-span-8 ',
                        
                     }, 
                     
                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext:'5.5.1. Functional City/Municipal LCPC',
                        class:  'sm:col-span-6 ',
                        
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext:'Score',
                        class:  'sm:col-span-1 text-center',
                        
                     }, 

                     {
                        type: 'spacer',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'spacer',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext:'Ideal',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext:'Mature',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext:'Progressive',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'checkbox',
                        name: 'space',
                        subtext:'Basic',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'spacer',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'input-readonly',
                        name: 'space',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext:'5.5.2. Functional Barangay LCPCs',
                        class:  'sm:col-span-8 ',
                        
                     }, 

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext:'',
                        class:  'sm:col-span-5 ',
                        
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext:'Percentage',
                        class:  'sm:col-span-1 text-center ',
                        
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext:'Score',
                        class:  'sm:col-span-1 text-center',
                        
                     }, 

                     {
                        type: 'spacer',
                        class:  'sm:col-span-1',
                     }, 

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext:'Total Number of Barangays',
                        class:  'sm:col-span-3 mx-4',
                        
                     }, 

                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        class:  'sm:col-span-1',
                        
                     }, 
                     {
                        type: 'input-readonly',
                        name: 'space',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext:'Number of barangays that met all SGLGB BCPC Indicators ',
                        class:  'sm:col-span-3 mx-4',
                        
                     }, 

                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        inputvalue: "",
                        class:  'sm:col-span-2',
                        
                     }, 

                     {
                        type: 'input-commentgreen',
                        name: 'space',
                        class:  'sm:col-span-1',
                        
                     },  
                     

                     {
                        type: 'spacer',
                        name: 'space',
                        class:  'sm:col-span-2',
                        
                     }, 
                   

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext:'5.6 Child-Friendly Facilities in all Barangays',
                        class:  'sm:col-span-8 ',
                        
                     }, 

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext:'Designated Play / Recreational Area',
                        class:  'sm:col-span-6 ',
                        
                     }, 

                     {
                        type: 'spacer',
                        name: 'space',
                        subtext:'Score',
                        class:  'sm:col-span-1 text-center',
                        
                     }, 

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext:'No. of Brgys. with play/recreational area',
                        class:  'sm:col-span-4 mx-4',
                        
                     }, 

                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        
                        class:  'sm:col-span-1',
                        
                     }, 
                     {
                        type: 'input-commentgreen',
                        name: 'space',
                        
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'input-readonly',
                        name: 'space',
                        
                        class:  'sm:col-span-1',
                        
                     }, 


                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext:'Library/ Reading Center',
                        class:  'sm:col-span-8',
                        
                     }, 

                     {
                        type: 'spacer-indented',
                        name: 'space',
                        subtext:'No. of Brgys. with library/reading center',
                        class:  'sm:col-span-4 mx-4',
                        
                     }, 

                     {
                        type: 'input-commentyellow',
                        name: 'space',
                        
                        class:  'sm:col-span-1',
                        
                     }, 
                     {
                        type: 'input-commentgreen',
                        name: 'space',
                        
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'input-readonly',
                        name: 'space',
                        
                        class:  'sm:col-span-1',
                        
                     }, 

                     {
                        type: 'spacer',
                        class:  'sm:col-span-1',
                        
                     }, 

                     
                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: 'Data Source:',
                        class:  'sm:col-span-1'
                     },
                     {
                        type: 'input-datasource',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-6',
                        isReadOnly: true
                     },





                     {
                        type: 'spacer',
                        name: 'space',
                        subtext: '',
                        class: 'sm:col-span-8 border-b border-black-900',
                     },



                  
                  
                    ]
      },

      {
        id: 1,
        header1: '',
        header2:  'Remarks',
        show:true,
        mainclass:"'mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8'",
        subelements: [  {
                        type: 'textarea',
                        name: 'space',
                        subtext: '',
                        class:  'sm:col-span-8'
                     }
                  ]
      }

     
    ],
   
  })

definePageMeta({
    layout: 'main'
})


</script>