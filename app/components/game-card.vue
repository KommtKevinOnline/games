<template>
  <UCard
    :id="game.id"
    :ui="{
      body: { padding: '' },
      footer: { base: 'flex justify-between items-center' },
    }"
  >
    <a :href="game.url ?? '#'" target="_blank">
      <nuxt-img
        v-if="game.image && !imageError"
        :src="game.image"
        :alt="`Banner of the game '${game.name}'`"
        class="rounded-t-lg w-full object-cover h-44"
        :class="{ grayscale: game.played }"
        @error="handleImageError"
        loading="lazy"
      />
      <img
        v-else
        src="/no-image.png"
        alt="No image"
        class="rounded-t-lg w-full object-cover h-44"
        loading="lazy"
      />
    </a>

    <template #footer>
      <div class="flex flex-col gap-1">
        <div class="flex gap-1" v-if="game.modes">
          <UBadge color="gray" v-for="mode in game.modes" size="xs">
            {{ mode.mode.name }}
          </UBadge>
        </div>
        <h1 class="text-2xl font-bold flex items-center gap-2">
          {{ game.name }}
          <UIcon
            v-if="game.played"
            name="i-mdi-check-circle"
            class="text-green-500"
          />
        </h1>
        <p class="text-md text-gray-500 dark:text-gray-300 mb-1">
          {{ game.comment }}
        </p>
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

const imageError = ref(false);

const handleImageError = () => {
  imageError.value = true;
};
</script>

<style></style>
