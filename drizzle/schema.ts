import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

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
 * Members table for storing COMSATS Abbottabad students from Gilgit-Baltistan
 */
export const members = mysqlTable("members", {
  id: int("id").autoincrement().primaryKey(),
  /** Full name of the member */
  name: varchar("name", { length: 255 }).notNull(),
  /** Email address */
  email: varchar("email", { length: 320 }),
  /** Phone number */
  phone: varchar("phone", { length: 20 }),
  /** Year of admission (e.g., 2020, 2021, 2022) */
  yearOfAdmission: int("yearOfAdmission").notNull(),
  /** Degree program (e.g., BS, MS, PhD) */
  degreeProgram: varchar("degreeProgram", { length: 100 }).notNull(),
  /** University roll number */
  rollNumber: varchar("rollNumber", { length: 50 }).notNull().unique(),
  /** Department/Program name */
  department: varchar("department", { length: 255 }),
  /** City/Region in Baltistan */
  city: varchar("city", { length: 100 }).notNull(),
  /** Permanent address */
  permanentAddress: text("permanentAddress"),
  /** Photo URL (stored in S3) */
  photoUrl: text("photoUrl"),
  /** Bio or short description */
  bio: text("bio"),
  /** Social media links (stored as JSON string) */
  socialLinks: text("socialLinks"),
  /** Whether member is verified */
  isVerified: boolean("isVerified").default(false).notNull(),
  /** Created timestamp */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** Updated timestamp */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Member = typeof members.$inferSelect;
export type InsertMember = typeof members.$inferInsert;

/**
 * Departments table for storing university departments with senior information
 */
export const departments = mysqlTable("departments", {
  id: int("id").autoincrement().primaryKey(),
  /** Department name (e.g., Computer Science, Electrical Engineering) */
  name: varchar("name", { length: 255 }).notNull(),
  /** Department description */
  description: text("description"),
  /** Senior member ID who leads this department */
  seniorId: int("seniorId"),
  /** Department image/logo URL */
  imageUrl: text("imageUrl"),
  /** Created timestamp */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** Updated timestamp */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Department = typeof departments.$inferSelect;
export type InsertDepartment = typeof departments.$inferInsert;

/**
 * Events table for storing get-together events and seminars
 */
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  /** Event title */
  title: varchar("title", { length: 255 }).notNull(),
  /** Event description */
  description: text("description"),
  /** Event date and time */
  eventDate: timestamp("eventDate").notNull(),
  /** Event location */
  location: varchar("location", { length: 255 }),
  /** Event image/poster URL */
  imageUrl: text("imageUrl"),
  /** Google Drive link for event details and photos */
  googleDriveLink: text("googleDriveLink"),
  /** Event type (e.g., 'get-together', 'seminar', 'workshop') */
  eventType: varchar("eventType", { length: 100 }).default("get-together"),
  /** Semester (e.g., 'Spring 2024', 'Fall 2024') */
  semester: varchar("semester", { length: 100 }),
  /** Created timestamp */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** Updated timestamp */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

/**
 * Community news and updates table
 */
export const communityNews = mysqlTable("communityNews", {
  id: int("id").autoincrement().primaryKey(),
  /** News title */
  title: varchar("title", { length: 255 }).notNull(),
  /** News content/body */
  content: text("content").notNull(),
  /** News category (e.g., 'weekly', 'monthly', 'announcement') */
  category: varchar("category", { length: 100 }).notNull(),
  /** News image/thumbnail URL */
  imageUrl: text("imageUrl"),
  /** Author/Creator ID */
  authorId: int("authorId"),
  /** Is this news pinned/featured */
  isPinned: boolean("isPinned").default(false),
  /** Created timestamp */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** Updated timestamp */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CommunityNews = typeof communityNews.$inferSelect;
export type InsertCommunityNews = typeof communityNews.$inferInsert;