// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "usebootstrap", '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  // css: [
  //   'bootstrap/dist/css/bootstrap.min.css'
  // ]

  runtimeConfig: {
    public: {
     apiUrl: process.env.API_BASE_URL || 'http://localhost:8000', // Default value if .env is not set
      },
  }

  
})