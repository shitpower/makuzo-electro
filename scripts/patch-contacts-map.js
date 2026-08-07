import { neon } from "@neondatabase/serverless";

import { DEFAULT_SECTIONS } from "../src/lib/seed-data.js";
import { loadProjectEnv } from "./load-env-local.js";

loadProjectEnv();

const sql = neon(process.env.DATABASE_URL);
const seedContacts = DEFAULT_SECTIONS.find((s) => s.key === "contacts");
const defaultMap = seedContacts.contentRu.map;

const rows = await sql`SELECT content_ru, content_lv FROM sections WHERE key = 'contacts'`;
const row = rows[0];
if (!row) {
  console.log("No contacts section");
  process.exit(0);
}

const contentRu = { ...(row.content_ru || {}), map: { ...defaultMap, ...(row.content_ru?.map || {}) } };
const contentLv = { ...(row.content_lv || {}), map: { ...defaultMap, ...(row.content_lv?.map || {}) } };

await sql`
  UPDATE sections
  SET content_ru = ${JSON.stringify(contentRu)}::jsonb,
      content_lv = ${JSON.stringify(contentLv)}::jsonb,
      updated_at = now()
  WHERE key = 'contacts'
`;

console.log("Added map config to contacts section");
