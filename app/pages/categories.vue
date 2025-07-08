<template>
  <UContainer>
    <UDashboardNavbar title="Kategorien">
      <template #trailing>
        <UBadge :label="categories.length" variant="subtle" />
      </template>

      <template #right>
        <UButton
          label="Kategorie hinzufügen"
          trailing-icon="i-lucide-plus"
          color="neutral"
          variant="subtle"
          @click="categoryModalOpen = true"
        />
      </template>
    </UDashboardNavbar>

    <UModal
      v-model:open="categoryModalOpen"
      :title="editCategory ? 'Kategorie bearbeiten' : 'Neue Kategorie'"
      :description="
        editCategory
          ? 'Bearbeite die Kategorie.'
          : 'Erstelle eine neue Kategorie.'
      "
    >
      <template #body>
        <category-form
          :data="editCategory"
          @close="
            categoryModalOpen = false;
            editCategory = undefined;
            refresh();
          "
        />
      </template>
    </UModal>

    <UTable
      :data="categories"
      :columns="columns"
      class="flex-1"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
        td: 'border-b border-default',
      }"
    />
  </UContainer>
</template>

<script setup lang="ts">
import type { Category } from '~~/server/utils/drizzle';
import type { TableColumn } from '@nuxt/ui';
import type { Row } from '@tanstack/vue-table';
import { h, resolveComponent } from 'vue';

const UDropdownMenu = resolveComponent('UDropdownMenu');
const UButton = resolveComponent('UButton');

definePageMeta({
  middleware: 'authenticated',
});

const columns: TableColumn<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center gap-3',
        },
        [
          h(resolveComponent('category-indicator'), {
            color: row.original.color,
          }),
          h(
            'span',
            {
              class: 'text-neutral-900 dark:text-white font-medium',
            },
            [row.original.name]
          ),
        ]
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end',
            },
            items: getRowItems(row),
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown',
            })
        )
      );
    },
  },
];

function getRowItems(row: Row<Category>) {
  return [
    {
      label: 'Edit',
      icon: 'i-lucide-pencil',
      onClick: () => openEdit(row.original.id),
    },
    {
      label: 'Delete',
      icon: 'i-lucide-trash',
      onClick: () => removeCategory(row.original.id),
    },
  ];
}

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
    color: 'success',
  });

  refresh();
}
</script>
