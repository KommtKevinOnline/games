<template>
  <UContainer>
    <UDashboardPage>
      <UDashboardPanel grow>
        <UDashboardNavbar title="Kategorien" :badge="categories.length">
          <template #right>
            <UButton
              label="Kategorie hinzufügen"
              trailing-icon="i-heroicons-plus"
              color="gray"
              @click="categoryModalOpen = true"
            />
          </template>
        </UDashboardNavbar>

        <UDashboardModal
          v-model="categoryModalOpen"
          :title="editCategory ? 'Kategorie bearbeiten' : 'Neue Kategorie'"
          :description="
            editCategory
              ? 'Bearbeite die Kategorie.'
              : 'Erstelle eine neue Kategorie.'
          "
          :ui="{ width: 'sm:max-w-md' }"
        >
          <category-form
            :data="editCategory"
            @close="
              categoryModalOpen = false;
              editCategory = undefined;
              refresh();
            "
          />
        </UDashboardModal>

        <UTable
          v-model:sort="sort"
          :rows="categories"
          :columns="columns"
          :loading="status !== 'success'"
          sort-mode="manual"
          class="w-full"
          :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
          :empty-state="{
            icon: 'i-mdi-tag',
            label: 'Keine Kategorien.',
          }"
        >
          <template #name-data="{ row }">
            <div class="flex items-center gap-3">
              <category-indicator :color="row.color" />

              <span class="text-gray-900 dark:text-white font-medium">
                {{ row.name }}
              </span>
            </div>
          </template>

          <template #actions-data="{ row }">
            <div class="flex justify-end">
              <UDropdown :items="items(row)">
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-ellipsis-horizontal-20-solid"
                />
              </UDropdown>
            </div>
          </template>
        </UTable>
      </UDashboardPanel>
    </UDashboardPage>
  </UContainer>
</template>

<script setup lang="ts">
import type { Category } from '~~/server/utils/drizzle';

definePageMeta({
  middleware: 'authenticated',
});

const columns = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    key: 'actions',
  },
];

const items = (row: { id: number }) => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => openEdit(row.id),
    },
  ],
  [
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => removeCategory(row.id),
    },
  ],
];

const {
  data: categories,
  status,
  refresh,
} = await useFetch<Category[]>('/api/categories', {
  default: () => [],
});

const sort = ref({ column: 'id', direction: 'asc' as const });
const categoryModalOpen = ref(false);
const editCategory = ref<Category | undefined>(undefined);

function openEdit(categoryId: number) {
  const category = categories.value.find(
    (category) => category.id === categoryId
  );

  if (!category) {
    return;
  }

  categoryModalOpen.value = true;

  editCategory.value = category;
}

const toast = useToast();

async function removeCategory(categoryId: number) {
  await $fetch('/api/categories/remove', {
    method: 'POST',
    query: {
      id: categoryId,
    },
  });

  toast.add({
    title: 'Kategorie gelöscht',
    description: 'Die Kategorie wurde erfolgreich gelöscht.',
    color: 'green',
  });

  refresh();
}
</script>
