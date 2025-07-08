<template>
  <UTabs
    v-model="activeTab"
    class="w-full"
    :items="items"
    :content="false"
    variant="link"
    :ui="{ trigger: 'grow' }"
  />
</template>

<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui';

const tab = defineModel<boolean>('tab');

const activeTab = computed({
  get: () => (tab.value ? 'released' : 'unreleased'),
  set: (value: string) => {
    tab.value = value === 'released';
  },
});

const items = [
  {
    value: 'released',
    label: 'Released',
  },
  {
    value: 'unreleased',
    label: 'Unreleased',
  },
] satisfies TabsItem[];
</script>
