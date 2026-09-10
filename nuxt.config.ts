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
      apiBaseURL: 'http://localhost:8000/api',
      backendUrl: 'http://localhost:8000',
      googleLoginUrl: 'http://localhost:8000/auth/google/redirect',
      facebookLoginUrl: 'http://localhost:8000/auth/facebook/redirect',
    },
  },

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt', // ✅ NEW official module
    '@nuxt/image',
  ],
})
