ALTER TABLE `testimonials` MODIFY COLUMN `client_company` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` MODIFY COLUMN `rating` int NOT NULL DEFAULT 5;--> statement-breakpoint
ALTER TABLE `testimonials` MODIFY COLUMN `featured` int NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` MODIFY COLUMN `domain` varchar(64) NOT NULL DEFAULT 'com';--> statement-breakpoint
ALTER TABLE `testimonials` ADD `client_title` varchar(255);--> statement-breakpoint
ALTER TABLE `testimonials` ADD `client_email` varchar(320) NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` ADD `client_phone` varchar(20);--> statement-breakpoint
ALTER TABLE `testimonials` ADD `company_website` varchar(512);--> statement-breakpoint
ALTER TABLE `testimonials` ADD `sector` enum('communication','events','immersion') NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` ADD `project_type` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` ADD `problem` text NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` ADD `solution` text NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` ADD `result` text NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` ADD `status` enum('pending','approved','published','rejected') DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` ADD `allow_website` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` ADD `allow_google` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` ADD `allow_trustpilot` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` ADD `allow_social` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` ADD `google_review_id` varchar(255);--> statement-breakpoint
ALTER TABLE `testimonials` ADD `trustpilot_review_id` varchar(255);--> statement-breakpoint
ALTER TABLE `testimonials` ADD `linkedin_post_id` varchar(255);--> statement-breakpoint
ALTER TABLE `testimonials` ADD `published_at` timestamp;--> statement-breakpoint
ALTER TABLE `testimonials` DROP COLUMN `client_role`;--> statement-breakpoint
ALTER TABLE `testimonials` DROP COLUMN `content_fr`;--> statement-breakpoint
ALTER TABLE `testimonials` DROP COLUMN `content_en`;