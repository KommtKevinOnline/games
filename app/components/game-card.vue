<template>
  <UCard
    :id="game.id"
    :ui="{
      body: 'p-0 sm:p-0',
      footer: 'flex justify-between items-center',
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
        <slot name="modes">
          <div class="flex gap-1" v-if="game.modes && !clean">
            <UBadge
              color="neutral"
              v-for="mode in game.modes"
              size="sm"
              variant="subtle"
            >
              {{ mode.mode.name }}
            </UBadge>
          </div>
        </slot>
        <h1 class="text-2xl font-bold flex items-center gap-2 truncate">
          {{ game.name }}
          <UIcon
            v-if="game.played"
            name="i-mdi-check-circle"
            class="text-green-500"
          />
        </h1>
        <p
          v-if="!clean"
          class="text-md text-neutral-500 dark:text-neutral-300 mb-1"
        >
          {{ game.comment }}
        </p>
        <slot name="categories">
          <div class="flex gap-1" v-if="game.categories && !clean">
            <category-badge
              v-for="category in game.categories"
              v-bind="category.category"
            />
          </div>
        </slot>
      </div>
      <div>
        <slot name="action">
          <game-modal :game @save="emit('refresh')">
            <template #activator="{ props }">
              <UButton
                v-if="loggedIn && !readonly"
                v-bind="props"
                icon="i-lucide-pencil"
                color="warning"
                variant="ghost"
              />
            </template>
          </game-modal>
        </slot>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { Category, Game, GameMode } from '~~/server/utils/drizzle';

const { loggedIn } = useUserSession();

const props = withDefaults(
  defineProps<{
    game: Game & {
      categories: { gameId: string; category: Category }[];
      modes: { gameId: string; mode: GameMode }[];
    };
    readonly?: boolean;
    clean?: boolean;
  }>(),
  {
    readonly: false,
    clean: false,
  },
);

const emit = defineEmits(['refresh']);

const imageError = ref(false);

const handleImageError = () => {
  imageError.value = true;
};
</script>

<style></style>
