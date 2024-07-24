<template>
  <div
    class="flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14"
  >
    <img
      src="https://cdn.7tv.app/emote/63db021ef74db58df4e644c2/4x.webp"
      alt="question mark"
      class="w-48 h-16 mx-auto mb-4"
    />
    <p
      class="text-lg font-semibold text-center text-gray-900 dark:text-white/80"
    >
      <slot />
    </p>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
