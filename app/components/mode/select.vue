<template>
  <USelectMenu
    v-model="selected"
    :options="gameModes"
    value-attribute="id"
    option-attribute="name"
    placeholder="Alle Modi"
    :ui="{ wrapper: 'min-w-40' }"
  />
</template>

<script lang="ts" setup>
import type { GameMode } from '~~/server/utils/drizzle';

const selected = defineModel<number | null>({
  default: () => null,
});

const { data: gameModes } = await useFetch<GameMode[]>('/api/game-modes');
</script>

<style></style>
