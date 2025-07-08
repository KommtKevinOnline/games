<template>
  <UDropdownMenu :items="items">
    <template #default="{ open }">
      <UButton
        color="neutral"
        variant="ghost"
        class="w-full"
        :label="user?.displayName"
        :class="[open && 'bg-neutral-50 dark:bg-neutral-800']"
      >
        <template #leading>
          <UAvatar
            :src="user?.avatar"
            :alt="`Avatar of ${user?.name}`"
            size="2xs"
          />
        </template>

        <template #trailing>
          <UIcon name="i-lucide-ellipsis-vertical" class="w-5 h-5 ml-auto" />
        </template>
      </UButton>
    </template>
  </UDropdownMenu>
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
      icon: 'i-lucide-shield-alert',
      to: '/admin',
    },
    {
      label: 'Abmelden',
      icon: 'i-lucide-log-out',
      click: () => logout(),
    },
  ],
]);
</script>
