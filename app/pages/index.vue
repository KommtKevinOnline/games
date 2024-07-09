<template>
  <UContainer>
    <div class="flex justify-between items-center mt-8">
      <h1 class="text-4xl font-bold text-primary">Papaplatte Games</h1>
      <auth-twitch-login-button />
    </div>
    <div class="my-8 flex justify-between items-start">
      <UButton to="/randomizer" icon="i-mdi-dice">Randomizer</UButton>
      <search v-if="loggedIn" @result="addGame" />
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

const { data: games, refresh } = await useFetch('/api/games');

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
