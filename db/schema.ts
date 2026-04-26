import { pgTable, serial, text, integer, boolean, varchar, timestamp } from 'drizzle-orm/pg-core';

export const superstars = pgTable('superstars', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // Ties to Clerk auth().userId
  name: text('name').notNull(),
  brand: text('brand').notNull(), // e.g., 'RAW', 'SmackDown', 'NXT', 'Free Agent'
  overall: integer('overall').default(80),
  isHeel: boolean('is_heel').default(false),
});

export const championships = pgTable('championships', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // Ties to Clerk auth().userId
  name: text('name').notNull(),
  brand: text('brand').notNull(),
  currentHolderId: integer('current_holder_id'), // Can be null if vacant
  daysHeld: integer('days_held').default(0),
  image: text('image'), // Championship belt image URL
});

export const storylines = pgTable('storylines', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // CRITICAL: Ties it to the Clerk user
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').default('Ongoing'), // e.g., 'Ongoing', 'Completed'
  createdAt: timestamp('created_at').defaultNow(),
});

export const feuds = pgTable('feuds', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  startDate: text('start_date'), // e.g., "WrestleMania Backlash" or "2026-05-12"
  endDate: text('end_date'),
  status: text('status').default('Active'), // 'Active' or 'Archived'
  superstars: integer('superstars').array(), // Stores an array of superstar IDs
  createdAt: timestamp('created_at').defaultNow(),
});