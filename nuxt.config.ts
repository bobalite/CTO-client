export default defineNuxtConfig({
  compatibilityDate: '2025-12-01',
    experimental: {
    appManifest: false,
  },
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  plugins: ['~/plugins/inactivity.client.js'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL,
    },
  },

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt', // ✅ NEW official module
    'vue3-carousel-nuxt',
    '@nuxt/image',
  ],
})