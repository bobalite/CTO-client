<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 mb-0 w-full">
    CHILDREN IN-NEED OF SPECIAL PROTECTION
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">CHILDREN AT-RISK</h3>
      <apexchart
        type="bar"
        height="600"
        width="100%"
        :options="state.populationHoriOptions"
        :series="state.child_at_risk_1"
      />
    </div>
  </div>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">
        Total number of Children Issued with Permit to Travel by CSWDO
      </h3>
      <apexchart
        type="bar"
        height="400"
        width="100%"
        :options="state.populationHoriOptions"
        :series="state.child_at_risk_2"
      />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">Total number of Victims of Child Abuse (RA 7610)</h3>
      <apexchart
        type="bar"
        height="400"
        width="100%"
        :options="state.populationHoriOptions"
        :series="state.child_at_risk_3"
      />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">Total number of Children Sexually Abused</h3>
      <apexchart
        type="bar"
        height="400"
        width="100%"
        :options="state.populationHoriOptions"
        :series="state.child_at_risk_4"
      />
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
  quarterIds: [],
  quarterNames: [],

  child_at_risk_1: [],
  child_at_risk_2: [],
  child_at_risk_3: [],
  child_at_risk_4: [],

  populationHoriOptions: {
    chart: { type: "bar", stacked: false, toolbar: { show: false }, zoom: { enabled: false } },
    plotOptions: { bar: { horizontal: false } },
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    xaxis: { categories: ["1Q", "2Q", "3Q", "4Q"] },
    colors: [
      "#312e81", "#c026d3", "#46C2CB", "#db2777", "#9d174d",
      "#B12C00", "#DC2525", "#6D67E4", "#F4B342", "#662549",
    ],
  },
});

function recalc() {
  buildQuarterArrays();
  fetchReports_Details_Bars();
}

onMounted(() => recalc());

watch(
  () => [props.report_year, props.report_years, props.passed_data],
  () => recalc(),
  { deep: true }
);

function normalizeReportYears() {
  const raw = props.report_years;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  if (raw && Array.isArray(raw?.data?.data)) return raw.data.data;
  return [];
}

function normalizePassedData() {
  const raw = props.passed_data;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  return [];
}

function buildQuarterArrays() {
  const allYears = normalizeReportYears();
  const targetYear = Number(props.report_year);

  const filtered = allYears.filter((q) => Number(q.year) === targetYear);
  const quarterIds = filtered.map((q) => Number(q.id));
  const quarterNames = filtered.map((q, index) => `Q${index + 1} ${q.year}`);

  state.quarterIds = quarterIds;
  state.quarterNames = quarterNames;

  if (quarterNames.length) {
    state.populationHoriOptions.xaxis = {
      ...state.populationHoriOptions.xaxis,
      categories: quarterNames,
    };
  }
}

