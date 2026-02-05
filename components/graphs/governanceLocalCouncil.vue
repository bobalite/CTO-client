<template>
  <h3 class="sm:col-span-12 text-lg text-center font-bold mt-3 w-full">
    LOCAL COUNCIL FOR THE PROTECTION OF CHILDREN
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Chart 1 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">LCPC FUNCTIONALITY</h3>
      <ClientOnly>
        <apexchart
          type="bar"
          height="400"
          width="100%"
          :options="state.barOptions"
          :series="state.lcpc"
        />
      </ClientOnly>
    </div>

    <!-- Chart 2 -->
    <div class="border rounded-xl p-2">
      <h3 class="text-lg font-bold mb-2">LOCAL INSTITUTIONS</h3>
      <ClientOnly>
        <apexchart
          type="bar"
          height="400"
          width="100%"
          :options="state.barOptions"
          :series="state.local"
        />
      </ClientOnly>
    </div>

    <!-- Excel-derived quarter view -->
    <div class="border rounded-xl p-2 md:col-span-2">
      <h3 class="text-base font-bold mb-2">
        List of LGU Accredited NGOs/CSOs providing services to Children (per quarter)
      </h3>

      <div v-if="state.quarterIds.length === 0" class="text-sm opacity-70 text-center py-6">
        No quarters found for selected year.
      </div>

      <!-- 2 quarters per row -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="(qid, idx) in state.quarterIds"
          :key="'lgu-quarter-' + qid"
          class="border rounded-xl p-3"
        >
          <div class="text-sm font-semibold mb-2 text-center">
            {{ state.quarterNames?.[idx] ?? `Q${idx + 1}` }}
          </div>

          <div
            v-if="(state.lguAccreditedListByQuarter?.[qid]?.length ?? 0) === 0"
            class="text-xs opacity-70 text-center py-6"
          >
            No data.
          </div>

          <div v-else class="grid grid-cols-12 gap-3 items-start">
            <!-- LEFT: List -->
            <div class="col-span-12 md:col-span-7">
              <ul class="space-y-1 text-xs">
                <li
                  v-for="item in state.lguAccreditedListByQuarter[qid]"
                  :key="'lgu-' + qid + '-' + item.rank + '-' + item.name"
                  class="flex items-start gap-2 leading-tight"
                  :title="item.name"
                >
                  <div class="w-8 shrink-0 text-right font-semibold">
                    {{ item.rank }}.
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="font-medium truncate">
                      {{ item.name }}
                    </div>
                    <div class="text-[10px] opacity-70">
                      {{ item.count }} · {{ item.pct }}%
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <!-- RIGHT: Pie -->
            <div class="col-span-12 md:col-span-5">
              <ClientOnly>
                <apexchart
                  type="pie"
                  height="260"
                  width="100%"
                  :options="lguPieOptions(qid)"
                  :series="state.lguAccreditedPieByQuarter[qid]?.series ?? []"
                />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Excel-derived quarter view -->
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";
import { reportDetailsExcelService } from "~/components/api/ReportDetailsExcelService";

const props = defineProps({
  class: { type: String, required: false, default: "border-solid" },
  displaytext: { type: String, required: false },
  group_id: { type: String, required: false },

  report_year: { type: [Number, String], required: false }, // selected year number (e.g., 2025)
  passed_data: { type: [Array, Object], required: true },   // annual indicator rows (44.*,45.*)
  report_years: { type: [Array, Object], required: true },  // quarters mapping table
});

