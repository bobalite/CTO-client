<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold borderp-2 mt-3 mb-0 w-full">
    CHILDREN IN-CONFLICT WITH THE LAW
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">Total Number of Children In-Conflict with the Law</h3>
      <apexchart
        type="bar"
        height="400"
        width="100%"
        :options="state.populationHoriOptions"
        :series="state.child_in_conflict_1"
      />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">
        Total Number of Crimes Against Person Committed By Children
      </h3>
      <apexchart
        type="bar"
        height="400"
        width="100%"
        :options="state.populationHoriOptions"
        :series="state.child_in_conflict_2"
      />
    </div>
  </div>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">
        Total Number of Crimes Against Property Committed By Children
      </h3>
      <apexchart
        type="bar"
        height="400"
        width="100%"
        :options="state.populationHoriOptions"
        :series="state.child_in_conflict_3"
      />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">
        Total Number of Crimes Against Public Order Committed By Children
      </h3>
      <apexchart
        type="bar"
        height="400"
        width="100%"
        :options="state.populationHoriOptions"
        :series="state.child_in_conflict_4"
      />
    </div>

    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">
        Total Number of Crimes Committed By Children Under Special Penal Laws
      </h3>
      <apexchart
        type="bar"
        height="400"
        width="100%"
        :options="state.populationHoriOptions"
        :series="state.child_in_conflict_5"
      />
    </div>
  </div>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div class="border rounded-xl p-2">
      <h3 class="text-sm font-bold mb-2">Grand Total Number of Crimes Committed By Children</h3>
      <apexchart
        type="bar"
        height="400"
        width="100%"
        :options="state.populationHoriOptions"
        :series="state.child_in_conflict_6"
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

  child_in_conflict_1: [],
  child_in_conflict_2: [],
  child_in_conflict_3: [],
  child_in_conflict_4: [],
  child_in_conflict_5: [],
  child_in_conflict_6: [],

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
      state.child_in_conflict_1 = [];
      state.child_in_conflict_2 = [];
      state.child_in_conflict_3 = [];
      state.child_in_conflict_4 = [];
      state.child_in_conflict_5 = [];
      state.child_in_conflict_6 = [];
      return;
    }

    // ---------- arrays ----------
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

    // ---------- aggregate ----------
    for (const row of data) {
      if (!row) continue;

      const reportYearId = Number(row.report_year_id);
      const idx = quarterIds.indexOf(reportYearId);
      if (idx === -1) continue;

      const value = row.total != null ? Number(row.total) : 0;
      if (!Number.isFinite(value)) continue;

      switch (row.indicator_no) {
        case "37.1": ic_37_1[idx] += value; break;
        case "37.1.1": ic_37_1_1[idx] += value; break;
        case "37.1.2": ic_37_1_2[idx] += value; break;
        case "37.1.3": ic_37_1_3[idx] += value; break;
        case "37.1.4": ic_37_1_4[idx] += value; break;
        case "37.1.5": ic_37_1_5[idx] += value; break;
        case "37.1.6": ic_37_1_6[idx] += value; break;
        case "37.1.7": ic_37_1_7[idx] += value; break;
        case "37.1.8": ic_37_1_8[idx] += value; break;
        case "37.1.9": ic_37_1_9[idx] += value; break;
        case "37.1.10": ic_37_1_10[idx] += value; break;

        case "38.1": ic_38_1[idx] += value; break;
        case "38.1.1": ic_38_1_1[idx] += value; break;
        case "38.1.2": ic_38_1_2[idx] += value; break;
        case "38.1.3": ic_38_1_3[idx] += value; break;
        case "38.1.4": ic_38_1_4[idx] += value; break;
        case "38.1.5": ic_38_1_5[idx] += value; break;
        case "38.1.6": ic_38_1_6[idx] += value; break;
        case "38.1.7": ic_38_1_7[idx] += value; break;
        case "38.1.8": ic_38_1_8[idx] += value; break;
        case "38.1.9": ic_38_1_9[idx] += value; break;
        case "38.1.10": ic_38_1_10[idx] += value; break;
        case "38.1.11": ic_38_1_11[idx] += value; break;
        case "38.1.12": ic_38_1_12[idx] += value; break;
        case "38.1.13": ic_38_1_13[idx] += value; break;
        case "38.1.14": ic_38_1_14[idx] += value; break;
        case "38.1.15": ic_38_1_15[idx] += value; break;
        case "38.1.16": ic_38_1_16[idx] += value; break;

        case "39.1": ic_39_1[idx] += value; break;
        case "39.1.1": ic_39_1_1[idx] += value; break;
        case "39.1.2": ic_39_1_2[idx] += value; break;
        case "39.1.3": ic_39_1_3[idx] += value; break;
        case "39.1.4": ic_39_1_4[idx] += value; break;
        case "39.1.5": ic_39_1_5[idx] += value; break;
        case "39.1.6": ic_39_1_6[idx] += value; break;
        case "39.1.7": ic_39_1_7[idx] += value; break;

        case "40.1": ic_40_1[idx] += value; break;
        case "40.1.1": ic_40_1_1[idx] += value; break;
        case "40.1.2": ic_40_1_2[idx] += value; break;
        case "40.1.3": ic_40_1_3[idx] += value; break;

        case "41.1": ic_41_1[idx] += value; break;
        case "41.1.1": ic_41_1_1[idx] += value; break;
        case "41.1.2": ic_41_1_2[idx] += value; break;
        case "41.1.3": ic_41_1_3[idx] += value; break;
        case "41.1.4": ic_41_1_4[idx] += value; break;
        case "41.1.5": ic_41_1_5[idx] += value; break;
        case "41.1.6": ic_41_1_6[idx] += value; break;
        case "41.1.7": ic_41_1_7[idx] += value; break;
        case "41.1.8": ic_41_1_8[idx] += value; break;

        case "42.1": ic_42_1[idx] += value; break;

        default: break;
      }
    }

    // ---------- set state ONCE ----------
    state.child_in_conflict_1 = [
      { name: "Total Number of Children In-Conflict with the Law (CICL)", data: ic_37_1 },
      { name: "Total Number of CICL undergoing Diversion Program", data: ic_37_1_1 },
      { name: "Total Number of CICL in Jail/Detention Center", data: ic_37_1_2 },
      { name: "Total Number of CICL in Bahay Pag-asa", data: ic_37_1_3 },
      { name: "Total Number of CICL under Intensive Juvenile Intervention and Support for Center (IJISC)", data: ic_37_1_4 },
      { name: "Total Number of CICL in RRCY", data: ic_37_1_5 },
      { name: "Total Number of CICL undergoing After-Care Program", data: ic_37_1_6 },
      { name: "Total Number of CICL that have re-offended", data: ic_37_1_7 },
      { name: "Total Number of CICL that have been fully integrated", data: ic_37_1_8 },
      { name: "Total Number of CICL undergoing Community-based Intervention Program", data: ic_37_1_9 },
      { name: "Total Number of CICL undergoing Community-based Rehabilitation Program", data: ic_37_1_10 },
    ];

    state.child_in_conflict_2 = [
      { name: "Total Number of Crimes Against Person Committed By Children", data: ic_38_1 },
      { name: "Murder", data: ic_38_1_1 },
      { name: "Frustrated Murder", data: ic_38_1_2 },
      { name: "Attempted Murder", data: ic_38_1_3 },
      { name: "Parricide", data: ic_38_1_4 },
      { name: "Frustrated Parricide", data: ic_38_1_5 },
      { name: "Attempted Parricide", data: ic_38_1_6 },
      { name: "Homicide", data: ic_38_1_7 },
      { name: "Frustrated Homicide", data: ic_38_1_8 },
      { name: "Attempted Homicide", data: ic_38_1_9 },
      { name: "Serious Physical Injury", data: ic_38_1_10 },
      { name: "Grave Threats", data: ic_38_1_11 },
      { name: "Rape (by force, threat, and sexual assault)", data: ic_38_1_12 },
      { name: "Incestuous Rape", data: ic_38_1_13 },
      { name: "Statutory Rape", data: ic_38_1_14 },
      { name: "Seduction (Art. 337 of RPC)", data: ic_38_1_15 },
      { name: "Acts of Lasciviousness (Art. 336 of RPC)", data: ic_38_1_16 },
    ];

    state.child_in_conflict_3 = [
      { name: "Total Number of Crimes Against Property Committed By Children", data: ic_39_1 },
      { name: "Robbery", data: ic_39_1_1 },
      { name: "Theft", data: ic_39_1_2 },
      { name: "Qualified Theft", data: ic_39_1_3 },
      { name: "Carnapping", data: ic_39_1_4 },
      { name: "Arson", data: ic_39_1_5 },
      { name: "Malicious Mischief (Damage to property)", data: ic_39_1_6 },
      { name: "Trespassing to Dwelling", data: ic_39_1_7 },
    ];

    state.child_in_conflict_4 = [
      { name: "Total Number of Crimes Against Public Order Committed By Children", data: ic_40_1 },
      { name: "Alarms and Scandal", data: ic_40_1_1 },
      { name: "Direct Assault", data: ic_40_1_2 },
      { name: "Indirect Assault", data: ic_40_1_3 },
    ];

    state.child_in_conflict_5 = [
      { name: "Total Number of Crimes Committed By Children Under Special Penal Laws", data: ic_41_1 },
      { name: "RA 9165 (Comprehensive Dangerous Drugs Act)", data: ic_41_1_1 },
      { name: "RA 10591 (Comprehensive Firearms & Ammunition Regulation Act)", data: ic_41_1_2 },
      { name: "RA 9287 (Anti-Gambling)", data: ic_41_1_3 },
      { name: "RA 10627 (Anti-Bullying Act including Cyberbullying)", data: ic_41_1_4 },
      { name: "RA 9208 (Trafficking in Person)", data: ic_41_1_5 },
      { name: "RA 7610 (Anti-Child Abuse)", data: ic_41_1_6 },
      { name: "RA 11313 (Safe Space Act or Bawal Bastos Law)", data: ic_41_1_7 },
      { name: "RA 11930 (Anti-OSAEC/CSAEM)", data: ic_41_1_8 },
    ];

    state.child_in_conflict_6 = [
      { name: "Grand Total Number of Crimes Committed By Children", data: ic_42_1 },
    ];
  } catch (error) {
    console.error("fetchReports_Details_Bars error:", error);
    state.child_in_conflict_1 = [];
    state.child_in_conflict_2 = [];
    state.child_in_conflict_3 = [];
    state.child_in_conflict_4 = [];
    state.child_in_conflict_5 = [];
    state.child_in_conflict_6 = [];
  }
}
</script>
