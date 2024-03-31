<template>
  <UContainer>
    <h1 class="text-4xl font-bold my-8 text-primary">Papaplatte Games</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
      <a v-for="game in data?.body" :href="game.url" target="_blank">
        <UCard :ui="{ body: { padding: '' } }">
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

<style></style>
