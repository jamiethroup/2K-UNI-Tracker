'use server'

import { db } from '@/db';
import { feuds } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function addFeudAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  // formData.getAll gets all checkboxes with name="superstars"
  const superstarIds = formData.getAll('superstars').map(id => Number(id)); 

  if (!title) throw new Error("Title is required");

  await db.insert(feuds).values({
    userId, title, description, startDate, endDate, status: 'Active', superstars: superstarIds
  });

  revalidatePath('/feuds');
}

export async function updateFeudAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const feudId = Number(formData.get('feudId'));
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  const status = formData.get('status') as string;
  const superstarIds = formData.getAll('superstars').map(id => Number(id)); 

  await db.update(feuds)
    .set({ title, description, startDate, endDate, status, superstars: superstarIds })
    .where(and(eq(feuds.id, feudId), eq(feuds.userId, userId)));

  revalidatePath('/feuds');
}

export async function deleteFeudAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const feudId = Number(formData.get('feudId'));

  await db.delete(feuds).where(and(eq(feuds.id, feudId), eq(feuds.userId, userId)));
  revalidatePath('/feuds');
}