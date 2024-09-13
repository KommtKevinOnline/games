<template>
  <USelectMenu
    v-model="selected"
    :options="gameModes"
    value-attribute="id"
    option-attribute="name"
    icon="i-heroicons-user-group-16-solid"
    placeholder="Modus auswählen"
    :ui="{ wrapper: 'min-w-48' }"
    :multiple
  />
</template>

<script lang="ts" setup>
import type { GameMode } from '~~/server/utils/drizzle';

const props = defineProps<{
  multiple?: boolean;
}>();

const selected = defineModel<number | number[]>({
  default: () => null,
});

const { data: gameModes } = await useFetch<GameMode[]>('/api/game-modes', {
  transform: (modes) => {
    if (props.multiple) return modes;

    return [{ id: -1, name: 'Alle Modi', slug: 'all_modes' }, ...modes];
  },
});
</script>

<style></style>
