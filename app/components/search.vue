<template>
  <div class="w-full">
    <UButton icon="i-mdi-plus" @click="open = true" block>
      Spiel hinzufügen
    </UButton>

    <UModal
      v-model="open"
      @update:model-value="(open) => (!open ? reset() : undefined)"
    >
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Spiel hinzufügen
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="close"
            />
          </div>
        </template>

        <!-- <UFormGroup label="Steam Url" required>
          <UInput
            v-model="steamUrl"
            @update:model-value="debouncedSteamUrl"
            icon="i-heroicons-link-solid"
            placeholder="https://store.steampowered.com/app/1234567/Game_Name/"
          />
        </UFormGroup>

        <UDivider class="my-4" label="oder" /> -->

        <UInput
          v-model="search"
          @update:model-value="debouncedRefresh"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Suche"
          autofocus
        />

        <UProgress
          v-if="status === 'pending'"
          class="my-2"
          animation="carousel"
          size="sm"
        />

        <div
          v-if="games.length > 0"
          class="mt-2 rounded-md max-h-60 overflow-y-scroll"
        >
          <list
            :items="games"
            item-label="name"
            item-value="game"
            @select="(id) => onSelected(id)"
          />
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { Game } from '~~/server/utils/drizzle';

const open = defineModel<boolean>('open', { default: () => false });

const emit = defineEmits(['result']);

const search = ref('');
// const steamUrl = ref('');

const {
  data: games,
  refresh,
  status,
} = useFetch<Game[]>('/api/games/search', {
  query: { query: search },
  watch: false,
  immediate: false,
  default: () => [],
  transform: (games) =>
    games.sort((a, b) => (a.name === search.value ? -1 : 1)),
});

// const debouncedSteamUrl = useDebounceFn(() => onSelected(steamUrl.value), 500);

const debouncedRefresh = useDebounceFn(refresh, 500);

function reset() {
  search.value = '';
  // steamUrl.value = '';
  refresh();
}

function close() {
  open.value = false;
  reset();
}

function onSelected(id: string) {
  emit('result', id);
  close();
}
</script>

<style></style>
