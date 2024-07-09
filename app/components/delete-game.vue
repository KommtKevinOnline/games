<template>
  <div>
    <UButton
      icon="i-mdi-delete"
      color="red"
      variant="ghost"
      @click="isOpen = true"
    />

    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <h1 class="text-2xl font-bold">Spiel löschen</h1>
        </template>

        Bist du sicher, dass du
        <b>{{ game.name }}</b>
        löschen möchtest?

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton color="gray" @click="isOpen = false">Abbrechen</UButton>
            <UButton color="red" @click="remove">Ja</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false);

const props = defineProps<{
  game: Game;
}>();

const emit = defineEmits(['removed']);

const toast = useToast();

async function remove() {
  await $fetch(`/api/games/remove`, {
    method: 'POST',
    query: { id: props.game.id },
  });

  isOpen.value = false;

  toast.add({
    title: 'Das Spiel wurde erfolgreich gelöscht.',
    color: 'green',
  });

  emit('removed');
}
</script>
