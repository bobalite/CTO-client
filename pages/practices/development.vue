<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                
                <Menu as="div" class="relative inline-block text-left">
                <div>
                    <MenuButton
                    class="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                    >
                    Select Children's Right
                    <ChevronDownIcon
                        class="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                        aria-hidden="true" 
                    />
                    </MenuButton>
                </div>

                <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                    <MenuItems
                    class="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                    >
                    <div class="px-1 py-1">
                        <MenuItem v-slot="{ active }">
                        <button
                            :class="[
                            active ? 'bg-violet-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                        >
                            <IconAcademic
                                :active="active"  
                                aria-hidden="true"
                                class="mr-2 h-5 w-5 text-violet-400"
                            />
                            Rights to Development
                        </button>
                        </MenuItem>
                    </div>
                    <div class="px-1 py-1">
                        <MenuItem v-slot="{ active }">
                        <button
                            :class="[
                            active ? 'bg-violet-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                        >
                            <IconSurvival
                            :active="active"
                            class="mr-2 h-5 w-5 text-violet-400"
                            aria-hidden="true"
                            />
                            Rights to Survival
                        </button>
                        </MenuItem>
                    </div>
                    
                    <div class="px-1 py-1">
                        <MenuItem v-slot="{ active }">
                        <button
                            :class="[
                            active ? 'bg-violet-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                        >
                            <IconProtection
                            :active="active"
                            class="mr-2 h-5 w-5 text-violet-400"
                            aria-hidden="true"
                            />
                            Rights to Protection
                        </button>
                        </MenuItem>
                        
                    </div>

                    <div class="px-1 py-1">
                        <MenuItem v-slot="{ active }">
                        <button
                            :class="[
                            active ? 'bg-violet-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                        >
                            <IconParticipation
                            :active="active"
                            class="mr-2 h-5 w-5 text-violet-400"
                            aria-hidden="true"
                            />
                           Rights to Participation
                        </button>
                        </MenuItem>
                    </div>
                    </MenuItems>
                </transition>
                </Menu>
            </div>
          
        </div>


        <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Right of Children to Survival (15%)</h1>
            </div>
          </div>
          <div class="mt-8 flow-root ">
              <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">
                        1.1 Percentage coverage of Fully Immunized Children (FIC) aged 12 months old
                    </h2>
                
                  
                  <div class="mt-1 grid grid-cols-9 ">
                        <div class="sm:col-span-8">
                            <div class="mt-1 grid grid-cols-1 gap-x-1 gap-y-1 sm:grid-cols-8">
                                <GridSpacer class="sm:col-span-4 text-center" :displaytext="''"/>
                                <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Actual Data'"/>
                                <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Projected Data'"/>
                                <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Score'"/>
                                <GridSpacer class="sm:col-span-4" :displaytext="'Number of fully immunized children'" />
                                <GridTextInput v-model = "survival1.actual_fullyimmunized" :function ="compute_survival1" :class = "'sm:col-span-1 '" />
                                <GridTextInput v-model = "survival1.projected_fullyimmunized" :function ="compute_projected" :class = "'sm:col-span-1 '" />
                                <GridTextReadonly  v-model = "survival1.score11" :class = "'sm:col-span-1 '" />
                                <GridSpacer class="sm:col-span-4" :displaytext="'Total population of 12 months old'"/>
                                <GridTextInput v-model = "survival1.totalpop12monthsold_actual" :function ="compute_survival1" :class = "'sm:col-span-1 '" />
                                <GridTextInput v-model = "survival1.totalpop12monthsold_projected" :function ="compute_projected" :class = "'sm:col-span-1 '" />
                                <GridSpacer class="sm:col-span-2"/>
                                <GridSpacer class="sm:col-span-4" :displaytext="'Percentage Coverage'"/>
                                <GridTextReadonly :model-value="survival1.percentage_coverage_actual" :name="percentage_coverage_actual" />
                                <GridTextReadonly :model-value="survival1.percentage_coverage_projected" :name="percentage_coverage_projected" />
                                <GridSpacer class="sm:col-span-1"/>
                                <GridSpacer class="sm:col-span-1"/>
                                <GridCheckbox v-model= "survival1.insufficientdata" :class = "'sm:col-span-1'" :inputtype="'checkbox'" :displaytext = "'Insufficient supply due to logistical concern'" :function ="compute_survival1" :inputclass="'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'"/>
                                <GridSpacer class="sm:col-span-3 " :displaytext="'Insufficient supply due to logistical concern'"/>
                                <GridSpacer class="sm:col-span-8"/>
                                <GridCheckbox v-model= "survival1.nodata" :class = "'sm:col-span-1'" :inputtype="'checkbox'" :displaytext = "'No Data'" :function ="compute_survival1" :inputclass="'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'"/>
                                <GridSpacer class="sm:col-span-2 " :displaytext="'No Data'"/>
                                <GridSpacer class="sm:col-span-8"/>
                                <GridSpacer class="sm:col-span-1" :displaytext="'Data Source:'"/>
                                <GridText :class = "'sm:col-span-6'" :name="actual_data" :inputId="'actual_data'"   />
                            </div>
                        </div>
                        <div class="mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-1 text-xs bg-gray-300">
                            <GridSpacer class="sm:col-span-1 text-center" :displaytext="' Accomplishment (%) Point'"/>
                            <GridSpacer class="sm:col-span-1 text-right" :displaytext="' FIC 95-100% 5.00'"/>
                            <GridSpacer class="sm:col-span-1 text-right" :displaytext="' 90-94% 4.00'"/>
                            <GridSpacer class="sm:col-span-1 text-right" :displaytext="' 85-89% 3.00'"/>
                            <GridSpacer class="sm:col-span-1 text-right" :displaytext="' 80-84% 2.00'"/>
                            <GridSpacer class="sm:col-span-1 text-right" :displaytext="' below 80%	1.00'"/>
                        </div>
                  </div>

                   
                
              </div>

              <GridSpacer class="sm:col-span-8"/>
                    <div class="border-b border-gray-900/10 pb-12">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">1.2. Prevalence of malnutrition among children aged 0-59 months old</h2>
                    </div>

                    <div class="mt-1 grid grid-cols-9 ">
                        <div class="sm:col-span-8">
                            <div class="mt-1 grid grid-cols-1 gap-x-1 gap-y-1 sm:grid-cols-8">
                                <GridSpacer class="sm:col-span-4"/>
                                <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Actual Data'"/>
                                <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Projected Data'"/>
                                <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Score'"/>
                                <GridSpacer class="sm:col-span-4 " :displaytext="'Actual number of 0-59 months weighed'"/>
                                
                                <GridTextInput v-model = "survival2.actual_actual" :function ="compute_survival2" :class = "'sm:col-span-1 '" />
                                <GridTextInput v-model = "survival2.actual_projected" :function ="compute_projected2" :class = "'sm:col-span-1 '" />
                                <GridTextReadonly :model-value="survival2.score12" :name="score12" />
                                
                                <GridSpacer class="sm:col-span-4 " :displaytext="'Total Population of 0-59 months old'"/>
                                
                                <GridTextInput v-model = "survival2.total_actual" :function ="compute_survival2" :class = "'sm:col-span-1 '" />
                                <GridTextInput v-model = "survival2.total_projected" :function ="compute_projected2" :class = "'sm:col-span-1 '" />
                               
                                <GridSpacer class="sm:col-span-1 " />
                                <GridSpacer class="sm:col-span-4 " :displaytext="'OPT Plus Coverage (0-59 months)'"/>

                                <GridTextReadonly :model-value="survival2.opt_actual" :name="opt_actual" />
                                <GridTextReadonly :model-value="survival2.opt_projected" :name="opt_projected" />

                                <GridSpacer class="sm:col-span-1 " />
                                <GridSpacer class="sm:col-span-8 " />
                                
                                
                                
                                <GridCheckbox v-model= "survival2.nodata12" :class = "'sm:col-span-1'" :inputtype="'checkbox'" :displaytext = "'No Data'" :function ="compute_survival2" :inputclass="'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'"/>
                                <GridSpacer class="sm:col-span-2 " :displaytext="'No Data'"/>
                                <GridSpacer class="sm:col-span-3 " />
                                <GridSpacer class="sm:col-span-8 " :displaytext="'If OPT Plus coverage is at least 80%, proceed to the following section:'" />
                                <GridSpacer class="sm:col-span-4 " :displaytext="'Nutritional Status'" />
                                <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Actual Data'" />
                                <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Projected Data'" />
                                <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Score'" />
                                <GridSpacer class="sm:col-span-4 " :displaytext="'a. Stunted'" />
                                <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                                <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                                <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                                <GridSpacer class="sm:col-span-4 " :displaytext="'b. Wasted'" />
                                <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                                <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                                <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                                <GridSpacer class="sm:col-span-4 " :displaytext="'c. Overweight and Obese'" />
                                <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                                <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                                <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                                <GridText :class = "'sm:col-span-3'" :inputtype="'checkbox'" :name="actual_data" :inputId="'actual_data'" :displaytext = "'No Data'" :inputclass="'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'"/>
                                
                                <GridSpacer class="sm:col-span-5 " />
                                <GridSpacer class="sm:col-span-1 " :displaytext="'Data Source:'" />
                                <GridText :class = "'sm:col-span-6'" :name="actual_data" :inputId="'actual_data'"   />
                            </div>
                        </div>

                        <div class="mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-1 text-xs bg-gray-300">
                            <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Accomplishment (%) Point  OPT Plus Coverage 60-110%    1.00 below 60% 0.00'"/>
                            
                            <GridSpacer class="sm:col-span-1 text-right" :displaytext="''"/>
                            <GridSpacer class="sm:col-span-1 text-right" :displaytext="'Accomplishment(%) Point'"/>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { graphService } from '~/components/api/GraphService';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { reactive, computed } from 'vue'

