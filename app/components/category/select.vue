<template>
  <USelectMenu
    :model-value="selectedCategory"
    @update:model-value="(category: Category) => (modelValue = category.id ?? -1)"
    :options="categories"
    :ui="{ wrapper: 'min-w-40' }"
  >
    <template #label>
      <template v-if="modelValue && selectedCategory">
        <span class="flex items-center -space-x-1">
          <CategoryIndicator :color="selectedCategory.color" />
        </span>
        <span>
          {{ selectedCategory.name }}
        </span>
      </template>
      <template v-else>
        <span class="text-gray-500 dark:text-gray-400 truncate">
          Kategorie auswählen
        </span>
      </template>
    </template>
    <template #option="{ option: category }">
      <span class="flex items-center -space-x-1">
        <CategoryIndicator :color="category.color" />
      </span>
      <span>
        {{ category.name }}
      </span>
    </template>
  </USelectMenu>
</template>

<script lang="ts" setup>
import type { Category } from '~~/server/utils/drizzle';

const modelValue = defineModel<number>({
  default: () => -1,
});

const { data: categories } = await useFetch('/api/categories', {
  transform: (categories) => {
    return [{ name: 'Alle', id: -1, color: null }, ...categories];
  },
});

const selectedCategory = computed(() =>
  categories.value?.find((category) => category.id === modelValue.value)
);
</script>
