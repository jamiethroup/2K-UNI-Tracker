// app/actions/clearRoster.ts
'use server'

import { db } from '@/db';
import { superstars, championships } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function clearRosterAction() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    // Delete all superstars and championships for this user
    await db.delete(superstars).where(eq(superstars.userId, userId));
    await db.delete(championships).where(eq(championships.userId, userId));
    
    revalidatePath('/');
    revalidatePath('/champions');
  } catch (error) {
    console.error("Failed to clear roster:", error);
    throw new Error("Failed to clear roster.");
  }
}
