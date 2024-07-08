export default oauth.twitchEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    const config = useRuntimeConfig();

    console.log(config.twitch.mails);
    console.log(config.twitch.mails.split(','));

    if (!config.twitch.mails.split(',').includes(user.email)) {
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
