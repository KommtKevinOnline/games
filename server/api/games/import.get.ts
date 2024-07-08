import { z } from 'zod';
import { useIgdb } from '../../composables/igdb';

export default defineEventHandler(async (event) => {
  const query = await useValidatedQuery(event, {
    id: z.string(),
  });

  const config = useRuntimeConfig();
  const drizzle = useDrizzle();
  const session = await getUserSession(event);

  if (!session.user || !session.user.accessToken) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const igdb = useIgdb(session.user.accessToken);

  const game = await igdb.getGame(query.id);

  const steamUrl = game.websites.find(
    (website) => website.category === 13
  )?.url;

  const res = await drizzle
    .insert(tables.games)
    .values({
      image: steamUrl
        ? `https://steamcdn-a.akamaihd.net/steam/apps/${steamUrl
            .split('/')
            .at(-1)}/header.jpg`
        : game.cover?.url,
      name: game.name,
      url: steamUrl ?? null,
    })
    .returning({ id: tables.games.id });

  return res[0].id;
});
