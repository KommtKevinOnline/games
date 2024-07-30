import { z } from 'zod';
import { useIgdb } from '../../composables/igdb';

export default defineEventHandler(async (event) => {
  const query = await useValidatedQuery(event, {
    query: z.string().min(3),
  });

  const session = await getUserSession(event);

  if (!session.user || !session.user.accessToken) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  // force a session refresh if the token is expired
  //@ts-ignore In this case UserSession is satisfying the UserSessionRequired interface
  await sessionHooks.callHookParallel('fetch', session, event);

  const igdb = useIgdb(session.user.accessToken);

  return await igdb.search(query.query);
});
