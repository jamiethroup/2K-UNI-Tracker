'use server'

import { db } from '@/db';
import { storylines } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function deleteStorylineAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const storylineId = Number(formData.get('storylineId'));
  if (!storylineId) throw new Error("Missing Storyline ID");

  try {
    await db.delete(storylines)
      .where(and(
        eq(storylines.id, storylineId),
        eq(storylines.userId, userId) // Ensure they only delete their own
      ));

    revalidatePath('/storylines');
  } catch (error) {
    console.error("Failed to delete storyline:", error);
    throw new Error("Database deletion failed.");
  }
}