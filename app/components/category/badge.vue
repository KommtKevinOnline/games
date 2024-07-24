<template>
  <span
    class="inline-flex rounded-md items-center font-medium text-white text-xs px-2 py-1"
    :style="{ 'background-color': color }"
  >
    <slot>
      {{ name }}
    </slot>
  </span>
</template>

<script lang="ts" setup>
defineProps<{
  color?: string;
  name: string;
}>();
</script>

<style></style>
