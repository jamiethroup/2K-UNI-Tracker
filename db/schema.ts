import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core';

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
});