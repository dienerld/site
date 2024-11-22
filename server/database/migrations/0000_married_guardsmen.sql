CREATE TABLE `note_likes` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text,
	`userId` text,
	FOREIGN KEY (`slug`) REFERENCES `notes`(`slug`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `note_views` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text,
	`userId` text,
	FOREIGN KEY (`slug`) REFERENCES `notes`(`slug`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `notes` (
	`slug` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`view_count` integer DEFAULT 0,
	`like_count` integer DEFAULT 0,
	`is_draft` integer DEFAULT true,
	`created_at` integer DEFAULT (CURRENT_DATE) NOT NULL
);
