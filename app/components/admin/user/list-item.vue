<template>
  <div
    class="px-3 py-2 -mx-2 last:-mb-2 rounded-md flex items-center gap-3 relative"
  >
    <UAvatar
      :src="user.avatar ?? undefined"
      :alt="user.displayName"
      size="md"
    />

    <div class="text-md flex-1">
      <div>
        <p
          class="text-gray-900 dark:text-white font-medium flex items-center gap-2"
          :class="{
            '!text-blue-400': user.godMode,
          }"
        >
          <UTooltip text="Kann nicht entfernt werden" v-if="user.godMode">
            <UIcon name="i-heroicons-shield-check-solid" color="orange-400" />
          </UTooltip>
          {{ user.displayName }}
        </p>
        <!-- <p
          class="text-gray-500 dark:text-gray-400 blur-sm transition-all duration-400 cursor-pointer select-none"
          :class="{ 'blur-0': showMail }"
          @click="showMail = !showMail"
        >
          {{ user.email }}
        </p> -->
      </div>
    </div>

    <div class="flex gap-1">
      <UTooltip v-if="!user.godMode" text="Schützen">
        <UButton
          @click="emit('update')"
          :loading="loading.updateUser"
          icon="i-heroicons-shield-check-solid"
          variant="ghost"
          color="blue"
        />
      </UTooltip>

      <UTooltip v-if="!user.godMode" text="Entfernen">
        <UButton
          @click="emit('remove')"
          :loading="loading.removeUser"
          icon="i-heroicons-x-mark"
          variant="ghost"
          color="red"
        />
      </UTooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from '~~/server/utils/drizzle';

// const { user: session } = useUserSession();

const props = defineProps<{ user: User; loading: Record<string, boolean> }>();

const emit = defineEmits(['update', 'remove']);

// const showMail = ref(false);
</script>

<style></style>
