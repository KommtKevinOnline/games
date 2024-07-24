import { useIgdb } from '../../composables/igdb';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user || !session.user.accessToken) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const igdb = useIgdb(session.user.accessToken);

  await useDrizzle()
    .insert(tables.gameModes)
    .values(await igdb.gameModes())
    .onConflictDoNothing();
});
