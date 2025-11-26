
<template>

  <div class="flex justify-between items-center print:hidden">
    <h1 class="text-md font-bold">MY DASHBOARD</h1>
    <div class="flex items-center space-x-4">
      <button @click="openSlideModal()"
        class="rounded-full px-6 py-2 bg-green-300 text-black font-semibold shadow-md hover:bg-green-400 transition-colors duration-200">My
        Dashboard Settings</button>
      <!-- <button class="btn btn-primary">Export</button> -->
      <!-- <button @click="printWindow()" class="btn btn-primary">Print</button> -->
    </div>
  </div>

  <div class="flex justify-between items-center mt-4">
    <div class="inline-block origin-left scale-95 w-3/4">
      <FormSelect name="selected_year" v-model="state.report_year" :options="state.options.report_years"
        @change="change_selected_year()" class="text-sm py-1 px-2 w-1/4 transform scale-90 origin-left" />
    </div>

  </div>


  <div>

    <div v-if="state.loading == false"
      class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12  border-solid border-grey border-t pb-4 pt-4">

      <GraphsGrp01 v-if="state.showGraphsGrp01 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-4 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="'TEENAGE PREGNANCY'" :report_year="state.report_year" :passed_year_data="state.report_years">
      </GraphsGrp01>

      <GraphsGrp02 v-if="state.showGraphsGrp02 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-4 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="'Total number of nutritionally-at-risk pregnant women (PW)'" :report_year="state.report_year">
      </GraphsGrp02>

      <GraphsGrp03 v-if="state.showGraphsGrp03 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-6 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="'Proportion/percentage of nutritionally-at-risk PW'" :report_year="state.report_year">
      </GraphsGrp03>

      <GraphsGrp04 v-if="state.showGraphsGrp04 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-4 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="'Total number of PW with at least 4 pre-natal check-ups'" :report_year="state.report_year">
      </GraphsGrp04>

      <GraphsGrp05 v-if="state.showGraphsGrp05 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-4 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="' Proportion/percentage of PW with at least 4 pre-natal check-ups'"
        :report_year="state.report_year">
      </GraphsGrp05>

      <GraphsGrp06 v-if="state.showGraphsGrp06 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-4 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="'Total Number of deliveries attended by skilled health professionals'"
        :report_year="state.report_year">
      </GraphsGrp06>

      <GraphsGrp37 v-if="state.showGraphsGrp37 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-4 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="' Net Enrolment rate:'" :report_year="state.report_year" :passed_year_data="state.report_years">
      </GraphsGrp37>

      <GraphsGrp45 v-if="state.showGraphsGrp45 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-4 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="' Total number of Out- of- school children and youth (OSCY)'" :report_year="state.report_year">
      </GraphsGrp45>

      <GraphsGrp48 v-if="state.showGraphsGrp48 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="'Total number of violence against children cases, by type of violence'"
        :report_year="state.report_year">
      </GraphsGrp48>

      <GraphsGrp49 v-if="state.showGraphsGrp49 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="'Total number of violence against children cases resolved, by type of violence'"
        :report_year="state.report_year">
      </GraphsGrp49>

      <GraphsGrp50 v-if="state.showGraphsGrp50 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="'Total number of reported Children In-Need of Special Protection (CNSP) cases'"
        :report_year="state.report_year">
      </GraphsGrp50>

      <GraphsGrp55 v-if="state.showGraphsGrp55 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="' Total Number of Crimes Committed by Children, by type/category of crime committed:'"
        :report_year="state.report_year">
      </GraphsGrp55>

      <GraphsGrp59 v-if="state.showGraphsGrp59 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-4 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="'Total Number of BCPC with child representatives, by type of selection process:'"
        :report_year="state.report_year" :passed_year_data="state.report_years">
      </GraphsGrp59>

      <GraphsGrp65 v-if="state.showGraphsGrp65 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="'Established and updated database on children, with all of the following disaggregated information on children'"
        :report_year="state.report_year">
      </GraphsGrp65>

      <GraphsGrp68 v-if="state.showGraphsGrp68 == true" :key="state.refresh_graphs_toggle"
        :passed_data="state.passed_data"
        class="sm:col-span-12 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
        :displaytext="' Total population of children, by sex, by age group'" :report_year="state.report_year">
      </GraphsGrp68>




    </div>

  </div>

  <ModalSlide :show="state.isSlideModalOpen" :close="closeSlideModal" :title="'Select Dashboard Widget'"
    :dialogClass="'flex h-full flex-col divide-y divide-gray-200 bg-opacity-90 bg-green-200 rounded-2xl shadow-xl'"
    :buttonClass="'relative rounded-md bg-gray-400 text-black hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'"
    :tittleClass="'text-2xl text-right font-bold leading-tight tracking-tight text-black'">
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-left sm:px-6 lg:px-8">
          <div class="overflow-hidden px-3 py-3.5 shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">

            <div class="inline-block min-w-full py-2 align-left sm:px-6 lg:px-8">
              <button @click="saveDashboardSettings()"
                class="rounded-full px-6 py-2 bg-green-300 text-black font-semibold shadow-md hover:bg-green-400 transition-colors duration-200">Save
                Dashboard Settings</button>
            </div>



            <table class="table-fixed w-full">
              <thead class="bg-green-200" pl-4> Survival Widgets.
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp01" :value="state.showGraphsGrp01" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200" :displaytext="'Group 1: Teenage Pregnancy'" />
                  </th>
                </tr>

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp02" :value="state.showGraphsGrp02" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200"
                      :displaytext="'Group 2: Total number of nutritionally-at-risk pregnant women (PW)'" />
                  </th>
                </tr>

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp03" :value="state.showGraphsGrp03" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200"
                      :displaytext="'Group 3: Proportion/percentage of nutritionally-at-risk PW'" />
                  </th>
                </tr>
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp04" :value="state.showGraphsGrp04" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200"
                      :displaytext="'Group 4: Total number of PW with at least 4 pre-natal check-ups'" />
                  </th>
                </tr>
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp05" :value="state.showGraphsGrp05" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200"
                      :displaytext="'Group 5: Proportion/percentage of PW with at least 4 pre-natal check-ups'" />
                  </th>
                </tr>

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp06" :value="state.showGraphsGrp06" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200"
                      :displaytext="'Group 6: Total Number of deliveries attended by skilled health professionals'" />
                  </th>
                </tr>



              </thead>
              <thead class="bg-green-200" pl-4> Development Widgets.

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp37" :value="state.showGraphsGrp37" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200" :displaytext="'Group 37: Net Enrolment rate:'" />
                  </th>
                </tr>

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp45" :value="state.showGraphsGrp45" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200"
                      :displaytext="'Group 45: Total number of Out- of- school children and youth (OSCY)'" />
                  </th>
                </tr>



              </thead>

              <thead class="bg-green-200" pl-4> Protection Widgets.

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp48" :value="state.showGraphsGrp48" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200"
                      :displaytext="'Group 48: Total number of violence against children cases, by type of violence'" />
                  </th>
                </tr>

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp49" :value="state.showGraphsGrp49" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200"
                      :displaytext="'Group 49: Total number of violence against children cases resolved, by type of violence'" />
                  </th>

                </tr>

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp50" :value="state.showGraphsGrp50" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200"
                      :displaytext="'Group 50: Total number of reported Children In-Need of Special Protection (CNSP) cases'" />
                  </th>

                </tr>
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp55" :value="state.showGraphsGrp55" :dissabled="false" />
                  </th>

                  <th>
                    <GridCell  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200"
                      :displaytext="'Group 55: Total Number of Crimes Committed by Children, by type/category of crime committed:'" />
                  </th>

                </tr>
              </thead>
              <thead class="bg-green-200" pl-4> Participation Widgets.
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp59" :value="state.showGraphsGrp59" :dissabled="false" />
                  </th>

                  <th>
                    <GridCell  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200"
                      :displaytext="'Group 59: Total Number of BCPC with child representatives, by type of selection process:'" />
                  </th>

                </tr>
              </thead>
              <thead class="bg-green-200" pl-4> Governance Widgets.

                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp65" :value="state.showGraphsGrp65" :dissabled="false" />
                  </th>

                  <th>
                    <GridCell  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200"
                      :displaytext="'Group 65: Established and updated database on children, with all of the following disaggregated information on children'" />
                  </th>

                </tr>
              </thead>
              <thead class="bg-green-200" pl-4> General Information Widgets.
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp68" :value="state.showGraphsGrp68" :dissabled="false"
                      :displaytext="'Group 68'" />
                  </th>
                  <th>
                    <GridCell  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200"
                      :displaytext="'Group 68: Total population of children, by sex, by age group'" />
                  </th>
                </tr>
                <!-- <tr>
                  <th scope="col"  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp70" :value="state.showGraphsGrp70" :dissabled="false" />
                  </th>

                  <th>
                    <GridCell class="px-3 py-3.5 text-left"
                      :displaytext="'Total population of children with disabilities, by type of disability, by age: Learning Disability'" />
                  </th>

                </tr>
                <tr>
                  <th scope="col"  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp71" :value="state.showGraphsGrp71" :dissabled="false" />
                  </th>

                  <th>
                    <GridCell class="px-3 py-3.5 text-left"
                      :displaytext="'Total population of children with disabilities, by type of disability, by age:   Psychosocial Disability'" />
                  </th>

                </tr>
                <tr>
                  <th scope="col"  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp72" :value="state.showGraphsGrp72" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left"
                      :displaytext="'Total population of children with disabilities, by type of disability, by age:  Visual Disability'" />
                  </th>

                </tr>

                <tr>
                  <th scope="col"  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp73" :value="state.showGraphsGrp73" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left"
                      :displaytext="'Total population of children with disabilities, by type of disability, by age:  Intellectual Disability'" />
                  </th>

                </tr>


                <tr>
                  <th scope="col"  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp74" :value="state.showGraphsGrp74" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left"
                      :displaytext="'Total population of children with disabilities, by type of disability, by age: Physical Disability'" />
                  </th>

                </tr>
                <tr>
                  <th scope="col"  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp75" :value="state.showGraphsGrp75" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left"
                      :displaytext="'Total population of children with disabilities, by type of disability, by age: Speech & Language Impairment'" />
                  </th>

                </tr>
                <tr>
                  <th scope="col"  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp76" :value="state.showGraphsGrp76" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left"
                      :displaytext="'Total population of children with disabilities, by type of disability, by age: Deaf or Hard of Hearing'" />
                  </th>

                </tr>

                <tr>
                  <th scope="col"  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp77" :value="state.showGraphsGrp77" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left"
                      :displaytext="'Total population of children with disabilities, by type of disability, by age: Rare Diseases (RA 10747)'" />
                  </th>

                </tr>

                <tr>
                  <th scope="col"  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
             rounded-md bg-green-200 hover:bg-green-300 transition-colors duration-200">
                    <GridCheckbox v-model="state.showGraphsGrp78" :value="state.showGraphsGrp78" :dissabled="false" />
                  </th>
                  <th>
                    <GridCell class="px-3 py-3.5 text-left"
                      :displaytext="'Total population of children with disabilities, by type of disability, by age: Cancer (RA 11215)'" />
                  </th>

                </tr> -->


              </thead>

            </table>
          </div>
        </div>
      </div>


    </div>

  </ModalSlide>


