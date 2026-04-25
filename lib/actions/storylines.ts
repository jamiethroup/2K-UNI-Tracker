// lib/actions/storylines.ts
'use server'

import { db } from '@/db'; // Adjust based on your db export
import { storylines } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function createStoryline(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  await db.insert(storylines).values({
    title,
    description,
  });

  revalidatePath('/storylines');
}