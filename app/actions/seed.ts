// app/actions/seed.ts
'use server'

import { db } from '@/db';
import { superstars } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { defaultRoster } from '@/lib/defaultRoster';
import { revalidatePath } from 'next/cache';

export async function seedUniverseAction() {
  // 1. Get the active user
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 2. Attach the userId to every single superstar in the default list
  const rosterWithUser = defaultRoster.map((star) => ({
    ...star,
    userId: userId,
  }));

  try {
    // 3. Drizzle handles bulk inserts natively, which is incredibly fast
    await db.insert(superstars).values(rosterWithUser);
    
    // 4. Refresh the page to show the new data
    revalidatePath('/');
  } catch (error) {
    console.error("Botch! Failed to seed roster:", error);
    throw new Error("Failed to initialize Universe.");
  }
}