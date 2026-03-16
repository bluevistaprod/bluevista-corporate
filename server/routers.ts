import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  getProjects,
  getFeaturedProjects,
  getProjectsBySector,
  getProjectById,
  createProject,
  getTestimonials,
  getFeaturedTestimonials,
  createTestimonial,
  getMetrics,
  createMetric,
  createContactSubmission,
  getContactSubmissions,
  subscribeNewsletter,
} from "./db";
import type { Domain } from "@shared/i18n";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ============================================================================
  // PORTFOLIO PROCEDURES
  // ============================================================================

  portfolio: router({
    /**
     * Get all projects for a domain
     */
    getAll: publicProcedure
      .input(
        z.object({
          domain: z.enum(["com", "ch"]).default("com"),
          limit: z.number().default(100),
        })
      )
      .query(async ({ input }) => {
        return getProjects(input.domain as Domain, input.limit);
      }),

    /**
     * Get featured projects
     */
    getFeatured: publicProcedure
      .input(
        z.object({
          domain: z.enum(["com", "ch"]).default("com"),
          limit: z.number().default(6),
        })
      )
      .query(async ({ input }) => {
        return getFeaturedProjects(input.domain as Domain, input.limit);
      }),

    /**
     * Get projects by sector
     */
    getBySector: publicProcedure
      .input(
        z.object({
          sector: z.string(),
          domain: z.enum(["com", "ch"]).default("com"),
        })
      )
      .query(async ({ input }) => {
        return getProjectsBySector(input.sector, input.domain as Domain);
      }),

    /**
     * Get project by ID
     */
    getById: publicProcedure
      .input(
        z.object({
          id: z.string(),
        })
      )
      .query(async ({ input }) => {
        return getProjectById(parseInt(input.id));
      }),

    /**
     * Create project (admin only)
     */
    create: protectedProcedure
      .input(
        z.object({
          titleFr: z.string(),
          titleEn: z.string(),
          descriptionFr: z.string().optional(),
          descriptionEn: z.string().optional(),
          sector: z.string(),
          projectType: z.string(),
          imageUrl: z.string().optional(),
          videoUrl: z.string().optional(),
          featured: z.number().default(0),
          domain: z.enum(["com", "ch"]).default("com"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return createProject(input);
      }),
  }),

  // ============================================================================
  // TESTIMONIALS PROCEDURES
  // ============================================================================

  testimonials: router({
    /**
     * Get all testimonials
     */
    getAll: publicProcedure
      .input(
        z.object({
          domain: z.enum(["com", "ch"]).default("com"),
          limit: z.number().default(100),
        })
      )
      .query(async ({ input }) => {
        return getTestimonials(input.domain as Domain, input.limit);
      }),

    /**
     * Get featured testimonials
     */
    getFeatured: publicProcedure
      .input(
        z.object({
          domain: z.enum(["com", "ch"]).default("com"),
          limit: z.number().default(5),
        })
      )
      .query(async ({ input }) => {
        return getFeaturedTestimonials(input.domain as Domain, input.limit);
      }),

    /**
     * Create testimonial (admin only)
     */
    create: protectedProcedure
      .input(
        z.object({
          clientName: z.string(),
          clientRole: z.string().optional(),
          clientCompany: z.string().optional(),
          contentFr: z.string(),
          contentEn: z.string(),
          videoUrl: z.string().optional(),
          imageUrl: z.string().optional(),
          rating: z.number().default(5),
          featured: z.number().default(0),
          domain: z.enum(["com", "ch"]).default("com"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return createTestimonial(input);
      }),
  }),

  // ============================================================================
  // METRICS PROCEDURES
  // ============================================================================

  metrics: router({
    /**
     * Get all metrics
     */
    getAll: publicProcedure
      .input(
        z.object({
          domain: z.enum(["com", "ch"]).default("com"),
        })
      )
      .query(async ({ input }) => {
        return getMetrics(input.domain as Domain);
      }),

    /**
     * Create metric (admin only)
     */
    create: protectedProcedure
      .input(
        z.object({
          labelFr: z.string(),
          labelEn: z.string(),
          value: z.string(),
          order: z.number().default(0),
          domain: z.enum(["com", "ch"]).default("com"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return createMetric(input);
      }),
  }),

  // ============================================================================
  // CONTACT & FORMS PROCEDURES
  // ============================================================================

  contact: router({
    /**
     * Submit contact form
     */
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(2),
          email: z.string().email(),
          phone: z.string().optional(),
          company: z.string().optional(),
          subject: z.string().min(5),
          message: z.string().min(10),
          type: z.enum(["contact", "devis"]).default("contact"),
          domain: z.enum(["com", "ch"]).default("com"),
        })
      )
      .mutation(async ({ input }) => {
        await createContactSubmission({
          ...input,
          status: "new",
        });

        // TODO: Send email notification to admin
        // TODO: Send confirmation email to user

        return { success: true };
      }),

    /**
     * Get all submissions (admin only)
     */
    getAll: protectedProcedure
      .input(
        z.object({
          domain: z.enum(["com", "ch"]).default("com"),
        })
      )
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return getContactSubmissions(input.domain as Domain);
      }),
  }),

  // ============================================================================
  // SITEMAP PROCEDURES
  // ============================================================================

  sitemap: router({
    /**
     * Get sitemap XML
     */
    get: publicProcedure
      .input(
        z.object({
          domain: z.enum(["com", "ch"]).default("com"),
        })
      )
      .query(async ({ input }) => {
        const { generateSitemap } = await import("./sitemap");
        const baseUrl = input.domain === "ch" ? "https://bluevista.ch" : "https://bluevistaprod.com";
        return generateSitemap(input.domain as Domain, baseUrl);
      }),
  }),

  // ============================================================================
  // NEWSLETTER PROCEDURES
  // ============================================================================

  newsletter: router({
    /**
     * Subscribe to newsletter
     */
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          language: z.enum(["fr", "en"]).default("fr"),
          domain: z.enum(["com", "ch"]).default("com"),
        })
      )
      .mutation(async ({ input }) => {
        await subscribeNewsletter(
          input.email,
          input.language,
          input.domain as Domain
        );

        // TODO: Send welcome email

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
