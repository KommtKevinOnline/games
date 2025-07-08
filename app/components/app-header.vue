<template>
  <UHeader toggle-side="left">
    <template #left>
      <h1 class="text-primary">{{ config.public.name }}</h1>
    </template>

    <UNavigationMenu :items="links" />

    <template #right>
      <div>
        <auth-twitch-login-button />
      </div>
    </template>

    <template #body>
      <UNavigationMenu :items="links" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const { loggedIn } = useUserSession();

const config = useRuntimeConfig();

const links = [
  { to: '/', label: 'Games', icon: 'i-mdi-controller' },
  {
    to: '/categories',
    label: 'Kategorien',
    icon: 'i-mdi-tag',
    class: loggedIn.value ? '' : 'hidden',
  },
] satisfies NavigationMenuItem[];
</script>
