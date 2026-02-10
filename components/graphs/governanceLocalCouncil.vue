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

    <!-- Excel-derived ANNUAL view -->
    <div class="border rounded-xl p-2 md:col-span-2">
      <h3 class="text-base font-bold mb-2">
        List of LGU Accredited NGOs/CSOs providing services to Children (Annual Data)
      </h3>

      <div v-if="state.annualYearIds.length === 0" class="text-sm opacity-70 text-center py-6">
        No years found.
      </div>

      <!-- ✅ ONE YEAR PER ROW (one column) -->
      <div v-else class="grid grid-cols-1 gap-4">
        <div
          v-for="(year, idx) in state.annualYearIds"
          :key="'lgu-annual-' + year"
          class="border rounded-xl p-3"
        >
          <div class="text-sm font-semibold mb-2 text-center">
            {{ state.annualYearNames?.[idx] ?? year }}
          </div>

          <div
            v-if="(state.lguAccreditedListByYear?.[year]?.length ?? 0) === 0"
            class="text-xs opacity-70 text-center py-6"
          >
            No data.
          </div>

          <!-- ✅ LIST + PIE SIDE-BY-SIDE -->
          <div v-else class="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
            <!-- LEFT: List (scrollable if huge) -->
            <div class="md:col-span-7">
              <div class="max-h-[520px] overflow-auto pr-2">
                <ul class="space-y-1 text-xs">
                  <li
                    v-for="item in state.lguAccreditedListByYear[year]"
                    :key="'lgu-' + year + '-' + item.rank + '-' + item.name"
                    class="flex items-start gap-2 leading-tight"
                    :title="item.name"
                  >
                    <div class="w-10 shrink-0 text-right font-semibold">
                      {{ item.rank }}.
                    </div>

                    <div class="min-w-0 flex-1">
                      <div class="font-medium">
                        {{ item.name }}
                      </div>
                      <div class="text-[10px] opacity-70">
                        {{ item.count }} · {{ item.pct }}%
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- RIGHT: Pie -->
            <div class="md:col-span-5">
              <ClientOnly>
                <apexchart
                  type="pie"
                  height="420"
                  width="100%"
                  :options="lguPieOptions(year)"
                  :series="state.lguAccreditedPieByYear[year]?.series ?? []"
                />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Excel-derived ANNUAL view -->
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";
import { reportDetailsExcelService } from "~/components/api/ReportDetailsExcelService";

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

  quarterIds: [],
  quarterNames: [],

  lcpc: [],
  local: [],

  exceldata: [],
  lguAccreditedListByYear: {}, // { [year:number]: [{rank,name,count,pct}] }
  lguAccreditedPieByYear: {},  // { [year:number]: {labels,series,total} }

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

  // kept (harmless)
  buildQuarterArrays();

  // ✅ annual excel aggregation
  getexceldataAnnual();
}

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
  state.quarterNames = filtered.map((q, index) => String(q?.name ?? `Q${index + 1} ${q.year}`));
}

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

async function getexceldataAnnual() {
  try {
    const response = await reportDetailsExcelService.getReportExcelDetails();

    const rows = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response)
      ? response
      : [];

    state.exceldata = rows;

    const yearsWanted = (state.annualYearIds ?? []).map(Number);
    if (!yearsWanted.length) {
      state.lguAccreditedListByYear = {};
      state.lguAccreditedPieByYear = {};
      return;
    }

    const reportYears = normalizeReportYears();
    const reportYearIdToYear = new Map(
      reportYears
        .filter((r) => r && r.id != null && r.year != null)
        .map((r) => [Number(r.id), Number(r.year)])
    );

    const indicatorNo = "45.2";

    // year -> name -> count sum
    const agg = new Map();

    for (const r of rows) {
      if (!r) continue;
      if (String(r.indicator_no) !== indicatorNo) continue;

      const ryId = Number(r.report_year_id);
      const year = reportYearIdToYear.get(ryId);
      if (!Number.isFinite(year)) continue;
      if (!yearsWanted.includes(year)) continue;

      const name = String(r.header_value2 ?? "").trim();
      if (!name) continue;

      const count = toNum(r.header_value3);

      if (!agg.has(year)) agg.set(year, new Map());
      const byName = agg.get(year);
      byName.set(name, (byName.get(name) ?? 0) + count);
    }

    const listOut = {};
    const pieOut = {};

    for (const year of yearsWanted) {
      const byName = agg.get(year) ?? new Map();

      const list = Array.from(byName.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count) // ✅ no limit
        .map((x, i) => ({ rank: i + 1, ...x }));

      const total = list.reduce((sum, x) => sum + x.count, 0);

      listOut[year] = list.map((x) => ({
        ...x,
        pct: total > 0 ? Number(((x.count / total) * 100).toFixed(1)) : 0,
      }));

      pieOut[year] = {
        labels: listOut[year].map((x) => x.name),
        series: listOut[year].map((x) => Number(x.pct.toFixed(2))),
        total,
      };
    }

    state.lguAccreditedListByYear = listOut;
    state.lguAccreditedPieByYear = pieOut;
  } catch (err) {
    console.error("Error fetching report detail excel:", err);
    state.exceldata = [];
    state.lguAccreditedListByYear = {};
    state.lguAccreditedPieByYear = {};
  }
}

function lguPieOptions(year) {
  const pack = state.lguAccreditedPieByYear?.[year];
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