const state = reactive({
  // annual x-axis
  annualYearIds: [],
  annualYearNames: [],

  // quarter x-axis (for selected year)
  quarterIds: [],
  quarterNames: [],

  // annual series
  lcpc: [],
  local: [],

  // excel
  exceldata: [],
  lguAccreditedListByQuarter: {}, // { [report_year_id]: [{rank,name,count,pct}] }
  lguAccreditedPieByQuarter: {},  // { [report_year_id]: {labels,series,total} }

  barOptions: {
    chart: { type: "bar", stacked: false, toolbar: { show: false }, zoom: { enabled: false } },
    plotOptions: { bar: { horizontal: false, columnWidth: "60%" } },
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    tooltip: { shared: true, intersect: false },
    xaxis: { categories: [] },
    colors: ["#00796B", "#388E3C", "#AFB42B", "#F9A825"],
    legend: { show: true, fontSize: "11px" },
  },
});

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

function toNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function getRowYear(row) {
  const y = row?.year ?? row?.report_year;
  if (y != null && y !== "") {
    const yn = Number(y);
    return Number.isFinite(yn) ? yn : NaN;
  }

  const ryId = Number(row?.report_year_id);
  if (!Number.isFinite(ryId)) return NaN;

  const years = normalizeReportYears();
  const match = years.find((r) => Number(r?.id) === ryId);
  const my = Number(match?.year);
  return Number.isFinite(my) ? my : NaN;
}

function recalc() {
  buildAnnualArrays();
  fetchReports_Details_Bars_Annual();
  buildQuarterArrays();     // ✅ needed for excel grouping
  getexceldata();           // ✅ uses quarterIds
}

/**
 * Annual axis based on annual passed_data (44.* + 45.*)
 */
function buildAnnualArrays() {
  const data = normalizePassedData();

  const years = Array.from(
    new Set(data.map((r) => getRowYear(r)).filter((y) => Number.isFinite(y)))
  ).sort((a, b) => a - b);

  state.annualYearIds = years;
  state.annualYearNames = years.map(String);

  state.barOptions = {
    ...state.barOptions,
    xaxis: { ...state.barOptions.xaxis, categories: state.annualYearNames },
  };
}

/**
 * Quarter axis for selected year from props.report_years
 * report_years rows should include: { id, year, quarter?, name }
 */
function buildQuarterArrays() {
  const all = normalizeReportYears();
  const targetYear = Number(props.report_year);

  if (!Number.isFinite(targetYear)) {
    state.quarterIds = [];
    state.quarterNames = [];
    return;
  }

  const filtered = all
    .filter((q) => Number(q?.year) === targetYear)
    .sort((a, b) => Number(a?.quarter ?? a?.id) - Number(b?.quarter ?? b?.id));

  state.quarterIds = filtered.map((q) => Number(q.id));
  // use provided name if exists, otherwise make "Qx YYYY"
  state.quarterNames = filtered.map((q, index) => String(q?.name ?? `Q${index + 1} ${q.year}`));
}

/**
 * Annual bars 44.* and 45.*
 */