</template>

<script setup>
//import ApexChartfrom 'vue3-apexcharts';
//import {Rights_entry_configServices } from '~/components/api/Rights_entry_configService'; 
import {useUserStore} from '~/store/user'
import {userDashboardWidgetsService } from '~/components/api/UserDashboardWidgetsService'; 
import {report_yearService } from '~/components/api/ReportYears';
import {reportDetailsGroupsService } from '~/components/api/ReportDetailsGroupsService'; 
const userStore = useUserStore()


//console.log(userStore.getUser.user_dashboard_widgets)


definePageMeta({
    layout: 'main'
})



onMounted(() => {
  fetchreportyear()
  fetchData()
 
  loop_through_user_widgets()
  
})



const state = reactive({

    loading: true,

    user_dashboard_widgets: userStore.getUser.user_dashboard_widgets,
    user_id: userStore.getUser.id,

    passed_data: [],

    isPageLoading: false,
    isSlideModalOpen: false,
    options: {
      report_years:[
            {value: '1', label: 'Jan - Dec 2024', year: '2024' },
            {value: '2', label: 'Jan - Dec 2025', year: '2025' },

        ],},
    report_year: 1,

    report_years: [],
    year: '2025',

    refresh_graphs_toggle: false,
    showGraphsGrp01: false,
    showGraphsGrp02: false,
    showGraphsGrp03: false,
    showGraphsGrp04: false,
    showGraphsGrp05: false,
    showGraphsGrp06: false,
    showGraphsGrp37: false, //
    showGraphsGrp45: false,
    showGraphsGrp48: false,//
    showGraphsGrp49: false,
    showGraphsGrp50: false,
    showGraphsGrp55: false,
    showGraphsGrp59: false,//
    showGraphsGrp65: false,//
    showGraphsGrp68: false,//
    showGraphsGrp70: false,//
    showGraphsGrp71: false,
    showGraphsGrp72: false,
    showGraphsGrp73: false,
    showGraphsGrp74: false,
    showGraphsGrp75: false,
    showGraphsGrp76: false,
    showGraphsGrp77: false,
    showGraphsGrp78: false,

})

