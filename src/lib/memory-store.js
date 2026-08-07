import { DEFAULT_SECTIONS, DEFAULT_SITE_SETTINGS } from "@/lib/seed-data";

/** @type {typeof DEFAULT_SECTIONS} */
let sections = structuredClone(DEFAULT_SECTIONS);

/** @type {typeof DEFAULT_SITE_SETTINGS} */
let siteSettings = structuredClone(DEFAULT_SITE_SETTINGS);

/** @type {Array<{ id: number; name: string; phone: string; email: string | null; message: string | null; isRead: boolean; createdAt: Date }>} */
let inquiriesList = [];

/** @type {Array<{ id: number; filename: string; githubPath: string; githubUrl: string | null; altRu: string | null; altLv: string | null; altEn: string | null; createdAt: Date }>} */
let mediaList = [];

let nextInquiryId = 1;
let nextMediaId = 1;

export function getAllSectionsMemory() {
  return sections.map((s, i) => ({
    id: i + 1,
    key: s.key,
    visible: s.visible,
    contentRu: s.contentRu,
    contentLv: s.contentLv,
    contentEn: s.contentEn,
    updatedAt: new Date(),
  }));
}

export function getSectionByKeyMemory(key) {
  const section = sections.find((s) => s.key === key);
  if (!section) return null;
  const idx = sections.indexOf(section);
  return {
    id: idx + 1,
    key: section.key,
    visible: section.visible,
    contentRu: section.contentRu,
    contentLv: section.contentLv,
    contentEn: section.contentEn,
    updatedAt: new Date(),
  };
}

export function updateSectionMemory(key, patch) {
  const idx = sections.findIndex((s) => s.key === key);
  if (idx === -1) return null;
  sections[idx] = {
    ...sections[idx],
    ...patch,
    contentRu: patch.contentRu ?? sections[idx].contentRu,
    contentLv: patch.contentLv ?? sections[idx].contentLv,
    contentEn: patch.contentEn ?? sections[idx].contentEn,
  };
  return getSectionByKeyMemory(key);
}

export function getSiteSettingsMemory() {
  return { id: 1, ...siteSettings, updatedAt: new Date() };
}

export function updateSiteSettingsMemory(patch) {
  siteSettings = { ...siteSettings, ...patch };
  return getSiteSettingsMemory();
}

export function listInquiriesMemory() {
  return [...inquiriesList].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function createInquiryMemory(data) {
  const row = {
    id: nextInquiryId++,
    name: data.name,
    phone: data.phone,
    email: data.email ?? null,
    message: data.message ?? null,
    isRead: data.isRead ?? false,
    createdAt: new Date(),
  };
  inquiriesList.unshift(row);
  return row;
}

export function updateInquiryMemory(id, patch) {
  const idx = inquiriesList.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  inquiriesList[idx] = { ...inquiriesList[idx], ...patch };
  return inquiriesList[idx];
}

export function deleteInquiryMemory(id) {
  const idx = inquiriesList.findIndex((i) => i.id === id);
  if (idx === -1) return false;
  inquiriesList.splice(idx, 1);
  return true;
}

export function listMediaMemory() {
  return [...mediaList]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map(({ data, ...rest }) => rest);
}

export function createMediaMemory(data) {
  const row = {
    id: nextMediaId++,
    filename: data.filename,
    mimeType: data.mimeType ?? null,
    size: data.size ?? null,
    data: data.data ?? null,
    githubPath: data.githubPath ?? null,
    githubUrl: data.githubUrl ?? null,
    altRu: data.altRu ?? null,
    altLv: data.altLv ?? null,
    altEn: data.altEn ?? null,
    createdAt: new Date(),
  };
  mediaList.unshift(row);
  return row;
}

export function deleteMediaMemory(id) {
  const idx = mediaList.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  const [removed] = mediaList.splice(idx, 1);
  return removed;
}

export function getMediaByIdMemory(id) {
  return mediaList.find((m) => m.id === id) ?? null;
}
