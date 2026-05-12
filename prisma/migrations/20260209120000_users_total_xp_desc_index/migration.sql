-- Leaderboard: ORDER BY totalXp DESC LIMIT 100 (index scan instead of full table sort)
CREATE INDEX IF NOT EXISTS "users_table_totalXp_idx" ON "users_table" ("totalXp" DESC);
