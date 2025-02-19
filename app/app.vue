<template>
  <NuxtLoadingIndicator />

  <UMain>
    <AppHeader />

    <NuxtPage />
  </UMain>

  <Footer />
  <UNotifications />
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

useSeoMeta({
  title: config.public.name,
  description: config.public.description,
});

useHead({
  script: [
    {
      src: 'https://analytics.niki2k1.dev/js/script.js',
      defer: true,
      'data-domain': 'games.kommtkevinonline.de',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: config.public.favicon ?? '/favicon.ico',
    },
  ],
  htmlAttrs: {
    lang: 'de',
  },
});
</script>
