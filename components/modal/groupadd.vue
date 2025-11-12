<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        class="w-full sm:max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <h2 class="text-lg font-semibold mb-4">{{ props.modalTitle }}</h2>

        <div
          class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-16 border-solid border-grey border-t pb-4 max-h-[80vh] overflow-y-auto">
          <!-- Header Row -->
          
          <GridCell
            class="sm:col-span-1 flex bg-yellow-400  justify-center text-xl text-black border-white border-l border-b pb-1"
            :displaytext="props.selected_year" />
          
            <GridCell
            class="sm:col-span-15 flex  bg-green-700 justify-center text-sm text-black border-white border-r pb-1"
            :displaytext="category" />

          <GridCell
            class="sm:col-span-1 flex bg-yellow-400 justify-center text-xl text-black border-white border-l border-r border-b pb-1"
            :displaytext="group.group_no" />

          <GridCell
            class="sm:col-span-15 flex justify-center items-left text-md text-white table-header-text border-white border-r border-b pb-1"
            :displaytext="subcategory" />

          <!-- Column Headers -->
          <GridCell class="sm:col-span-6 text-center table-header-4 border-white border-l border-b border-grey pb-1"
            :displaytext="'INDICATOR'" />
          <GridCell class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
            :displaytext="'MALE'" />
          <GridCell class="sm:col-span-2 text-center table-header-4 border-l border-white border-b border-grey pb-1"
            :displaytext="'FEMALE'" />
          <GridCell class="sm:col-span-2 text-center table-header-4 border-white border-l border-b border-grey pb-1"
            :displaytext="'TOTAL'" />
          <GridCell
            class="sm:col-span-4 text-center table-header-4 border-white border-l border-b border-r border-grey pb-1"
            :displaytext="'REMARKS'" />

          <!-- Data Rows -->
          <template v-for="el in group.indicator_group_elements" :key="el.indicator_no">
            <GridCell class="sm:col-span-1 px-2 text-left table-header-4 text-xs border-white ring-1 ring-white pb-1"
              :displaytext="el.indicator_no" />
            <GridCell class="sm:col-span-5 px-1 text-left table-header-4 text-xs border-white ring-1 ring-white pb-1"
              :displaytext="el.description" />

            <GridTextEntry v-model="state.male[el.indicator_no]"
              class="sm:col-span-2 text-right border-l border-b border-grey pb-1" :entrystatus="el.male" />

            <GridTextEntry v-model="state.female[el.indicator_no]"
              class="sm:col-span-2 text-right border-l border-b border-grey pb-1" :entrystatus="el.female" />

            <GridTextEntry v-model="state.total[el.indicator_no]"
              class="sm:col-span-2 text-right border-l border-b border-grey pb-1" :entrystatus="el.total" />

            <GridTextArea v-model="state.remarks[el.indicator_no]"
              class="sm:col-span-4 px-1 table-header-4 text-center text-xs border-l border-b border-grey pb-1"
              :entrystatus="el.remarks" :displaytext="''" />
          </template>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 flex justify-end gap-2">
          <button class="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300" @click="$emit('close')">
            Cancel
          </button>

          <button @click="computeTotals" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Compute Totals
          </button>

          <button v-if="mode === 'add'" class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-500"
            @click="saveIndicators">
            Save Indicator Data
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { reactive } from 'vue'
import { reportDetailsService } from '~/components/api/ReportDetailsService';


 //state.selected_year_id = state.selected_year_id
 //   state.selected_year 

const props = defineProps({
  show: Boolean,
  mode: String,
  modalTitle: String,
  category: String,
  subcategory: String,
  group: Object,
  selected_year: [String, Number],
  selected_year_id: [String, Number], // ✅ flexible, but we'll coerce to Number later
})

// --- Local reactive state ---
const state = reactive({
  male: {},
  female: {},
  total: {},
  remarks: {},
})

// Initialize state
if (props.group?.indicator_group_elements) {
  props.group.indicator_group_elements.forEach(el => {
    state.male[el.indicator_no] = el.male_value ?? 0
    state.female[el.indicator_no] = el.female_value ?? 0
    state.total[el.indicator_no] = el.total_value ?? 0
    state.remarks[el.indicator_no] = el.remarks ?? ''
  })
}

