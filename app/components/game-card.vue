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
      <h1 class="text-2xl font-bold">
        {{ game.name }}
        <category-indicator :color="game.category.color" />
      </h1>
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
import type { Game } from '../../server/utils/drizzle';

const { loggedIn } = useUserSession();

const props = defineProps<{
  game: Game;
}>();

const emit = defineEmits(['refresh']);
</script>

<style></style>
