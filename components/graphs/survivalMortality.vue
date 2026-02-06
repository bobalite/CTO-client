<template>
  <h3 class="sm:col-span-12 text-base text-center font-bold mt-3 w-full">
    MORTALITY
  </h3>

  <div :class="props.class" class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <!-- MATERNAL MORTALITY (BAR CHART) -->
    <div class="border rounded-xl p-2">
      <h3 class="text-base font-bold mb-2">MATERNAL MORTALITY</h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="260"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.maternal_mortality"
        />
      </ClientOnly>
    </div>

    <!-- CHILD MORTALITY (BAR CHART) -->
    <div class="border rounded-xl p-2">
      <h3 class="text-base font-bold mb-2">CHILD MORTALITY</h3>

      <ClientOnly>
        <apexchart
          type="bar"
          height="260"
          width="100%"
          :options="state.populationHoriOptions"
          :series="state.child_mortality"
        />
      </ClientOnly>
    </div>

    <!-- INFANT MORTALITY (LIST LEFT + PIE RIGHT PER QUARTER) -->
    <div class="border rounded-xl p-2 md:col-span-2">
      <h3 class="text-base font-bold mb-2">
        Top 10 Leading causes of Infant Mortality (0-11 months)
      </h3>

      <!-- 2 quarters per row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="(qid, idx) in state.quarterIds"
          :key="'infant-quarter-' + qid"
          class="border rounded-xl p-3"
        >
          <div class="text-sm font-semibold mb-2 text-center">
            {{ state.quarterNames?.[idx] ?? `Q${idx + 1}` }}
          </div>

          <div
            v-if="(state.infantListByQuarter?.[qid]?.length ?? 0) === 0"
            class="text-xs opacity-70 text-center py-6"
          >
            No data.
          </div>

          <div v-else class="grid grid-cols-12 gap-3 items-start">
            <!-- LEFT: List -->
            <div class="col-span-12 md:col-span-7">
              <ul class="space-y-1 text-xs">
                <li
                  v-for="item in state.infantListByQuarter[qid]"
                  :key="'infant-' + qid + '-' + item.rank"
                  class="flex items-start gap-2 leading-tight"
                  :title="item.disease"
                >
                  <div class="w-6 shrink-0 text-right font-semibold">
                    {{ item.rank }}.
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="font-medium truncate">
                      {{ item.disease }}
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
                  :options="infantPieOptions(qid)"
                  :series="state.infantPieByQuarter[qid].series"
                />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- UNDER-FIVE MORTALITY (LIST LEFT + PIE RIGHT PER QUARTER) -->
    <div class="border rounded-xl p-2 md:col-span-2">
      <h3 class="text-base font-bold mb-2">
        Top 10 leading causes of Under-Five (U5) Mortality
      </h3>

      <!-- 2 quarters per row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="(qid, idx) in state.quarterIds"
          :key="'u5-quarter-' + qid"
          class="border rounded-xl p-3"
        >
          <div class="text-sm font-semibold mb-2 text-center">
            {{ state.quarterNames?.[idx] ?? `Q${idx + 1}` }}
          </div>

          <div
            v-if="(state.u5ListByQuarter?.[qid]?.length ?? 0) === 0"
            class="text-xs opacity-70 text-center py-6"
          >
            No data.
          </div>

          <div v-else class="grid grid-cols-12 gap-3 items-start">
            <!-- LEFT: List -->
            <div class="col-span-12 md:col-span-7">
              <ul class="space-y-1 text-xs">
                <li
                  v-for="item in state.u5ListByQuarter[qid]"
                  :key="'u5-' + qid + '-' + item.rank"
                  class="flex items-start gap-2 leading-tight"
                  :title="item.disease"
                >
                  <div class="w-6 shrink-0 text-right font-semibold">
                    {{ item.rank }}.
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="font-medium truncate">
                      {{ item.disease }}
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
                  :options="u5PieOptions(qid)"
                  :series="state.u5PieByQuarter[qid].series"
                />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  quarterNames: [],
  quarterIds: [],

  maternal_mortality: [],
  child_mortality: [],

  exceldata: [],

  // LIST (ranked)
  infantListByQuarter: {}, // { [qid]: [{rank,disease,count,pct}] }
  u5ListByQuarter: {},

  // PIE (percentages)
  infantPieByQuarter: {}, // { [qid]: { labels: string[], series: number[], total: number } }
  u5PieByQuarter: {},

  populationHoriOptions: {
    chart: { type: "bar", stacked: false, toolbar: { show: false }, zoom: { enabled: false } },
    plotOptions: { bar: { horizontal: false } },
    colors: ["#00796B", "#388E3C", "#AFB42B", "#F9A825"],
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    xaxis: { categories: ["1Q", "2Q", "3Q", "4Q"] },
  },

  pieOptionsBase: {
    chart: { type: "pie", toolbar: { show: false } },
     legend: { show: false },
    dataLabels: {
      enabled: true,
      style: { fontSize: "10px" },
      formatter: (val) => `${Number(val).toFixed(1)}%`,
    },
    tooltip: {
      y: { formatter: (val) => `${Number(val).toFixed(1)}%` },
    },
  },
});

function normalizeReportYears() {
  const raw = props.report_years;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  return [];
}

function normalizePassedData() {
  const raw = props.passed_data;
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  return [];
}

function recalc() {
  buildQuarterArrays();
  fetchReports_Details_Bars();
  getexceldata();
}

onMounted(() => {
  recalc();
});

watch(() => props.report_year, () => recalc());
watch(() => props.report_years, () => recalc(), { deep: true });
watch(() => props.passed_data, () => fetchReports_Details_Bars(), { deep: true });

