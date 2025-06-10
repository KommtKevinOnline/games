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

  const { id, name, image, url, categories, modes, played, comment, released } =
    await useValidatedBody(event, {
      id: z.number(),
      name: z.string(),
      categories: z.array(z.number()).optional(),
      modes: z.array(z.number()).optional(),
      comment: z.string().optional(),
      image: z.string(),
      url: z.string(),
      played: z.boolean(),
      released: z.boolean(),
    });

  const drizzle = useDrizzle();

  await drizzle
    .update(tables.games)
    .set({
      name,
      image,
      url,
      played,
      comment,
      released,
    })
    .where(eq(tables.games.id, id));

  // Update Categories
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

  // Update Modes
  if (modes?.length === 0) {
    await drizzle
      .delete(tables.gamesToModes)
      .where(eq(tables.gamesToModes.gameId, id));
  } else if (modes) {
    await drizzle
      .delete(tables.gamesToModes)
      .where(eq(tables.gamesToModes.gameId, id));

    await drizzle.insert(tables.gamesToModes).values(
      modes.map((modeId) => ({
        gameId: id,
        modeId,
      }))
    );
  }

  invalidateGamesCache();
});