function openSlideModal() {
    state.isSlideModalOpen = true
}
function closeSlideModal() {
    state.isSlideModalOpen = false
}


function saveDashboardSettings() {
  
  deleteUserDashboardWidgets()
  loopthroughNewSettings()
  //fetchUserDashboardWidgets()
  loop_through_user_widgets()
 
   state.isSlideModalOpen = false
}

function change_selected_year(){

  // state.current_user_role = state.roles.data[ state.selected_user_role -1]

  //state.year = state.report_years.value
  //console.log('state. in change',state.report_year)
  //state.refresh_graphs01 = true

if (state.refresh_graphs_toggle == false){
  state.refresh_graphs_toggle = true
}else {
  state.refresh_graphs_toggle = false
} 

  refresh_graphs()
  //console.log('report_year', state.report_year)
  
}

async function fetchData() {
  state.isPageLoading = true
  const response = await reportDetailsGroupsService.getReportDetailsGroups()
  state.passed_data.data = response.data
  //console.log('fetchData', state.passed_data)
  state.loading = false
 
}   


async function deleteUserDashboardWidgets(){
  try{
     await userDashboardWidgetsService.deleteUserDashboardWidgets(state.user_id);
   
    } catch (error) {
        //console.log(error)
        state.errorcount = state.errorcount + 1;
    }
}