const survival1 = reactive({
     total: 0,
     actual_fullyimmunized:0,
     projected_fullyimmunized : 0,
     totalpop12monthsold_actual : 0,
     totalpop12monthsold_projected : 0,
     percentage_coverage_actual : 0,
     percentage_coverage_projected : 0,
     insufficientdata: false,
     nodata : false,
     score11 : 0
});



const compute_survival1 = computed(() =>{
   try {

      survival1.percentage_coverage_actual = parseFloat((parseFloat(survival1.actual_fullyimmunized) / parseFloat(survival1.totalpop12monthsold_actual))*100).toFixed(2) ;
      if (survival1.percentage_coverage_actual === 0)survival1.score11 = 0;
      else if(survival1.percentage_coverage_actual >= 95 )survival1.score11 = 5.0;
      else if(survival1.percentage_coverage_actual < 95 && survival1.percentage_coverage_actual >= 90 )survival1.score11 = 4.0;
      else if(survival1.percentage_coverage_actual < 90 && survival1.percentage_coverage_actual >= 85 )survival1.score11 = 3.0;
      else if(survival1.percentage_coverage_actual < 85 && survival1.percentage_coverage_actual >= 84 )survival1.score11 = 2.0;
      else survival1.score11 = 1.0;
      if (survival1.percentage_coverage_actual === 'NaN' || survival1.percentage_coverage_actual === 'Infinity' ) survival1.percentage_coverage_actual = 0;
      if(survival1.insufficientdata) survival1.score11 = 1.0;
      if(survival1.nodata) survival1.score11 = 0;
      return (survival1.percentage_coverage_actual, survival1.score11);
   } catch (error) {
      survival1.percentage_coverage_actual = 0;
      return (0);
   }
})

