import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { invalidateGamesCache } from '../../utils/games';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { id } = await useValidatedQuery(event, {
    id: z.string().transform((value) => parseInt(value)),
  });

  const drizzle = useDrizzle();

  await drizzle.delete(tables.games).where(eq(tables.games.id, id));

  invalidateGamesCache();
});
