import { z } from 'zod';
import { cachedGames } from '../../utils/games';

export default defineEventHandler(async (event) => {
  const games = await cachedGames();

  const query = await useValidatedQuery(event, {
    search: z.string().default(''),
    categoryId: z
      .string()
      .optional()
      .transform((value) => (value ? parseInt(value) : undefined)),
  });

  const search = query.search.toLowerCase();

  const filteredGames = games
    .filter((game) =>
      query.categoryId && query.categoryId !== -1
        ? game.categoryId === query.categoryId
        : true
    )
    .filter((game) => {
      return game.name.toLowerCase().includes(search);
    });

  return filteredGames;
});
