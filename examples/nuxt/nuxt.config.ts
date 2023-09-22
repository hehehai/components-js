// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_LK_TOKEN_ENDPOINT: process.env.NUXT_PUBLIC_LK_TOKEN_ENDPOINT,
    },
  }
})
