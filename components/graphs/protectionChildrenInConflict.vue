<template>

    <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 mb-0 w-full">
        CHILDREN IN-CONFLICT WITH THE LAW
    </h3>

     <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div class="border rounded-xl p-2">
            <h3 class="text-sm font-bold mb-2">
               Total Number of Children In-Conflict with the Law
            </h3>
            <apexchart type="bar" height="400" width="100%" :options="state.populationHoriOptions"
                :series="state.child_in_conflict_1" />

        </div>

         <div class="border rounded-xl p-2">
            <h3 class="text-sm font-bold mb-2">
                Total Number of Crimes Against Person Committed By Children
            </h3>
            <apexchart type="bar" height="400" width="100%" :options="state.populationHoriOptions"
                :series="state.child_in_conflict_2" />

        </div>
    </div>



    <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
       

        <div class="border rounded-xl p-2">
            <h3 class="text-sm font-bold mb-2">
                Total Number of Crimes Against Property Committed By Children
            </h3>
            <apexchart type="bar" height="400" width="100%" :options="state.populationHoriOptions"
                :series="state.child_in_conflict_3" />

        </div>

         <div class="border rounded-xl p-2">
            <h3 class="text-sm font-bold mb-2">
               Total Number of Crimes Against Public Order Committed By Children
            </h3>
            <apexchart type="bar" height="400" width="100%" :options="state.populationHoriOptions"
                :series="state.child_in_conflict_4" />

        </div>

          <div class="border rounded-xl p-2">
            <h3 class="text-sm font-bold mb-2">
               Total Number of Crimes Committed By Children Under Special Penal Laws 
            </h3>
            <apexchart type="bar" height="400" width="100%" :options="state.populationHoriOptions"
                :series="state.child_in_conflict_5" />

        </div>

    </div>

    <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">

         <div class="border rounded-xl p-2">
            <h3 class="text-sm font-bold mb-2">
               Grand Total Number of Crimes Committed By Children  
            </h3>
            <apexchart type="bar" height="400" width="100%" :options="state.populationHoriOptions"
                :series="state.child_in_conflict_6" />

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

  quarterNames: [],
  quarterIds: [],
  birth_weight: [],
 

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
    colors: ['#312e81',
            '#c026d3',
            '#46C2CB',
            '#db2777',
            '#9d174d',
            '#B12C00',
            '#DC2525', 
            '#6D67E4', 
            '#F4B342', 
            '#662549'],
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

  buildQuarterArrays();

  fetchReports_Details_Bars();
 
});



function buildQuarterArrays() {
  const raw = props.report_years ?? [];

  // Normalize report_years into a plain array
  let allYears = [];

  if (Array.isArray(raw.data)) {
    allYears = raw.data;
  } else if (Array.isArray(raw)) {
    allYears = raw;
  }

  const targetYear = Number(props.report_year);
  console.log('Building quarter arrays for props.report_year:', props.report_year);
  console.log('Normalized report_years (allYears):', allYears);
  console.log('Target year (number):', targetYear);

  // Filter only quarters for the selected year
  const filtered = allYears.filter((q) => Number(q.year) === targetYear);

  console.log('Filtered quarters:', filtered);

  // IDs and names
  const quarterIds = filtered.map((q) => Number(q.id));
  const quarterNames = filtered.map((q, index) => `Q${index + 1} ${q.year}`);

  state.quarterIds = quarterIds;
  state.quarterNames = quarterNames;

  console.log('quarterIds:', state.quarterIds);
  console.log('quarterNames:', state.quarterNames);

  // Optional: sync x-axis categories with quarter names
  if (quarterNames.length) {
    state.populationHoriOptions.xaxis = {
      ...state.populationHoriOptions.xaxis,
      categories: quarterNames,
    };
  }
}





