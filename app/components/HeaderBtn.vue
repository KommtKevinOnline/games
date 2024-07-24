<template>
  <UButton
    :ui="{ variant: { link: '!no-underline hover:text-primary' } }"
    :to
    :variant="isActive ? 'solid' : 'link'"
    :color="isActive ? 'primary' : 'white'"
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