function fetchReports_Details_Bars_Annual() {
  try {
    const data = normalizePassedData();
    const yearIds = state.annualYearIds ?? [];

    if (!yearIds.length) {
      state.lcpc = [];
      state.local = [];
      return;
    }

    const yearIndexMap = new Map();
    yearIds.forEach((year, idx) => yearIndexMap.set(year, idx));

    const lcpc_44_1 = new Array(yearIds.length).fill(0);
    const lcpc_44_2 = new Array(yearIds.length).fill(0);
    const lcpc_44_3 = new Array(yearIds.length).fill(0);
    const lcpc_44_4 = new Array(yearIds.length).fill(0);
    const lcpc_44_5 = new Array(yearIds.length).fill(0);
    const lcpc_44_6 = new Array(yearIds.length).fill(0);

    const local_45_1 = new Array(yearIds.length).fill(0);
    const local_45_2 = new Array(yearIds.length).fill(0);

    for (const row of data) {
      if (!row) continue;

      const rowYear = getRowYear(row);
      if (!Number.isFinite(rowYear)) continue;

      const idx = yearIndexMap.get(rowYear);
      if (idx === undefined) continue;

      const value = row.total != null ? Number(row.total) : 0;
      if (!Number.isFinite(value)) continue;

      switch (String(row.indicator_no)) {
        case "44.1": lcpc_44_1[idx] += value; break;
        case "44.2": lcpc_44_2[idx] += value; break;
        case "44.3": lcpc_44_3[idx] += value; break;
        case "44.4": lcpc_44_4[idx] += value; break;
        case "44.5": lcpc_44_5[idx] += value; break;
        case "44.6": lcpc_44_6[idx] += value; break;

        case "45.1": local_45_1[idx] += value; break;
        case "45.2": local_45_2[idx] += value; break;

        default: break;
      }
    }

    state.lcpc = [
      { name: "44.1 Total Number of BCPC SGLGB passers", data: lcpc_44_1 },
      { name: "44.2 LCPC budget allocated", data: lcpc_44_2 },
      { name: "44.3 LGU NTA Share", data: lcpc_44_3 },
      { name: "44.4 % LCPC budget vs NTA", data: lcpc_44_4 },
      { name: "44.5 LCPC budget utilized", data: lcpc_44_5 },
      { name: "44.6 % LCPC budget utilization", data: lcpc_44_6 },
    ];

    state.local = [
      { name: "45.1 Total Number of Functional BVAWC Desks", data: local_45_1 },
      { name: "45.2 LGU Accredited NGOs/CSOs (count)", data: local_45_2 },
    ];
  } catch (error) {
    console.error("fetchReports_Details_Bars_Annual error:", error);
    state.lcpc = [];
    state.local = [];
  }
}

/**
 * Excel data for 45.2 grouped by quarter(report_year_id)
 * NO LIMIT: shows all rows per quarter (removed .slice(0,10))
 */
async function getexceldata() {
  try {
    const response = await reportDetailsExcelService.getReportExcelDetails();

    const rows = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response)
        ? response
        : [];

    state.exceldata = rows;

    const quarterIds = (state.quarterIds ?? []).map(Number);
    if (!quarterIds.length) {
      state.lguAccreditedListByQuarter = {};
      state.lguAccreditedPieByQuarter = {};
      return;
    }

    const indicatorNo = "45.2"; // ✅ excel indicator
    const listOut = {};
    const pieOut = {};

    for (const qid of quarterIds) {
      // ✅ NO LIMIT HERE
      const list = rows
        .filter(r =>
          r &&
          String(r.indicator_no) === indicatorNo &&
          Number(r.report_year_id) === Number(qid)
        )
        .map(r => ({
          rank: toNum(r.header_value1),
          name: String(r.header_value2 ?? ""),
          count: toNum(r.header_value3),
        }))
        .filter(x => x.name)
        .sort((a, b) => a.rank - b.rank);

      const total = list.reduce((sum, x) => sum + x.count, 0);

      listOut[qid] = list.map(x => ({
        ...x,
        pct: total > 0 ? Number(((x.count / total) * 100).toFixed(1)) : 0,
      }));

      // ⚠️ Pie with many rows can be unreadable; but you asked NO LIMIT, so this is literal.
      pieOut[qid] = {
        labels: listOut[qid].map(x => x.name),
        series: listOut[qid].map(x => Number(x.pct.toFixed(2))),
        total,
      };
    }

    state.lguAccreditedListByQuarter = listOut;
    state.lguAccreditedPieByQuarter = pieOut;
  } catch (err) {
    console.error("Error fetching report detail excel:", err);
    state.exceldata = [];
    state.lguAccreditedListByQuarter = {};
    state.lguAccreditedPieByQuarter = {};
  }
}

/**
 * Pie options (labels removed below pie to make it bigger)
 */
function lguPieOptions(qid) {
  const pack = state.lguAccreditedPieByQuarter?.[qid];
  return {
    chart: { type: "pie" },
    labels: pack?.labels ?? [],
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
      y: { formatter: (val) => `${val}%` },
    },
  };
}
</script>
