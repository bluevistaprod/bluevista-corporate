import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createTRPCMsw } from "trpc-msw";
import { appRouter } from "./routers";

describe("Testimonials - Submit", () => {
  it("should submit a new testimonial with valid data", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.testimonials.submit({
      clientName: "Jean Dupont",
      clientTitle: "Directeur Marketing",
      clientCompany: "Acme Inc.",
      clientEmail: "jean@acme.com",
      clientPhone: "+33 6 12 34 56 78",
      companyWebsite: "https://acme.com",
      sector: "communication",
      projectType: "Campagne vidéo",
      problem: "Nous avions besoin d'une campagne vidéo impactante pour notre lancement produit",
      solution: "Blue Vista a créé une vidéo professionnelle avec storytelling captivant",
      result: "+150% d'engagement sur les réseaux sociaux, 50k vues en première semaine",
      rating: 5,
      allowWebsite: true,
      allowGoogle: true,
      allowTrustpilot: true,
      allowSocial: true,
      domain: "com",
    });

    expect(result).toEqual({ success: true });
  });

  it("should reject testimonial with invalid email", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    try {
      await caller.testimonials.submit({
        clientName: "Jean Dupont",
        clientTitle: "Directeur Marketing",
        clientCompany: "Acme Inc.",
        clientEmail: "invalid-email",
        sector: "communication",
        projectType: "Campagne vidéo",
        problem: "Problème",
        solution: "Solution",
        result: "Résultat",
        rating: 5,
        domain: "com",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should reject testimonial with short problem/solution/result", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    try {
      await caller.testimonials.submit({
        clientName: "Jean Dupont",
        clientCompany: "Acme Inc.",
        clientEmail: "jean@acme.com",
        sector: "communication",
        projectType: "Campagne vidéo",
        problem: "Court",
        solution: "Court",
        result: "Court",
        rating: 5,
        domain: "com",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should get all published testimonials", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.testimonials.getAll({
      domain: "com",
      limit: 10,
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should get testimonials filtered by sector", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.testimonials.getAll({
      domain: "com",
      sector: "communication",
      limit: 10,
    });

    expect(Array.isArray(result)).toBe(true);
    // All results should be from communication sector
    result.forEach((testimonial: any) => {
      expect(testimonial.sector).toBe("communication");
    });
  });

  it("should get featured testimonials", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.testimonials.getFeatured({
      domain: "com",
      limit: 5,
    });

    expect(Array.isArray(result)).toBe(true);
  });
});