// --- Compute Function ---
const computeTotals = () => {
  // 1️⃣ Horizontal compute (row-level totals)
  props.group.indicator_group_elements.forEach(el => {
    const id = el.indicator_no
    const maleStatus = Number(el.male) ?? 1
    const femaleStatus = Number(el.female) ?? 1
    const totalStatus = Number(el.total) ?? 1

    // ✅ Skip horizontal compute if both male & female are disabled (status 0)


    if (el.summed_from == 'na' && !(maleStatus === 0 && femaleStatus === 0 ) && totalStatus === 2) {
      const male = Number(state.male[id]) || 0
      const female = Number(state.female[id]) || 0
      state.total[id] = male + female
    }else if(el.summed_from == 'na' && !(maleStatus === 1 && femaleStatus === 1 ) && totalStatus === 2){
      const male = Number(state.male[id]) || 0
      const female = Number(state.female[id]) || 0
      state.total[id] = male + female
    }
  }) // end Horizontal compute (row-level totals)

  
  
  
  //2️⃣ Vertical compute (summed_from)

  
  props.group.indicator_group_elements.forEach(el => {

    if (el.value_type === 'sum' && el.summed_from !== 'na') 
     {
      // Vertical SUM
      const refs = el.summed_from.split(';').map(r => r.trim())
      let maleSum = 0
      let femaleSum = 0
      let totalSum = 0

      refs.forEach(refNo => {
        maleSum += Number(state.male[refNo]) || 0
        femaleSum += Number(state.female[refNo]) || 0
        totalSum += Number(state.total[refNo]) || 0
      })

      state.male[el.indicator_no] = maleSum
      state.female[el.indicator_no] = femaleSum
      state.total[el.indicator_no] = totalSum

    }

    else if (el.value_type === 'percentage' && el.summed_from !== 'na') 
    {
      // Vertical PERCENTAGE
      const [ref1, ref2] = el.summed_from.split(';').map(r => r.trim())
      const divisor = Number(el.divisor) || 1


      const maleDen = Number(state.male[ref2]) || 0
      const femaleDen = Number(state.female[ref2]) || 0
      const totalDen = Number(state.total[ref2]) || 0

      state.male[el.indicator_no] =
        maleDen
          ? Number((((Number(state.male[ref1]) || 0) / maleDen) * divisor).toFixed(2))
          : 0

      state.female[el.indicator_no] =
        femaleDen
          ? Number((((Number(state.female[ref1]) || 0) / femaleDen) * divisor).toFixed(2))
          : 0

      state.total[el.indicator_no] =
        totalDen
          ? Number((((Number(state.total[ref1]) || 0) / totalDen) * divisor).toFixed(2))
          : 0
    } 
    
    else if (el.value_type === 'ratio' && el.summed_from !== 'na') 
    {
      // Vertical PERCENTAGE
      const [ref1, ref2] = el.summed_from.split(';').map(r => r.trim())
      const divisor = Number(el.divisor) || 1


      const maleDen = Number(state.male[ref2]) || 0
      const femaleDen = Number(state.female[ref2]) || 0
      const totalDen = Number(state.total[ref2]) || 0

      state.male[el.indicator_no] =
        maleDen
          ? Number((((Number(state.male[ref1]) || 0) / maleDen) * divisor).toFixed(2))
          : 0

      state.female[el.indicator_no] =
        femaleDen
          ? Number((((Number(state.female[ref1]) || 0) / femaleDen) * divisor).toFixed(2))
          : 0

      state.total[el.indicator_no] =
        totalDen
          ? Number((((Number(state.total[ref1]) || 0) / totalDen) * divisor).toFixed(2))
          : 0
    } 

    else if (el.value_type === 'rate' && el.summed_from !== 'na') 
    {
      // Vertical PERCENTAGE
      const [ref1, ref2] = el.summed_from.split(';').map(r => r.trim())
      const divisor = Number(el.divisor) || 1


      const maleDen = Number(state.male[ref2]) || 0
      const femaleDen = Number(state.female[ref2]) || 0
      const totalDen = Number(state.total[ref2]) || 0

      state.male[el.indicator_no] =
        maleDen
          ? Number((((Number(state.male[ref1]) || 0) / maleDen) * divisor).toFixed(2))
          : 0

      state.female[el.indicator_no] =
        femaleDen
          ? Number((((Number(state.female[ref1]) || 0) / femaleDen) * divisor).toFixed(2))
          : 0

      state.total[el.indicator_no] =
        totalDen
          ? Number((((Number(state.total[ref1]) || 0) / totalDen) * divisor).toFixed(2))
          : 0
    }

  })
}

