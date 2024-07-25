import { z } from 'zod';
import { cachedGames } from '../../utils/games';

function coerceToArray<Schema extends z.ZodArray<z.ZodTypeAny>>(
  schema: Schema
) {
  return z.union([z.any().array(), z.any().transform((x) => [x])]).pipe(schema);
}

export default defineEventHandler(async (event) => {
  const games = await cachedGames();

  const query = await useValidatedQuery(event, {
    search: z.string().default(''),
    categories: coerceToArray(z.string().array().min(1)).optional(),
    mode: z
      .string()
      .optional()
      .transform((value) => (value ? parseInt(value) : undefined)),
  });

  const search = query.search.toLowerCase();

  const filteredGames = games
    .filter((game) => {
      return game.name.toLowerCase().includes(search);
    })
    .filter((game) => {
      if (!query.categories) {
        return true;
      }

      return query.categories.every((category) =>
        game.categories.some(
          (gameCategory) => gameCategory.category.id === parseInt(category)
        )
      );
    })
    .filter((game) => {
      if (!query.mode || query.mode === -1) {
        return true;
      }

      return game.modes.some((gameMode) => gameMode.mode.id === query.mode);
    });

  return filteredGames;
});
