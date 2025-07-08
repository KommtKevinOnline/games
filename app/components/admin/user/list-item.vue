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
          class="text-neutral-900 dark:text-white font-medium flex items-center gap-2"
          :class="{
            '!text-blue-400': user.godMode,
          }"
        >
          <UTooltip text="Kann nicht entfernt werden" v-if="user.godMode">
            <UIcon name="i-lucide-shield-check" color="warning" />
          </UTooltip>
          {{ user.displayName }}
        </p>
      </div>
    </div>

    <div class="flex gap-1">
      <UTooltip v-if="!user.godMode" text="Schützen">
        <UButton
          @click="emit('update')"
          :loading="loading.updateUser"
          icon="i-lucide-shield-check"
          variant="ghost"
          color="info"
        />
      </UTooltip>

      <UTooltip v-if="!user.godMode" text="Entfernen">
        <UButton
          @click="emit('remove')"
          :loading="loading.removeUser"
          icon="i-lucide-x"
          variant="ghost"
          color="error"
        />
      </UTooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from '~~/server/utils/drizzle';

const props = defineProps<{ user: User; loading: Record<string, boolean> }>();

const emit = defineEmits(['update', 'remove']);
</script>

<style></style>