const compute_projected = computed(() =>{
   try {
      survival1.percentage_coverage_projected = (parseFloat(survival1.projected_fullyimmunized) / parseFloat(survival1.totalpop12monthsold_projected))*100 ;
      survival1.percentage_coverage_projected = parseFloat(survival1.percentage_coverage_projected).toFixed(2)
      
      if (survival1.percentage_coverage_projected === 'NaN' || survival1.percentage_coverage_projected === 'Infinity' ) survival1.percentage_coverage_projected = 0;
      return (survival1.percentage_coverage_projected);
   } catch (error) {
      survival1.percentage_coverage_projected = 0;
      return (0);
   }
})


const survival2 = reactive({
     actual_total: 0,
     actual_actual:0,
     actual_projected : 0,
     total_actual : 0,
     total_projected : 0,
     opt_actual : 0,
     opt_projected : 0,
     insufficientdata: false,
     nodata12 : false,
     score12 : 0,
     stunted_actual: 0,
     stunted_prevalence: 0,
     stunted_score: 0,
     wasted_actual: 0,
     wasted_prevalence: 0,
     wasted_score: 0,
     overweight_actual: 0,
     overweight_prevalence: 0,
     overweight_score: 0,
});


const compute_survival2 = computed(() =>{
    try {
        survival2.opt_actual = (parseFloat(survival2.actual_actual) / parseFloat(survival2.total_actual))*100;
        survival2.opt_actual = parseFloat(survival2.opt_actual).toFixed(2)
        if (survival2.opt_actual === 'NaN' || survival2.opt_actual === 'Infinity' ) survival2.opt_actual = 0;
        if (survival2.opt_actual === 0) survival2.score12 = 0;
        else if(survival2.opt_actual >= 60 ) survival2.score12 = 1.0;
        else survival2.score12 = 0.0;
        if(survival2.nodata12) survival2.score12 = 0; 
    return (survival2.opt_actual, survival2.score12);
   } catch (error) {
      survival2.opt_actual = 0;
      return (0);
   }
 
})

const compute_projected2 = computed(() =>{
   try {
      survival2.opt_projected = (parseFloat(survival2.actual_projected) / parseFloat(survival2.total_projected))*100 ;
      survival2.opt_projected = parseFloat(survival2.opt_projected).toFixed(2)
      if (survival2.opt_projected === 'NaN' || survival2.opt_projected === 'Infinity' ) survival2.opt_projected = 0;
      return (survival2.opt_projected);
   } catch (error) {
      survival2.opt_projected = 0;
      return (0);
   }
})



definePageMeta({
    layout: 'main'
})


</script>