<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links">
        <template #left>
          <Badge
            v-if="config.public.showThanks === 'true'"
            class="size-36 fill-gray-900 dark:fill-white"
          />
        </template>
      </UFooterColumns>
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }} Niklas Lausch. Alle Rechte
        vorbehalten.
      </p>
    </template>

    <template #center>
      <UColorModeButton size="sm" />
    </template>

    <template #right>
      <UButton
        icon="i-simple-icons-x"
        color="gray"
        variant="ghost"
        to="https://x.com/niki2k1"
        target="_blank"
      />
      <UButton
        icon="i-simple-icons-instagram"
        color="gray"
        variant="ghost"
        to="https://instagram.com/niki2k1"
        target="_blank"
      />
      <UButton
        icon="i-simple-icons-github"
        color="gray"
        variant="ghost"
        to="https://github.com/Niki2k1"
        target="_blank"
      />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
const links = [
  {
    label: 'Noch mehr von @niki2k1',
    children: [
      {
        label: 'Niki2k1.dev',
        to: 'https://niki2k1.dev',
        target: '_blank',
      },
      {
        label: 'KommtKevinOnline',
        to: 'https://kommtkevinonline.de',
        target: '_blank',
      },
      {
        label: 'Domos 2023 Voting und Website',
        to: 'https://domos.live',
        target: '_blank',
      },
    ],
  },
  {
    label: 'Technologien',
    children: [
      {
        label: 'Nuxt 💚',
        to: 'https://nuxt.com',
        target: '_blank',
      },
      {
        label: 'IGDB 🎮',
        to: 'https://igdb.com',
        target: '_blank',
      },
      {
        label: 'Drizzle 🌧️',
        to: 'https://orm.drizzle.team/',
        target: '_blank',
      },
    ],
  },
  {
    label: 'Rechtliches',
    children: [
      {
        label: 'Impressum',
        to: 'https://kommtkevinonline.de/impressum',
      },
    ],
  },
];

const config = useRuntimeConfig();
</script>
