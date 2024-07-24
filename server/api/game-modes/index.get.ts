export default defineEventHandler(async (event) => {
  return await useDrizzle().query.gameModes.findMany();
});
