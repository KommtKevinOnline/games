<template>
  <UContainer>
    <div class="flex justify-between mt-8 flex-wrap">
      <div class="flex gap-4 items-center">
        <UInput
          v-model="filter.search"
          placeholder="Suche"
          icon="i-mdi-magnify"
        />
        <UCheckbox v-model="filter.played" label="Gespielte anzeigen" />
      </div>
      <div class="flex gap-2 mt-2 lg:mt-0">
        <mode-select v-model="filter.mode" />
        <!-- <category-select v-model="filter.categories" /> -->
        <search @result="addGame" @created="onCreated" v-if="loggedIn" />
      </div>
    </div>
    <div class="mt-4 mb-6">
      <category-badges v-model="filter.categories" />
    </div>
    <div class="mt-2">
      <Tabs v-model:tab="filter.released" />
    </div>
    <UProgress
      class="space-y-2"
      v-if="status === 'pending'"
      animation="carousel"
      color="primary"
    />
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8 mt-4"
      v-else-if="games.length > 0"
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
    <div v-if="error" class="text-red-500">
      {{ error }}
    </div>
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
  released: boolean;
}>({
  search: '',
  mode: -1,
  categories: [],
  played: false,
  released: true,
});

const {
  data: games,
  status,
  refresh,
  error,
} = await useFetch<(Game & { category: Category })[]>('/api/games', {
  query: filter,
  dedupe: 'cancel',
  default: () => [],
});

function onCreated() {
  refresh();
  scrollToBottom();
}

function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
}

async function addGame(game: string) {
  const gameData = await $fetch('/api/games/import', {
    query: {
      value: game,
    },
  });

  await refresh();

  toast.add({
    title: 'Das Spiel wurde erfolgreich hinzugefügt.',
    color: 'green',
  });

  if (gameData?.released === false) {
    filter.value.released = false;
  }

  scrollToBottom();
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
