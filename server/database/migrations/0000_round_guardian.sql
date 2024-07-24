CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`color` text
);
--> statement-breakpoint
CREATE TABLE `game_modes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `games` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`image` text,
	`url` text
);
--> statement-breakpoint
CREATE TABLE `games_to_categories` (
	`game_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	PRIMARY KEY(`category_id`, `game_id`),
	FOREIGN KEY (`game_id`) REFERENCES `games`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `games_to_modes` (
	`game_id` integer NOT NULL,
	`mode_id` integer NOT NULL,
	PRIMARY KEY(`game_id`, `mode_id`),
	FOREIGN KEY (`game_id`) REFERENCES `games`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`mode_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`twitchId` text PRIMARY KEY NOT NULL,
	`displayName` text NOT NULL,
	`email` text,
	`avatar` text,
	`godMode` integer DEFAULT false
);
--> statement-breakpoint
CREATE UNIQUE INDEX `game_modes_slug_unique` ON `game_modes` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);