function buildQuarterArrays() {
  const allYears = normalizeReportYears();
  const targetYear = Number(props.report_year);

  const filtered = allYears
    .filter((q) => Number(q.year) === targetYear)
    .sort((a, b) => Number(a.quarter ?? a.id) - Number(b.quarter ?? b.id));

  state.quarterIds = filtered.map((q) => Number(q.id));
  state.quarterNames = filtered.map((q, index) => `Q${index + 1} ${q.year}`);

  state.populationHoriOptions.xaxis = {
    ...state.populationHoriOptions.xaxis,
    categories: state.quarterNames.length ? state.quarterNames : ["1Q", "2Q", "3Q", "4Q"],
  };
}

function fetchReports_Details_Bars() {
  try {
    const data = normalizePassedData();
    const quarterIds = (state.quarterIds ?? []).map(Number);

    if (!quarterIds.length) {
      state.maternal_mortality = [];
      state.child_mortality = [];
      return;
    }

    const total_maternal_deaths = new Array(quarterIds.length).fill(0);
    const ratio_maternal_deaths = new Array(quarterIds.length).fill(0);

    const total_neonatal_deaths = new Array(quarterIds.length).fill(0);
    const rate_neonatal_deaths = new Array(quarterIds.length).fill(0);
    const infant_deaths_0to11 = new Array(quarterIds.length).fill(0);
    const rate_infant_deaths = new Array(quarterIds.length).fill(0);
    const total_u5_deaths = new Array(quarterIds.length).fill(0);
    const rate_u5_deaths = new Array(quarterIds.length).fill(0);

    for (const row of data) {
      if (!row) continue;

      const reportYearId = Number(row.report_year_id);
      const idx = quarterIds.indexOf(reportYearId);
      if (idx === -1) continue;

      const value = row.total != null ? Number(row.total) : 0;
      if (Number.isNaN(value)) continue;

      switch (row.indicator_no) {
        case "10.1": total_maternal_deaths[idx] += value; break;
        case "10.2": ratio_maternal_deaths[idx] += value; break;
        
        case "11.1": total_neonatal_deaths[idx] += value; break;
        case "11.2": rate_neonatal_deaths[idx] += value; break;
        case "11.3": infant_deaths_0to11[idx] += value; break;
        case "11.4": rate_infant_deaths[idx] += value; break;
        case "11.5": total_u5_deaths[idx] += value; break;
        case "11.6": rate_u5_deaths[idx] += value; break;
        default: break;
      }
    }

    state.maternal_mortality = [
      { name: "10.1 Total number of maternal deaths", data: total_maternal_deaths },
      { name: "10.2 Ratio of maternal deaths (MMR)", data: ratio_maternal_deaths },
    ];

    state.child_mortality = [
      { name: "11.1 - Neonatal deaths (0-28 days)", data: total_neonatal_deaths },
      { name: "11.2 - Rate of neonatal mortality", data: rate_neonatal_deaths },
      { name: "11.3 - Infant deaths (0-11 months)", data: infant_deaths_0to11 },
      { name: "11.4 - Infant mortality rate", data: rate_infant_deaths },
      { name: "11.5 - Under-5 deaths", data: total_u5_deaths },
      { name: "11.6 - Under-5 mortality rate", data: rate_u5_deaths },
    ];
  } catch (error) {
    console.error("fetchReports_Details_Bars error:", error);
    state.maternal_mortality = [];
    state.child_mortality = [];
  }
}

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
      state.infantListByQuarter = {};
      state.u5ListByQuarter = {};
      state.infantPieByQuarter = {};
      state.u5PieByQuarter = {};
      return;
    }

    const toNum = (v) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };

    const buildListAndPieByQuarter = (indicatorNo) => {
      const listOut = {};
      const pieOut = {};

      for (const qid of quarterIds) {
        const list = rows
          .filter(
            (r) =>
              r &&
              String(r.indicator_no) === String(indicatorNo) &&
              Number(r.report_year_id) === qid
          )
          .map((r) => ({
            rank: toNum(r.header_value1),
            disease: String(r.header_value2 ?? ""),
            count: toNum(r.header_value3),
          }))
          .filter((x) => x.disease)
          .sort((a, b) => a.rank - b.rank)
          .slice(0, 10);

        const total = list.reduce((sum, x) => sum + x.count, 0);

        // list with pct
        listOut[qid] = list.map((x) => ({
          ...x,
          pct: total > 0 ? Number(((x.count / total) * 100).toFixed(1)) : 0,
        }));

        // pie uses same pct values
        pieOut[qid] = {
          labels: listOut[qid].map((x) => x.disease),
          series: listOut[qid].map((x) => Number(x.pct.toFixed(2))),
          total,
        };
      }

      return { listOut, pieOut };
    };

    const infant = buildListAndPieByQuarter("12.1");
    state.infantListByQuarter = infant.listOut;
    state.infantPieByQuarter = infant.pieOut;

    const u5 = buildListAndPieByQuarter("12.2");
    state.u5ListByQuarter = u5.listOut;
    state.u5PieByQuarter = u5.pieOut;
  } catch (err) {
    console.error("Error fetching report detail excel:", err);
    state.exceldata = [];
    state.infantListByQuarter = {};
    state.u5ListByQuarter = {};
    state.infantPieByQuarter = {};
    state.u5PieByQuarter = {};
  }
}

function infantPieOptions(qid) {
  return {
    ...state.pieOptionsBase,
    labels: state.infantPieByQuarter?.[qid]?.labels ?? [],
  };
}

function u5PieOptions(qid) {
  return {
    ...state.pieOptionsBase,
    labels: state.u5PieByQuarter?.[qid]?.labels ?? [],
  };
}
</script>
