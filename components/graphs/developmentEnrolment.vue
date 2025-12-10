<template>
 <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 w-full">
        SCHOOL ENROLMENT
    </h3>
    <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">

        <!-- Chart 1 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
                STUDENT ENROLMENT
            </h3>
            <apexchart 
                type="bar"
                height="300"
                width="100%"
                :options="state.populationHoriOptions"
                :series="state.student_enrol"
            />
        </div>

        <!-- Chart 2 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
               NET ENROLMENT
            </h3>
            <apexchart 
                type="bar"
                height="300"
                width="100%"
                :options="state.populationHoriOptions"
                :series="state.net_enrol"
            />
        </div>

        <!-- Chart 3 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
                COMPLETION
            </h3>
            <apexchart 
                 type="bar"
                height="300"
                width="100%"
                :options="state.populationHoriOptions"
                :series="state.completion"
            />
        </div>

        <!-- Chart 4 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
                 SCHOOL LEAVER (DROP-OUT)
            </h3>
            <apexchart 
                 type="bar"
                height="300"
                width="100%"
                :options="state.populationHoriOptions"
                :series="state.leaver"
            />
        </div>

         <!-- Chart 5 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
                SECTORAL ENROLMENT IP
            </h3>
            <apexchart 
                 type="bar"
                height="300"
                width="100%"
                :options="state.populationHoriOptions"
                :series="state.sectoral_IP"
            />
        </div>

           <!-- Chart 5 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
                SECTORAL ENROLMENT MORO
            </h3>
            <apexchart 
                 type="bar"
                height="300"
                width="100%"
                :options="state.populationHoriOptions"
                :series="state.sectoral_Moro"
            />
        </div>

         <!-- Chart 5 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
                 SECTORAL ENROLMENT CWSN
            </h3>
            <apexchart 
                 type="bar"
                height="300"
                width="100%"
                :options="state.populationHoriOptions"
                :series="state.sectoral_CWSN"
            />
        </div>


          <!-- Chart 5 -->
        <div class="border rounded-xl p-2">
            <h3 class="text-lg font-bold mb-2">
                ALTERNATIVE LEARNING SYSTEM
            </h3>
            <apexchart 
                 type="bar"
                height="300"
                width="100%"
                :options="state.populationHoriOptions"
                :series="state.ALS"
            />
        </div>
    </div>

  
</template>

<script setup>
import { reactive, onMounted } from "vue";

const props = defineProps({
  class: {
    type: String,
    required: false,
    default: "border-solid",
  },
  displaytext: {
    type: String,
    required: false,
  },
  group_id: {
    type: String,
    required: false,
  },
  report_year: {
    type: Number,
    required: false,
  },
  passed_data: {
    type: Object,
    required: true,
  },
  report_years: {
    type: Object,
    required: true,
  },
});

const state = reactive({
  // ✅ VALID INITIAL SERIES (bar)
  graphSeriesAll: [
    {
      name: "Less than 15 yrs old",
      data: [0, 0, 0, 0],
    },
    {
      name: "15 - 19 yrs old",
      data: [0, 0, 0, 0],
    },
  ],

     
  early_childhood: [],
 

  // ✅ VALID INITIAL SERIES (pie)
  graphSeriesPie: [0, 0, 0],

  report_details: [],

  populationHoriOptions: {
    chart: {
      type: "bar",
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    colors: ["#00796B", "#388E3C", "#AFB42B", "#F9A825"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: ["1Q", "2Q", "3Q", "4Q"],
    },
  },

  OptionsPieDatasource: {
    chart: {
      type: "pie",
    },
    colors: ["#fbbf24", "#facc15", "#a3e635", "#4ade80"],
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#333"],
        fontSize: "12px",
        fontWeight: "bold",
      },
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    legend: {
      show: false,
    },
    labels: [
      "Above 19 yrs old",
      "less than 15 yrs old",
      "15 - 19 yrs old",
    ],
  },
});

onMounted(() => {

  buildAnnualArrays();

  fetchReports_Details_Bars_Annual();
 
});



