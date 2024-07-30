export default oauthTwitchEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    const isAllowedUser = await useDrizzle().query.users.findFirst({
      where: eq(tables.users.twitchId, user.id),
    });

    if (!isAllowedUser) {
      console.log('User not allowed to log in:', user);
      throw new Error('You are not allowed to log in');
    }

    await setUserSession(event, {
      user: {
        twitchId: user.id,
        email: user.email,
        name: user.name,
        displayName: user.display_name,
        avatar: user.profile_image_url,
        // As we only have a user:read:email scope, it is fine to "expose" the access token
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expirationDate: new Date(Date.now() + tokens.expires_in * 1000),
      },
    });
    return sendRedirect(event, '/');
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('Twitch Auth error:', error);
    return sendRedirect(event, '/');
  },
});
