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

  const { id, name, image, url, categoryId } = await useValidatedBody(event, {
    id: z.number(),
    name: z.string(),
    categoryId: z.number().optional(),
    image: z.string(),
    url: z.string(),
  });

  const drizzle = useDrizzle();

  await drizzle
    .update(tables.games)
    .set({
      name,
      image,
      url,
      categoryId,
    })
    .where(eq(tables.games.id, id));

  invalidateGamesCache();
});
