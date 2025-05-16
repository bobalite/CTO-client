// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL,
    }
  },

  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'vue3-carousel-nuxt',
    "@nuxt/image",

  ],

 
})