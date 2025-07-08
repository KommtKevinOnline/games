<template>
  <UContainer class="mt-8">
    <div class="columns-3">
      <UCard class="break-inside-avoid">
        <template #header>
          <div class="flex justify-between">
            <h1 class="text-2xl font-bold flex items-center gap-2">
              <UIcon name="i-lucide-user" />
              Benutzer
            </h1>
            <admin-user-modal @save="refresh">
              <template #activator="{ props }">
                <UButton
                  v-bind="props"
                  icon="i-lucide-circle-plus"
                  variant="ghost"
                  color="success"
                />
              </template>
            </admin-user-modal>
          </div>
        </template>

        <div class="flex flex-col gap-2">
          <admin-user-list-item
            v-for="user in users"
            :key="user.twitchId"
            :user
            :loading
            @update="update(user.twitchId, { godMode: true })"
            @remove="remove(user.twitchId)"
          />
        </div>
      </UCard>
      <UCard class="break-inside-avoid">
        <template #header>
          <h1 class="text-2xl font-bold flex items-center gap-2">
            <UIcon name="i-lucide-database" />
            Daten und Cache
          </h1>
        </template>

        <div class="flex flex-col gap-2">
          <UButton
            icon="i-lucide-database"
            block
            color="warning"
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

const { user: session } = useUserSession();

const { data: users, refresh } = await useFetch<User[]>('/api/users');

const toast = useToast();

const loading = reactive({
  syncGameModes: false,
  refetchGameMetadata: false,
  clearCache: false,
  updateUser: false,
  removeUser: false,
});

async function remove(id: string) {
  try {
    loading.removeUser = true;

    await $fetch(`/api/users/remove`, {
      method: 'POST',
      query: {
        id,
      },
    });

    toast.add({
      title: 'Benutzer erfolgreich entfernt',
      color: 'success',
      icon: 'i-lucide-circle-check',
    });

    refresh();
  } catch (error) {
    toast.add({
      title: 'Fehler beim entfernen des Benutzers',
      description: (error as Error).message,
      color: 'error',
      icon: 'i-lucide-circle-x',
    });
  } finally {
    loading.removeUser = false;
  }
}

async function update(id: string, data: { godMode: boolean }) {
  try {
    loading.updateUser = true;

    await $fetch('/api/users/update', {
      method: 'POST',
      body: {
        twitchId: id,
        ...data,
      },
    });

    toast.add({
      title: 'Benutzer erfolgreich aktualisiert',
      color: 'success',
      icon: 'i-lucide-circle-check',
    });

    refresh();
  } catch (error) {
    toast.add({
      title: 'Fehler beim aktualisieren der Benutzer',
      description: (error as Error).message,
      color: 'error',
      icon: 'i-lucide-circle-x',
    });
  } finally {
    loading.updateUser = false;
  }
}

async function clearCache() {
  try {
    loading.clearCache = true;

    await $fetch('/api/games/clear-cache');

    toast.add({
      title: 'Cache geleert',
      description: 'Der Cache wurde erfolgreich geleert.',
      color: 'success',
    });
  } catch (error) {
    toast.add({
      title: 'Fehler beim Cache leeren',
      description: (error as Error).message,
      color: 'error',
    });
  } finally {
    loading.clearCache = false;
  }
}
</script>

<style></style>
