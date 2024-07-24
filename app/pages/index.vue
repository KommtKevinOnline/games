<template>
  <UContainer>
    <div class="my-8 flex justify-between items-start">
      <UInput
        v-model="filter.search"
        placeholder="Suche"
        icon="i-mdi-magnify"
      />
      <div class="flex gap-2">
        <category-select v-model="filter.category" />
        <search v-if="loggedIn" @result="addGame" />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
      <game-card
        v-for="game in games"
        :key="game.id"
        :game="game"
        @refresh="refresh"
      />
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import type { Category } from '~~/server/utils/drizzle';

const { loggedIn } = useUserSession();
const toast = useToast();

const filter = ref<{
  search: string;
  category: Category | null;
}>({
  search: '',
  category: null,
});

const { data: games, refresh } = await useFetch('/api/games', {
  query: filter,
  watch: [filter],
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
