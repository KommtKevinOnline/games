import { cachedGames } from '../../utils/games';

export default defineEventHandler(async (event) => {
  return await cachedGames();
});
