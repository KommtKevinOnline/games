import { useRuntimeConfig } from '#imports';

type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

export default defineNitroPlugin(() => {
  sessionHooks.hook('fetch', async (session, event) => {
    const now = new Date();
    const expirationDate = new Date(session.user.expirationDate);

    consola.debug(expirationDate < now, expirationDate, now);

    if (expirationDate < now) {
      const config = useRuntimeConfig(event).oauth.twitch;

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

      setCookie(event, 'jwt', data.access_token, {
        httpOnly: true,
        secure: true,
        maxAge: data.expires_in,
      });
    }
  });

  sessionHooks.hook('clear', async (session, event) => {
    await deleteCookie(event, 'jwt');
    await deleteCookie(event, 'refresh-token');
  });
});
