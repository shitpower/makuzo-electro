-- Global company profile (legal name, reg numbers, contacts, Instagram visibility)

ALTER TABLE "site_settings"
  ADD COLUMN IF NOT EXISTS "company_profile" jsonb
  DEFAULT '{}'::jsonb NOT NULL;
