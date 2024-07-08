export default defineNitroPlugin(async () => {
  await runTask('db:migrate');
});
