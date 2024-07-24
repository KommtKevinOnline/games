import { Game } from '../../types/Igdb';

export const useIgdb = (bearerToken: string) => {
  const config = useRuntimeConfig();

  async function search(query: string, limit: number = 50) {
    const result = await $fetch('/search', {
      baseURL: config.igdb.apiBase,
      method: 'POST',
      headers: {
        'Client-ID': config.oauth.twitch.clientId,
        Authorization: `Bearer ${bearerToken}`,
      },
      body: `fields *; search "${query}"; limit ${limit};`,
    });

    return result;
  }

  async function getGame(id: string) {
    const result = await $fetch<Game[]>('/games', {
      baseURL: config.igdb.apiBase,
      method: 'POST',
      headers: {
        'Client-ID': config.oauth.twitch.clientId,
        Authorization: `Bearer ${bearerToken}`,
      },
      body: `fields name,game_modes,websites.*,artworks.*,cover.*; where id = ${id};`,
    });

    if (!result || !result[0]) {
      throw new Error('Game not found');
    }

    return result[0];
  }

  async function gameModes() {
    const result = await $fetch<{ id: number; name: string; slug: string }>(
      '/game_modes',
      {
        baseURL: config.igdb.apiBase,
        method: 'POST',
        headers: {
          'Client-ID': config.oauth.twitch.clientId,
          Authorization: `Bearer ${bearerToken}`,
        },
        body: 'fields *; limit 50;',
      }
    );

    return result;
  }

  return {
    search,
    getGame,
    gameModes,
  };
};
