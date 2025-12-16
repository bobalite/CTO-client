<template>
  
    <div class="print:hidden sm:flex sm:items-center">

      <div class="mt-8 flow-root">
            <p class="mb-1 text-lg font-normal text-gray-500 lg:text-xl sm:px-10 xl:px-1 dark:text-black">Children's
                Rights Situational Analysis (CRSA)</p>
            <div class="mt-8 flow-root">

                <div class="flex gap2 sm:gap-3 items-center">
                    <div class="flex-1">
                        <FormYearSelector v-model="state.selected_year_id" :options="state.options.years"
                            :change-selected-year="changeYear()" />

                        <FormRightSelector :options="state.options.rights" v-model="state.selected_rights_id"
                            @click="changeData" />
                    </div>

                </div>
            </div>

        <div class="sm:flex-auto">

          <p>Select Right</p>
          <div>
            <FormSelect :options="state.options.rights" v-model="state.selected_rights_id" @click="changeData()" />
          </div>
        </div>
        <div class="sm:flex-auto">

          <p>Select Report Type</p>
          <div>
            <FormSelect name="selected_report_type" v-model="state.selected_graph_type" :options="selected_graph_type"
              @click="changeGraphType()" />
          </div>
        </div>
      </div>

    </div>

    <template v-if="state.selected_graph_type == 'none'">
      <PrintHeader />

      <template v-for="selected_right in state.Selected_Rights_entry_config_values">

        <template v-if="selected_right.tier_level == 1">
          <PrintRowheader v-if="selected_right.tier_level == 1" :group_number="selected_right.group"
            :group_header="selected_right.group_header" :datasource="selected_right.agency_id"
            :is_annual="selected_right.is_annual" />

          <PrintRow :indicator="selected_right.description" :male=1 :female=1 :total=1
            :grand_total="selected_right.grand_total" :actual_male="selected_right.actual_male || ''"
            :actual_female="selected_right.actual_male || ''" :actual_total="''"
            :actual_grand_total=selected_right.actual_grand_total :projected_male="''" :projected_female="''"
            :projected_total="''" :projected_grand_total=selected_right.projected_grand_total :national_proj_male="''"
            :national_proj_female="''" :national_proj_total="''"
            :national_proj_grand_total=selected_right.national_proj_grand_total />

        </template>
        <PrintRow v-if="selected_right.tier_level != 1" :indicator="selected_right.description"
          :male="selected_right.male" :female="selected_right.female" :total="selected_right.total"
          :grand_total="selected_right.grand_total" :actual_male=selected_right.actual_male
          :actual_female=selected_right.actual_female :actual_total=selected_right.actual_total
          :actual_grand_total=selected_right.actual_grand_total :projected_male=selected_right.projected_male
          :projected_female=selected_right.projected_female :projected_total=selected_right.projected_total
          :projected_grand_total=selected_right.projected_grand_total
          :national_proj_male=selected_right.national_proj_male
          :national_proj_female=selected_right.national_proj_female
          :national_proj_total=selected_right.national_proj_total
          :national_proj_grand_total=selected_right.national_proj_grand_total />



      </template>
    </template>


    <PrintFooter />
    <button @click="printChart" class="print:hidden mt-4 bg-blue-500 text-white px-4 py-2 rounded">
      Print Report
    </button>
  
</template>