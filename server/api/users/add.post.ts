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
    name: z.string(),
  });

  const config = useRuntimeConfig();

  const res = await $fetch<{
    data: {
      id: string;
      display_name: string;
      login: string;
      profile_image_url: string;
      email: string;
    }[];
  }>('https://api.twitch.tv/helix/users', {
    query: {
      login: body.name,
    },
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      'Client-Id': config.oauth.twitch.clientId,
    },
  });

  const user = res.data[0];

  if (!user) {
    return createError({
      statusCode: 404,
      statusMessage: 'User not found',
    });
  }

  await useDrizzle().insert(tables.users).values({
    twitchId: user.id,
    displayName: user.display_name,
    avatar: user.profile_image_url,
    email: user.email,
    godMode: false,
  });

  return {
    message: 'User added',
  };
});
