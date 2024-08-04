import { ApiClient } from '@twurple/api';
import { AppTokenAuthProvider } from '@twurple/auth';
import {
  EventSubHttpListener,
  ReverseProxyAdapter,
} from '@twurple/eventsub-http';

export default defineNitroPlugin(() => {
  if (import.meta.dev) return;

  const config = useRuntimeConfig();

  const authProvider = new AppTokenAuthProvider(
    config.oauth.twitch.clientId,
    config.oauth.twitch.clientSecret
  );

  const apiClient = new ApiClient({ authProvider });

  const adapter = new ReverseProxyAdapter({
    hostName: config.origin,
  });

  const listener = new EventSubHttpListener({
    apiClient,
    adapter,
    secret: config.pubsub.secret,
  });
  listener.start();

  const drizzle = useDrizzle();

  /**
   * @description Set a game as played when the streamer is playing it
   */
  listener.onChannelUpdate(config.twitch.userId, async (e) => {
    const game = await e.getGame();

    if (!game || !game.igdbId) return;

    await drizzle
      .update(tables.games)
      .set({
        played: true,
      })
      .where(eq(tables.games.igdbId, game.igdbId));
  });
});
