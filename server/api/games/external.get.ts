import { z } from 'zod';
import { useIgdb } from '../../composables/igdb';
import { invalidateGamesCache } from '../../utils/games';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user || !session.user.accessToken) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const query = await useValidatedQuery(event, {
    id: z.string(),
  });

  const igdb = useIgdb(session.user.accessToken);

  const game = await igdb.getGame(query.id);

  return game;
});
