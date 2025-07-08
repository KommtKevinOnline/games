<template>
  <UButton
    :to
    :variant="isActive ? 'solid' : 'ghost'"
    :color="isActive ? 'primary' : 'neutral'"
    :icon
  >
    <slot />
  </UButton>
</template>

<script lang="ts" setup>
const props = defineProps<{
  to: string;
  color?: string;
  icon?: string;
}>();

const route = useRoute();

const isActive = computed(() => {
  return route.path === props.to;
});
</script>

<style></style>
