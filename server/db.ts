import { eq, like, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, members, InsertMember, Member } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

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
      values.role = 'admin';
      updateSet.role = 'admin';
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

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Member queries

export async function getAllMembers(filters?: {
  yearOfAdmission?: number;
  degreeProgram?: string;
  city?: string;
  searchTerm?: string;
}): Promise<Member[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get members: database not available");
    return [];
  }

  try {
    const conditions: any[] = [];

    if (filters?.yearOfAdmission) {
      conditions.push(eq(members.yearOfAdmission, filters.yearOfAdmission));
    }
    if (filters?.degreeProgram) {
      conditions.push(eq(members.degreeProgram, filters.degreeProgram));
    }
    if (filters?.city) {
      conditions.push(like(members.city, `%${filters.city}%`));
    }
    if (filters?.searchTerm) {
      conditions.push(like(members.name, `%${filters.searchTerm}%`));
    }

    let query: any = db.select().from(members);
    if (conditions.length > 0) {
      query = db.select().from(members).where(and(...conditions));
    }

    const results = await query.orderBy(desc(members.createdAt));
    return results;
  } catch (error) {
    console.error("[Database] Failed to get members:", error);
    return [];
  }
}

export async function getMemberById(id: number): Promise<Member | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get member: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(members).where(eq(members.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get member:", error);
    return undefined;
  }
}

export async function createMember(data: InsertMember): Promise<Member | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create member: database not available");
    return null;
  }

  try {
    const result = await db.insert(members).values(data);
    const insertId = (result as any).insertId || (result as any)[0]?.insertId;
    if (!insertId) return null;
    const newMember = await getMemberById(Number(insertId));
    return newMember ?? null;
  } catch (error) {
    console.error("[Database] Failed to create member:", error);
    throw error;
  }
}

export async function updateMember(id: number, data: Partial<InsertMember>): Promise<Member | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update member: database not available");
    return null;
  }

  try {
    await db.update(members).set({ ...data, updatedAt: new Date() }).where(eq(members.id, id));
    const updated = await getMemberById(id);
    return updated ?? null;
  } catch (error) {
    console.error("[Database] Failed to update member:", error);
    throw error;
  }
}

export async function deleteMember(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete member: database not available");
    return false;
  }

  try {
    await db.delete(members).where(eq(members.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete member:", error);
    throw error;
  }
}

export async function getFilterOptions(): Promise<{
  years: number[];
  degrees: string[];
  cities: string[];
}> {
  const db = await getDb();
  if (!db) {
    return { years: [], degrees: [], cities: [] };
  }

  try {
    const allMembers = await db.select().from(members);
    const years = Array.from(new Set(allMembers.map(m => m.yearOfAdmission))).sort((a, b) => b - a);
    const degrees = Array.from(new Set(allMembers.map(m => m.degreeProgram)));
    const cities = Array.from(new Set(allMembers.map(m => m.city)));
    return { years, degrees, cities };
  } catch (error) {
    console.error("[Database] Failed to get filter options:", error);
    return { years: [], degrees: [], cities: [] };
  }
}
