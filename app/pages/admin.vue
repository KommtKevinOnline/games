<template>
  <UContainer class="mt-8">
    <div class="columns-3">
      <UCard class="break-inside-avoid">
        <template #header>
          <div class="flex justify-between">
            <h1 class="text-2xl font-bold flex items-center gap-2">
              <UIcon name="i-heroicons-user" />
              Benutzer
            </h1>
            <admin-user-modal>
              <template #activator="{ props }">
                <UButton
                  v-bind="props"
                  icon="i-heroicons-plus-circle-16-solid"
                  variant="ghost"
                  color="green"
                />
              </template>
            </admin-user-modal>
          </div>
        </template>

        <div class="flex flex-col gap-2">
          <div
            v-for="user in users"
            :key="user.twitchId"
            class="px-3 py-2 -mx-2 last:-mb-2 rounded-md flex items-center gap-3 relative"
          >
            <UAvatar
              :src="user.avatar ?? undefined"
              :alt="user.displayName"
              size="md"
            />

            <div class="text-sm flex-1">
              <div>
                <p class="text-gray-900 dark:text-white font-medium">
                  {{ user.displayName }}
                </p>
                <p class="text-gray-500 dark:text-gray-400">
                  {{ user.email }}
                </p>
              </div>
            </div>

            <UButton
              v-if="!user.godMode"
              icon="i-heroicons-x-mark"
              variant="ghost"
              color="red"
            />
          </div>
        </div>
      </UCard>
      <UCard class="break-inside-avoid">
        <template #header>
          <h1 class="text-2xl font-bold flex items-center gap-2">
            <UIcon name="i-heroicons-circle-stack-20-solid" />
            Daten und Cache
          </h1>
        </template>

        <div class="flex flex-col gap-2">
          <UButton
            icon="i-heroicons-arrow-down-on-square-stack-16-solid"
            block
            color="gray"
            :loading="loading.syncGameModes"
            @click="syncGameModes"
          >
            Sync Game Modes
          </UButton>
          <UButton icon="i-heroicons-arrow-path" block color="gray">
            Refetch Game Metadata
          </UButton>
          <UButton
            icon="i-heroicons-circle-stack-20-solid"
            block
            color="red"
            :loading="loading.clearCache"
            @click="clearCache"
          >
            Clear Cache
          </UButton>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import type { User } from '~~/server/utils/drizzle';

const { data: users } = await useFetch<User[]>('/api/users');

const toast = useToast();

const loading = reactive({
  syncGameModes: false,
  refetchGameMetadata: false,
  clearCache: false,
});

async function syncGameModes() {
  try {
    loading.syncGameModes = true;

    await $fetch('/api/game-modes/sync');

    toast.add({
      title: 'Spielmodi synchronisiert',
      description: 'Die Spielmodi wurden erfolgreich synchronisiert.',
      color: 'green',
    });
  } catch (error) {
    toast.add({
      title: 'Fehler beim Synchronisieren der Spielmodi',
      description: (error as Error).message,
      color: 'red',
    });
  } finally {
    loading.syncGameModes = false;
  }
}

async function clearCache() {
  try {
    loading.clearCache = true;

    await $fetch('/api/games/clear-cache');

    toast.add({
      title: 'Cache geleert',
      description: 'Der Cache wurde erfolgreich geleert.',
      color: 'green',
    });
  } catch (error) {
    toast.add({
      title: 'Fehler beim Cache leeren',
      description: (error as Error).message,
      color: 'red',
    });
  } finally {
    loading.clearCache = false;
  }
}
</script>

<style></style>
