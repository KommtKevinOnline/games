CREATE TABLE `users` (
	`twitchId` text PRIMARY KEY NOT NULL,
	`displayName` text NOT NULL,
	`email` text,
	`avatar` text,
	`godMode` integer DEFAULT false
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);