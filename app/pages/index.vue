<template>
  <UContainer>
    <div class="flex justify-between items-center mt-8">
      <h1 class="text-4xl font-bold text-primary">Papaplatte Games</h1>
      <auth-twitch-login-button />
    </div>
    <div class="my-8 flex items-start">
      <UButton to="/randomizer" icon="i-mdi-dice">Randomizer</UButton>
      <UBadge
        color="red"
        class="-translate-x-2 -translate-y-2"
        :ui="{ rounded: 'rounded-full' }"
      >
        Neu
      </UBadge>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
      <a v-for="game in data?.body" :href="game?.url" target="_blank">
        <UCard v-if="game" :ui="{ body: { padding: '' } }">
          <img
            :src="game.image"
            :alt="`Banner of the game '${game.name}'`"
            class="rounded-t-lg"
          />

          <template #footer>
            <h1 class="text-2xl font-bold">{{ game.name }}</h1>
          </template>
        </UCard>
      </a>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
const { data } = await useAsyncData('games', () =>
  queryContent('/games').findOne()
);
</script>
