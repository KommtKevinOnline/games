<template>
  <NuxtLoadingIndicator />

  <UMain>
    <NuxtPage />
  </UMain>

  <Footer />
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Papaplatte Games',
  description: 'Hier findest du alle Spiele die Papaplatte noch spielen will.',
});
</script>
