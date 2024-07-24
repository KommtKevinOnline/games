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
        <h2 class="text-2xl font-bold">{{ game.name }}</h2>
        <delete-game :game="game" @removed="onRemoved" />
      </template>

      <div class="flex flex-col gap-4">
        <UFormGroup name="name" label="Name" required :ui="{ container: '' }">
          <UInput
            v-model="state.name"
            autocomplete="off"
            icon="i-heroicons-tag-solid"
            size="md"
          />
        </UFormGroup>

        <UFormGroup
          name="categoryId"
          label="Kategorie"
          required
          :ui="{ container: '' }"
        >
          <CategorySelect v-model="state.categoryId" />
        </UFormGroup>

        <UFormGroup name="url" label="Link" required :ui="{ container: '' }">
          <UInput
            v-model="state.url"
            autocomplete="off"
            icon="i-heroicons-link-solid"
            size="md"
          />
        </UFormGroup>

        <UFormGroup name="image" label="Image" required :ui="{ container: '' }">
          <UInput
            v-model="state.image"
            autocomplete="off"
            icon="i-heroicons-photo-solid"
            size="md"
          />
        </UFormGroup>

        <!-- <UFormGroup
          name="cover"
          label="Cover"
          class="grid grid-cols-2 gap-2"
          :ui="{ container: 'flex flex-wrap items-center gap-3', help: 'mt-0' }"
        >
          <div class="grid">
            <img
              v-if="state.image"
              :src="state.image"
              :alt="`Banner of the game '${game.name}'`"
              class="rounded-t-lg"
              style="grid-area: 1/1"
            />

            <div
              class="flex justify-end items-start p-2"
              style="grid-area: 1/1"
            >
              <UButton
                icon="i-heroicons-arrow-up-tray-16-solid"
                color="white"
                size="md"
                @click="onFileClick"
              />
            </div>
          </div>

          <input
            ref="fileRef"
            type="file"
            class="hidden"
            accept=".jpg, .jpeg, .png, .webp, .avif"
            @change="onFileChange"
          />
        </UFormGroup> -->
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
import type { Game } from '~~/server/utils/drizzle';

const props = defineProps<{
  game: Game;
}>();

const toast = useToast();

// const fileRef = ref<HTMLInputElement>();
const isOpen = ref(false);

const emit = defineEmits(['save']);

const state = reactive({
  name: props.game.name,
  categoryId: props.game.categoryId,
  image: props.game.image,
  url: props.game.url,
});

const saveLoading = ref(false);

function onClick() {
  isOpen.value = true;
}

// function onFileChange(e: Event) {
//   const input = e.target as HTMLInputElement;

//   if (!input.files?.length) {
//     return;
//   }

//   state.image = URL.createObjectURL(input.files[0]);
// }

// function onFileClick() {
//   fileRef.value?.click();
// }

function onRemoved() {
  isOpen.value = false;
  emit('save');
}

async function save() {
  saveLoading.value = true;

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
</script>
