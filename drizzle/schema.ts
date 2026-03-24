import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Projects/Portfolio table
 */
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  titleFr: varchar("title_fr", { length: 255 }).notNull(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  descriptionFr: text("description_fr"),
  descriptionEn: text("description_en"),
  clientName: varchar("client_name", { length: 255 }),
  clientUrl: varchar("client_url", { length: 512 }),
  sector: varchar("sector", { length: 64 }).notNull(), // industrie, bancaire, pharmaceutique, tourisme
  projectType: varchar("project_type", { length: 64 }).notNull(), // video, photo, motion, event, etc.
  imageUrl: varchar("image_url", { length: 512 }),
  videoUrl: varchar("video_url", { length: 512 }),
  featured: int("featured").default(0),
  domain: varchar("domain", { length: 64 }).default("com"), // com ou ch
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * Testimonials/Client references table
 */
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  clientRole: varchar("client_role", { length: 255 }),
  clientCompany: varchar("client_company", { length: 255 }),
  contentFr: text("content_fr").notNull(),
  contentEn: text("content_en").notNull(),
  videoUrl: varchar("video_url", { length: 512 }),
  imageUrl: varchar("image_url", { length: 512 }),
  rating: int("rating").default(5),
  featured: int("featured").default(0),
  domain: varchar("domain", { length: 64 }).default("com"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

/**
 * Key metrics/Statistics table
 */
export const metrics = mysqlTable("metrics", {
  id: int("id").autoincrement().primaryKey(),
  labelFr: varchar("label_fr", { length: 255 }).notNull(),
  labelEn: varchar("label_en", { length: 255 }).notNull(),
  value: varchar("value", { length: 64 }).notNull(),
  order: int("order").default(0),
  domain: varchar("domain", { length: 64 }).default("com"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Metric = typeof metrics.$inferSelect;
export type InsertMetric = typeof metrics.$inferInsert;

/**
 * Contact form submissions
 */
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  company: varchar("company", { length: 255 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: varchar("type", { length: 64 }).default("contact"), // contact ou devis
  status: varchar("status", { length: 64 }).default("new"), // new, read, responded
  domain: varchar("domain", { length: 64 }).default("com"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * Newsletter subscriptions
 */
export const newsletterSubscriptions = mysqlTable("newsletter_subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  language: varchar("language", { length: 2 }).default("fr"),
  domain: varchar("domain", { length: 64 }).default("com"),
  subscribed: int("subscribed").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = typeof newsletterSubscriptions.$inferInsert;