<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold mt-3 mb-0 w-full">
    LGU POPULATION
  </h3>

  <!-- 1 column block -->
  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">GENERAL POPULATION</h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="400"
          width="100%"
          :options="state.barOptionsPop"
          :series="state.pop"
        />
      </ClientOnly>
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">
        Children Belong to IP/Moro Sector, by Ethnicity
      </h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="400"
          width="100%"
          :options="state.barOptionsTribe"
          :series="state.tribe_pop"
        />
      </ClientOnly>
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">Persons With Disabilities (PWDs)</h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="400"
          width="100%"
          :options="state.barOptionsPwd"
          :series="state.pwd"
        />
      </ClientOnly>
    </div>

    

  </div>


  
    

    
 
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";

const props = defineProps({
  class: { type: String, required: false, default: "border-solid" },
  displaytext: { type: String, required: false },
  group_id: { type: String, required: false },

  report_year: { type: [Number, String], required: false },
  passed_data: { type: [Array, Object], required: true },
  report_years: { type: [Array, Object], required: true },
});

const COLORS = [
  "#312e81", "#c026d3", "#46C2CB", "#db2777", "#9d174d",
  "#B12C00", "#DC2525", "#6D67E4", "#F4B342", "#662549"
];

const state = reactive({
  annualYearIds: [],
  annualYearNames: [],

  pop: [],
  pwd: [],
  tribe_pop: [],
 

  // separate options per chart (prevents “options fights”)
  barOptionsPop: baseBarOptions(),
  barOptionsPwd: baseBarOptions(),
  barOptionsTribe: baseBarOptions(),
  
});

function baseBarOptions() {
  return {
    chart: { type: "bar", stacked: false, toolbar: { show: false }, zoom: { enabled: false } },
    plotOptions: { bar: { horizontal: false } },
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    xaxis: { categories: [] },
    colors: COLORS,
  };
}

onMounted(() => recalc());

// recompute whenever parent changes the selected year, or annual dataset changes, or mapping table changes
watch(() => props.passed_data, () => recalc(), { deep: true });
watch(() => props.report_years, () => recalc(), { deep: true });
watch(() => props.report_year, () => recalc());

function normalizePassedData() {
  const raw = props.passed_data;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  return [];
}

function normalizeReportYears() {
  const raw = props.report_years;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  return [];
}

function getRowYear(row) {
  // Prefer explicit year fields if present
  const y = row?.year ?? row?.report_year;
  if (y != null && y !== "") {
    const yn = Number(y);
    return Number.isFinite(yn) ? yn : NaN;
  }

  // Fallback: map report_year_id -> year
  const ryId = Number(row?.report_year_id);
  if (!Number.isFinite(ryId)) return NaN;

  const reportYears = normalizeReportYears();
  const match = reportYears.find(r => Number(r?.id) === ryId);

  const my = Number(match?.year);
  return Number.isFinite(my) ? my : NaN;
}

function recalc() {
  buildAnnualAxisFromAnnualData();
  buildAnnualSeriesFromAnnualData();
}

function buildAnnualAxisFromAnnualData() {
  const data = normalizePassedData();

  const years = Array.from(
    new Set(data.map(r => getRowYear(r)).filter(y => Number.isFinite(y)))
  ).sort((a, b) => a - b);

  state.annualYearIds = years;
  state.annualYearNames = years.map(String);

  // update categories immutably (Apex likes this better)
  state.barOptionsPop = { ...state.barOptionsPop, xaxis: { ...state.barOptionsPop.xaxis, categories: state.annualYearNames } };
  state.barOptionsPwd = { ...state.barOptionsPwd, xaxis: { ...state.barOptionsPwd.xaxis, categories: state.annualYearNames } };
  state.barOptionsTribe = { ...state.barOptionsTribe, xaxis: { ...state.barOptionsTribe.xaxis, categories: state.annualYearNames } };
 
}

