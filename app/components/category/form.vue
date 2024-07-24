<template>
  <UForm
    :validate="validate"
    :validate-on="['submit']"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" placeholder="Olympiaden" />
    </UFormGroup>

    <UFormGroup label="Farbe" name="color">
      <div class="flex items-center gap-2">
        <UInput
          v-model="state.color"
          type="color"
          :ui="{ base: 'size-7 !p-0' }"
        />
        <color-picker v-model="state.color" />
        <UInput v-model="state.color" placeholder="#0000" />
      </div>
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton
        label="Abbrechen"
        color="gray"
        variant="ghost"
        @click="emit('close')"
      />
      <UButton type="submit" label="Speichern" color="green" />
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
  color: props.data?.color ?? undefined,
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
