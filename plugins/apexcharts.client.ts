import VueApexCharts from "vue3-apexcharts";

export default defineNuxtPlugin((nuxtApp) => {
  // Register as a global component (no plugin typing drama)
  nuxtApp.vueApp.component("apexchart", VueApexCharts);
});
