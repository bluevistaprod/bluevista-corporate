import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  projects,
  testimonials,
  metrics,
  contactSubmissions,
  newsletterSubscriptions,
  news,
  type Project,
  type Testimonial,
  type Metric,
  type ContactSubmission,
  type NewsletterSubscription,
  type News,
} from "../drizzle/schema";
import { ENV } from "./_core/env";
import type { Domain } from "../shared/i18n";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db) {
    const dbUrl = process.env.DATABASE_URL || ENV.databaseUrl;
    if (dbUrl) {
      try {
        _db = drizzle(dbUrl);
      } catch (error) {
        console.warn("[Database] Failed to connect:", error);
        _db = null;
      }
    }
  }
  return _db;
}

// ============================================================================
// USER QUERIES
// ============================================================================

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================================================
// PROJECT QUERIES
// ============================================================================

export async function getProjects(domain: Domain = "com", limit = 100) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(projects)
    .where(eq(projects.domain, domain))
    .orderBy(desc(projects.createdAt))
    .limit(limit);
}

export async function getFeaturedProjects(domain: Domain = "com", limit = 6) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(projects)
    .where(and(eq(projects.domain, domain), eq(projects.featured, 1)))
    .orderBy(desc(projects.createdAt))
    .limit(limit);
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getProjectsBySector(
  sector: string,
  domain: Domain = "com"
) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(projects)
    .where(and(eq(projects.domain, domain), eq(projects.sector, sector)))
    .orderBy(desc(projects.createdAt));
}

export async function createProject(project: typeof projects.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(projects).values(project);
  return result;
}

export async function createProjectsBulk(projectsList: (typeof projects.$inferInsert)[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Insert in batches of 50 to avoid query size limits
  const batchSize = 50;
  for (let i = 0; i < projectsList.length; i += batchSize) {
    const batch = projectsList.slice(i, i + batchSize);
    await db.insert(projects).values(batch);
  }
  
  return { inserted: projectsList.length };
}

export async function updateProject(
  id: number,
  updates: Partial<typeof projects.$inferInsert>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.update(projects).set(updates).where(eq(projects.id, id));
}

export async function deleteProject(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.delete(projects).where(eq(projects.id, id));
}

// ============================================================================
// TESTIMONIAL QUERIES
// ============================================================================

export async function getTestimonials(domain: Domain = "com", limit = 100) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.domain, domain))
    .orderBy(desc(testimonials.createdAt))
    .limit(limit);
}

export async function getFeaturedTestimonials(
  domain: Domain = "com",
  limit = 5
) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(testimonials)
    .where(and(eq(testimonials.domain, domain), eq(testimonials.featured, 1)))
    .orderBy(desc(testimonials.createdAt))
    .limit(limit);
}

export async function createTestimonial(
  testimonial: typeof testimonials.$inferInsert
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.insert(testimonials).values(testimonial);
}

// ============================================================================
// METRIC QUERIES
// ============================================================================

export async function getMetrics(domain: Domain = "com") {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(metrics)
    .where(eq(metrics.domain, domain))
    .orderBy(metrics.order);
}

export async function createMetric(metric: typeof metrics.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.insert(metrics).values(metric);
}

// ============================================================================
// CONTACT SUBMISSION QUERIES
// ============================================================================

export async function createContactSubmission(
  submission: typeof contactSubmissions.$inferInsert
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.insert(contactSubmissions).values(submission);
}

export async function getContactSubmissions(domain: Domain = "com") {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(contactSubmissions)
    .where(eq(contactSubmissions.domain, domain))
    .orderBy(desc(contactSubmissions.createdAt));
}

// ============================================================================
// NEWSLETTER QUERIES
// ============================================================================

export async function subscribeNewsletter(
  email: string,
  language: "fr" | "en" = "fr",
  domain: Domain = "com"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db
    .insert(newsletterSubscriptions)
    .values({ email, language, domain, subscribed: 1 })
    .onDuplicateKeyUpdate({
      set: { subscribed: 1, updatedAt: new Date() },
    });
}

export async function getNewsletterSubscribers(domain: Domain = "com") {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(newsletterSubscriptions)
    .where(
      and(
        eq(newsletterSubscriptions.domain, domain),
        eq(newsletterSubscriptions.subscribed, 1)
      )
    );
}

// ============================================================================
// NEWS/ARTICLES QUERIES
// ============================================================================

export async function getAllNews(domain: Domain = "com", limit = 100) {
  const db = await getDb();
  if (!db) return [];

  // Always filter by visible_fr = 1 for now (can be extended for language-specific visibility)
  return db
    .select()
    .from(news)
    .where(and(eq(news.domain, domain), eq(news.status, "published"), eq(news.visibleFr, 1)))
    .orderBy(desc(news.createdAt))
    .limit(limit);
}

export async function getAllNewsAdmin(domain: Domain = "com", limit = 500) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(news)
    .where(eq(news.domain, domain))
    .orderBy(desc(news.createdAt))
    .limit(limit);
}

export async function getNewsBySlug(slug: string, language: "fr" | "en" = "fr") {
  const db = await getDb();
  if (!db) return null;

  const slugField = language === "fr" ? news.slugFr : news.slugEn;
  const result = await db
    .select()
    .from(news)
    .where(and(eq(slugField, slug), eq(news.status, "published")))
    .limit(1);

  return result[0] || null;
}

export async function getNewsByCategory(
  category: string,
  domain: Domain = "com",
  limit = 50
) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(news)
    .where(
      and(
        eq(news.domain, domain),
        eq(news.category, category),
        eq(news.status, "published")
      )
    )
    .orderBy(desc(news.createdAt))
    .limit(limit);
}

export async function createNews(article: typeof news.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.insert(news).values(article);
}

export async function updateNews(
  id: number,
  updates: Partial<typeof news.$inferInsert>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.update(news).set(updates).where(eq(news.id, id));
}

export async function deleteNews(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.delete(news).where(eq(news.id, id));
}
