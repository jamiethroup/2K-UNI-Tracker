// app/actions/bookTitle.ts
'use server'

import { db } from '@/db';
import { championships } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function bookTitleChangeAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const titleId = Number(formData.get('titleId'));
  const newChampionId = Number(formData.get('championId'));

  if (!titleId || !newChampionId) {
    throw new Error("Missing title or champion ID");
  }

  try {
    await db.update(championships)
      .set({ 
        currentHolderId: newChampionId,
        daysHeld: 0 // Reset the counter for the new champ!
      })
      .where(and(
        eq(championships.id, titleId),
        eq(championships.userId, userId)
      ));

    // Refresh the pages so the new data shows up instantly
    revalidatePath('/champions');
    revalidatePath('/');
    
  } catch (error) {
    console.error("Botched finish! Failed to update title:", error);
    throw new Error("Database update failed.");
  }
}