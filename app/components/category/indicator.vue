<template>
  <span
    class="flex-shrink-0 w-2 h-2 mt-px rounded-full"
    :style="{ background: `#${color ?? '#6b7280'}` }"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  color: string | null;
}>();
</script>
