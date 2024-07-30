<template>
  <div
    class="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 scroll-py-2"
  >
    <div class="p-2">
      <div class="text-sm text-gray-700 dark:text-gray-200">
        <RecycleScroller
          class="scroller"
          :items="items"
          :item-size="32"
          key-field="value"
          v-slot="{ item }"
        >
          <list-item
            @click="emit('select', item.value)"
            :key="item.value"
            :label="item.label"
          />
        </RecycleScroller>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    items: Record<string, any>[];
    itemLabel: string;
    itemValue?: string;
  }>(),
  {
    itemValue: 'id',
    itemLabel: 'label',
  }
);

const emit = defineEmits(['select']);

const items = computed(() => {
  return props.items.map((item) => ({
    label: item[props.itemLabel],
    value: item[props.itemValue],
  }));
});
</script>

<style></style>
