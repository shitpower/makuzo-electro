-- Admin display name for profile settings

ALTER TABLE "admin_users" ADD COLUMN IF NOT EXISTS "name" text;
