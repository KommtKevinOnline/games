// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxthq/studio',
  ],
  colorMode: {
    preference: 'dark',
  },
  ui: {
    icons: ['mdi', 'simple-icons'],
  },
});
