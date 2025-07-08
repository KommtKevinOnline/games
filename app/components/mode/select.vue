<template>
  <USelect
    v-model="selected"
    :items="gameModes"
    value-key="id"
    label-key="name"
    icon="i-lucide-users"
    placeholder="Modus auswählen"
    class="min-w-48"
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
