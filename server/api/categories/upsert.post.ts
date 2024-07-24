import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user || !session.user.accessToken) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const data = await useValidatedBody(event, {
    id: z.number().optional(),
    name: z.string(),
    color: z.string(),
  });

  return await useDrizzle()
    .insert(tables.categories)
    .values(data)
    .onConflictDoUpdate({
      target: tables.categories.id,
      set: data,
    });
});
