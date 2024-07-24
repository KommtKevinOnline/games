import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const games = sqliteTable('games', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  image: text('image'),
  url: text('url'),
  categoryId: integer('categoryId').references(() => categories.id),
});

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  color: text('color'),
});

export const gamesRelations = relations(games, ({ one }) => ({
  category: one(categories, {
    fields: [games.categoryId],
    references: [categories.id],
  }),
}));

export const users = sqliteTable('users', {
  twitchId: text('twitchId').primaryKey(),
  displayName: text('displayName').notNull(),
  email: text('email').unique(),
  avatar: text('avatar'),
  godMode: integer('godMode', { mode: 'boolean' }).default(false),
});

export const gameModes = sqliteTable('game_modes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
});
