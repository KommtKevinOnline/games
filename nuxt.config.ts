// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  compatibilityDate: '2024-07-07',

  modules: [
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    'nuxt-auth-utils',
    '@nuxt/image',
    '@vueuse/nuxt',
  ],

  css: [
    '~/assets/css/main.css',
    'vue-virtual-scroller/dist/vue-virtual-scroller.css',
  ],

  colorMode: {
    preference: 'dark',
  },

  routeRules: {
    '/categories': {
      ssr: false,
    },
  },

  runtimeConfig: {
    origin: 'http://localhost:3000',
    public: {
      name: 'Papaplatte Games',
      description:
        'Hier findest du alle Spiele die Papaplatte noch spielen will.',
      favicon: '/papaplatte.ico',
      showThanks: 'true',
    },
    oauth: {
      twitch: {
        clientId: undefined,
        clientSecret: undefined,
      },
    },
    igdb: {
      apiBase: 'https://api.igdb.com/v4',
    },
    twitch: {
      mails: process.env.NUXT_TWITCH_MAILS,
      userId: 50985620,
    },
    db: {
      path: 'games.db',
    },
    pubsub: {
      secret: 'local-secret',
    },
  },

  nitro: {
    experimental: {
      tasks: true,
    },
    imports: {
      dirs: ['server/utils'],
      presets: [
        {
          from: 'h3-zod',
          imports: [
            'useValidatedQuery',
            'useValidatedBody',
            'useValidatedParams',
          ],
        },
        {
          from: 'consola',
          imports: ['consola'],
        },
      ],
    },
  },
});
