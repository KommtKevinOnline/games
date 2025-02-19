<template>
  <UHeader :links>
    <template #logo>
      <h1 class="text-primary">{{ config.public.name }}</h1>
      <!-- <UBadge label="SaaS" variant="subtle" class="mb-0.5" /> -->
    </template>

    <template #center>
      <div class="hidden lg:block">
        <HeaderBtn v-for="link in links" v-bind="link">
          {{ link.label }}
        </HeaderBtn>
      </div>
    </template>

    <template #right>
      <auth-twitch-login-button />
    </template>

    <template #panel>
      <UAsideLinks :links="links" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const { loggedIn } = useUserSession();

const config = useRuntimeConfig();

const links = [
  { to: '/', label: 'Games', icon: 'i-mdi-controller' },
  { to: '/randomizer', label: 'Randomizer', icon: 'i-mdi-dice' },
  {
    to: '/categories',
    label: 'Kategorien',
    icon: 'i-mdi-tag',
    class: loggedIn.value ? '' : 'hidden',
  },
];
</script>
