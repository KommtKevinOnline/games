import { z } from 'zod';
import { useIgdb } from '../../composables/igdb';
import { invalidateGamesCache } from '../../utils/games';
import { getSteamData } from '../../utils/steam';
import { Game } from '../../utils/drizzle';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user || !session.user.accessToken) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const query = await useValidatedQuery(event, {
    value: z.string(),
  });

  let gameData: Game | null = null;

  if (query.value.startsWith('https://store.steampowered.com/app/')) {
    gameData = await getSteamData(query.value);
  } else {
    const igdb = useIgdb(session.user.accessToken);

    const game = await igdb.getGame(query.value);

    const steamUrl = game.websites.find(
      (website) => website.category === 13
    )?.url;

    gameData = {
      igdbId: game.id.toString(),
      name: game.name,
      url: steamUrl ?? null,
    };

    if (steamUrl) {
      const { image } = await getSteamData(steamUrl);
      gameData.image = image;
    } else if (game.cover?.url) {
      gameData.image = game.cover.url;
    }
  }

  console.log(gameData);

  const drizzle = useDrizzle();

  if (!gameData) {
    return createError({
      statusCode: 400,
      statusMessage: 'Invalid game data',
    });
  }

  const res = await drizzle
    .insert(tables.games)
    .values(gameData)
    .returning({ id: tables.games.id });

  // await drizzle.insert(tables.gamesToModes).values(
  //   game.game_modes.map((mode) => ({
  //     gameId: res[0].id,
  //     modeId: mode,
  //   }))
  // );

  invalidateGamesCache();

  return res[0].id;
});
