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
        <h2 class="text-2xl font-bold">{{ title ?? game.name }}</h2>
        <delete-game :game="game" @removed="onRemoved" />
      </template>

      <div class="flex flex-col gap-4">
        <UFormGroup name="name" label="Name" required :ui="{ container: '' }">
          <UInput
            v-model="state.name"
            autocomplete="off"
            icon="i-heroicons-bars-3-bottom-left-16-solid"
            size="md"
          />
        </UFormGroup>

        <UFormGroup name="comment" label="Bemerkung" :ui="{ container: '' }">
          <UInput
            v-model="state.comment"
            autocomplete="off"
            icon="i-heroicons-bars-3-bottom-left-16-solid"
            size="md"
          />
        </UFormGroup>

        <UFormGroup name="categoryId" label="Kategorie" :ui="{ container: '' }">
          <CategorySelect v-model="state.categories" />
        </UFormGroup>

        <UFormGroup name="modeId" label="Modus" :ui="{ container: '' }">
          <ModeSelect v-model="state.modes" multiple />
        </UFormGroup>

        <UFormGroup name="url" label="Link" required :ui="{ container: '' }">
          <UInput
            v-model="state.url"
            autocomplete="off"
            icon="i-heroicons-link-solid"
            size="md"
          />
        </UFormGroup>

        <UFormGroup name="image" label="Image" :ui="{ container: '' }">
          <UInput
            v-model="state.image"
            autocomplete="off"
            icon="i-heroicons-photo-solid"
            size="md"
          />
        </UFormGroup>

        <UCheckbox
          v-model="state.played"
          autocomplete="off"
          icon="i-heroicons-photo-solid"
          size="md"
          label="Gespielt"
        />
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
import type { Category, Game } from '~~/server/utils/drizzle';

const props = defineProps<{
  title?: string;
  game: Game & { categories: { gameId: string; category: Category }[] } & {
    modes: { modeId: number }[];
  };
}>();

const toast = useToast();

const isOpen = ref(false);

const emit = defineEmits(['save']);

const state = reactive({
  name: props.game.name,
  comment: props.game.comment ?? '',
  categories: props.game.categories.map((category) => category.category.id),
  modes: props.game.modes.map((mode) => mode.modeId),
  image: props.game.image ?? '',
  url: props.game.url ?? '',
  played: props.game.played ?? false,
});

const saveLoading = ref(false);

function onClick() {
  isOpen.value = true;
}

function onRemoved() {
  isOpen.value = false;
  emit('save');
}

async function save() {
  if (props.game.id) {
    await update();
  } else {
    await create();
  }
}

async function update() {
  try {
    await $fetch('/api/games/update', {
      method: 'POST',
      body: {
        id: props.game.id,
        ...state,
      },
    });

    toast.add({
      title: 'Spiel gespeichert',
      color: 'green',
      icon: 'i-heroicons-check-circle-16-solid',
    });

    isOpen.value = false;

    emit('save');
  } catch (error) {
    toast.add({
      title: 'Fehler beim Speichern des Spiels',
      description: error.message,
      color: 'red',
      icon: 'i-heroicons-exclamation-circle-16-solid',
    });
  } finally {
    saveLoading.value = false;
  }
}

async function create() {
  saveLoading.value = true;

  try {
    await $fetch('/api/games/create', {
      method: 'POST',
      body: {
        ...state,
      },
    });

    toast.add({
      title: 'Spiel erstellt',
      color: 'green',
      icon: 'i-heroicons-check-circle-16-solid',
    });

    isOpen.value = false;

    emit('save');
  } catch (error) {
    toast.add({
      title: 'Fehler beim Erstellen des Spiels',
      description: error.message,
      color: 'red',
      icon: 'i-heroicons-exclamation-circle-16-solid',
    });
  } finally {
    saveLoading.value = false;
  }
}
</script>
