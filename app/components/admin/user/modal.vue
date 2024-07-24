<template>
  <slot name="activator" :props="{ onClick }" />

  <UModal v-model="isOpen" :ui="{ width: 'md:max-w-2xl' }">
    <UCard
      :ui="{
        header: { base: 'flex justify-between' },
        footer: { base: 'flex justify-end gap-2' },
      }"
    >
      <template #header>
        <h2 class="text-2xl font-bold">Benutzer hinzufügen</h2>
      </template>

      <div class="flex flex-col gap-4">
        <UFormGroup
          name="name"
          label="Twitch Name"
          required
          :ui="{ container: '' }"
        >
          <UInput
            v-model="state.name"
            autocomplete="off"
            icon="i-heroicons-user"
            size="md"
          />
        </UFormGroup>
      </div>

      <template #footer>
        <UButton color="gray" @click="isOpen = false">Abbrechen</UButton>
        <UButton
          color="green"
          :loading="saveLoading"
          @click="save"
          icon="i-heroicons-check-16-solid"
        >
          Speichern
        </UButton>
      </template>
    </UCard>
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
    await $fetch('/api/user/add', {
      method: 'POST',
      body: {
        name: state.name,
      },
    });

    toast.add({
      title: 'Benutzer hinzugefügt',
      color: 'green',
      icon: 'i-heroicons-check-circle-16-solid',
    });

    isOpen.value = false;

    emit('save');
  } catch (error) {
    toast.add({
      title: 'Fehler beim hinzufügen des Benutzers',
      description: (error as Error).message,
      color: 'red',
      icon: 'i-heroicons-exclamation-circle-16-solid',
    });
  } finally {
    saveLoading.value = false;
  }
}
</script>
