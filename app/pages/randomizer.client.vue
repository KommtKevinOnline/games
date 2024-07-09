<template>
  <UContainer>
    <h1 class="text-4xl font-bold mt-8 text-primary">Randomizer</h1>
    <div class="my-8 flex items-start">
      <UButton to="/" icon="i-mdi-controller">Games</UButton>
    </div>
    <div class="flex flex-col gap-8 justify-center items-center">
      <div
        ref="divider"
        class="w-1 bg-orange-500 absolute h-56 lg:h-[20rem] -translate-y-9 z-10"
      />
      <div
        class="w-[95vw] lg:w-[60vw] h-60 lg:h-[22rem] overflow-hidden border rounded-lg p-8 frosted-glass"
      >
        <div
          class="flex gap-8 transition-transform"
          :style="`transform: translateX(${offset}px); transition-duration: ${duration}ms; transition-timing-function: cubic-bezier(.08,.6,0,1)`"
          ref="gamesContainer"
        >
          <randomizer-game-card v-for="game in games" :game="game" />
        </div>
      </div>
      <UButton @click="roll" size="lg" icon="i-mdi-dice">Roll</UButton>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

const { data } = await useFetch('/api/games');

const winner = ref('');
const games = ref([]);

/**
 * @description Randomizes the games and adds each game multiple times to the list.
 */
function randomizeGames() {
  if (!data.value) {
    games.value = [];
    return;
  }

  const _games = data.value
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

const gamesContainer = ref<HTMLElement | null>(null);
const divider = ref<HTMLElement | null>(null);
const duration = ref(8000);
const offset = ref(0);

onMounted(() => {
  randomizeGames();
});

async function roll() {
  duration.value = 0;
  offset.value = 0;

  randomizeGames();
  await new Promise((resolve) => setTimeout(resolve, 100));

  duration.value = 8000;
  const gap = 32;
  const width = gamesContainer.value?.firstElementChild?.clientWidth ?? 0;

  offset.value =
    -((width + gap) * (games.value.length - 3)) +
    Math.floor(Math.random() * (width - 0 + 1) + 0);

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
