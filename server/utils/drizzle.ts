import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
export { sql, eq, and, or } from 'drizzle-orm';

import * as schema from '../database/schema';

export const tables = schema;

export function useDrizzle() {
  const runtimeConfig = useRuntimeConfig();

  const queryClient = Database(runtimeConfig.db.path);
  return drizzle(queryClient, { schema });
}

export type Game = typeof schema.games.$inferSelect;
export type Category = typeof schema.categories.$inferSelect;
