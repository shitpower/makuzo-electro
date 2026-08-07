import fs from "node:fs";

const editorPath = "d:/web-git/makuzo_electro/src/components/admin/AdminSectionEditor.jsx";
const registryPath = "d:/web-git/makuzo_electro/src/components/admin/section-field-registry.jsx";

const source = fs.readFileSync(editorPath, "utf8");
const start = source.indexOf("const SECTION_LABELS");
const end = source.indexOf("export function AdminSectionEditor");
const chunk = source
  .slice(start, end)
  .replace("const SECTION_LABELS", "export const SECTION_LABELS")
  .replace("function renderFields", "export function renderSectionFields");

const registry = `"use client";

import { MediaPickerField } from "@/components/admin/MediaPickerField";

${chunk}`;

fs.writeFileSync(registryPath, registry);

const newEditor = `"use client";

import { useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";

import { renderSectionFields, SECTION_LABELS } from "@/components/admin/section-field-registry";
import { useAdminStore } from "@/stores/admin-store";

${source.slice(end)}`.replace("renderFields(", "renderSectionFields(");

fs.writeFileSync(editorPath, newEditor);
console.log("Extracted section-field-registry.jsx");
