CREATE TABLE
	`categories` (
		`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
		`name` text NOT NULL,
		`color` text
	);

CREATE TABLE
	`games_new` (
		`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
		`name` text NOT NULL,
		`image` text,
		`url` text,
		`categoryId` integer,
		FOREIGN KEY (`categoryId`) REFERENCES categories (`id`)
	);

INSERT INTO
	`games_new` (`id`, `name`, `image`, `url`)
SELECT
	`id`,
	`name`,
	`image`,
	`url`
FROM
	`games`;

DROP TABLE `games`;

ALTER TABLE `games_new`
RENAME TO `games`;