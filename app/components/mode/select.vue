<template>
  <USelectMenu
    v-model="selected"
    :options="gameModes"
    value-attribute="id"
    option-attribute="name"
    placeholder="Modus auswählen"
    :ui="{ wrapper: 'min-w-40' }"
  />
</template>

<script lang="ts" setup>
import type { GameMode } from '~~/server/utils/drizzle';

const selected = defineModel<number>({
  default: () => null,
});

const { data: gameModes } = await useFetch<GameMode[]>('/api/game-modes', {
  transform: (modes) => {
    return [{ id: -1, name: 'Alle Modi', slug: 'all_modes' }, ...modes];
  },
});
</script>

<style></style>
