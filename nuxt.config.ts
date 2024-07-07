// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-07-07',

  extends: ['@nuxt/ui-pro'],

  hub: {
    database: true,
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxthq/studio',
    '@nuxthub/core',
    'nuxt-auth-utils',
    '@nuxt/image',
  ],

  colorMode: {
    preference: 'dark',
  },

  ui: {
    icons: ['mdi', 'simple-icons'],
  },

  runtimeConfig: {
    oauth: {
      twitch: {
        clientId: undefined,
        clientSecret: undefined,
      },
    },
  },
});
