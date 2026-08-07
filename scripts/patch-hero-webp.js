import { neon } from "@neondatabase/serverless";

import { loadProjectEnv } from "./load-env-local.js";

loadProjectEnv();

const sql = neon(process.env.DATABASE_URL);

const rows = await sql`SELECT key, content_ru, content_lv FROM sections WHERE key = 'hero'`;
const hero = rows[0];
if (!hero) {
  console.log("No hero section");
  process.exit(0);
}

const ru = hero.content_ru || {};
const ro = hero.content_lv || {};
let changed = false;

if (ru.bgImageUrl === "/img/MainImg.png") {
  ru.bgImageUrl = "/img/MainImg.webp";
  changed = true;
}
if (ro.bgImageUrl === "/img/MainImg.png") {
  ro.bgImageUrl = "/img/MainImg.webp";
  changed = true;
}

if (!changed) {
  console.log("Hero already uses webp or custom URL:", ru.bgImageUrl);
  process.exit(0);
}

await sql`
  UPDATE sections
  SET content_ru = ${JSON.stringify(ru)}::jsonb,
      content_lv = ${JSON.stringify(ro)}::jsonb,
      updated_at = now()
  WHERE key = 'hero'
`;
console.log("Updated hero bgImageUrl to /img/MainImg.webp");
