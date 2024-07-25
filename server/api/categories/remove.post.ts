import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user || !session.user.accessToken) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const query = await useValidatedQuery(event, {
    id: z.string().transform((value) => parseInt(value)),
  });

  const drizzle = useDrizzle();

  await drizzle
    .delete(tables.gamesToCategories)
    .where(eq(tables.gamesToCategories.categoryId, query.id));

  await drizzle
    .delete(tables.categories)
    .where(eq(tables.categories.id, query.id));

  await invalidateGamesCache();

  return {
    message: 'Category removed successfully',
  };
});
