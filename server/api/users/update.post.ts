import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user || !session.user.accessToken) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const body = await useValidatedBody(event, {
    twitchId: z.string(),
    godMode: z.boolean(),
  });

  const user = await useDrizzle().query.users.findFirst({
    where: eq(tables.users.twitchId, session.user.twitchId),
  });

  if (body.godMode && !user?.godMode) {
    return createError({
      statusCode: 404,
      statusMessage: 'You are not allowed to do this',
    });
  }

  await useDrizzle()
    .update(tables.users)
    .set(body)
    .where(eq(tables.users.twitchId, body.twitchId));

  return {
    message: 'User updated',
  };
});
