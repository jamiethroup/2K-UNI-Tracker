'use server'

import { db } from '@/db';
import { superstars, championships } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { defaultRoster } from '@/lib/defaultRoster';
import { defaultTitles } from '@/lib/defaultTitles'; // Import the new titles
import { revalidatePath } from 'next/cache';

export async function seedUniverseAction() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

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
    await db.insert(championships).values(titlesWithUser); // Insert titles
    
    revalidatePath('/');
    revalidatePath('/champions');
    return { success: true };
  } catch (error) {
    console.error("Botch! Failed to seed roster:", error);
    return { success: false, error: "Failed to initialize Universe." };
  }
}