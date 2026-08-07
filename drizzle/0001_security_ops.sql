-- Security/ops tables for production hardening (idempotent for existing Neon DB)

CREATE TABLE IF NOT EXISTS "rate_limits" (
  "id" serial PRIMARY KEY NOT NULL,
  "key" text NOT NULL UNIQUE,
  "count" integer DEFAULT 0 NOT NULL,
  "blocked_until" timestamp with time zone,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "rate_limits_key_idx" ON "rate_limits" ("key");

CREATE TABLE IF NOT EXISTS "audit_events" (
  "id" serial PRIMARY KEY NOT NULL,
  "actor_email" text,
  "action" text NOT NULL,
  "entity_type" text NOT NULL,
  "entity_id" text,
  "metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "audit_events_created_at_idx" ON "audit_events" ("created_at");
CREATE INDEX IF NOT EXISTS "audit_events_entity_idx" ON "audit_events" ("entity_type", "entity_id");
