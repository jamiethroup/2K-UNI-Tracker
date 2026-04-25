'use server'

import { db } from '@/db';
import { superstars } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function updateSuperstarAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const superstarId = Number(formData.get('superstarId'));
  const brand = formData.get('brand') as string;
  const overall = Number(formData.get('overall'));
  const isHeel = formData.get('isHeel') === 'true'; // Checkbox/select string to boolean

  if (!superstarId || !brand || !overall) {
    throw new Error("Missing required fields");
  }

  try {
    await db.update(superstars)
      .set({ 
        brand,
        overall,
        isHeel
      })
      .where(and(
        eq(superstars.id, superstarId),
        eq(superstars.userId, userId)
      ));

    // Refresh the page so the new stats show up instantly
    revalidatePath('/');
    return { success: true };
    
  } catch (error) {
    console.error("Failed to update superstar:", error);
    throw new Error("Database update failed.");
  }
}