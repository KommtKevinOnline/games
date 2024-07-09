<template>
  <UCard :ui="{ body: { padding: '' } }" class="min-w-52 lg:min-w-96">
    <img
      v-if="game.image"
      :src="game.image"
      :alt="`Banner of the game '${game.name}'`"
      class="rounded-t-lg"
    />

    <template #footer>
      <h1 class="text-lg lg:text-2xl font-bold">{{ game.name }}</h1>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { Game } from '~~/server/utils/drizzle';

const props = defineProps<{
  game: Game;
}>();
</script>

<style></style>
