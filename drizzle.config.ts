import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Load local environment variables for the Drizzle CLI
dotenv.config({ path: '.env.local' });

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});