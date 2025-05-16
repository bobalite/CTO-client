<template>
    
    <!-- <GridTextInput v-model = "popu1.actual_fullyimmunized" :function ="compute_actual" :class = "'sm:col-span-1 text-center'" />
    <GridTextInput v-model = "popu1.projected_fullyimmunized" :function ="compute_actual" :class = "'sm:col-span-1 text-center'" />
    <GridTextReadonly :model-value="popu1.percentage_coverage_actual" :name="percentage_coverage_actual" /> -->
    
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
                
                  <div class="mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8">
                    <div class="sm:col-span-8">

                    </div>


                  <GridSpacer class="sm:col-span-4"/>
                  <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Actual Data'"/>
                  <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Projected Data'"/>
                  <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Score'"/>
                  
                  <GridSpacer class="sm:col-span-4" :displaytext="'Number of fully immunized children'" />
                  <GridTextInput v-model = "popu1.actual_fullyimmunized" :function ="compute_actual" :class = "'sm:col-span-1 '" />
                  <GridTextInput v-model = "popu1.projected_fullyimmunized" :function ="compute_projected" :class = "'sm:col-span-1 '" />
                  
                  <GridTextReadonly  v-model = "popu1.score11" :class = "'sm:col-span-1 '" />
                  
                  <GridSpacer class="sm:col-span-4" :displaytext="'Total population of 12 months old'"/>
                  <GridTextInput v-model = "popu1.totalpop12monthsold_actual" :function ="compute_actual" :class = "'sm:col-span-1 '" />
                  <GridTextInput v-model = "popu1.totalpop12monthsold_projected" :function ="compute_projected" :class = "'sm:col-span-1 '" />
                  
                  
                  <GridSpacer class="sm:col-span-2"/>
                  <GridSpacer class="sm:col-span-4" :displaytext="'Percentage Coverage'"/>
                  <GridTextReadonly :model-value="popu1.percentage_coverage_actual" :name="percentage_coverage_actual" />
                  
                  <GridTextReadonly :model-value="popu1.percentage_coverage_projected" :name="percentage_coverage_projected" />
                  
                  <GridSpacer class="sm:col-span-1"/>
                  <GridSpacer class="sm:col-span-1"/>
                  <GridCheckbox v-model= "popu1.insufficientdata" :class = "'sm:col-span-1'" :inputtype="'checkbox'" :displaytext = "'Insufficient supply due to logistical concern'" :function ="compute_actual" :inputclass="'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'"/>
                  <GridSpacer class="sm:col-span-3 " :displaytext="'Insufficient supply due to logistical concern'"/>
                  <GridSpacer class="sm:col-span-8"/>
                  <GridCheckbox v-model= "popu1.nodata" :class = "'sm:col-span-1'" :inputtype="'checkbox'" :displaytext = "'No Data'" :function ="compute_actual" :inputclass="'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'"/>
                  <GridSpacer class="sm:col-span-2 " :displaytext="'No Data'"/>
                  <GridSpacer class="sm:col-span-8"/>
                  <GridSpacer class="sm:col-span-1" :displaytext="'Data Source:'"/>
                  <GridText :class = "'sm:col-span-6'" :name="actual_data" :inputId="'actual_data'"   />
                  </div>
                
           

              </div>
              <GridSpacer class="sm:col-span-8"/>
              <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">1.2. Prevalence of malnutrition among children aged 0-59 months old</h2>
                
                
                
                <div class="mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8">
                  <GridSpacer class="sm:col-span-4"/>
                  <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Actual Data'"/>
                  <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Projected Data'"/>
                  <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Score'"/>
                  <GridSpacer class="sm:col-span-4 " :displaytext="'Actual number of 0-59 months weighed'"/>
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridSpacer class="sm:col-span-4 " :displaytext="'Total Population of 0-59 months old'"/>
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridSpacer class="sm:col-span-1 " />
                  <GridSpacer class="sm:col-span-4 " :displaytext="'OPT Plus Coverage (0-59 months)'"/>
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridSpacer class="sm:col-span-1 " />
                  <GridSpacer class="sm:col-span-8 " />
                  <GridText :class = "'sm:col-span-3'" :inputtype="'checkbox'" :name="actual_data" :inputId="'actual_data'" :displaytext = "'No Data'" :inputclass="'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'"/>
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
          </div>

          <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">1.3 Percentage coverage of pregnant adolescents provided with prenatal and postpartum services </h2>
                <div class="mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8">
                  <GridSpacer class="sm:col-span-1"/>
                  <GridSpacer class="sm:col-span-4" :displaytext="'Total Population of 10-19 years old (female adolescents)'"/>
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridSpacer class="sm:col-span-2"/>
                  <GridSpacer class="sm:col-span-1"/>
                  <GridSpacer class="sm:col-span-4" :displaytext="'Total Number of Pregnant Adolescents'"/>
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridSpacer class="sm:col-span-2"/>
                  <GridSpacer class="sm:col-span-1"/>
                  <GridSpacer class="sm:col-span-4" :displaytext="'Prevalence of Adolecent Pregnancies'"/>
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  
                </div>
          </div>        

        <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">1.3.1 Percentage coverage of pregnant adolescents with prenatal services </h2>
                <div class="mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8">
                  
                  
                  <GridSpacer class="sm:col-span-2" :displaytext="'Prenatal visits (at least 4)'"/>
                  <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Number of Pregnant Adolescents'"/>
                  <GridSpacer class="sm:col-span-1 text-center " :displaytext="'Adolescents with at least 4 prenatal visits'"/>
                  <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Coverage'"/>
                  <GridSpacer class="sm:col-span-1 text-center " :displaytext="'SCORE'"/>
                  <GridSpacer class="sm:col-span-2"/>
                  <GridSpacer class="sm:col-span-2" :displaytext="'10-14 years old'"/>
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridSpacer class="sm:col-span-2"/>
                  <GridSpacer class="sm:col-span-2" :displaytext="'15-19 years old'"/>
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridSpacer class="sm:col-span-3"/>
                  
                  <GridSpacer class="sm:col-span-2" :displaytext="'Total'"/>
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridSpacer class="sm:col-span-3"/>
                  <GridText :class = "'sm:col-span-3'" :inputtype="'checkbox'" :name="actual_data" :inputId="'actual_data'" :displaytext = "'No reported pregnant adolescent'" :inputclass="'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'"/>
                  <GridSpacer class="sm:col-span-5"/>
                  <GridText :class = "'sm:col-span-3'" :inputtype="'checkbox'" :name="actual_data" :inputId="'actual_data'" :displaytext = "'No Data'" :inputclass="'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'"/>
                  <GridSpacer class="sm:col-span-5"/>
                  <GridSpacer class="sm:col-span-1 " :displaytext="'Note:'" />
                  <GridText :class = "'sm:col-span-6'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridSpacer class="sm:col-span-1"/>
                  <GridSpacer class="sm:col-span-1 " :displaytext="'Data Source:'" />
                  <GridText :class = "'sm:col-span-6'" :name="actual_data" :inputId="'actual_data'"   />
                </div>
        </div>
        
        <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">1.3.2 Percentage coverage of pregnant adolescents with postpartum services </h2>
                <div class="mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8">
                  
                  
                  <GridSpacer class="sm:col-span-2" :displaytext="'Postpartum visits (at least 4)'"/>
                  <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Number of Pregnant Adolescents'"/>
                  <GridSpacer class="sm:col-span-1 text-center " :displaytext="'Adolescents with at least 4 Postpartum visits'"/>
                  <GridSpacer class="sm:col-span-1 text-center" :displaytext="'Coverage'"/>
                  <GridSpacer class="sm:col-span-1 text-center " :displaytext="'SCORE'"/>
                  <GridSpacer class="sm:col-span-2"/>
                  <GridSpacer class="sm:col-span-2" :displaytext="'10-14 years old'"/>
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridSpacer class="sm:col-span-2"/>
                  <GridSpacer class="sm:col-span-2" :displaytext="'15-19 years old'"/>
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridSpacer class="sm:col-span-3"/>
                  <GridSpacer class="sm:col-span-2" :displaytext="'Total'"/>
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridText :class = "'sm:col-span-1'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridSpacer class="sm:col-span-3"/>
                  <GridText :class = "'sm:col-span-3'" :inputtype="'checkbox'" :name="actual_data" :inputId="'actual_data'" :displaytext = "'No reported pregnant adolescent'" :inputclass="'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'"/>
                  <GridSpacer class="sm:col-span-5"/>
                  <GridText :class = "'sm:col-span-3'" :inputtype="'checkbox'" :name="actual_data" :inputId="'actual_data'" :displaytext = "'No Data'" :inputclass="'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'"/>
                  <GridSpacer class="sm:col-span-5"/>
                  <GridSpacer class="sm:col-span-1 " :displaytext="'Note:'" />
                  <GridText :class = "'sm:col-span-6'" :name="actual_data" :inputId="'actual_data'"   />
                  <GridSpacer class="sm:col-span-1"/>
                  <GridSpacer class="sm:col-span-1 " :displaytext="'Data Source:'" />
                  <GridText :class = "'sm:col-span-6'" :name="actual_data" :inputId="'actual_data'"   />
                </div>
          </div>   


        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <h2 class="text-base font-semibold leading-6 text-gray-900">Remarks:</h2>
                    </div>
                    <FormTextArea />
         
                </div>
            </div>
        </div>


    </div>