const saveIndicators = async () => {
  try {
    const reportYearId = Number(props.selected_year_id)
    let successCount = 0
    let errorCount = 0
    const existingRecords = [] // to collect all existing ones

    // Step 1️⃣ Loop through indicators and check existence
    for (const el of props.group.indicator_group_elements) {
      try {
        const params = {
          indicator_no: el.indicator_no,
          male: Number(state.male[el.indicator_no]) || 0,
          female: Number(state.female[el.indicator_no]) || 0,
          total: Number(state.total[el.indicator_no]) || 0,
          remarks: state.remarks[el.indicator_no] || '',
          indicator_group_element_id: el.id,
          indicator_group_id: props.group.id,
          report_year_id: reportYearId,
          report_year: props.selected_year,
          is_active: 1,
        }

        const res = await reportDetailsService.createReportDetails(params)

        // Collect existing records for later update
        if (res.exists && res.existing_id) {
          existingRecords.push({ id: res.existing_id, params })
        } else if (res?.data) {
          successCount++
          console.log('✅ Created new record:', res.data.id)
        } else {
          errorCount++
        }
      } catch (error) {
        console.error(`❌ Error saving indicator ${el.indicator_no}:`, error)
        errorCount++
      }
    }

    // Step 2️⃣ If there are existing records, ask once
    if (existingRecords.length > 0) {
      const confirmUpdate = confirm(
        `${existingRecords.length} record(s) already exist. Do you want to update all of them?`
      )

      if (confirmUpdate) {
        // Step 3️⃣ Update all existing ones
        for (const item of existingRecords) {
          try {
            await reportDetailsService.updateReportDetails(item.params, item.id)
            successCount++
            console.log(`🔁 Updated existing record ID: ${item.id}`)
          } catch (error) {
            console.error(`❌ Error updating record ID ${item.id}:`, error)
            errorCount++
          }
        }
      } else {
        console.log('⏹️ User cancelled updating existing records.')
      }
    }

    console.log(`✅ Save complete. Success: ${successCount}, Errors: ${errorCount}`)
  } catch (error) {
    console.error('❌ Error in saveIndicators:', error)
  }
}


// const saveIndicators = async () => {
//   try {
//     const reportYearId = Number(props.selected_year_id)
//     let successCount = 0
//     let errorCount = 0

//     // Loop through each indicator group element
//     for (const el of props.group.indicator_group_elements) {
//       try {
//         const params = {
//           indicator_no: el.indicator_no,
//           male: Number(state.male[el.indicator_no]) || 0,
//           female: Number(state.female[el.indicator_no]) || 0,
//           total: Number(state.total[el.indicator_no]) || 0,
//           remarks: state.remarks[el.indicator_no] || '',
//           indicator_group_element_id: el.id,
//           indicator_group_id: props.group.id,
//           report_year_id: reportYearId, // numeric and clean for Laravel
//           report_year: props.selected_year,
//           is_active: 1,
//         }

//         console.log('Saving indicator:', params)

//         const res = await reportDetailsService.createReportDetails(params);

//         if (res.exists) {
//           const confirmUpdate = confirm(res.message + ' Update existing record?');
//           if (confirmUpdate) {

//             console.log('res.existing_id', res.existing_id);
//             console.log('params', params);
//             await reportDetailsService.updateReportDetails(params, res.existing_id);
//             console.log('✅ Updated existing record');
          
          
//           } else {
//             console.log('⏹️ Cancelled');
//           }
//         } else {
//           console.log('✅ Created new record:', res.data.id);
//         }


//         //console.log(`Response for indicator ${el.indicator_no}:`, response)

//         if (res?.data) {
//           successCount++
//         } else {
//           errorCount++
//         }

