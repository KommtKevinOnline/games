import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const games = sqliteTable('games', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  image: text('image'),
  url: text('url'),
});
