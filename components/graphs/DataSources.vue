<template>
  <div class="border rounded-xl p-3">
    <div class="flex items-center justify-between mb-2">
      <div>
        <div class="text-lg font-bold">{{ title }} </div>
        <div class="text-xs opacity-70">
          Total expected indicators: <span class="font-semibold">{{ total }}</span>
        </div>
      </div>
      <div class="text-xs opacity-70">
        {{ report_year ? `Year: ${report_year}` : "" }}
      </div>
    </div>

    <div v-if="series.length === 0" class="text-sm opacity-70 py-6 text-center">
      No datasource distribution available.
    </div>

    <div v-else>
      <ClientOnly>
        <apexchart type="pie" height="320" width="100%" :options="options" :series="series" />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: { type: String, default: "Data Sources for" },
  section: { type: String, required: false },
  report_year: { type: [String, Number], required: false },

  // from parent
  labels: { type: Array, required: true },
  series: { type: Array, required: true },
});

const total = computed(() => (props.series || []).reduce((s, x) => s + Number(x || 0), 0));

const options = computed(() => ({
  chart: { type: "pie", toolbar: { show: false } },
  labels: props.labels,
  legend: { show: false },
  dataLabels: {
    enabled: true,
    style: { colors: ["#333"], fontSize: "12px", fontWeight: "bold" },
    formatter(val, opts) {
      const name = opts.w.globals.labels?.[opts.seriesIndex] ?? "";
      return [name, `${Number(val).toFixed(1)}%`];
    },
  },
  tooltip: {
    y: {
      formatter: (val, opts) => {
        const i = opts.seriesIndex;
        const series = opts.w.globals.series ?? [];
        const total = series.reduce((s, x) => s + Number(x || 0), 0);
        const count = Number(series[i] || 0);
        const pct = total > 0 ? (count / total) * 100 : 0;
        return `${count} indicators (${pct.toFixed(1)}%)`;
      },
    },
  },
}));
</script>
