ALTER TABLE `games` ADD `igdbId` text;--> statement-breakpoint
CREATE UNIQUE INDEX `games_igdbId_unique` ON `games` (`igdbId`);