function loopthroughNewSettings(){

  //console.log('loop thru start')

  if (state.showGraphsGrp01) {
    SaveUserDashboardWidgets(1)
  }
  if (state.showGraphsGrp02) {
    SaveUserDashboardWidgets(2)
  }
  if (state.showGraphsGrp03) {  
    SaveUserDashboardWidgets(3)
  }
  if (state.showGraphsGrp04) {
    SaveUserDashboardWidgets(4) 
  }
  if (state.showGraphsGrp05) {  
    SaveUserDashboardWidgets(5) 
  }
  if (state.showGraphsGrp06) {  
    SaveUserDashboardWidgets(6) 

  }
  if (state.showGraphsGrp37) {  
    SaveUserDashboardWidgets(37) 

  }
  if (state.showGraphsGrp45) {  
    SaveUserDashboardWidgets(45) 

  }
  if (state.showGraphsGrp48) {  
    SaveUserDashboardWidgets(48) 

  }
  if (state.showGraphsGrp49) {  
    SaveUserDashboardWidgets(49) 

  }
  if (state.showGraphsGrp50) {  
    SaveUserDashboardWidgets(50) 

  }
  if (state.showGraphsGrp55) {  
    SaveUserDashboardWidgets(55) 

  }                        

  if (state.showGraphsGrp59) {  
    SaveUserDashboardWidgets(59) 

  } 
  if (state.showGraphsGrp65) {  
    SaveUserDashboardWidgets(65) 

  }
  if (state.showGraphsGrp68) {  
    SaveUserDashboardWidgets(68) 

  } 
  if (state.showGraphsGrp70) {  
    SaveUserDashboardWidgets(70) 

  } 
  if (state.showGraphsGrp71) {  
    SaveUserDashboardWidgets(71) 

  }
  if (state.showGraphsGrp72) {  
    SaveUserDashboardWidgets(72) 

  }
  if (state.showGraphsGrp73) {  
    SaveUserDashboardWidgets(73) 

  }
  if (state.showGraphsGrp74) {  
    SaveUserDashboardWidgets(74) 

  }
  if (state.showGraphsGrp75) {  
    SaveUserDashboardWidgets(75) 

  }  

    

}


async function SaveUserDashboardWidgets(group_id){ 

  try {
        let params = {
            user_id: state.user_id,
            group_id: group_id,

        }
        const response = await userDashboardWidgetsService.createUserDashboardWidget(params);
      

    } catch (error) {
        //console.log(error)
        state.errorcount = state.errorcount + 1;
    }finally {
        //console.log('saved user dashboard widget', group_id)
    }

   

}




