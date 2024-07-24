export default defineEventHandler(async (event) => {
  return await useDrizzle().query.categories.findMany();
});
