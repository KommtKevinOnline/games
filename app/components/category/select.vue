<template>
  <USelect
    v-model="selectedCategories"
    :items="categories"
    value-key="id"
    label-key="name"
    icon="i-mdi-tag"
    placeholder="Kategorien auswählen"
    multiple
    class="min-w-40"
  >
    <template #item="{ item: category }">
      <span class="flex items-center -space-x-1">
        <CategoryIndicator :color="category.color" />
      </span>
      <span>
        {{ category.name }}
      </span>
    </template>
  </USelect>
</template>

<script lang="ts" setup>
const selectedCategories = defineModel<number[]>({
  default: () => [],
});

const { data: categories } = await useFetch<
  {
    id: number;
    name: string;
    color: string;
  }[]
>('/api/categories', {
  default: () => [],
});
</script>
