<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Kunden" :badge="customers.length">
        <template #right>
          <UInput
            ref="input"
            v-model="q"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Suche..."
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
          >
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>

          <UButton
            label="Kunde hinzufügen"
            trailing-icon="i-heroicons-plus"
            color="gray"
            @click="isNewUserModalOpen = true"
          />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #right>
          <USelectMenu
            v-model="selectedColumns"
            icon="i-heroicons-adjustments-horizontal-solid"
            :options="defaultColumns"
            multiple
            class="hidden lg:block"
          >
            <template #label>Anzeige</template>
          </USelectMenu>
        </template>
      </UDashboardToolbar>

      <UDashboardModal
        v-model="isNewUserModalOpen"
        title="Neuer Kunde"
        description="Füge einen neuen Kunden hinzu."
        :ui="{ width: 'sm:max-w-md' }"
      >
        <customers-form
          @close="
            isNewUserModalOpen = false;
            refresh();
          "
        />
      </UDashboardModal>

      <UTable
        v-model="selected"
        v-model:sort="sort"
        :rows="customers"
        :columns="columns"
        :loading="pending"
        sort-mode="manual"
        class="w-full"
        :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
        @select="onSelect"
      >
        <template #name-data="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar v-bind="row.avatar" :alt="row.name" size="xs" />

            <span class="text-gray-900 dark:text-white font-medium">
              {{ row.name }}
            </span>
          </div>
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<script lang="ts" setup>
import type { InferSelectModel } from 'drizzle-orm';
import type { customer } from '~/db/schema';

type Customer = InferSelectModel<typeof customer>;

const defaultColumns = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
  },
];

const q = ref('');
const selected = ref<Customer[]>([]);
const selectedColumns = ref(defaultColumns);
const selectedStatuses = ref([]);
const selectedLocations = ref([]);
const sort = ref({ column: 'id', direction: 'asc' as const });
const input = ref<{ input: HTMLInputElement }>();
const isNewUserModalOpen = ref(false);

const columns = computed(() =>
  defaultColumns.filter((column) => selectedColumns.value.includes(column))
);

const query = computed(() => ({
  q: q.value,
  statuses: selectedStatuses.value,
  locations: selectedLocations.value,
  sort: sort.value.column,
  order: sort.value.direction,
}));

const {
  data: customers,
  pending,
  refresh,
} = await useFetch<Customer[]>('/api/categories', {
  query,
  default: () => [],
});

function onSelect(row: Customer) {
  const index = selected.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    selected.value.push(row);
  } else {
    selected.value.splice(index, 1);
  }
}

defineShortcuts({
  '/': () => {
    input.value?.input?.focus();
  },
});
</script>