function buildAnnualSeriesFromAnnualData() {
  const data = normalizePassedData();
  const yearIds = state.annualYearIds;

  if (!yearIds.length) {
    state.pop = [];
    state.pwd = [];
    state.tribe_pop = [];
    
    return;
  }

  const yearIndexMap = new Map();
  yearIds.forEach((year, idx) => yearIndexMap.set(year, idx));

  // ---- 46.* (Population)
  const pop_46_1 = new Array(yearIds.length).fill(0);
  const pop_46_2 = new Array(yearIds.length).fill(0);
  const pop_46_2_1 = new Array(yearIds.length).fill(0);
  const pop_46_2_2 = new Array(yearIds.length).fill(0);
  const pop_46_2_3 = new Array(yearIds.length).fill(0);
  const pop_46_2_4 = new Array(yearIds.length).fill(0);
  const pop_46_2_5 = new Array(yearIds.length).fill(0);
  const pop_46_2_6 = new Array(yearIds.length).fill(0);
  const pop_46_2_7 = new Array(yearIds.length).fill(0);
  const pop_46_2_8 = new Array(yearIds.length).fill(0);
  const pop_46_2_9 = new Array(yearIds.length).fill(0);
  const pop_46_2_10 = new Array(yearIds.length).fill(0);
  const pop_46_2_11 = new Array(yearIds.length).fill(0);
  const pop_46_2_12 = new Array(yearIds.length).fill(0);
  const pop_46_2_13 = new Array(yearIds.length).fill(0);
  const pop_46_2_14 = new Array(yearIds.length).fill(0);
  const pop_46_2_15 = new Array(yearIds.length).fill(0);
  const pop_46_2_16 = new Array(yearIds.length).fill(0);
  const pop_46_2_17 = new Array(yearIds.length).fill(0);
  const pop_46_2_18 = new Array(yearIds.length).fill(0);

  // ---- 47.* (PWD)
  const pwd_47_1 = new Array(yearIds.length).fill(0);
  const pwd_47_1_1 = new Array(yearIds.length).fill(0);
  const pwd_47_1_2 = new Array(yearIds.length).fill(0);
  const pwd_47_2 = new Array(yearIds.length).fill(0);

  // ---- 48.* (Tribe) — only what you actually had
  const tribe_48_1 = new Array(yearIds.length).fill(0);
  const tribe_48_2 = new Array(yearIds.length).fill(0);
  const tribe_48_3 = new Array(yearIds.length).fill(0);
  const tribe_48_4 = new Array(yearIds.length).fill(0);
  const tribe_48_5 = new Array(yearIds.length).fill(0);
  const tribe_48_6 = new Array(yearIds.length).fill(0);
  const tribe_48_7 = new Array(yearIds.length).fill(0);
  const tribe_48_8 = new Array(yearIds.length).fill(0);
  const tribe_48_9 = new Array(yearIds.length).fill(0);
  const tribe_48_10 = new Array(yearIds.length).fill(0);
  const tribe_48_11 = new Array(yearIds.length).fill(0);
  const tribe_48_12 = new Array(yearIds.length).fill(0);
  const tribe_48_13 = new Array(yearIds.length).fill(0);
  const tribe_48_14 = new Array(yearIds.length).fill(0);
  const tribe_48_15 = new Array(yearIds.length).fill(0);
  const tribe_48_16 = new Array(yearIds.length).fill(0);
  const tribe_48_17 = new Array(yearIds.length).fill(0);
  const tribe_48_18 = new Array(yearIds.length).fill(0);
  const tribe_48_19 = new Array(yearIds.length).fill(0);
  const tribe_48_20 = new Array(yearIds.length).fill(0);
  const tribe_48_21 = new Array(yearIds.length).fill(0);
  const tribe_48_22 = new Array(yearIds.length).fill(0);
  const tribe_48_23 = new Array(yearIds.length).fill(0);

  

  for (const row of data) {
    if (!row) continue;

    const rowYear = getRowYear(row);
    if (!Number.isFinite(rowYear)) continue;

    const idx = yearIndexMap.get(rowYear);
    if (idx === undefined) continue;

    const value = row.total != null ? Number(row.total) : 0;
    if (!Number.isFinite(value)) continue;

    switch (row.indicator_no) {
      // 46.*
      case "46.1": pop_46_1[idx] += value; break;
      case "46.2": pop_46_2[idx] += value; break;
      case "46.2.1": pop_46_2_1[idx] += value; break;
      case "46.2.2": pop_46_2_2[idx] += value; break;
      case "46.2.3": pop_46_2_3[idx] += value; break;
      case "46.2.4": pop_46_2_4[idx] += value; break;
      case "46.2.5": pop_46_2_5[idx] += value; break;
      case "46.2.6": pop_46_2_6[idx] += value; break;
      case "46.2.7": pop_46_2_7[idx] += value; break;
      case "46.2.8": pop_46_2_8[idx] += value; break;
      case "46.2.9": pop_46_2_9[idx] += value; break;
      case "46.2.10": pop_46_2_10[idx] += value; break;
      case "46.2.11": pop_46_2_11[idx] += value; break;
      case "46.2.12": pop_46_2_12[idx] += value; break;
      case "46.2.13": pop_46_2_13[idx] += value; break;
      case "46.2.14": pop_46_2_14[idx] += value; break;
      case "46.2.15": pop_46_2_15[idx] += value; break;
      case "46.2.16": pop_46_2_16[idx] += value; break;
      case "46.2.17": pop_46_2_17[idx] += value; break;
      case "46.2.18": pop_46_2_18[idx] += value; break;

      // 47.*
      case "47.1": pwd_47_1[idx] += value; break;
      case "47.1.1": pwd_47_1_1[idx] += value; break;
      case "47.1.2": pwd_47_1_2[idx] += value; break;
      case "47.2": pwd_47_2[idx] += value; break;

      // 48.*
      case "48.1": tribe_48_1[idx] += value; break;
      case "48.2": tribe_48_2[idx] += value; break;
      case "48.3": tribe_48_3[idx] += value; break;
      case "48.4": tribe_48_4[idx] += value; break;
      case "48.5": tribe_48_5[idx] += value; break;
      case "48.6": tribe_48_6[idx] += value; break;
      case "48.7": tribe_48_7[idx] += value; break;
      case "48.8": tribe_48_8[idx] += value; break;
      case "48.9": tribe_48_9[idx] += value; break;
      case "48.10": tribe_48_10[idx] += value; break;
      case "48.11": tribe_48_11[idx] += value; break;
      case "48.12": tribe_48_12[idx] += value; break;
      case "48.13": tribe_48_13[idx] += value; break;
      case "48.14": tribe_48_14[idx] += value; break;
      case "48.15": tribe_48_15[idx] += value; break;
      case "48.16": tribe_48_16[idx] += value; break;
      case "48.17": tribe_48_17[idx] += value; break;
      case "48.18": tribe_48_18[idx] += value; break;
      case "48.19": tribe_48_19[idx] += value; break;
      case "48.20": tribe_48_20[idx] += value; break;
      case "48.21": tribe_48_21[idx] += value; break;
      case "48.22": tribe_48_22[idx] += value; break;
      case "48.23": tribe_48_23[idx] += value; break;

      

      default: break;
    }
  }

  state.pop = [
    { name: "46.1 Total Population", data: pop_46_1 },
    { name: "46.2 Total Population of Children, by age", data: pop_46_2 },
    { name: "46.2.1 < 1yr old", data: pop_46_2_1 },
    { name: "46.2.2 1 year old", data: pop_46_2_2 },
    { name: "46.2.3 2 years old", data: pop_46_2_3 },
    { name: "46.2.4 3 years old", data: pop_46_2_4 },
    { name: "46.2.5 4 years old", data: pop_46_2_5 },
    { name: "46.2.6 5 years old", data: pop_46_2_6 },
    { name: "46.2.7 6 years old", data: pop_46_2_7 },
    { name: "46.2.8 7 years old", data: pop_46_2_8 },
    { name: "46.2.9 8 years old", data: pop_46_2_9 },
    { name: "46.2.10 9 years old", data: pop_46_2_10 },
    { name: "46.2.11 10 years old", data: pop_46_2_11 },
    { name: "46.2.12 11 years old", data: pop_46_2_12 },
    { name: "46.2.13 12 years old", data: pop_46_2_13 },
    { name: "46.2.14 13 years old", data: pop_46_2_14 },
    { name: "46.2.15 14 years old", data: pop_46_2_15 },
    { name: "46.2.16 15 years old", data: pop_46_2_16 },
    { name: "46.2.17 16 years old", data: pop_46_2_17 },
    { name: "46.2.18 17 years old", data: pop_46_2_18 },
  ];

  state.pwd = [
    { name: "47.1 Total PWDs", data: pwd_47_1 },
    { name: "47.1.1 Adult PWDs (18+)", data: pwd_47_1_1 },
    { name: "47.1.2 Children with Disabilities (<=17)", data: pwd_47_1_2 },
    { name: "47.2 Child Laborers (<=17)", data: pwd_47_2 },
  ];

  state.tribe_pop = [
    { name: "48.1 Total IP/Moro Children, by Ethnicity", data: tribe_48_1 },
    { name: "48.2 Ata Tribe", data: tribe_48_2 },
    { name: "48.3 Ata Children (<=17)", data: tribe_48_3 },
    { name: "48.4 Bagobo-Tagabawa Tribe", data: tribe_48_4 },
    { name: "48.5 Bagobo-Tagabawa Children (<=17)", data: tribe_48_5 },
    { name: "48.6 Bagobo-Klata Tribe", data: tribe_48_6 },
    { name: "48.7 Bagobo-Klata Children (<=17)", data: tribe_48_7 },
    { name: "48.8 Matigsalug Tribe", data: tribe_48_8 },
    { name: "48.9 Matigsalug Children (<=17)", data: tribe_48_9 },
    { name: "48.10 Obu-Manuvu Tribe", data: tribe_48_10 },
    { name: "48.11 Obu-Manuvu Children (<=17)", data: tribe_48_11 },
    { name: "48.12 Maguindanaon Tribe", data: tribe_48_12 },
    { name: "48.13 Maguindanaon Children (<=17)", data: tribe_48_13 },
    { name: "48.14 Iranun Tribe", data: tribe_48_14 },
    { name: "48.15 Iranun Children (<=17)", data: tribe_48_15 },
    { name: "48.16 Kagan Tribe", data: tribe_48_16 },
    { name: "48.17 Kagan Children (<=17)", data: tribe_48_17 },
    { name: "48.18 Maranao Tribe", data: tribe_48_18 },
    { name: "48.19 Maranao Children (<=17)", data: tribe_48_19 },
    { name: "48.20 Sama Tribe", data: tribe_48_20 },
    { name: "48.21 Sama Children (<=17)", data: tribe_48_21 },
    { name: "48.22 Tausug Tribe", data: tribe_48_22 },
    { name: "48.23 Tausug Children (<=17)", data: tribe_48_23 },
  ];

  
}
</script>
