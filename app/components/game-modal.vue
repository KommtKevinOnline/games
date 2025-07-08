<template>
  <slot name="activator" :props="{ onClick }" />

  <UModal v-model:open="isOpen">
    <template #content>
      <UCard
        :ui="{
          header: 'flex justify-between',
          footer: 'flex justify-end gap-2',
        }"
      >
        <template #header>
          <h2 class="text-2xl font-bold">{{ title ?? game.name }}</h2>
          <delete-game :game="game" @removed="onRemoved" />
        </template>

        <div class="flex flex-col gap-4">
          <UFormField name="name" label="Name" required>
            <UInput
              class="w-full"
              v-model="state.name"
              autocomplete="off"
              icon="i-lucide-align-left"
              size="md"
            />
          </UFormField>

          <UFormField name="comment" label="Bemerkung" :ui="{ container: '' }">
            <UInput
              class="w-full"
              v-model="state.comment"
              autocomplete="off"
              icon="i-lucide-message-square"
              size="md"
            />
          </UFormField>

          <UFormField
            name="categoryId"
            label="Kategorie"
            :ui="{ container: '' }"
          >
            <CategorySelect class="w-full" v-model="state.categories" />
          </UFormField>

          <UFormField name="modeId" label="Modus" :ui="{ container: '' }">
            <ModeSelect class="w-full" v-model="state.modes" multiple />
          </UFormField>

          <UFormField name="url" label="Link" required :ui="{ container: '' }">
            <UInput
              class="w-full"
              v-model="state.url"
              autocomplete="off"
              icon="i-lucide-link"
              size="md"
            />
          </UFormField>

          <UFormField name="image" label="Image" :ui="{ container: '' }">
            <UInput
              class="w-full"
              v-model="state.image"
              autocomplete="off"
              icon="i-lucide-image"
              size="md"
            />
          </UFormField>

          <UCheckbox
            class="w-full"
            v-model="state.played"
            autocomplete="off"
            size="md"
            label="Gespielt"
          />

          <UCheckbox
            class="w-full"
            v-model="state.released"
            autocomplete="off"
            size="md"
            label="Released"
          />
        </div>

        <template #footer>
          <UButton color="neutral" variant="link" @click="isOpen = false">
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
        </template>
      </UCard>
    </template>
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
  released: props.game.released ?? true,
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
      color: 'success',
      icon: 'i-lucide-circle-check',
    });

    isOpen.value = false;

    emit('save');
  } catch (error) {
    toast.add({
      title: 'Fehler beim Speichern des Spiels',
      description: error.message,
      color: 'error',
      icon: 'i-lucide-circle-x',
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
      color: 'success',
      icon: 'i-lucide-circle-check',
    });

    isOpen.value = false;

    emit('save');
  } catch (error) {
    toast.add({
      title: 'Fehler beim Erstellen des Spiels',
      description: error.message,
      color: 'error',
      icon: 'i-lucide-circle-x',
    });
  } finally {
    saveLoading.value = false;
  }
}
</script>
