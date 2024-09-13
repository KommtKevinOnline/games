<template>
  <div class="flex flex-wrap gap-2">
    <UBadge
      v-for="category in categories"
      :key="category.id"
      class="cursor-pointer custom-badge"
      :class="[
        `category-${category.id}`,
        selectedCategories.includes(category.id) ? 'selected' : '',
      ]"
      variant="soft"
      :ui="{
        rounded: 'rounded-full',
      }"
      :style="getBadgeStyle(category)"
      @click="toggleCategory(category.id)"
    >
      {{ category.name }}
    </UBadge>
  </div>
</template>

<script lang="ts" setup>
const selectedCategories = defineModel<number[]>({
  default: () => [],
});

const { data: categories } = await useFetch('/api/categories', {
  default: () => [],
});

const toggleCategory = (categoryId: number) => {
  if (selectedCategories.value.includes(categoryId)) {
    selectedCategories.value = [];
  } else {
    selectedCategories.value = [categoryId];
  }
};

const getBadgeStyle = (category: Category) => {
  return {
    '--badge-color': category.color,
  };
};
</script>

<style scoped>
.custom-badge {
  background-color: var(--badge-color);
  color: var(--badge-color);
}

.custom-badge.selected {
  background-color: var(--badge-color);
  color: white;
}

.custom-badge:not(.selected) {
  background-color: color-mix(in srgb, var(--badge-color) 10%, transparent);
  color: var(--badge-color);
}
</style>
