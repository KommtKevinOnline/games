import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { useDrizzle } from '../../utils/drizzle';

export default defineTask({
  meta: {
    name: 'db:migrate',
    description: 'Run database migrations',
  },
  async run({ payload, context }) {
    try {
      await migrate(useDrizzle(), {
        migrationsFolder: 'server/database/migrations',
      });

      console.log('Database migrations done');

      return { result: 'Success' };
    } catch (error) {
      console.error('Database migrations failed', error);
      return { result: 'Error', message: (error as any).message };
    }
  },
});
