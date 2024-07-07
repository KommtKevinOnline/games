export default defineEventHandler(async (event) => {
  return await useDrizzle().query.games.findMany();
});
