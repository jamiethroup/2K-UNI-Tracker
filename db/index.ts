import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Create the connection using your env variable
const sql = neon(process.env.DATABASE_URL!);

// Export the db instance
export const db = drizzle(sql, { schema });