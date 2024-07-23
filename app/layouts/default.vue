<template>
  <UDashboardLayout class="overflow-y-scroll">
    <div class="flex justify-between items-center mt-8">
      <h1 class="text-4xl font-bold text-primary">Papaplatte Games</h1>
      <auth-twitch-login-button />
    </div>
    <slot />
  </UDashboardLayout>
</template>

<script setup lang="ts"></script>
