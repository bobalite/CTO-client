<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 mb-0 w-full">
    LGU POPULATION
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">GENERAL POPULATION</h3>
      <apexchart type="bar" height="400" width="100%" :options="state.populationHoriOptions" :series="state.pop" />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">Children Belong to IP/Moro Sector, by Ethnicity</h3>
      <apexchart type="bar" height="400" width="100%" :options="state.populationHoriOptions" :series="state.tribe_pop" />
    </div>
  </div>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">Persons With Disabilities (PWDs)</h3>
      <apexchart type="bar" height="400" width="100%" :options="state.populationHoriOptions" :series="state.pwd" />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">CIVIL REGISTRATION</h3>
      <apexchart type="bar" height="400" width="100%" :options="state.populationHoriOptions" :series="state.civreg" />
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

const state = reactive({
  annualYearIds: [],
  annualYearNames: [],

  pop: [],
  pwd: [],
  tribe_pop: [],
  civreg: [],

  populationHoriOptions: {
    chart: { type: "bar", stacked: false, toolbar: { show: false }, zoom: { enabled: false } },
    plotOptions: { bar: { horizontal: false } },
    colors: ["#00796B", "#388E3C", "#AFB42B", "#F9A825"],
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    xaxis: { categories: [] },
  },
});

function recalc() {
  buildAnnualArrays();
  fetchReports_Details_Bars_Annual();
}

onMounted(() => recalc());

watch(
  () => [props.report_year, props.report_years, props.passed_data],
  () => recalc(),
  { deep: true }
);

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
  if (raw && Array.isArray(raw?.data?.data)) return raw.data.data;
  return [];
}

function getRowYear(row) {
  const y = row.year ?? row.report_year;
  if (y != null && y !== "") return Number(y);

  const ryId = Number(row.report_year_id);
  if (!Number.isFinite(ryId)) return NaN;

  const years = normalizeReportYears();
  const match = years.find((r) => Number(r.id) === ryId);
  return match ? Number(match.year) : NaN;
}

function buildAnnualArrays() {
  const data = normalizePassedData();

  const years = Array.from(
    new Set(data.map((r) => getRowYear(r)).filter((y) => Number.isFinite(y)))
  ).sort((a, b) => a - b);

  state.annualYearIds = years;
  state.annualYearNames = years.map(String);

  state.populationHoriOptions.xaxis = {
    ...state.populationHoriOptions.xaxis,
    categories: state.annualYearNames,
  };
}

