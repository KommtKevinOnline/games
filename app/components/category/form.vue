<template>
  <UForm
    :validate="validate"
    :validate-on="['input']"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField label="Name" name="name">
      <UInput class="w-full" v-model="state.name" placeholder="Olympiaden" />
    </UFormField>

    <UFormField label="Farbe" name="color">
      <div class="flex items-center gap-2">
        <UPopover :content="{ side: 'bottom' }">
          <div
            class="size-7 rounded outline outline-neutral-200 dark:outline-neutral-700"
            :style="{ backgroundColor: state.color }"
          ></div>

          <template #content>
            <UCard :ui="{ body: 'p-2 sm:p-4' }">
              <UColorPicker v-model="state.color" />
            </UCard>
          </template>
        </UPopover>
        <UInput class="w-full" v-model="state.color" placeholder="#0000" />
      </div>
    </UFormField>

    <div class="flex justify-end gap-3">
      <UButton
        label="Abbrechen"
        color="neutral"
        variant="ghost"
        @click="emit('close')"
      />
      <UButton type="submit" label="Speichern" color="success" />
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';

const props = defineProps<{
  data?: { id?: number; name?: string; color?: string | null };
}>();

const emit = defineEmits(['close']);

const state = reactive<{ id?: number; name?: string; color?: string }>({
  id: props.data?.id,
  name: props.data?.name,
  color: props.data?.color ?? '#ff0000',
});

// https://ui.nuxt.com/components/form
const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name)
    errors.push({ path: 'name', message: 'Bitte trage einen Namen ein.' });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  await $fetch('/api/categories/upsert', {
    method: 'POST',
    body: event.data,
  });

  emit('close');
}
</script>

<style>
input[type='color']::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}

input[type='color']::-webkit-color-swatch-wrapper {
  padding: 0;
}
</style>
