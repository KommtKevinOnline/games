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

  const { name, image, url, categories, modes, played, comment } =
    await useValidatedBody(event, {
      name: z.string(),
      categories: z.array(z.number()).optional(),
      modes: z.array(z.number()).optional(),
      comment: z.string().optional(),
      image: z.string().optional(),
      url: z.string(),
      played: z.boolean().optional().default(false),
    });

  const drizzle = useDrizzle();

  const [game] = await drizzle
    .insert(tables.games)
    .values({
      name,
      image,
      url,
      played,
      comment,
    })
    .returning();

  if (!game) {
    return createError({
      statusCode: 500,
      statusMessage: 'Failed to create game',
    });
  }

  // Update Categories
  if (categories?.length === 0) {
    await drizzle
      .delete(tables.gamesToCategories)
      .where(eq(tables.gamesToCategories.gameId, game.id));
  } else if (categories) {
    await drizzle
      .delete(tables.gamesToCategories)
      .where(eq(tables.gamesToCategories.gameId, game.id));

    await drizzle.insert(tables.gamesToCategories).values(
      categories.map((categoryId) => ({
        gameId: game.id,
        categoryId,
      }))
    );
  }

  // Update Modes
  if (modes?.length === 0) {
    await drizzle
      .delete(tables.gamesToModes)
      .where(eq(tables.gamesToModes.gameId, game.id));
  } else if (modes) {
    await drizzle
      .delete(tables.gamesToModes)
      .where(eq(tables.gamesToModes.gameId, game.id));

    await drizzle.insert(tables.gamesToModes).values(
      modes.map((modeId) => ({
        gameId: game.id,
        modeId,
      }))
    );
  }

  invalidateGamesCache();

  return {
    message: 'Game created',
  };
});
