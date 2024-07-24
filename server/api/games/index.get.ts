import { z } from 'zod';
import { cachedGames } from '../../utils/games';

export default defineEventHandler(async (event) => {
  const games = await cachedGames();

  const query = await useValidatedQuery(event, {
    search: z.string().default(''),
  });

  const search = query.search.toLowerCase();

  const filteredGames = games.filter((game) => {
    return game.name.toLowerCase().includes(search);
  });

  return filteredGames;
});
