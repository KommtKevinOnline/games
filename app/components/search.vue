<template>
  <div>
    <UButton icon="i-mdi-plus" @click="open = true">Spiel hinzufügen</UButton>

    <UModal v-model="open">
      <UCard>
        <h3>Suche:</h3>
        <UCommandPalette
          @update:model-value="onSelected"
          :groups="groups"
          :autoselect="false"
        >
          <template #empty-state>
            <div></div>
          </template>
        </UCommandPalette>

        <UInput placeholder="https://steamcommunity.com/123456" />
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
const open = defineModel<boolean>('open', { default: () => false });

const emit = defineEmits(['result']);

const groups = [
  {
    key: 'games',
    search: async (q?: string) => {
      if (!q) {
        return [];
      }

      const games = await $fetch<any[]>('/api/games/search', {
        query: { query: q },
      });

      return games.map((game) => ({
        id: game.game,
        label: game.name,
      }));
    },
  },
];

function onSelected(selected: { id: string }) {
  emit('result', selected.id);
  open.value = false;
}
</script>

<style></style>
