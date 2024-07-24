<template>
  <UHeader>
    <template #logo>
      <h1 class="text-primary">Papaplatte Games</h1>
      <!-- <UBadge label="SaaS" variant="subtle" class="mb-0.5" /> -->
    </template>

    <template #center>
      <HeaderBtn to="/" icon="i-mdi-controller">Games</HeaderBtn>
      <HeaderBtn to="/randomizer" icon="i-mdi-dice">Randomizer</HeaderBtn>
      <AuthState v-slot="{ loggedIn }">
        <template v-if="loggedIn">
          <HeaderBtn to="/categories" icon="i-mdi-tag">Kategorien</HeaderBtn>
        </template>
      </AuthState>
    </template>

    <template #right>
      <auth-twitch-login-button />
    </template>
  </UHeader>
</template>
