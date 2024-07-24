import { eq } from 'drizzle-orm';
import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { id } = await useValidatedQuery(event, {
    id: z.string(),
  });

  const drizzle = useDrizzle();

  await drizzle.delete(tables.users).where(eq(tables.users.twitchId, id));
});
