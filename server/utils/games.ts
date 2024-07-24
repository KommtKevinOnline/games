export const cachedGames = defineCachedFunction(
  async () =>
    await useDrizzle().query.games.findMany({ with: { category: true } }),
  {
    name: 'games',
    maxAge: 60 * 60,
  }
);

export async function invalidateGamesCache() {
  await useStorage('cache').removeItem('nitro:functions:games:.json');
}
