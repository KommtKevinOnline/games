<template>
  <UCard
    :id="game.id"
    :ui="{
      body: { padding: '' },
      footer: { base: 'flex justify-between items-center' },
    }"
  >
    <a :href="game.url ?? '#'" target="_blank">
      <img
        v-if="game.image"
        :src="game.image"
        :alt="`Banner of the game '${game.name}'`"
        class="rounded-t-lg"
      />
    </a>

    <template #footer>
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-bold">
          {{ game.name }}
        </h1>
        <div class="flex gap-1" v-if="game.modes">
          <UBadge color="gray" v-for="mode in game.modes">
            {{ mode.mode.name }}
          </UBadge>
        </div>
        <div class="flex gap-1" v-if="game.categories">
          <category-badge
            v-for="category in game.categories"
            v-bind="category.category"
          />
        </div>
      </div>
      <div>
        <game-modal :game @save="emit('refresh')">
          <template #activator="{ props }">
            <UButton
              v-if="loggedIn"
              v-bind="props"
              icon="i-heroicons-pencil-solid"
              color="orange"
              variant="ghost"
            />
          </template>
        </game-modal>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { Category, Game, GameMode } from '~~/server/utils/drizzle';

const { loggedIn } = useUserSession();

const props = defineProps<{
  game: Game & {
    categories: { gameId: string; category: Category }[];
    modes: { gameId: string; mode: GameMode }[];
  };
}>();

const emit = defineEmits(['refresh']);
</script>

<style></style>
