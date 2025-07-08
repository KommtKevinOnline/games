<template>
  <div>
    <UButton
      icon="i-mdi-delete"
      color="error"
      variant="ghost"
      @click="isOpen = true"
    />

    <UModal v-model:open="isOpen" title="Spiel löschen">
      <template #body>
        Bist du sicher, dass du
        <b>{{ game.name }}</b>
        löschen möchtest?
      </template>

      <template #footer>
        <div class="w-full flex justify-end gap-2">
          <UButton color="neutral" @click="isOpen = false" variant="ghost">
            Abbrechen
          </UButton>
          <UButton color="error" @click="remove">Ja</UButton>
        </div>
      </template>
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
    icon: 'i-lucide-circle-check',
    color: 'success',
  });

  emit('removed');
}
</script>
