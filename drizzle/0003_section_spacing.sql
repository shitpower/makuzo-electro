ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "section_spacing" jsonb DEFAULT '{"defaultGap":80,"overrides":{}}'::jsonb NOT NULL;
