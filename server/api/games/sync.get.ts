import { useIgdb } from '../../composables/igdb';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user || !session.user.accessToken) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const drizzle = useDrizzle();
  const igdb = useIgdb(session.user.accessToken);

  const games = await drizzle.query.games.findMany();

  for (const game of games) {
    const igdbGame = await igdb.getGame(game.id.toString());

    if (!igdbGame) {
      consola.warn(`Game with ID ${game.id} not found on IGDB`);
      continue;
    }

    await drizzle.insert(tables.gamesToModes).values(
      igdbGame.game_modes.map((mode) => ({
        gameId: game.id,
        modeId: mode,
      }))
    );

    consola.info(
      `Inserted modes: "${igdbGame.game_modes.join(', ')}" for game ${
        game.name
      }`
    );
  }

  invalidateGamesCache();
});