function buildAnnualArrays() {
  const raw = props.report_years ?? [];

  // Normalize into plain array
  let allYears = [];

  if (Array.isArray(raw.data)) {
    allYears = raw.data;
  } else if (Array.isArray(raw)) {
    allYears = raw;
  } else if (Array.isArray(raw?.data?.data)) {
    allYears = raw.data.data;
  } else {
    allYears = Object.values(raw);
  }

  console.log("Annual: Normalized allYears:", allYears);

  // Extract unique years from the dataset
  const years = [...new Set(allYears.map((y) => Number(y.year)))].sort();

  console.log("Annual: Unique years:", years);

  // Create labels (ex: ['2020', '2021', '2022'])
  const yearNames = years.map((yr) => `${yr}`);

  // Store in state
  state.annualYearIds = years;
  state.annualYearNames = yearNames;

  console.log("Annual Year IDs:", years);
  console.log("Annual Year Names:", yearNames);

  // Update x-axis categories for annual charts
  if (yearNames.length) {
    state.populationHoriOptions.xaxis = {
      ...state.populationHoriOptions.xaxis,
      categories: yearNames,
    };
  }
}





async function fetchReports_Details_Bars_Annual() {
  try {
    // Normalize data from props
    const rawData = props.passed_data?.data ?? props.passed_data ?? [];
    const data = Array.isArray(rawData) ? rawData : Object.values(rawData);

    //---------------------------------------------------------------------------------------------------
    // Normalize YEAR IDs from state (annual, not quarter)
    const rawYearIds = state.annualYearIds ?? [];
    // 1) Coerce to numbers, make them unique, and sort them
    const yearIds = Array.from(
      new Set(
        (Array.isArray(rawYearIds)
          ? rawYearIds
          : Object.values(rawYearIds)
        ).map(Number)
      )
    ).sort((a, b) => a - b);

    //---------------------------------------------------------------------------------------------------

    if (!yearIds.length) {
      console.warn('fetchReports_Details_Bars_Annual: yearIds is empty, nothing to aggregate');

      state.early_childhood = [];
     
      return;
    }

    //---------------------------------------------------------------------------------------------------
    // 2) Build a fast lookup: year -> index
    const yearIndexMap = new Map();
    yearIds.forEach((year, index) => {
      yearIndexMap.set(year, index);
    });
    // Optionally store categories for the chart
    // (make sure xaxis.categories uses this)
    state.annualYearCategories = yearIds;

     //---------------------------------------------------------------------------------------------------

    // Initialize arrays
    const student_enrolment_23_1 = new Array(yearIds.length).fill(0);
    const student_enrolment_23_1_1 = new Array(yearIds.length).fill(0);
    const student_enrolment_23_1_2 = new Array(yearIds.length).fill(0);
    const student_enrolment_23_1_3 = new Array(yearIds.length).fill(0);
    const student_enrolment_23_1_4 = new Array(yearIds.length).fill(0);
    
    
    const student_enrolment_24_1 = new Array(yearIds.length).fill(0);
    const student_enrolment_24_2 = new Array(yearIds.length).fill(0);
    const student_enrolment_24_3 = new Array(yearIds.length).fill(0);
    const student_enrolment_24_4 = new Array(yearIds.length).fill(0);

    const student_enrolment_25_1 = new Array(yearIds.length).fill(0);
    const student_enrolment_25_2 = new Array(yearIds.length).fill(0);

    const student_enrolment_26_1 = new Array(yearIds.length).fill(0);
    const student_enrolment_26_2 = new Array(yearIds.length).fill(0);

    const student_enrolment_27_1 = new Array(yearIds.length).fill(0);
    const student_enrolment_27_1_1 = new Array(yearIds.length).fill(0);
    const student_enrolment_27_1_2 = new Array(yearIds.length).fill(0);
    const student_enrolment_27_1_3 = new Array(yearIds.length).fill(0);
    const student_enrolment_27_1_4 = new Array(yearIds.length).fill(0);

    const student_enrolment_28_1 = new Array(yearIds.length).fill(0);
    const student_enrolment_28_1_1 = new Array(yearIds.length).fill(0);
    const student_enrolment_28_1_2 = new Array(yearIds.length).fill(0);
    const student_enrolment_28_1_3 = new Array(yearIds.length).fill(0);
    const student_enrolment_28_1_4 = new Array(yearIds.length).fill(0);

    const student_enrolment_29_1 = new Array(yearIds.length).fill(0);
    const student_enrolment_29_1_1 = new Array(yearIds.length).fill(0);
    const student_enrolment_29_1_2 = new Array(yearIds.length).fill(0);
    const student_enrolment_29_1_3 = new Array(yearIds.length).fill(0);
    const student_enrolment_29_1_4 = new Array(yearIds.length).fill(0);
    
    const student_enrolment_30_1 = new Array(yearIds.length).fill(0);
    const student_enrolment_30_1_1 = new Array(yearIds.length).fill(0);
    const student_enrolment_30_1_2 = new Array(yearIds.length).fill(0);
    const student_enrolment_30_1_3 = new Array(yearIds.length).fill(0);
    const student_enrolment_30_1_4 = new Array(yearIds.length).fill(0);

    // SINGLE PASS over data
   for (const row of data) {
      if (!row) continue;

      //------------------------------------------------------------------------------------------------------
      // Adjust depending on your payload: year / report_year
      const rowYear = Number(row.year ?? row.report_year);
      if (!rowYear || Number.isNaN(rowYear)) continue;

      const idx = yearIndexMap.get(rowYear);
      if (idx === undefined) continue; // not one of the tracked years

      //------------------------------------------------------------------------------------------------------


      const value = row.total != null ? Number(row.total) : 0;
      if (Number.isNaN(value)) continue;

      if (row.indicator_no === '23.1') {
        student_enrolment_23_1[idx] += value;
      }else if (row.indicator_no === '23.1.1') {
        student_enrolment_23_1_1[idx] += value;
      }else if (row.indicator_no === '23.1.2') {
        student_enrolment_23_1_2[idx] += value;
      }else if (row.indicator_no === '23.1.3') {
        student_enrolment_23_1_3[idx] += value;
      }else if (row.indicator_no === '23.1.4') {
        student_enrolment_23_1_4[idx] += value;
      }
      
      else if (row.indicator_no === '24.1') {
        student_enrolment_24_1[idx] += value;
      }else if (row.indicator_no === '24.2') {
        student_enrolment_24_2[idx] += value;
      }else if (row.indicator_no === '24.3') {
        student_enrolment_24_3[idx] += value;
      }else if (row.indicator_no === '24.4') {
        student_enrolment_24_4[idx] += value;
      }

      else if (row.indicator_no === '25.1') {
        student_enrolment_25_1[idx] += value;
      }else if (row.indicator_no === '25.2') {
        student_enrolment_25_2[idx] += value;
      }

       else if (row.indicator_no === '26.1') {
        student_enrolment_26_1[idx] += value;
      }else if (row.indicator_no === '26.2') {
        student_enrolment_26_2[idx] += value;
      }


      else if (row.indicator_no === '27.1') {
        student_enrolment_27_1[idx] += value;
      }else if (row.indicator_no === '27.1.1') {
        student_enrolment_27_1_1[idx] += value;
      }else if (row.indicator_no === '27.1.2') {
        student_enrolment_27_1_2[idx] += value;
      }else if (row.indicator_no === '27.1.3') {
        student_enrolment_27_1_3[idx] += value;
      }else if (row.indicator_no === '27.1.4') {
        student_enrolment_27_1_4[idx] += value;
      }


      else if (row.indicator_no === '28.1') {
        student_enrolment_28_1[idx] += value;
      }else if (row.indicator_no === '28.1.1') {
        student_enrolment_28_1_1[idx] += value;
      }else if (row.indicator_no === '28.1.2') {
        student_enrolment_28_1_2[idx] += value;
      }else if (row.indicator_no === '28.1.3') {
        student_enrolment_28_1_3[idx] += value;
      }else if (row.indicator_no === '28.1.4') {
        student_enrolment_28_1_4[idx] += value;
      }
      

       else if (row.indicator_no === '29.1') {
        student_enrolment_29_1[idx] += value;
      }else if (row.indicator_no === '29.1.1') {
        student_enrolment_29_1_1[idx] += value;
      }else if (row.indicator_no === '29.1.2') {
        student_enrolment_29_1_2[idx] += value;
      }else if (row.indicator_no === '29.1.3') {
        student_enrolment_29_1_3[idx] += value;
      }else if (row.indicator_no === '29.1.4') {
        student_enrolment_29_1_4[idx] += value;
      }

       else if (row.indicator_no === '30.1') {
        student_enrolment_30_1[idx] += value;
      }else if (row.indicator_no === '30.1.1') {
        student_enrolment_30_1_1[idx] += value;
      }else if (row.indicator_no === '30.1.2') {
        student_enrolment_30_1_2[idx] += value;
      }else if (row.indicator_no === '30.1.3') {
        student_enrolment_30_1_3[idx] += value;
      }else if (row.indicator_no === '30.1.4') {
        student_enrolment_30_1_4[idx] += value;
      }



      state.student_enrol = [
      { name: 'Total number of School enrollees (Current SY)', data: student_enrolment_23_1 },
      { name: 'Total number of Kindergarten enrollees (Current SY)', data: student_enrolment_23_1_1 },
      { name: 'Total number of Elementary enrollees (Current SY)', data: student_enrolment_23_1_2 },
      { name: 'Total number of Junior High School enrollees (Current SY)', data: student_enrolment_23_1_3 },
      { name: 'Total number of Senior High School enrollees (Current SY)', data: student_enrolment_23_1_4 },
      ];

       state.net_enrol = [
      { name: 'Kindergarten Net Enrolment Rate (Current SY)', data: student_enrolment_24_1 },
      { name: 'Elementary Net Enrolment Rate (Current SY)', data: student_enrolment_24_2 },
      { name: 'Junior High School Net Enrolment Rate (Current SY)', data: student_enrolment_24_3 },
      { name: 'Senior High School Net Enrolment Rate (Current SY)', data: student_enrolment_24_4 },
      ];

        state.completion = [
      { name: 'Kindergarten & Elementary Completion Rate (Previous SY)', data: student_enrolment_25_1 },
      { name: 'Secondary Completion Rate (Previous SY)', data: student_enrolment_25_2 },
      ];


       state.leaver = [
      { name: 'Kinder & Elementary Drop-out Rate (Current SY)', data: student_enrolment_26_1 },
      { name: 'Secondary Drop-out Rate (Current SY)', data: student_enrolment_26_2 },
      ];

     

        state.sectoral_IP = [
      { name: 'Total number of ALL IP children enrolled (Current SY)', data: student_enrolment_27_1 },
      { name: 'Total number of IP children enrolled in Kindergarten (Current SY)', data: student_enrolment_27_1_1 },
      { name: 'Total number of IP children enrolled in Elementary (Current SY)', data: student_enrolment_27_1_2 },
      { name: 'Total number of IP children enrolled in JHS (Current SY)', data: student_enrolment_27_1_3 },
      { name: 'Total number of IP children enrolled in SHS (Current SY)', data: student_enrolment_27_1_4 },
      ];

        state.sectoral_Moro = [
      { name: 'Total number of ALL Moro children enrolled (Current SY)', data: student_enrolment_28_1 },
      { name: 'Total number of Moro children enrolled in Kindergarten (Current SY)', data: student_enrolment_28_1_1 },
      { name: 'Total number of Moro children enrolled in Elementary (Current SY)', data: student_enrolment_28_1_2 },
      { name: 'Total number of Moro children enrolled in JHS (Current SY)', data: student_enrolment_28_1_3 },
      { name: 'Total number of Moro children enrolled in SHS (Current SY)', data: student_enrolment_28_1_4 },
      ];


        state.sectoral_CWSN = [
      { name: 'ALL Children with Special Needs (CWSN) / (CWD) enrolled (Current SY)', data: student_enrolment_29_1 },
      { name: 'Total number of CWSN/CWD children enrolled in Kindergarten (Current SY)', data: student_enrolment_29_1_1 },
      { name: 'Total number of CWSN/CWD children enrolled in Elementary (Current SY)', data: student_enrolment_29_1_2 },
      { name: 'Total number of CWSN/CWD children enrolled in JHS (Current SY)', data: student_enrolment_29_1_3 },
      { name: 'Total number of CWSN/CWD children enrolled in SHS (Current SY)', data: student_enrolment_29_1_4 },
      ];

         state.ALS = [
      { name: 'Children enrolled/passers in ALS (aged 17 years old and below only)', data: student_enrolment_30_1 },
      { name: 'Children enrolled/passers in ALS Basic Literacy Program (aged 17 years old and below only)', data: student_enrolment_30_1_1 },
      { name: 'Children enrolled/passers in ALS A&E Elementary Level (aged 17 years old and below only)', data: student_enrolment_30_1_2 },
      { name: 'Children enrolled/passers in ALS A&E Junior High School Level (aged 17 years old and below only)', data: student_enrolment_30_1_3 },
      { name: 'Children enrolled/passers in ALS A&E Senior High School Level (aged 17 years old and below only)', data: student_enrolment_30_1_4 },
      ];

    }

  } catch (error) {
    console.error('fetchReports_Details_Bars error:', error);

  
  }
}

</script>



