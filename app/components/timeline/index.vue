<template>
  <div class="-my-6">
    <timeline-item v-for="item in timelineItems" v-bind="item">
      <template #content>
        <NuxtImg class="rounded" :src="item.src" />
      </template>
    </timeline-item>
  </div>
</template>

<script lang="ts" setup>
const timelineItems = ref([
  {
    title: 'Car Repair',
    badge: 'Bald verfügbar',
    src: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2904040/header.jpg',
  },
  {
    title: 'Referee Simulator',
    badge: new Date('2020-06-15').toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    src: 'https://steamcdn-a.akamaihd.net/steam/apps/1707680/header.jpg',
  },
]);
</script>

<style></style>
