<template>
  <UContainer>
    <h1 class="text-4xl font-bold mt-8 text-primary">Randomizer</h1>
    <div class="my-8 flex items-start">
      <UButton to="/" icon="i-mdi-controller">Games</UButton>
    </div>
    <div class="flex flex-col gap-8 justify-center items-center">
      <div
        class="w-[60vw] overflow-x-hidden border rounded-lg p-8 frosted-glass"
      >
        <div
          class="flex gap-8 transition-transform ease-in-out"
          :style="`transform: translateX(${offset}px); transition-duration: ${duration}ms;`"
          ref="container"
        >
          <UCard
            v-for="game in games"
            :ui="{ body: { padding: '' } }"
            class="min-w-96"
          >
            <img
              :src="game.image"
              :alt="`Banner of the game '${game.name}'`"
              class="rounded-t-lg"
            />

            <template #footer>
              <h1 class="text-2xl font-bold">{{ game.name }}</h1>
            </template>
          </UCard>
        </div>
      </div>
      <div
        class="w-1 bg-orange-500 h-[320px] absolute"
        style="transform: translateY(-36px)"
      />
      <UButton @click="roll" size="lg" icon="i-mdi-dice">Roll</UButton>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

const { data } = await useAsyncData('games', () =>
  queryContent('/games').findOne()
);

const winner = ref('');
const games = ref([]);

/**
 * @description Randomizes the games and adds each game multiple times to the list.
 */
function randomizeGames() {
  if (!data.value || !data.value.body) {
    games.value = [];
    return;
  }

  const _games = data.value.body
    .map((game) => Array.from({ length: 3 }, () => game))
    .flat();

  // shuffle games
  const randomized = _games.sort(() => Math.random() - 0.5);

  // check duplicates and shuffle again
  if (randomized.some((game, index) => game === randomized[index + 1])) {
    return randomizeGames();
  }

  games.value = randomized.sort(() => Math.random() - 0.5);
}

const container = ref<HTMLElement | null>(null);
const duration = ref(3000);
const offset = ref(0);

onMounted(() => {
  randomizeGames();
});

async function roll() {
  duration.value = 0;
  offset.value = 0;

  randomizeGames();
  await new Promise((resolve) => setTimeout(resolve, 100));

  duration.value = 3000;
  const width = 384;

  offset.value = -((width + 32) * games.value.length - width * 3);

  await new Promise((resolve) => setTimeout(resolve, duration.value));

  winner.value = games.value.at(-2)?.name;
}
</script>

<style scoped>
.frosted-glass {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
