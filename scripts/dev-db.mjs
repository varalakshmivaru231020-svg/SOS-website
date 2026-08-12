// Local development database: real PostgreSQL, embedded (no install, no Docker).
// Run with `npm run db:local` and keep it running while you develop.
// Production uses Supabase — same engine, so schema and data behave identically.
import EmbeddedPostgres from "embedded-postgres";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dataDir = join(dirname(fileURLToPath(import.meta.url)), "..", ".pgdata");
const firstRun = !existsSync(dataDir);

const pg = new EmbeddedPostgres({
  databaseDir: dataDir,
  user: "postgres",
  password: "postgres",
  port: 5544,
  persistent: true,
});

if (firstRun) await pg.initialise();
await pg.start();
if (firstRun) await pg.createDatabase("northmark");

console.log("PostgreSQL running on postgresql://postgres:postgres@localhost:5544/northmark");
console.log("Press Ctrl+C to stop.");

const stop = async () => {
  console.log("\nStopping database…");
  await pg.stop();
  process.exit(0);
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
// Keep the process alive.
setInterval(() => {}, 1 << 30);
