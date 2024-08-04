import { relations } from 'drizzle-orm';
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from 'drizzle-orm/sqlite-core';

export const games = sqliteTable('games', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  igdbId: text('igdbId').unique(),
  name: text('name').notNull(),
  image: text('image'),
  url: text('url'),
  played: integer('played', { mode: 'boolean' }).default(false),
});

export const gamesRelations = relations(games, ({ one, many }) => ({
  categories: many(gamesToCategories),
  modes: many(gamesToModes),
}));

export const gamesToCategories = sqliteTable(
  'games_to_categories',
  {
    gameId: integer('game_id')
      .notNull()
      .references(() => games.id, { onDelete: 'cascade' }),
    categoryId: integer('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'set null' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.gameId, t.categoryId] }),
  })
);

export const gamesToCategoriesRelations = relations(
  gamesToCategories,
  ({ one }) => ({
    game: one(games, {
      fields: [gamesToCategories.gameId],
      references: [games.id],
    }),
    category: one(categories, {
      fields: [gamesToCategories.categoryId],
      references: [categories.id],
    }),
  })
);

export const gamesToModes = sqliteTable(
  'games_to_modes',
  {
    gameId: integer('game_id')
      .notNull()
      .references(() => games.id, { onDelete: 'cascade' }),
    modeId: integer('mode_id')
      .notNull()
      .references(() => gameModes.id, { onDelete: 'set null' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.gameId, t.modeId] }),
  })
);

export const gamesToModesRelations = relations(gamesToModes, ({ one }) => ({
  game: one(games, {
    fields: [gamesToModes.gameId],
    references: [games.id],
  }),
  mode: one(gameModes, {
    fields: [gamesToModes.modeId],
    references: [gameModes.id],
  }),
}));

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  color: text('color'),
});

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
