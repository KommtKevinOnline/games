export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user, clear } = useUserSession();

  if (!user.value?.refreshToken) {
    clear();
  }

  if (!loggedIn.value) {
    return navigateTo('/');
  }
});