async function fetchReports_Details_Bars() {  // this is for quarterly data
  try {
    // Normalize data from props
    const rawData = props.passed_data?.data ?? [];
    const data = Array.isArray(rawData) ? rawData : [...rawData];

    // Normalize quarter IDs from state
    const rawQuarterIds = state.quarterIds ?? [];
    const quarterIds = Array.isArray(rawQuarterIds)
      ? rawQuarterIds.map(Number)
      : [...rawQuarterIds].map(Number);

    if (!quarterIds.length) {
      console.warn('fetchReports_Details_Bars: quarterIds is empty, nothing to aggregate');
      state.graphSeriesAll = [
        { name: 'Less than 15 yrs old', data: [] },
        { name: '15 - 19 yrs old', data: [] },
      ];

   
      return;
    }

    // Initialize arrays
    // const ic_33_1 = new Array(quarterIds.length).fill(0);
    // const sp_33_2 = new Array(quarterIds.length).fill(0);
    // const sp_33_3 = new Array(quarterIds.length).fill(0);
    // const sp_33_4 = new Array(quarterIds.length).fill(0);
    // const sp_33_5 = new Array(quarterIds.length).fill(0);
    // const sp_33_6 = new Array(quarterIds.length).fill(0);
    // const sp_33_7 = new Array(quarterIds.length).fill(0);
    // const sp_33_8 = new Array(quarterIds.length).fill(0);
    // const sp_33_9 = new Array(quarterIds.length).fill(0);
    // const sp_33_10 = new Array(quarterIds.length).fill(0);
    // const sp_33_11 = new Array(quarterIds.length).fill(0);
    // const sp_33_12 = new Array(quarterIds.length).fill(0);
    // const sp_33_13 = new Array(quarterIds.length).fill(0);
    // const sp_33_14 = new Array(quarterIds.length).fill(0);
    // const sp_33_15 = new Array(quarterIds.length).fill(0);
    // const sp_33_16 = new Array(quarterIds.length).fill(0);
    // const sp_33_17 = new Array(quarterIds.length).fill(0);
    // const sp_33_18 = new Array(quarterIds.length).fill(0);
    // const sp_33_19 = new Array(quarterIds.length).fill(0);
    // const sp_33_20 = new Array(quarterIds.length).fill(0);
    // const sp_33_21 = new Array(quarterIds.length).fill(0);
    // const sp_33_22 = new Array(quarterIds.length).fill(0);
    // const sp_33_23 = new Array(quarterIds.length).fill(0);
    // const sp_33_24 = new Array(quarterIds.length).fill(0);
    // const sp_33_25 = new Array(quarterIds.length).fill(0);
    // const sp_33_26 = new Array(quarterIds.length).fill(0);
    // const sp_33_27 = new Array(quarterIds.length).fill(0);

    // const sp_34_1 = new Array(quarterIds.length).fill(0);
    // const sp_34_1_1 = new Array(quarterIds.length).fill(0);
    // const sp_34_1_2 = new Array(quarterIds.length).fill(0);


    // const sp_35_1 = new Array(quarterIds.length).fill(0);
    // const sp_35_1_1 = new Array(quarterIds.length).fill(0);
    // const sp_35_1_2 = new Array(quarterIds.length).fill(0);
    // const sp_35_1_3 = new Array(quarterIds.length).fill(0);
    // const sp_35_1_4 = new Array(quarterIds.length).fill(0);
    // const sp_35_1_5 = new Array(quarterIds.length).fill(0);
    // const sp_35_1_6 = new Array(quarterIds.length).fill(0);

    // const sp_36_1 = new Array(quarterIds.length).fill(0);
    // const sp_36_1_1 = new Array(quarterIds.length).fill(0);
    // const sp_36_1_2 = new Array(quarterIds.length).fill(0);
    // const sp_36_1_3 = new Array(quarterIds.length).fill(0);
    // const sp_36_1_4 = new Array(quarterIds.length).fill(0);
    // const sp_36_1_5 = new Array(quarterIds.length).fill(0);
    // const sp_36_1_6 = new Array(quarterIds.length).fill(0);

    const ic_37_1 = new Array(quarterIds.length).fill(0);
    const ic_37_1_1 = new Array(quarterIds.length).fill(0);
    const ic_37_1_2 = new Array(quarterIds.length).fill(0);
    const ic_37_1_3 = new Array(quarterIds.length).fill(0);
    const ic_37_1_4 = new Array(quarterIds.length).fill(0);
    const ic_37_1_5 = new Array(quarterIds.length).fill(0);
    const ic_37_1_6 = new Array(quarterIds.length).fill(0);
    const ic_37_1_7 = new Array(quarterIds.length).fill(0);
    const ic_37_1_8 = new Array(quarterIds.length).fill(0);
    const ic_37_1_9 = new Array(quarterIds.length).fill(0);
    const ic_37_1_10 = new Array(quarterIds.length).fill(0);

    const ic_38_1 = new Array(quarterIds.length).fill(0);
    const ic_38_1_1 = new Array(quarterIds.length).fill(0);
    const ic_38_1_2 = new Array(quarterIds.length).fill(0);
    const ic_38_1_3 = new Array(quarterIds.length).fill(0);
    const ic_38_1_4 = new Array(quarterIds.length).fill(0);
    const ic_38_1_5 = new Array(quarterIds.length).fill(0);
    const ic_38_1_6 = new Array(quarterIds.length).fill(0);
    const ic_38_1_7 = new Array(quarterIds.length).fill(0);
    const ic_38_1_8 = new Array(quarterIds.length).fill(0);
    const ic_38_1_9 = new Array(quarterIds.length).fill(0);
    const ic_38_1_10 = new Array(quarterIds.length).fill(0);
    const ic_38_1_11 = new Array(quarterIds.length).fill(0);
    const ic_38_1_12 = new Array(quarterIds.length).fill(0);
    const ic_38_1_13 = new Array(quarterIds.length).fill(0);
    const ic_38_1_14 = new Array(quarterIds.length).fill(0);
    const ic_38_1_15 = new Array(quarterIds.length).fill(0);
    const ic_38_1_16 = new Array(quarterIds.length).fill(0);

    const ic_39_1 = new Array(quarterIds.length).fill(0);
    const ic_39_1_1 = new Array(quarterIds.length).fill(0);
    const ic_39_1_2 = new Array(quarterIds.length).fill(0);
    const ic_39_1_3 = new Array(quarterIds.length).fill(0);
    const ic_39_1_4 = new Array(quarterIds.length).fill(0);
    const ic_39_1_5 = new Array(quarterIds.length).fill(0);
    const ic_39_1_6 = new Array(quarterIds.length).fill(0);
    const ic_39_1_7 = new Array(quarterIds.length).fill(0);

    const ic_40_1 = new Array(quarterIds.length).fill(0);
    const ic_40_1_1 = new Array(quarterIds.length).fill(0);
    const ic_40_1_2 = new Array(quarterIds.length).fill(0);
    const ic_40_1_3 = new Array(quarterIds.length).fill(0);

    const ic_41_1 = new Array(quarterIds.length).fill(0);
    const ic_41_1_1 = new Array(quarterIds.length).fill(0);
    const ic_41_1_2 = new Array(quarterIds.length).fill(0);
    const ic_41_1_3 = new Array(quarterIds.length).fill(0);
    const ic_41_1_4 = new Array(quarterIds.length).fill(0);
    const ic_41_1_5 = new Array(quarterIds.length).fill(0);
    const ic_41_1_6 = new Array(quarterIds.length).fill(0);
    const ic_41_1_7 = new Array(quarterIds.length).fill(0);
    const ic_41_1_8 = new Array(quarterIds.length).fill(0);

    const ic_42_1 = new Array(quarterIds.length).fill(0);




    // SINGLE PASS over data
    for (const row of data) {
      if (!row) continue;

      const reportYearId = Number(row.report_year_id);
      const idx = quarterIds.indexOf(reportYearId);
      if (idx === -1) continue; // not one of the tracked quarters

      const value = row.total != null ? Number(row.total) : 0;
      if (Number.isNaN(value)) continue;

     switch (row.indicator_no) {
      

         case '37.1':
             ic_37_1[idx] += value;
             break;
         case '37.1.1':
             ic_37_1_1[idx] += value;
             break;
         case '37.1.2':
             ic_37_1_2[idx] += value;
             break;
         case '37.1.3':
             ic_37_1_3[idx] += value;
             break;
         case '37.1.4':
             ic_37_1_4[idx] += value;
             break;
         case '37.1.5':
             ic_37_1_5[idx] += value;
             break;
         case '37.1.6':
             ic_37_1_6[idx] += value;
             break;
         case '37.1.7':
             ic_37_1_7[idx] += value;
             break;
         case '37.1.8':
             ic_37_1_8[idx] += value;
             break;
         case '37.1.9':
             ic_37_1_9[idx] += value;
             break;
         case '37.1.10':
             ic_37_1_10[idx] += value;
             break;


         case '38.1':
             ic_38_1[idx] += value;
             break;
         case '38.1.1':
             ic_38_1_1[idx] += value;
             break;
         case '38.1.2':
             ic_38_1_2[idx] += value;
             break;
         case '38.1.3':
             ic_38_1_3[idx] += value;
             break;
         case '38.1.4':
             ic_38_1_4[idx] += value;
             break;
         case '38.1.5':
             ic_38_1_5[idx] += value;
             break;
         case '38.1.6':
             ic_38_1_6[idx] += value;
             break;
         case '38.1.7':
             ic_38_1_7[idx] += value;
             break;
         case '38.1.8':
             ic_38_1_8[idx] += value;
             break;
         case '38.1.9':
             ic_38_1_9[idx] += value;
             break;
         case '38.1.10':
             ic_38_1_10[idx] += value;
             break;
         case '38.1.11':
             ic_38_1_11[idx] += value;
             break;
         case '38.1.12':
             ic_38_1_12[idx] += value;
             break;
         case '38.1.13':
             ic_38_1_13[idx] += value;
             break;
         case '38.1.14':
             ic_38_1_14[idx] += value;
             break;
         case '38.1.15':
             ic_38_1_15[idx] += value;
             break;
         case '38.1.16':
             ic_38_1_16[idx] += value;
             break;


         case '39.1':
             ic_39_1[idx] += value;
             break;
         case '39.1.1':
             ic_39_1_1[idx] += value;
             break;
         case '39.1.2':
             ic_39_1_2[idx] += value;
             break;
         case '39.1.3':
             ic_39_1_3[idx] += value;
             break;
         case '39.1.4':
             ic_39_1_4[idx] += value;
             break;
         case '39.1.5':
             ic_39_1_5[idx] += value;
             break;
         case '39.1.6':
             ic_39_1_6[idx] += value;
             break;
         case '39.1.7':
             ic_39_1_7[idx] += value;
             break;


         case '40.1':
             ic_40_1[idx] += value;
             break;
         case '40.1.1':
             ic_40_1_1[idx] += value;
             break;
         case '40.1.2':
             ic_40_1_2[idx] += value;
             break;
         case '40.1.3':
             ic_40_1_3[idx] += value;
             break;

         case '41.1':
             ic_41_1[idx] += value;
             break;
         case '41.1.1':
             ic_41_1_1[idx] += value;
             break;
         case '41.1.2':
             ic_41_1_2[idx] += value;
             break;
         case '41.1.3':
             ic_41_1_3[idx] += value;
             break;
         case '41.1.4':
             ic_41_1_4[idx] += value;
             break;
         case '41.1.5':
             ic_41_1_5[idx] += value;
             break;
         case '41.1.6':
             ic_41_1_6[idx] += value;
             break;
         case '41.1.7':
             ic_41_1_7[idx] += value;
             break;
         case '41.1.8':
             ic_41_1_8[idx] += value;
             break;
         case '42.1':
             ic_42_1[idx] += value;
             break;

         
         
         
        default:
          // ignore other indicators
          break;
      }
      
    
    }

    state.child_in_conflict_1 = [

        { name: 'Total Number of Children In-Conflict with the Law (CICL)', data: ic_37_1 },
        { name: 'Total Number of CICL undergoing Diversion Program', data: ic_37_1_1 },
        { name: 'Total Number of CICL in Jail/Detention Center', data: ic_37_1_2 },
        { name: 'Total Number of CICL in Bahay Pag-asa', data: ic_37_1_3 },
        { name: 'Total Number of CICL under Intensive Juvenile Intervention and Support for Center (IJISC)', data: ic_37_1_4 },
        { name: 'Total Number of CICL in RRCY', data: ic_37_1_5 },
        { name: 'Total Number of CICL undergoing After-Care Program', data: ic_37_1_6 },

        { name: 'Total Number of CICL that have re-offended', data: ic_37_1_7 },
        { name: 'Total Number of CICL that have been fully integrated', data: ic_37_1_8 },
        { name: 'Total Number of CICL undergoing Community-based Intervention Program', data: ic_37_1_9 },
        { name: 'Total Number of CICL undergoing Community-based Rehabilitation Program ', data: ic_37_1_10 },


    ];

     state.child_in_conflict_2 = [

         { name: 'Total Number of Crimes Against Person Committed By Children', data: ic_38_1 },
         { name: 'Murder', data: ic_38_1_1 },
         { name: 'Frustrated Murder', data: ic_38_1_2 },
         { name: 'Attempted Murder', data: ic_38_1_3 },
         { name: 'Parricide', data: ic_38_1_4 },
         { name: 'Frustrated Parricide', data: ic_38_1_5 },
         { name: 'Attempted Parricide', data: ic_38_1_6 },
         { name: 'Homicide', data: ic_38_1_7 },
         { name: 'Frustrated Homicide', data: ic_38_1_8 },
         { name: 'Attempted Homicide', data: ic_38_1_9 },
         { name: 'Serious Physical Injury', data: ic_38_1_10 },
         { name: 'Grave Threats', data: ic_38_1_11 },
         { name: 'Rape (by force, threat, and sexual assault)', data: ic_38_1_12 },
         { name: 'Incestuous Rape', data: ic_38_1_13 },
         { name: 'Statutory Rape', data: ic_38_1_14 },
         { name: 'Seduction (Art. 337 of RPC)', data: ic_38_1_15 },
         { name: 'Acts of Lasciviousness (Art. 336 of RPC)', data: ic_38_1_16 },


    ];

    state.child_in_conflict_3 = [

         { name: 'Total Number of Crimes Against Property Committed By Children', data: ic_39_1 },
         { name: 'Robbery', data: ic_39_1_1 },
         { name: 'Theft', data: ic_39_1_2 },
         { name: 'Qualified Theft', data: ic_39_1_3 },
         { name: 'Carnapping', data: ic_39_1_4 },
         { name: 'Arson', data: ic_39_1_5 },
         { name: 'Malicious Mischief (Damage to property)', data: ic_39_1_6 },
         { name: 'Trespassing to Dwelling', data: ic_39_1_7 },
         
    ];

    state.child_in_conflict_4 = [

         { name: 'Total Number of Crimes Against Public Order Committed By Children', data: ic_40_1 },
         { name: 'Alarms and Scandal', data: ic_40_1_1 },
         { name: 'Direct Assault', data: ic_40_1_2 },
         { name: 'Indirect Assault', data: ic_40_1_3 },
        
         
    ];

     state.child_in_conflict_5 = [

         { name: 'Total Number of Crimes Committed By Children Under Special Penal Laws ', data: ic_41_1 },
         { name: 'RA 9165 (Comprehensive Dangerous Drugs Act)', data: ic_41_1_1 },
         { name: 'RA 10591 (Comprehensive Firearms & Ammunition Regulation Act)', data: ic_41_1_2 },
         { name: 'RA 9287 (Anti-Gambling)', data: ic_41_1_3 },
         { name: 'RA 10627 (Anti-Bullying Act including Cyberbullying)', data: ic_41_1_4 },
         { name: 'RA 9208 (Trafficking in Person)', data: ic_41_1_5 },
         { name: 'RA 7610 (Anti-Child Abuse)', data: ic_41_1_6 },
         { name: 'RA 11313 (Safe Space Act  or Bawal Bastos Law)', data: ic_41_1_7 },
         { name: 'RA 11930 (Anti-OSAEC/CSAEM)', data: ic_41_1_8 },
         
    ];

    state.child_in_conflict_6 = [

         { name: 'Grand Total Number of Crimes Committed By Children ', data: ic_42_1 },
         
    ];




  } catch (error) {
    console.error('fetchReports_Details_Bars error:', error);

    state.graphSeriesAll = [
      { name: 'Less than 15 yrs old', data: [0, 0, 0, 0] },
      { name: '15 - 19 yrs old', data: [0, 0, 0, 0] },
    ];
  }
}





</script>
