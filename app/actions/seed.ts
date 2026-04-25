'use server'

import { db } from '@/db';
import { superstars, championships } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { defaultRoster } from '@/lib/defaultRoster';
import { defaultTitles } from '@/lib/defaultTitles';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export async function seedUniverseAction() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Check if user already has data to prevent duplicate seeding
  const existingRoster = await db.select().from(superstars).where(eq(superstars.userId, userId));
  if (existingRoster.length > 0) {
    console.log("Roster already seeded for this user, skipping...");
    revalidatePath('/');
    return;
  }

  const rosterWithUser = defaultRoster.map((star) => ({
    ...star,
    userId: userId,
  }));

  const titlesWithUser = defaultTitles.map((title) => ({
    ...title,
    userId: userId,
    // Leaving currentHolderId null for now (Vacant) so you can assign them!
  }));

  try {
    await db.insert(superstars).values(rosterWithUser);
    await db.insert(championships).values(titlesWithUser);
    
    revalidatePath('/');
    revalidatePath('/champions');
  } catch (error) {
    console.error("Botch! Failed to seed roster:", error);
    throw new Error("Failed to initialize Universe.");
  }
}