//       } catch (error) {
//         console.error(`Error saving indicator ${el.indicator_no}:`, error)
//         errorCount++
//       }
//     }

//     console.log(`✅ Save complete. Success: ${successCount}, Errors: ${errorCount}`)

//   } catch (error) {
//     console.error('❌ Error in saveIndicators:', error)
//   }
// }



// const saveIndicators = async () => {
//   try {
//     // 🧠 Always ensure report_year_id is a Number
//     const reportYearId = Number(props.selected_year_id)

//     const payload = props.group.indicator_group_elements.map(el => ({
//       indicator_no: String(el.indicator_no),
//       male: Number(state.male[el.indicator_no]) || 0,
//       female: Number(state.female[el.indicator_no]) || 0,
//       total: Number(state.total[el.indicator_no]) || 0,
//       remarks: state.remarks[el.indicator_no] || '',
//       indicator_group_element_id: el.id,
//       indicator_group_id: props.group.id,
//       report_year_id: reportYearId,   // ✅ numeric, clean for Laravel
//       report_year: props.selected_year,
//       is_active: 1,
      
//     }))

//     console.log('Payload to be saved:', payload)

//     // Example call to backend repo:
    
//      const response = await reportDetailsService.createReportDetails(payload);

//   } catch (error) {
//     console.error('Error saving indicators:', error)
//   }
// }




// async function saveReportDetails() {

//     var successcount = 0;
//     var errorcount = 0;

//     if (state.datasource_id == 0) {
//         alert("Please select a datasource.")
//         //openAlertModal(state.group, 'Please select a datasource.', state.group_header, errorcount, successcount)

//         return;
//     }
    
//     for (const el of group.indicator_group_elements) {
//         console.log(el.id, el.name)
//       // await someAsyncFunction(el)
//     }



//     for (let i = 0; i < state.Selected_Rights_entry_config_group.data.length; i++) {
//         try {
//             let true_grand_total = 0

//             if (state.Selected_Rights_entry_config_group.data[i].tier_level == 1) {

//                 true_grand_total = state.grand_total[state.Selected_Rights_entry_config_group.data[i].sequence_header]

//             } else {
//                 // this should be changed for those entries that are not human count.
//                 //true_grand_total = 0
//                 //-----------------------------------------------------------    
//             }
//             let params = {

//                 sequence_header: state.Selected_Rights_entry_config_group.data[i].sequence_header,
//                 male: state.male[state.Selected_Rights_entry_config_group.data[i].sequence_header],
//                 female: state.female[state.Selected_Rights_entry_config_group.data[i].sequence_header],
//                 total: state.total[state.Selected_Rights_entry_config_group.data[i].sequence_header],
//                 grand_total: true_grand_total,
//                 remarks: state.remarks[state.Selected_Rights_entry_config_group.data[i].sequence_header],
//                 entry_type: state.selected_entry_type,
//                 rights_entry_config_id: state.Selected_Rights_entry_config_group.data[i].id,
//                 report_year_id: state.selected_year_id,
//                 agency_id: state.datasource_id,
//                 group_id: state.Selected_Rights_entry_config_group.data[i].group,
//                 group_agency_datasource_id: state.datasource_id,
//                 is_active: 1,
//                 report_schedule: state.report_schedule
//                 //report_year: state.options.report_years[state.selected_year_id].year,
//             }

//             //console.log('params', params)
//             const response = await reportDetailsService.createReportDetails(params);
//             if (response.data) {
//                 successcount = successcount + 1;
//                 //successAlert("Success!", 'Successfully Added to database.')
//             } else {
//                 errorcount = errorcount + 1;
//             }

//         } catch (error) {
//             //console.log('error', error)
//             errorcount = errorcount + 1;
//             alert("Error in saving data. Please check the values you entered.")
//             state.isAddModalOpen = false
//         }
//     }


//     if (successcount > 0) {
//         //successAlert("Success!", 'Successfully Added to database.')
//         state.successcount = successcount;
//         state.errorcount = errorcount;
//         openAlertModal(state.group, 'Successfully Added to the database.', state.group_header, errorcount, successcount)
//         state.isAddModalOpen = false
//     }


//     //state.buttonsavenew = true;

// }


</script>

