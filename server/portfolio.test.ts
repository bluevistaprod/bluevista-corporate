import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock context for testing
function createMockContext(isAdmin = false): TrpcContext {
  return {
    user: isAdmin
      ? {
          id: 1,
          openId: "admin-user",
          email: "admin@example.com",
          name: "Admin User",
          loginMethod: "manus",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSignedIn: new Date(),
        }
      : null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Portfolio Router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  it("should get all projects", async () => {
    const result = await caller.portfolio.getAll({
      domain: "com",
      limit: 10,
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should get featured projects", async () => {
    const result = await caller.portfolio.getFeatured({
      domain: "com",
      limit: 6,
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should get projects by sector", async () => {
    const result = await caller.portfolio.getBySector({
      sector: "industrie",
      domain: "com",
    });

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Testimonials Router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  it("should get all testimonials", async () => {
    const result = await caller.testimonials.getAll({
      domain: "com",
      limit: 10,
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should get featured testimonials", async () => {
    const result = await caller.testimonials.getFeatured({
      domain: "com",
      limit: 5,
    });

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Metrics Router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  it("should get all metrics", async () => {
    const result = await caller.metrics.getAll({
      domain: "com",
    });

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Contact Router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  it("should submit contact form", async () => {
    const result = await caller.contact.submit({
      name: "Test User",
      email: "test@example.com",
      subject: "Test Subject",
      message: "This is a test message",
      type: "contact",
      domain: "com",
    });

    expect(result.success).toBe(true);
  });
});

describe("Newsletter Router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  it("should subscribe to newsletter", async () => {
    const result = await caller.newsletter.subscribe({
      email: `test-${Date.now()}@example.com`,
      language: "fr",
      domain: "com",
    });

    expect(result.success).toBe(true);
  });
});
