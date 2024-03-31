<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links" />
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }} Niklas Lausch. Alle Rechte
        vorbehalten.
      </p>
    </template>

    <template #right>
      <UColorModeButton size="sm" />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
const links = [
  {
    label: 'Noch mehr von mir',
    children: [
      {
        label: 'KommtKevinOnline',
        to: 'https://kommtkevinonline.de',
      },
      {
        label: 'Domos 2023 Voting und Website',
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
      {
        label: 'Kontakt',
        to: 'mailto:info@niki2k1.dev',
      },
    ],
  },
];

const toast = useToast();

const email = ref('');
const loading = ref(false);

function onSubmit() {
  loading.value = true;

  setTimeout(() => {
    toast.add({
      title: 'Subscribed!',
      description: "You've been subscribed to our newsletter.",
    });

    loading.value = false;
  }, 1000);
}
</script>
