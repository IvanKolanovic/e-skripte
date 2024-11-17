import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/db/schema.ts',
	out: './supabase/migrations',
	dbCredentials: {
		host: 'localhost',
		port: 54322,
		user: 'postgres',
		password: 'postgres',
		database: 'postgres'
	}
});
