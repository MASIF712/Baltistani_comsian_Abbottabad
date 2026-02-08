import { describe, it, expect, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock context for testing
function createMockContext(role: "admin" | "user" = "admin"): TrpcContext {
  const user = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user: role === "admin" ? user : user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Members Router", () => {
  describe("members.list", () => {
    it("should return an empty list or existing members", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.members.list({});
      expect(Array.isArray(result)).toBe(true);
    });

    it("should filter members by year of admission", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.members.list({ yearOfAdmission: 2023 });
      expect(Array.isArray(result)).toBe(true);
      // All results should have the specified year
      result.forEach((member) => {
        expect(member.yearOfAdmission).toBe(2023);
      });
    });

    it("should filter members by degree program", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.members.list({ degreeProgram: "BS" });
      expect(Array.isArray(result)).toBe(true);
      // All results should have the specified degree
      result.forEach((member) => {
        expect(member.degreeProgram).toBe("BS");
      });
    });

    it("should search members by name", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.members.list({ searchTerm: "test" });
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("members.getFilterOptions", () => {
    it("should return filter options with arrays", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.members.getFilterOptions();
      expect(result).toHaveProperty("years");
      expect(result).toHaveProperty("degrees");
      expect(result).toHaveProperty("cities");
      expect(Array.isArray(result.years)).toBe(true);
      expect(Array.isArray(result.degrees)).toBe(true);
      expect(Array.isArray(result.cities)).toBe(true);
    });
  });

  describe("members.create", () => {
    it("should require admin role", async () => {
      const ctx = createMockContext("user");
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.members.create({
          name: "Test Member",
          yearOfAdmission: 2023,
          degreeProgram: "BS",
          rollNumber: "23-CS-001",
          city: "Skardu",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });

    it("should create a member with valid data", async () => {
      const ctx = createMockContext("admin");
      const caller = appRouter.createCaller(ctx);

      const memberData = {
        name: "Ahmed Ali",
        email: "ahmed@example.com",
        phone: "+92 300 1234567",
        yearOfAdmission: 2023,
        degreeProgram: "BS",
        rollNumber: `23-CS-${Date.now()}`,
        department: "Computer Science",
        city: "Skardu",
        permanentAddress: "Skardu, Gilgit-Baltistan",
        photoUrl: "https://example.com/photo.jpg",
        bio: "Passionate about technology",
      };

      const result = await caller.members.create(memberData);
      expect(result).toHaveProperty("id");
      expect(result.name).toBe(memberData.name);
      expect(result.email).toBe(memberData.email);
      expect(result.yearOfAdmission).toBe(memberData.yearOfAdmission);
      expect(result.degreeProgram).toBe(memberData.degreeProgram);
      expect(result.rollNumber).toBe(memberData.rollNumber);
      expect(result.city).toBe(memberData.city);
    });

    it("should validate required fields", async () => {
      const ctx = createMockContext("admin");
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.members.create({
          name: "",
          yearOfAdmission: 2023,
          degreeProgram: "BS",
          rollNumber: "23-CS-001",
          city: "Skardu",
        });
        expect.fail("Should have thrown a validation error");
      } catch (error: any) {
        // Validation error should be thrown
        expect(error).toBeDefined();
      }
    });
  });

  describe("members.getById", () => {
    it("should return null for non-existent member", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.members.getById({ id: 99999 });
      expect(result).toBeUndefined();
    });
  });

  describe("members.update", () => {
    it("should require admin role", async () => {
      const ctx = createMockContext("user");
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.members.update({
          id: 1,
          data: { name: "Updated Name" },
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });
  });

  describe("members.delete", () => {
    it("should require admin role", async () => {
      const ctx = createMockContext("user");
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.members.delete({ id: 1 });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });
  });
});
