/**
 * Migrate Romanian (ro) columns → Latvian (lv).
 * Run: node scripts/migrate-ro-to-lv.js
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
  // sections: content_ro → content_lv
  if (await columnExists("sections", "content_ro")) {
    if (await columnExists("sections", "content_lv")) {
      await sql`update sections set content_lv = content_ro where content_lv = '{}'::jsonb or content_lv is null`;
      await sql`alter table sections drop column content_ro`;
      console.log("sections: copied content_ro → content_lv, dropped content_ro");
    } else {
      await sql`alter table sections rename column content_ro to content_lv`;
      console.log("sections: renamed content_ro → content_lv");
    }
  } else if (!(await columnExists("sections", "content_lv"))) {
    await sql`alter table sections add column content_lv jsonb not null default '{}'::jsonb`;
    console.log("sections: added content_lv");
  } else {
    console.log("sections: content_lv already present");
  }

  // site_settings SEO
  if (await columnExists("site_settings", "seo_title_ro")) {
    if (await columnExists("site_settings", "seo_title_lv")) {
      await sql`update site_settings set seo_title_lv = coalesce(seo_title_lv, seo_title_ro)`;
      await sql`alter table site_settings drop column seo_title_ro`;
      console.log("site_settings: merged seo_title_ro → seo_title_lv, dropped seo_title_ro");
    } else {
      await sql`alter table site_settings rename column seo_title_ro to seo_title_lv`;
      console.log("site_settings: renamed seo_title_ro → seo_title_lv");
    }
  } else if (!(await columnExists("site_settings", "seo_title_lv"))) {
    await sql`alter table site_settings add column seo_title_lv text`;
    console.log("site_settings: added seo_title_lv");
  }

  if (await columnExists("site_settings", "seo_desc_ro")) {
    if (await columnExists("site_settings", "seo_desc_lv")) {
      await sql`update site_settings set seo_desc_lv = coalesce(seo_desc_lv, seo_desc_ro)`;
      await sql`alter table site_settings drop column seo_desc_ro`;
      console.log("site_settings: merged seo_desc_ro → seo_desc_lv, dropped seo_desc_ro");
    } else {
      await sql`alter table site_settings rename column seo_desc_ro to seo_desc_lv`;
      console.log("site_settings: renamed seo_desc_ro → seo_desc_lv");
    }
  } else if (!(await columnExists("site_settings", "seo_desc_lv"))) {
    await sql`alter table site_settings add column seo_desc_lv text`;
    console.log("site_settings: added seo_desc_lv");
  }

  // media: alt_ro → alt_lv
  if (await columnExists("media", "alt_ro")) {
    if (await columnExists("media", "alt_lv")) {
      await sql`update media set alt_lv = coalesce(alt_lv, alt_ro)`;
      await sql`alter table media drop column alt_ro`;
      console.log("media: merged alt_ro → alt_lv, dropped alt_ro");
    } else {
      await sql`alter table media rename column alt_ro to alt_lv`;
      console.log("media: renamed alt_ro → alt_lv");
    }
  } else if (!(await columnExists("media", "alt_lv"))) {
    await sql`alter table media add column alt_lv text`;
    console.log("media: added alt_lv");
  }

  console.log("Migration OK");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
