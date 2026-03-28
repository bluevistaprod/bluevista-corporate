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
  description2Fr: text("description2_fr"),
  description2En: text("description2_en"),
  clientName: varchar("client_name", { length: 255 }),
  clientUrl: varchar("client_url", { length: 512 }),
  sector: varchar("sector", { length: 64 }).notNull(), // industrie, bancaire, pharmaceutique, tourisme
  projectType: varchar("project_type", { length: 64 }).notNull(), // video, photo, motion, event, etc.
  imageUrl: varchar("image_url", { length: 512 }),
  videoUrl: varchar("video_url", { length: 512 }),
  featured: int("featured").default(0),
  domain: varchar("domain", { length: 64 }).default("com"), // com ou ch
  status: mysqlEnum("status", ["draft", "published"]).default("published").notNull(),
  visibleFr: int("visible_fr").default(1).notNull(), // visible on FR site
  visibleEn: int("visible_en").default(1).notNull(), // visible on EN site
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * Admin credentials table for /g40mconnect login
 */
export const adminCredentials = mysqlTable("admin_credentials", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AdminCredential = typeof adminCredentials.$inferSelect;
export type InsertAdminCredential = typeof adminCredentials.$inferInsert;

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

/**
 * News/Articles table
 */
export const news = mysqlTable("news", {
  id: int("id").autoincrement().primaryKey(),
  titleFr: varchar("title_fr", { length: 255 }).notNull(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  slugFr: varchar("slug_fr", { length: 255 }).notNull().unique(),
  slugEn: varchar("slug_en", { length: 255 }).notNull().unique(),
  contentFr: text("content_fr"),
  contentEn: text("content_en"),
  excerptFr: text("excerpt_fr"),
  excerptEn: text("excerpt_en"),
  imageUrl: varchar("image_url", { length: 512 }),
  category: varchar("category", { length: 64 }).notNull(), // Animation 3D, Corporate, Interview, Motion Design, Publicité, Reportage, etc.
  status: mysqlEnum("status", ["draft", "published"]).default("published").notNull(),
  visibleFr: int("visible_fr").default(1).notNull(),
  visibleEn: int("visible_en").default(1).notNull(),
  featured: int("featured").default(0),
  domain: varchar("domain", { length: 64 }).default("com"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;