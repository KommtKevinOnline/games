<template>
  <div
    class="flex justify-between select-none items-center rounded-md px-2.5 py-1.5 gap-2 relative cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-800"
    aria-selected="false"
  >
    <div class="flex items-center gap-1.5 min-w-0">
      <div class="flex items-center gap-1.5 min-w-0">
        <span class="truncate">{{ label }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label?: string | number;
}>();
</script>

<style></style>
