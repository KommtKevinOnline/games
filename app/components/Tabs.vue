<template>
  <UTabs
    :model-value="Number(!tab)"
    :items="items"
    @update:model-value="onUpdate"
  />
</template>

<script lang="ts" setup>
const tab = defineModel<boolean>('tab');

function onUpdate(value: number) {
  tab.value = value === 0;
}

const items = [
  {
    label: 'Released',
  },
  {
    label: 'Unreleased',
  },
];
</script>

<style></style>
