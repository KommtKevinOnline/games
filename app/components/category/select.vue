<template>
  <USelectMenu v-model="model" :options="categories">
    <template #label>
      <template v-if="model">
        <span class="flex items-center -space-x-1">
          <CategoryIndicator :color="model.color" />
        </span>
        <span>
          {{ model.name }}
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

const model = defineModel<Category | null>();

const { data: categories } = await useFetch('/api/categories', {
  transform: (categories) => {
    return categories.map((category) => ({
      ...category,
      label: category.name,
    }));
  },
});
</script>
