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
      <div class="flex items-center gap-2">
        <h1 class="text-2xl font-bold">
          {{ game.name }}
        </h1>
        <category-badge v-if="game.category" v-bind="game.category" />
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
import type { Category, Game } from '~~/server/utils/drizzle';

const { loggedIn } = useUserSession();

const props = defineProps<{
  game: Game & { category: Category };
}>();

const emit = defineEmits(['refresh']);
</script>

<style></style>
