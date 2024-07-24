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
useSeoMeta({
  title: 'Papaplatte Games',
  description: 'Hier findest du alle Spiele die Papaplatte noch spielen will.',
});

useHead({
  script: [
    {
      src: 'https://analytics.niki2k1.dev/js/script.js',
      defer: true,
      'data-domain': 'games.kommtkevinonline.de',
    },
  ],
  htmlAttrs: {
    lang: 'de',
  },
});
</script>
