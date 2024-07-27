<template>
  <div class="relative pl-8 sm:pl-32 py-6 group">
    <slot name="subtitle">
      <div class="font-caveat font-medium text-2xl text-primary mb-1 sm:mb-0">
        {{ subtitle }}
      </div>
    </slot>
    <div
      class="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 dark:before:bg-slate-700 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-primary-600 after:border-4 after:box-content after:border-white dark:after:border-gray-900 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5"
    >
      <time
        class="sm:absolute -left-5 translate-y-0.5 inline-flex items-center justify-end w-28 h-6 mb-3 sm:mb-0"
      >
        <UBadge class="rounded-full">
          {{ badge }}
        </UBadge>
      </time>
      <div class="text-xl font-bold text-slate-900 dark:text-slate-100">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div class="text-slate-500 dark:text-slate-400">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  subtitle?: string;
  content?: string;
  badge: string;
}>();
</script>

<style></style>
