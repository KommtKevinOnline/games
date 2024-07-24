<template>
  <UDropdown
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }"
  >
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        class="w-full"
        :label="user?.displayName"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      >
        <template #leading>
          <UAvatar
            :src="user?.avatar"
            :alt="`Avatar of ${user?.name}`"
            size="2xs"
          />
        </template>

        <template #trailing>
          <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5 ml-auto" />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p>Angemeldet als</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ user?.email }}
        </p>
      </div>
    </template>
  </UDropdown>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession();

async function logout() {
  clear();
  await navigateTo('/');
}

const items = computed(() => [
  [
    {
      label: 'Admin',
      icon: 'i-heroicons-shield-exclamation-solid',
      to: '/admin',
    },
    {
      label: 'Abmelden',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: () => logout(),
    },
  ],
]);
</script>
