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

  const { id, name, image, url, categories } = await useValidatedBody(event, {
    id: z.number(),
    name: z.string(),
    categories: z.array(z.number()).optional(),
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
    })
    .where(eq(tables.games.id, id));

  if (categories?.length === 0) {
    await drizzle
      .delete(tables.gamesToCategories)
      .where(eq(tables.gamesToCategories.gameId, id));
  } else if (categories) {
    await drizzle
      .delete(tables.gamesToCategories)
      .where(eq(tables.gamesToCategories.gameId, id));

    await drizzle.insert(tables.gamesToCategories).values(
      categories.map((categoryId) => ({
        gameId: id,
        categoryId,
      }))
    );
  }

  invalidateGamesCache();
});
