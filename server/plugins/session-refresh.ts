import { useRuntimeConfig } from '#imports';

type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

async function validateToken(token: string) {
  try {
    await $fetch('https://id.twitch.tv/oauth2/validate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
}

export default defineNitroPlugin(() => {
  sessionHooks.hook('fetch', async (session, event) => {
    const isValid = await validateToken(session.user.accessToken);

    consola.debug('[Session] is valid:', isValid);

    const config = useRuntimeConfig(event).oauth.twitch;

    const now = new Date();
    const expirationDate = new Date(session.user.expirationDate);

    consola.debug('[Session] is expired:', expirationDate < now);

    if (expirationDate < now || !isValid) {
      const data = await $fetch<RefreshTokenResponse>(
        'https://id.twitch.tv/oauth2/token',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
          query: {
            client_id: config.clientId,
            client_secret: config.clientSecret,
            grant_type: 'refresh_token',
            refresh_token: session.user.refreshToken,
          },
        }
      );

      const now = new Date();

      session.user.expirationDate = new Date(
        now.getTime() + data.expires_in * 1000
      );

      session.user.accessToken = data.access_token;
      session.user.refreshToken = data.refresh_token;

      await setUserSession(event, session);
      consola.debug('[Session] refreshed:', session.user);
    }
  });
});
