<template>
  <div class="border rounded-xl p-3">
    <div class="flex items-center justify-between mb-2">
      <div>
        <div class="text-lg font-bold">{{ title }}</div>
        <div class="text-xs opacity-70">
          Total expected indicators: <span class="font-semibold">{{ total }}</span>
        </div>
      </div>
      <div class="text-xs opacity-70">
        {{ report_year ? `Year: ${report_year}` : "" }}
      </div>
    </div>

    <div v-if="safeSeries.length === 0" class="text-sm opacity-70 py-6 text-center">
      No datasource distribution available.
    </div>

    <div v-else>
      <ClientOnly>
        <apexchart type="pie" height="320" width="100%" :options="options" :series="safeSeries" />
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
  labels: { type: Array, required: true },
  series: { type: Array, required: true },
});

const safeLabels = computed(() => (Array.isArray(props.labels) ? props.labels.map((x) => String(x ?? "")) : []));
const safeSeries = computed(() => (Array.isArray(props.series) ? props.series.map((x) => Number(x || 0)) : []));

const total = computed(() => safeSeries.value.reduce((s, x) => s + Number(x || 0), 0));

const options = computed(() => {
  // capture in closure so formatter never depends on opts.w
  const labels = safeLabels.value;
  const series = safeSeries.value;
  const sum = series.reduce((s, x) => s + Number(x || 0), 0);

  return {
    chart: { type: "pie", toolbar: { show: false } },
    labels,
    legend: { show: false },

    dataLabels: {
      enabled: true,
      style: { colors: ["#333"], fontSize: "12px", fontWeight: "bold" },
      formatter: (val, opts) => {
        const i = opts?.seriesIndex ?? -1;
        const name = i >= 0 && i < labels.length ? labels[i] : "";
        return [name, `${Number(val).toFixed(1)}%`];
      },
    },

    tooltip: {
      y: {
        formatter: (_val, opts) => {
          const i = opts?.seriesIndex ?? -1;
          const count = i >= 0 && i < series.length ? Number(series[i] || 0) : 0;
          const pct = sum > 0 ? (count / sum) * 100 : 0;
          return `${count} indicators (${pct.toFixed(1)}%)`;
        },
      },
    },
  };
});
</script>