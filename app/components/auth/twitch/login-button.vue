<template>
  <auth-twitch-user-dropdown v-if="loggedIn" />
  <a href="/api/auth/twitch" v-else>
    <UButton icon="i-mdi-twitch">Login mit Twitch</UButton>
  </a>
</template>

<script setup lang="ts">
const { loggedIn } = useUserSession();
</script>
