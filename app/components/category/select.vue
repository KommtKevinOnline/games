<template>
  <USelectMenu
    v-model="selectedCategories"
    :options="categories"
    value-attribute="id"
    option-attribute="name"
    icon="i-mdi-tag"
    placeholder="Kategorien auswählen"
    multiple
    :ui="{ wrapper: 'min-w-40' }"
  >
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
const selectedCategories = defineModel<number[]>({
  default: () => [],
});

const { data: categories } = await useFetch('/api/categories');
</script>
