<template>
  <UPopover
    mode="hover"
    :popper="{ strategy: 'absolute' }"
    :ui="{ width: 'w-[156px]' }"
  >
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        square
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
        aria-label="Color picker"
      >
        <UIcon
          name="i-heroicons-swatch-20-solid"
          class="w-5 h-5 text-primary-500 dark:text-primary-400"
        />
      </UButton>
    </template>

    <template #panel>
      <div class="p-2">
        <div class="grid grid-cols-5 gap-px">
          <ColorPickerPill
            v-for="color in primaryColors"
            :key="color.value"
            :color="color"
            @select="select(color)"
          />
        </div>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import colors from '#tailwind-config/theme/colors';

const appConfig = useAppConfig();
const colorMode = useColorMode();

const modelValue = defineModel<string | undefined>();

function select(color: { value: string; hex: string }) {
  modelValue.value = color.hex;
}

const primaryColors = computed(() =>
  appConfig.ui.colors
    .filter((color) => color !== 'primary')
    .map((color) => ({
      value: color,
      text: color,
      hex: colors[color][colorMode.value === 'dark' ? 400 : 500],
    }))
);
</script>
