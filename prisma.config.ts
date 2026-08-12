import { defineConfig, env } from "prisma/config";

// Prisma 7: the CLI reads connection URLs from this file, not from schema.prisma.
// Load .env explicitly (the CLI does not auto-load it when this file exists).
try {
  process.loadEnvFile();
} catch {
  // no .env file — rely on real environment variables
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // DIRECT_URL for migrations (Supabase: the non-pooled 5432 string).
    url: env("DIRECT_URL"),
  },
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.mjs",
  },
});
