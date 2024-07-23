<template>
  <UContainer>
    <div class="my-8 flex justify-between items-start">
      <div class="flex gap-4">
        <UButton to="/randomizer" icon="i-mdi-dice">Randomizer</UButton>
      </div>
      <search v-if="loggedIn" @result="addGame" />
    </div>
    <div class="my-8 flex justify-between items-start">
      <UInput
        v-model="filter.search"
        placeholder="Suche"
        icon="i-mdi-magnify"
      />
      <USelect></USelect>
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
const { loggedIn } = useUserSession();
const toast = useToast();

const filter = ref({
  search: '',
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
