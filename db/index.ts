import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from './schema';

// This exports the 'db' object you will use to run all your queries
export const db = drizzle(sql, { schema });