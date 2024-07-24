CREATE TABLE `users` (
	`twitchId` text PRIMARY KEY NOT NULL,
	`displayName` text NOT NULL,
	`email` text NOT NULL,
	`avatar` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);