function fetchReports_Details_Bars() {
  try {
    const data = normalizePassedData();

    const quarterIds = (state.quarterIds ?? []).map(Number).filter(Number.isFinite);

    if (!quarterIds.length) {
      state.child_at_risk_1 = [];
      state.child_at_risk_2 = [];
      state.child_at_risk_3 = [];
      state.child_at_risk_4 = [];
      return;
    }

    // arrays
    const sp_33_1 = new Array(quarterIds.length).fill(0);
    const sp_33_2 = new Array(quarterIds.length).fill(0);
    const sp_33_3 = new Array(quarterIds.length).fill(0);
    const sp_33_4 = new Array(quarterIds.length).fill(0);
    const sp_33_5 = new Array(quarterIds.length).fill(0);
    const sp_33_6 = new Array(quarterIds.length).fill(0);
    const sp_33_7 = new Array(quarterIds.length).fill(0);
    const sp_33_8 = new Array(quarterIds.length).fill(0);
    const sp_33_9 = new Array(quarterIds.length).fill(0);
    const sp_33_10 = new Array(quarterIds.length).fill(0);
    const sp_33_11 = new Array(quarterIds.length).fill(0);
    const sp_33_12 = new Array(quarterIds.length).fill(0);
    const sp_33_13 = new Array(quarterIds.length).fill(0);
    const sp_33_14 = new Array(quarterIds.length).fill(0);
    const sp_33_15 = new Array(quarterIds.length).fill(0);
    const sp_33_16 = new Array(quarterIds.length).fill(0);
    const sp_33_17 = new Array(quarterIds.length).fill(0);
    const sp_33_18 = new Array(quarterIds.length).fill(0);
    const sp_33_19 = new Array(quarterIds.length).fill(0);
    const sp_33_20 = new Array(quarterIds.length).fill(0);
    const sp_33_21 = new Array(quarterIds.length).fill(0);
    const sp_33_22 = new Array(quarterIds.length).fill(0);
    const sp_33_23 = new Array(quarterIds.length).fill(0);
    const sp_33_24 = new Array(quarterIds.length).fill(0);
    const sp_33_25 = new Array(quarterIds.length).fill(0);
    const sp_33_26 = new Array(quarterIds.length).fill(0);
    const sp_33_27 = new Array(quarterIds.length).fill(0);

    const sp_34_1 = new Array(quarterIds.length).fill(0);
    const sp_34_1_1 = new Array(quarterIds.length).fill(0);
    const sp_34_1_2 = new Array(quarterIds.length).fill(0);

    const sp_35_1 = new Array(quarterIds.length).fill(0);
    const sp_35_1_1 = new Array(quarterIds.length).fill(0);
    const sp_35_1_2 = new Array(quarterIds.length).fill(0);
    const sp_35_1_3 = new Array(quarterIds.length).fill(0);
    const sp_35_1_4 = new Array(quarterIds.length).fill(0);
    const sp_35_1_5 = new Array(quarterIds.length).fill(0);
    const sp_35_1_6 = new Array(quarterIds.length).fill(0);

    const sp_36_1 = new Array(quarterIds.length).fill(0);
    const sp_36_1_1 = new Array(quarterIds.length).fill(0);
    const sp_36_1_2 = new Array(quarterIds.length).fill(0);
    const sp_36_1_3 = new Array(quarterIds.length).fill(0);
    const sp_36_1_4 = new Array(quarterIds.length).fill(0);
    const sp_36_1_5 = new Array(quarterIds.length).fill(0);
    const sp_36_1_6 = new Array(quarterIds.length).fill(0);

    // aggregation
    for (const row of data) {
      if (!row) continue;

      const reportYearId = Number(row.report_year_id);
      const idx = quarterIds.indexOf(reportYearId);
      if (idx === -1) continue;

      const value = row.total != null ? Number(row.total) : 0;
      if (!Number.isFinite(value)) continue;

      switch (row.indicator_no) {
        case "33.1": sp_33_1[idx] += value; break;
        case "33.2": sp_33_2[idx] += value; break;
        case "33.3": sp_33_3[idx] += value; break;
        case "33.4": sp_33_4[idx] += value; break;
        case "33.5": sp_33_5[idx] += value; break;
        case "33.6": sp_33_6[idx] += value; break;
        case "33.7": sp_33_7[idx] += value; break;
        case "33.8": sp_33_8[idx] += value; break;
        case "33.9": sp_33_9[idx] += value; break;
        case "33.10": sp_33_10[idx] += value; break;
        case "33.11": sp_33_11[idx] += value; break;
        case "33.12": sp_33_12[idx] += value; break;
        case "33.13": sp_33_13[idx] += value; break;
        case "33.14": sp_33_14[idx] += value; break;
        case "33.15": sp_33_15[idx] += value; break;
        case "33.16": sp_33_16[idx] += value; break;
        case "33.17": sp_33_17[idx] += value; break;
        case "33.18": sp_33_18[idx] += value; break;
        case "33.19": sp_33_19[idx] += value; break;
        case "33.20": sp_33_20[idx] += value; break;
        case "33.21": sp_33_21[idx] += value; break;
        case "33.22": sp_33_22[idx] += value; break;
        case "33.23": sp_33_23[idx] += value; break;
        case "33.24": sp_33_24[idx] += value; break;
        case "33.25": sp_33_25[idx] += value; break;
        case "33.26": sp_33_26[idx] += value; break;
        case "33.27": sp_33_27[idx] += value; break;

        case "34.1": sp_34_1[idx] += value; break;
        case "34.1.1": sp_34_1_1[idx] += value; break;
        case "34.1.2": sp_34_1_2[idx] += value; break;

        case "35.1": sp_35_1[idx] += value; break;
        case "35.1.1": sp_35_1_1[idx] += value; break;
        case "35.1.2": sp_35_1_2[idx] += value; break;
        case "35.1.3": sp_35_1_3[idx] += value; break;
        case "35.1.4": sp_35_1_4[idx] += value; break;
        case "35.1.5": sp_35_1_5[idx] += value; break;
        case "35.1.6": sp_35_1_6[idx] += value; break;

        case "36.1": sp_36_1[idx] += value; break;
        case "36.1.1": sp_36_1_1[idx] += value; break;
        case "36.1.2": sp_36_1_2[idx] += value; break;
        case "36.1.3": sp_36_1_3[idx] += value; break;
        case "36.1.4": sp_36_1_4[idx] += value; break;
        case "36.1.5": sp_36_1_5[idx] += value; break;
        case "36.1.6": sp_36_1_6[idx] += value; break;

        default: break;
      }
    }

    // set series ONCE
    state.child_at_risk_1 = [
      { name: "Total number of Children of broken home/dysfunctional family", data: sp_33_1 },
      { name: "Total number of Out of School Children and Youth (OSCY) served by CSWDO", data: sp_33_2 },
      { name: "Total number of Children In-Street Situations (CISS)", data: sp_33_3 },
      { name: "Total number of Children member of gangs", data: sp_33_4 },
      { name: "Total number of Children In Situation Of Armed Conflict (RA 11182)", data: sp_33_5 },
      { name: "Total number of Children of Persons Who Used Drugs (PWUD)", data: sp_33_6 },
      { name: "Total number of Children of Recovering Persons Who Used Drugs (RPWUD)", data: sp_33_7 },
      { name: "Total number of Children Who Used Drugs (CWUD)", data: sp_33_8 },
      { name: "Total number of Recovering Children Who Used Drugs (RCWUD)", data: sp_33_9 },
      { name: "Total number of Children of People in Prostitution (PIP)", data: sp_33_10 },
      { name: "Total number of Children of Parents in Correctional Facilities", data: sp_33_11 },
      { name: "Total number of Left Behind Children of OFW", data: sp_33_12 },
      { name: "Total number of Children of Solo Parents", data: sp_33_13 },
      { name: "Total number of Curfew on Minors Violators (Ord. No. 444484-71)", data: sp_33_14 },
      { name: "Total number of Children Victim of Trafficking In Persons (TIP)", data: sp_33_15 },
      { name: "Total number of Children Victim of OSAEC/CSAEM (RA 11930)", data: sp_33_16 },
      { name: "Total number of Children Victim of Child Marriage (RA 11596)", data: sp_33_17 },
      { name: "Total number of Children Sniffing of Rugby and other Volatile Substance Use (RA 1619)", data: sp_33_18 },
      { name: "Total number of Children Victim of Domestic Violence (RA 9262)", data: sp_33_19 },
      { name: "Total number of Children Violators of Anti Smoking Ordinance (Ord. No. 0367-12)", data: sp_33_20 },
      { name: "Total number of Children Found With Illegal Possession of Deadly Weapon (RA10591)", data: sp_33_21 },
      { name: "Total number of Children Violators of Fire Cracker Ban (Ord. No. 060-02)", data: sp_33_22 },
      { name: "Total number of Children in Crisis Situations", data: sp_33_23 },
      { name: "Total number of Truant Children (Truancy)", data: sp_33_24 },
      { name: "Total number of Mendicant Children (Mendicancy)", data: sp_33_25 },
      { name: "Total number of Children Affected by Emergencies/Disasters Served", data: sp_33_26 },
      { name: "Total number of Children With Special Needs (CWSN) / Children With Disabilities (CWD) Served", data: sp_33_27 },
    ];

    state.child_at_risk_2 = [
      { name: "Total number of Children Issued with Permit to Travel by CSWDO", data: sp_34_1 },
      { name: "Unaccompanied Minors", data: sp_34_1_1 },
      { name: "Accompanied Minors", data: sp_34_1_2 },
    ];

    state.child_at_risk_3 = [
      { name: "Total number of Victims of Child Abuse (RA 7610)", data: sp_35_1 },
      { name: "Sexual Abuse (RA 7610)", data: sp_35_1_1 },
      { name: "Physical Abuse (RA 7610)", data: sp_35_1_2 },
      { name: "Psychological/Mental Abuse (RA 7610)", data: sp_35_1_3 },
      { name: "Abandonment (RA 7610)", data: sp_35_1_4 },
      { name: "Neglect (RA 7610)", data: sp_35_1_5 },
      { name: "Child Labor (RA 7610)", data: sp_35_1_6 },
    ];

    state.child_at_risk_4 = [
      { name: "Total number of Children Sexually Abused", data: sp_36_1 },
      { name: "Rape", data: sp_36_1_1 },
      { name: "Incestuous Rape", data: sp_36_1_2 },
      { name: "Attempted Rape", data: sp_36_1_3 },
      { name: "Acts of Lasciviousness", data: sp_36_1_4 },
      { name: "Sexual Harassment", data: sp_36_1_5 },
      { name: "Seduction", data: sp_36_1_6 },
    ];
  } catch (error) {
    console.error("fetchReports_Details_Bars error:", error);
    state.child_at_risk_1 = [];
    state.child_at_risk_2 = [];
    state.child_at_risk_3 = [];
    state.child_at_risk_4 = [];
  }
}
</script>