function fetchReports_Details_Bars_Annual() {
  try {
    const data = normalizePassedData();
    const yearIds = state.annualYearIds ?? [];

    if (!yearIds.length) {
      state.pop = [];
      state.pwd = [];
      state.tribe_pop = [];
      state.civreg = [];
      return;
    }

    const yearIndexMap = new Map();
    yearIds.forEach((y, i) => yearIndexMap.set(y, i));

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
    const pwd_pop_47_1 = new Array(yearIds.length).fill(0);
    const pwd_pop_47_1_1 = new Array(yearIds.length).fill(0);
    const pwd_pop_47_1_2 = new Array(yearIds.length).fill(0);
    const pwd_pop_47_2 = new Array(yearIds.length).fill(0);

    // ---- 48.* (Tribe)
    const tribe_pop_48_1 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_2 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_3 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_4 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_5 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_6 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_7 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_8 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_9 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_10 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_11 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_12 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_13 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_14 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_15 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_16 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_17 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_18 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_19 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_20 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_21 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_22 = new Array(yearIds.length).fill(0);
    const tribe_pop_48_23 = new Array(yearIds.length).fill(0);

    // ---- 49.* (Civil registration)  ✅ FIXED indicator_no mapping
    const civreg_49_1 = new Array(yearIds.length).fill(0);
    const civreg_49_2 = new Array(yearIds.length).fill(0);
    const civreg_49_3 = new Array(yearIds.length).fill(0);
    const civreg_49_4 = new Array(yearIds.length).fill(0);
    const civreg_49_5 = new Array(yearIds.length).fill(0);

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
        case "47.1": pwd_pop_47_1[idx] += value; break;
        case "47.1.1": pwd_pop_47_1_1[idx] += value; break;
        case "47.1.2": pwd_pop_47_1_2[idx] += value; break;
        case "47.2": pwd_pop_47_2[idx] += value; break;

        // 48.*
        case "48.1": tribe_pop_48_1[idx] += value; break;
        case "48.2": tribe_pop_48_2[idx] += value; break;
        case "48.3": tribe_pop_48_3[idx] += value; break;
        case "48.4": tribe_pop_48_4[idx] += value; break;
        case "48.5": tribe_pop_48_5[idx] += value; break;
        case "48.6": tribe_pop_48_6[idx] += value; break;
        case "48.7": tribe_pop_48_7[idx] += value; break;
        case "48.8": tribe_pop_48_8[idx] += value; break;
        case "48.9": tribe_pop_48_9[idx] += value; break;
        case "48.10": tribe_pop_48_10[idx] += value; break;
        case "48.11": tribe_pop_48_11[idx] += value; break;
        case "48.12": tribe_pop_48_12[idx] += value; break;  // (was duplicated in your code)
        case "48.13": tribe_pop_48_13[idx] += value; break;
        case "48.14": tribe_pop_48_14[idx] += value; break;
        case "48.15": tribe_pop_48_15[idx] += value; break;
        case "48.16": tribe_pop_48_16[idx] += value; break;
        case "48.17": tribe_pop_48_17[idx] += value; break;
        case "48.18": tribe_pop_48_18[idx] += value; break;
        case "48.19": tribe_pop_48_19[idx] += value; break;
        case "48.20": tribe_pop_48_20[idx] += value; break;
        case "48.21": tribe_pop_48_21[idx] += value; break;
        case "48.22": tribe_pop_48_22[idx] += value; break;
        case "48.23": tribe_pop_48_23[idx] += value; break;

        // 49.* ✅ FIXED: you had 49.21..49.25 (nonsense unless your backend uses those)
        case "49.1": civreg_49_1[idx] += value; break;
        case "49.2": civreg_49_2[idx] += value; break;
        case "49.3": civreg_49_3[idx] += value; break;
        case "49.4": civreg_49_4[idx] += value; break;
        case "49.5": civreg_49_5[idx] += value; break;

        default: break;
      }
    }

    // ---- set series ONCE
    state.pop = [
      { name: "Total Population", data: pop_46_1 },
      { name: "Total Population of Children, by age:", data: pop_46_2 },
      { name: "< 1yr old", data: pop_46_2_1 },
      { name: "1 year old", data: pop_46_2_2 },
      { name: "2 years old", data: pop_46_2_3 },
      { name: "3 years old", data: pop_46_2_4 },
      { name: "4 years old", data: pop_46_2_5 },
      { name: "5 years old", data: pop_46_2_6 },
      { name: "6 years old", data: pop_46_2_7 },
      { name: "7 years old", data: pop_46_2_8 },
      { name: "8 years old", data: pop_46_2_9 },
      { name: "9 years old", data: pop_46_2_10 },
      { name: "10 years old", data: pop_46_2_11 },
      { name: "11 years old", data: pop_46_2_12 },
      { name: "12 years old", data: pop_46_2_13 },
      { name: "13 years old", data: pop_46_2_14 },
      { name: "14 years old", data: pop_46_2_15 },
      { name: "15 years old", data: pop_46_2_16 },
      { name: "16 years old", data: pop_46_2_17 },
      { name: "17 years old", data: pop_46_2_18 },
    ];

    state.pwd = [
      { name: "Total Population of Persons With Disabilities (PWDs)", data: pwd_pop_47_1 },
      { name: "Total Population of Adult PWDs (18 years old and above)", data: pwd_pop_47_1_1 },
      { name: "Total Population of Children With Disabilities (17 years old and below)", data: pwd_pop_47_1_2 },
      { name: "Total Number of Child Laborers (17 years old and below)", data: pwd_pop_47_2 },
    ];

    state.tribe_pop = [
      { name: "Total Population of Children Belong to IP/Moro Sector, by Ethnicity:", data: tribe_pop_48_1 },
      { name: "Total Population of Ata Tribe", data: tribe_pop_48_2 },
      { name: "Total Population of Children Belonging to Ata Tribe (17 years old and below only)", data: tribe_pop_48_3 },
      { name: "Total Population of Bagobo-Tagabawa Tribe", data: tribe_pop_48_4 },
      { name: "Total Population of Children Belonging to Bagobo-Tagabawa Tribe (17 years old and below only)", data: tribe_pop_48_5 },
      { name: "Total Population of Bagobo-Klata Tribe", data: tribe_pop_48_6 },
      { name: "Total Population of Children Belonging to Bagobo-Klata Tribe (17 years old and below only)", data: tribe_pop_48_7 },
      { name: "Total Population of Matigsalug Tribe", data: tribe_pop_48_8 },
      { name: "Total Population of Children Belonging to Matigsalug Tribe (17 years old and below only)", data: tribe_pop_48_9 },
      { name: "Total Population of Obu-Manuvu Tribe", data: tribe_pop_48_10 },
      { name: "Total Population of Children Belonging to Obu-Manuvu Tribe (17 years old and below only)", data: tribe_pop_48_11 },
      { name: "Total Population of Maguindanaon Tribe", data: tribe_pop_48_12 },
      { name: "Total Population of Children Belonging to Maguindanaon Tribe (17 years old and below only)", data: tribe_pop_48_13 },
      { name: "Total Population of Iranun Tribe", data: tribe_pop_48_14 },
      { name: "Total Population of Children Belonging to Iranun Tribe (17 years old and below only)", data: tribe_pop_48_15 },
      { name: "Total Population of Kagan Tribe", data: tribe_pop_48_16 },
      { name: "Total Population of Children Belonging to Kagan Tribe (17 years old and below only)", data: tribe_pop_48_17 },
      { name: "Total Population of Maranao Tribe", data: tribe_pop_48_18 },
      { name: "Total Population of Children Belonging to Maranao Tribe (17 years old and below only)", data: tribe_pop_48_19 },
      { name: "Total Population of Sama Tribe", data: tribe_pop_48_20 },
      { name: "Total Population of Children Belonging to Sama Tribe (17 years old and below only)", data: tribe_pop_48_21 },
      { name: "Total Population of Tausug Tribe", data: tribe_pop_48_22 },
      { name: "Total Population of Children Belonging to Tausug Tribe (17 years old and below only)", data: tribe_pop_48_23 },
    ];

    state.civreg = [
      { name: 'Total number of children registered at-birth (17 years old and below only)', data: civreg_49_1 },
      { name: 'Total number of Moro children registered at-birth (17 years old and below only)', data: civreg_49_2 },
      { name: 'Total number of children belonging to IP sector registered at-birth (17 years old and below only)', data: civreg_49_3 },
      { name: 'Total number of birth registration facilitated in "Sa Paaralan Ko, Pwede Nang Magrehistro" (SCRA) (17 years old and below only)', data: civreg_49_4 },
      { name: "Total number of birth registration facilitated thru BCRA (17 years old and below only)", data: civreg_49_5 },
    ];
  } catch (error) {
    console.error("fetchReports_Details_Bars_Annual error:", error);
    state.pop = [];
    state.pwd = [];
    state.tribe_pop = [];
    state.civreg = [];
  }
}
</script>
