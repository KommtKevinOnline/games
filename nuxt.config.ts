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
    '@nuxtjs/color-mode',
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
    igdb: {
      apiBase: 'https://api.igdb.com/v4',
    },
  },

  nitro: {
    experimental: {
      tasks: true,
    },
    imports: {
      presets: [
        {
          from: 'h3-zod',
          imports: [
            'useValidatedQuery',
            'useValidatedBody',
            'useValidatedParams',
          ],
        },
      ],
    },
  },
});
