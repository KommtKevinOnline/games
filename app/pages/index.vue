<template>
  <UContainer>
    <div class="my-8 grid grid-cols-12 gap-2">
      <div class="col-span-12 md:col-span-4 flex items-center gap-4">
        <UInput
          v-model="filter.search"
          placeholder="Suche"
          icon="i-mdi-magnify"
        />
        <UCheckbox v-model="filter.played" label="Gespielte anzeigen" />
      </div>
      <div
        class="col-span-0 md:col-span-2"
        :class="{ 'md:col-span-5': !loggedIn }"
      ></div>
      <div class="grid grid-cols-2 gap-2 col-span-12 md:col-span-4">
        <mode-select v-model="filter.mode" />
        <category-select v-model="filter.categories" />
      </div>
      <div v-if="loggedIn" class="flex gap-2 col-span-12 md:col-span-2">
        <search @result="addGame" />
      </div>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8"
      v-if="games.length > 0"
    >
      <TransitionGroup name="games-list">
        <game-card
          v-for="game in games"
          :key="game.id"
          :game="game"
          @refresh="refresh"
        />
      </TransitionGroup>
    </div>
    <empty-state v-else>Keine Spiele gefunden.</empty-state>
  </UContainer>
</template>

<script lang="ts" setup>
import type { Category } from '~~/server/utils/drizzle';

const { loggedIn } = useUserSession();
const toast = useToast();

const filter = ref<{
  search: string;
  mode: number | null;
  categories: number[];
  played: boolean;
}>({
  search: '',
  mode: -1,
  categories: [],
  played: true,
});

const { data: games, refresh } = await useFetch<
  (Game & { category: Category })[]
>('/api/games', {
  query: filter,
  watch: [filter],
  default: () => [],
});

async function addGame(gameId: string) {
  const id = await $fetch('/api/games/import', {
    query: {
      id: gameId,
    },
  });

  await refresh();

  toast.add({
    title: 'Das Spiel wurde erfolgreich hinzugefügt.',
    color: 'green',
  });

  const elem = document.getElementById(id.toString());
  elem?.scrollIntoView({ behavior: 'smooth' });
}
</script>

<style>
.games-list-enter-active,
.games-list-leave-active {
  transition: opacity 0.3s ease;
}

.games-list-enter-from,
.games-list-leave-to {
  opacity: 0;
}
</style>