async function fetchreportyear() {
    try {
           const response = await report_yearService.getReportYears()
        if (response.data) {
            
            state.report_years.data = response.data
            var data = [];
            var datasources = [];
            if (state.report_years.data != null) {
                
                datasources = state.report_years.data

                for (const i in datasources) {
                    const value = datasources[i].id;
                    if (!datasources.includes(value)) {

                        if(datasources[i].status == 1){
                        data[i] = { "value": datasources[i].id, "label": datasources[i].name, "year": datasources[i].year  };
                        }
                    }
                }
                state.options.report_years = data;
                
            }

        }
    } catch (error) { 
        //console.log(error)
    }

    //console.log(state.options.report_years)
}

async function fetchUserDashboardWidgets() {
  try {
    const response = await userDashboardWidgetsService.getUserDashboardWidget(state.user_id);

    if (response.data) {
            state.user_dashboard_widgets.data = response.data
            //console.log( state.user_dashboard_widgets.data)
        }
        else{
            state.user_dashboard_widgets = []
            //console.log( 'empty',state.user_dashboard_widgets.data)

        }
    
  } catch (error) {
    
  }
    
   
}

function refresh_graphs(){
  //console.log('refresh graphs')
  destroy_graphs()
  //fetchUserDashboardWidgets()
  loop_through_user_widgets()

}

async function destroy_graphs(){

  state.showGraphsGrp01 = false
  state.showGraphsGrp02 = false
  state.showGraphsGrp03 = false
  state.showGraphsGrp04 = false
  state.showGraphsGrp05 = false
  state.showGraphsGrp06 = false
  state.showGraphsGrp37 = false //
  state.showGraphsGrp45 = false
  state.showGraphsGrp48 = false//
  state.showGraphsGrp49 = false
  state.showGraphsGrp50 = false
  state.showGraphsGrp55 = false
  state.showGraphsGrp59 = false//
  state.showGraphsGrp65 = false//
  state.showGraphsGrp68 = false//
  state.showGraphsGrp70 = false//
  state.showGraphsGrp71 = false
  state.showGraphsGrp72 = false
  state.showGraphsGrp73 = false
  state.showGraphsGrp74 = false
  state.showGraphsGrp75 = false
  state.showGraphsGrp76 = false
  state.showGraphsGrp77 = false
  state.showGraphsGrp78 = false

}



function loop_through_user_widgets(){

  
  //console.log( 'loop', state.user_dashboard_widgets)

  for (let i = 0; i < state.user_dashboard_widgets.length; i++) {
    const group_id = state.user_dashboard_widgets[i].group_id;
    //console.log('group_id', group_id)
    
    if (group_id === 1) {
      state.showGraphsGrp01 = true
    } else if (group_id === 2)  {
      state.showGraphsGrp02 = true
    } else if (group_id === 3)  {
      state.showGraphsGrp03 = true
    } else if (group_id === 4)  {
      state.showGraphsGrp04 = true
    } else if (group_id === 5)  {
      state.showGraphsGrp05 = true
    } else if (group_id === 6) {
      state.showGraphsGrp06 = true
    } else if (group_id === 37) {
      state.showGraphsGrp37 = true
    } else if (group_id === 45) {
      state.showGraphsGrp45 = true
    } else if (group_id === 48) {
      state.showGraphsGrp48 = true
    } else if (group_id === 49) {
      state.showGraphsGrp49 = true
    } else if (group_id === 50) {
      state.showGraphsGrp50 = true
    } else if (group_id === 55) {
      state.showGraphsGrp55 = true
    } else if (group_id === 59) {
      state.showGraphsGrp59 = true
    } else if (group_id === 65) {
      state.showGraphsGrp65 = true
    } else if (group_id === 68) {
      state.showGraphsGrp68 = true
    }else if (group_id === 70) {
      state.showGraphsGrp70 = true
    }else if (group_id === 71) {
      state.showGraphsGrp71 = true
    }else if (group_id === 72) {
      state.showGraphsGrp72 = true
    }else if (group_id === 73) {
      state.showGraphsGrp73 = true
    }else if (group_id === 74) {
      state.showGraphsGrp74 = true
    }else if (group_id === 75) {
      state.showGraphsGrp75 = true
    }

}}



function pageLoads(value) {
    state.isPageLoading = value
}

function printWindow(){
  window.print();
}
</script>

<style>
@media print {
  body {
    background: white;
  }

  /* Optional: prevent page breaks inside chart */
  .apexcharts-canvas {
    page-break-inside: avoid;
  }
}
</style>