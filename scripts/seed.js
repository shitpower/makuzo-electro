import { eq, notInArray } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { sections, siteSettings } from "../src/db/schema.js";
import { DEFAULT_SECTIONS, DEFAULT_SITE_SETTINGS, SECTION_KEYS } from "../src/lib/seed-data.js";
import { loadProjectEnv } from "./load-env-local.js";

loadProjectEnv();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

const db = drizzle(neon(process.env.DATABASE_URL));

/** Keep production map coordinates; never overwrite from seed. */
function preserveContactsMap(seedContent, existingContent) {
  if (!existingContent?.map) return seedContent;
  return {
    ...seedContent,
    map: existingContent.map,
  };
}

async function seed() {
  for (const section of DEFAULT_SECTIONS) {
    const existing = await db
      .select()
      .from(sections)
      .where(eq(sections.key, section.key))
      .then((rows) => rows[0]);

    let contentRu = section.contentRu;
    let contentLv = section.contentLv;
    let contentEn = section.contentEn;

    if (section.key === "contacts" && existing) {
      contentRu = preserveContactsMap(contentRu, existing.contentRu);
      contentLv = preserveContactsMap(contentLv, existing.contentLv);
      contentEn = preserveContactsMap(contentEn, existing.contentEn);
      console.log("Preserved existing map coordinates for contacts.");
    }

    if (existing) {
      await db
        .update(sections)
        .set({
          visible: section.visible,
          contentRu,
          contentLv,
          contentEn,
          updatedAt: new Date(),
        })
        .where(eq(sections.id, existing.id));
      console.log(`Updated section: ${section.key}`);
    } else {
      await db.insert(sections).values({
        key: section.key,
        visible: section.visible,
        contentRu,
        contentLv,
        contentEn,
      });
      console.log(`Created section: ${section.key}`);
    }
  }

  const removed = await db
    .delete(sections)
    .where(notInArray(sections.key, SECTION_KEYS))
    .returning({ key: sections.key });

  if (removed.length) {
    console.log("Removed unused sections:", removed.map((r) => r.key).join(", "));
  } else {
    console.log("Unused sections: (none)");
  }

  const settingsRow = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.id, 1))
    .then((rows) => rows[0]);

  if (settingsRow) {
    await db
      .update(siteSettings)
      .set({
        logoUrl: DEFAULT_SITE_SETTINGS.logoUrl,
        seoTitleRu: DEFAULT_SITE_SETTINGS.seoTitleRu,
        seoTitleLv: DEFAULT_SITE_SETTINGS.seoTitleLv,
        seoTitleEn: DEFAULT_SITE_SETTINGS.seoTitleEn,
        seoDescRu: DEFAULT_SITE_SETTINGS.seoDescRu,
        seoDescLv: DEFAULT_SITE_SETTINGS.seoDescLv,
        seoDescEn: DEFAULT_SITE_SETTINGS.seoDescEn,
        sectionSpacing: DEFAULT_SITE_SETTINGS.sectionSpacing,
        updatedAt: new Date(),
      })
      .where(eq(siteSettings.id, 1));
    console.log("Site settings updated.");
  } else {
    await db.insert(siteSettings).values({ id: 1, ...DEFAULT_SITE_SETTINGS });
    console.log("Site settings created.");
  }
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
