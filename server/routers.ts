import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  getFilterOptions,
} from "./db";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// Validation schemas
const memberInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  yearOfAdmission: z.number().min(1900).max(new Date().getFullYear()),
  degreeProgram: z.string().min(1, "Degree program is required"),
  rollNumber: z.string().min(1, "Roll number is required"),
  department: z.string().optional().nullable(),
  city: z.string().min(1, "City is required"),
  permanentAddress: z.string().optional().nullable(),
  photoUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  socialLinks: z.string().optional().nullable(),
});

const memberFilterSchema = z.object({
  yearOfAdmission: z.number().optional(),
  degreeProgram: z.string().optional(),
  city: z.string().optional(),
  searchTerm: z.string().optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Member management procedures
  members: router({
    // Public: Get all members with optional filters
    list: publicProcedure
      .input(memberFilterSchema)
      .query(async ({ input }) => {
        return await getAllMembers({
          yearOfAdmission: input.yearOfAdmission,
          degreeProgram: input.degreeProgram,
          city: input.city,
          searchTerm: input.searchTerm,
        });
      }),

    // Public: Get a single member by ID
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getMemberById(input.id);
      }),

    // Public: Get filter options
    getFilterOptions: publicProcedure.query(async () => {
      return await getFilterOptions();
    }),

    // Admin: Create a new member
    create: adminProcedure
      .input(memberInputSchema)
      .mutation(async ({ input }) => {
        try {
          const member = await createMember({
            ...input,
            isVerified: true,
          });
          if (!member) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to create member",
            });
          }
          return member;
        } catch (error) {
          if (error instanceof TRPCError) throw error;
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create member",
          });
        }
      }),

    // Admin: Update a member
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          data: memberInputSchema.partial(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const member = await updateMember(input.id, input.data);
          if (!member) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Member not found",
            });
          }
          return member;
        } catch (error) {
          if (error instanceof TRPCError) throw error;
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update member",
          });
        }
      }),

    // Admin: Delete a member
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        try {
          const success = await deleteMember(input.id);
          if (!success) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Member not found",
            });
          }
          return { success: true };
        } catch (error) {
          if (error instanceof TRPCError) throw error;
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete member",
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
