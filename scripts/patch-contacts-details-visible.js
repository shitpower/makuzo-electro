/**
 * Enable contacts details block: phone + email + hours (address stays off).
 * Usage: node scripts/patch-contacts-details-visible.js
 */
import { neon } from "@neondatabase/serverless";

import { loadProjectEnv } from "./load-env-local.js";

loadProjectEnv();

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!url) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const sql = neon(url);

const visibility = { phone: true, email: true, address: false, hours: true };

const rows = await sql`
  SELECT id, content_ru, content_lv, content_en
  FROM sections
  WHERE key = 'contacts'
  LIMIT 1
`;

if (!rows.length) {
  console.error("contacts section not found");
  process.exit(1);
}

const row = rows[0];

function patch(content) {
  const base = content && typeof content === "object" ? content : {};
  return {
    ...base,
    detailsVisible: true,
    detailVisibility: visibility,
  };
}

const contentRu = patch(row.content_ru);
const contentLv = patch(row.content_lv);
const contentEn = patch(row.content_en);

await sql`
  UPDATE sections
  SET
    content_ru = ${JSON.stringify(contentRu)}::jsonb,
    content_lv = ${JSON.stringify(contentLv)}::jsonb,
    content_en = ${JSON.stringify(contentEn)}::jsonb,
    updated_at = NOW()
  WHERE key = 'contacts'
`;

console.log("OK: contacts detailsVisible=true, phone/email/hours on");
