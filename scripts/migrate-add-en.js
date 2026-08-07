/**
 * Add English (en) columns. Run: node scripts/migrate-add-en.js
 */
import { neon } from "@neondatabase/serverless";
import { loadProjectEnv } from "./load-env-local.js";

loadProjectEnv();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function columnExists(table, column) {
  const rows = await sql`
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = ${table}
      and column_name = ${column}
    limit 1
  `;
  return rows.length > 0;
}

async function migrate() {
  if (!(await columnExists("sections", "content_en"))) {
    await sql`alter table sections add column content_en jsonb not null default '{}'::jsonb`;
    console.log("sections: added content_en");
  } else {
    console.log("sections: content_en already present");
  }

  if (!(await columnExists("site_settings", "seo_title_en"))) {
    await sql`alter table site_settings add column seo_title_en text`;
    console.log("site_settings: added seo_title_en");
  } else {
    console.log("site_settings: seo_title_en already present");
  }

  if (!(await columnExists("site_settings", "seo_desc_en"))) {
    await sql`alter table site_settings add column seo_desc_en text`;
    console.log("site_settings: added seo_desc_en");
  } else {
    console.log("site_settings: seo_desc_en already present");
  }

  if (!(await columnExists("media", "alt_en"))) {
    await sql`alter table media add column alt_en text`;
    console.log("media: added alt_en");
  } else {
    console.log("media: alt_en already present");
  }

  console.log("Migration OK");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
