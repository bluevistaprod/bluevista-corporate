CREATE TABLE `contact_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`company` varchar(255),
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`type` varchar(64) DEFAULT 'contact',
	`status` varchar(64) DEFAULT 'new',
	`domain` varchar(64) DEFAULT 'com',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contact_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`label_fr` varchar(255) NOT NULL,
	`label_en` varchar(255) NOT NULL,
	`value` varchar(64) NOT NULL,
	`order` int DEFAULT 0,
	`domain` varchar(64) DEFAULT 'com',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `metrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletter_subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`language` varchar(2) DEFAULT 'fr',
	`domain` varchar(64) DEFAULT 'com',
	`subscribed` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `newsletter_subscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletter_subscriptions_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title_fr` varchar(255) NOT NULL,
	`title_en` varchar(255) NOT NULL,
	`description_fr` text,
	`description_en` text,
	`sector` varchar(64) NOT NULL,
	`project_type` varchar(64) NOT NULL,
	`image_url` varchar(512),
	`video_url` varchar(512),
	`featured` int DEFAULT 0,
	`domain` varchar(64) DEFAULT 'com',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`client_name` varchar(255) NOT NULL,
	`client_role` varchar(255),
	`client_company` varchar(255),
	`content_fr` text NOT NULL,
	`content_en` text NOT NULL,
	`video_url` varchar(512),
	`image_url` varchar(512),
	`rating` int DEFAULT 5,
	`featured` int DEFAULT 0,
	`domain` varchar(64) DEFAULT 'com',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
