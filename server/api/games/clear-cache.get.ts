export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user || !session.user.accessToken) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  await runTask('cache:clear');

  return {
    message: 'Cache cleared',
  };
});