</template>

<script setup >

import { reactive, computed } from 'vue'


const popu1 = reactive({
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

const compute_actual = computed(() =>{
   try {
      popu1.percentage_coverage_actual = (parseFloat(popu1.actual_fullyimmunized) / parseFloat(popu1.totalpop12monthsold_actual))*100 ;
      popu1.percentage_coverage_actual = parseFloat(popu1.percentage_coverage_actual).toFixed(2)
      




      popu1.score11

      if (popu1.percentage_coverage_actual === 'NaN'){
        popu1.percentage_coverage_actual = 0;
      }

      if (popu1.percentage_coverage_actual === 0){
        popu1.score11 = 0;
      }else if(popu1.percentage_coverage_actual >= 95 ){
        popu1.score11 = 5.0;

      }else if(popu1.percentage_coverage_actual < 95 && popu1.percentage_coverage_actual >= 90 ){
        popu1.score11 = 4.0;

      }else if(popu1.percentage_coverage_actual < 90 && popu1.percentage_coverage_actual >= 85 ){
        popu1.score11 = 3.0;

      }else if(popu1.percentage_coverage_actual < 85 && popu1.percentage_coverage_actual >= 84 ){
        popu1.score11 = 2.0;

      }else{
        popu1.score11 = 1.0;
      }

      if(popu1.insufficientdata){
        popu1.score11 = 1.0;
      }

      if(popu1.nodata){
        popu1.score11 = 0;
      }

      return (popu1.percentage_coverage_actual, popu1.score11);
   } catch (error) {
      popu1.percentage_coverage_actual = 0;
      return (0);
   }
})

const compute_projected = computed(() =>{
   try {
      popu1.percentage_coverage_projected = (parseFloat(popu1.projected_fullyimmunized) / parseFloat(popu1.totalpop12monthsold_projected))*100 ;
      popu1.percentage_coverage_projected = parseFloat(popu1.percentage_coverage_projected).toFixed(2)
      
      if (popu1.percentage_coverage_projected === 'NaN'){
        popu1.percentage_coverage_projected = 0
      }
      
      return (popu1.percentage_coverage_projected);
   } catch (error) {
      popu1.percentage_coverage_projected = 0;
      return (0);
   }
})


definePageMeta({
    layout: 'main'
})


</script>