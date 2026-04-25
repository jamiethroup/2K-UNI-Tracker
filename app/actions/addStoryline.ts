'use server'

import { db } from '@/db';
import { storylines } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function addStorylineAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  if (!title) throw new Error("Title is required");

  try {
    await db.insert(storylines).values({
      userId,
      title,
      description,
    });

    revalidatePath('/storylines');
    return { success: true };
  } catch (error) {
    console.error("Failed to add storyline:", error);
    throw new Error("Database update failed.");
  }
}