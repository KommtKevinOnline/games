export default defineTask({
  meta: {
    name: 'cache:clear',
    description: 'Clear Cache',
  },
  async run() {
    try {
      invalidateGamesCache();

      return { result: 'Success' };
    } catch (error) {
      console.error('Clearing cache failed', error);
      return { result: 'Error', message: (error as Error).message };
    }
  },
});
