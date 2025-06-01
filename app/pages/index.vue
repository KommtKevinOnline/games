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
    <div class="mt-4 mb-8">
      <category-badges v-model="filter.categories" />
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
  played: false,
});

const { data: games, refresh } = await useFetch<
  (Game & { category: Category })[]
>('/api/games', {
  query: filter,
  watch: [filter],
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
  const id = await $fetch('/api/games/import', {
    query: {
      value: game,
    },
  });

  await refresh();

  toast.add({
    title: 'Das Spiel wurde erfolgreich hinzugefügt.',
    color: 'green',
  });

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
