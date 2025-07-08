<template>
  <slot name="activator" :props="{ onClick }" />

  <UModal v-model:open="isOpen" title="Benutzer hinzufügen">
    <template #body>
      <div class="flex flex-col gap-4">
        <UFormField
          name="name"
          label="Twitch Name"
          required
          :ui="{ container: '' }"
        >
          <UInput
            class="w-full"
            v-model="state.name"
            placeholder="Papaplatte"
            autocomplete="off"
            icon="i-lucide-user"
            size="md"
          />
        </UFormField>
      </div>
    </template>

    <template #footer>
      <div class="flex w-full justify-end gap-2">
        <UButton color="neutral" variant="subtle" @click="isOpen = false">
          Abbrechen
        </UButton>
        <UButton
          color="success"
          :loading="saveLoading"
          @click="save"
          icon="i-lucide-check"
        >
          Speichern
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const toast = useToast();

const isOpen = ref(false);

const emit = defineEmits(['save']);

const state = reactive({
  name: '',
});

const saveLoading = ref(false);

function onClick() {
  isOpen.value = true;
}

async function save() {
  saveLoading.value = true;

  try {
    await $fetch('/api/users/add', {
      method: 'POST',
      body: {
        name: state.name,
      },
    });

    toast.add({
      title: 'Benutzer hinzugefügt',
      color: 'success',
      icon: 'i-lucide-circle-check',
    });

    isOpen.value = false;

    emit('save');
  } catch (error) {
    toast.add({
      title: 'Fehler beim hinzufügen des Benutzers',
      description: (error as Error).message,
      color: 'error',
      icon: 'i-lucide-circle-x',
    });
  } finally {
    saveLoading.value = false;
  }
}
</script>
