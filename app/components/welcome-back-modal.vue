<template>
  <UModal
    v-model:open="open"
    :ui="{
      content: 'max-w-7xl',
      footer: 'justify-end',
      header: 'hidden',
    }"
  >
    <template #body>
      <div class="flex flex-col gap-8">
        <div class="flex items-center justify-center gap-6">
          <img
            class="relative bottom-8"
            src="https://cdn.7tv.app/emote/01F72V2NF0000FRPBRWS3CZZ9S/4x.avif"
          />
          <div class="flex flex-col items-center justify-center">
            <h1 class="text-3xl uppercase font-black">Willkommen zurück!!</h1>
            <p class="text-xl text-muted">
              Neue Releases während du weg warst.
            </p>
          </div>
          <img
            class="relative bottom-8"
            src="https://cdn.7tv.app/emote/01F72V2NF0000FRPBRWS3CZZ9S/4x.avif"
          />
        </div>
        <div class="flex items-center justify-center">
          <GameCard
            v-if="highlighted"
            class="border-2 border-primary w-96"
            :game="highlighted"
            readonly
            clean
          >
            <template #action>
              <UButton
                class="ml-2"
                icon="i-simple-icons-steam"
                color="neutral"
                variant="subtle"
                to="https://youtu.be/d1YBv2mWll0"
              >
                Steam
              </UButton>
            </template>
          </GameCard>
        </div>
        <div class="grid lg:grid-cols-4 gap-4">
          <GameCard
            v-for="game in others"
            :key="game.id"
            :game="game"
            readonly
            clean
          />
        </div>
      </div>
    </template>

    <template #footer>
      <UButton @click="open = false">Schließen</UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const hasSeen = useCookie<boolean>('games.hasSeen');

watch(hasSeen, (newVal) => {
  if (newVal === false) {
    open.value = true;
  }
});

const open = ref(!hasSeen.value);

watch(open, (newVal) => {
  if (newVal === false) {
    hasSeen.value = true;
  }
});

const { data: games } = useFetch('/api/games', {
  query: {
    categories: [15],
  },
});

const highlighted = computed(() =>
  games.value?.find((game) => game.name === '30 Days on Ship'),
);

const others = computed(() =>
  games.value?.filter((game) => game.id !== highlighted.value?.id),
);
</script>
