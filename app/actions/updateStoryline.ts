'use server'

import { db } from '@/db';
import { storylines } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function updateStorylineAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const storylineId = Number(formData.get('storylineId'));
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as string;

  if (!storylineId || !title) throw new Error("Missing required fields");

  try {
    await db.update(storylines)
      .set({ 
        title,
        description,
        status 
      })
      .where(and(
        eq(storylines.id, storylineId),
        eq(storylines.userId, userId)
      ));

    revalidatePath('/storylines');
  } catch (error) {
    console.error("Failed to update storyline:", error);
    throw new Error("Database update failed.");
  }
}
