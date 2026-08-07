import * as XLSX from "xlsx";

/**
 * Build an .xlsx ArrayBuffer from a sheet name and row objects.
 * @param {string} sheetName
 * @param {Record<string, string | number | boolean | null | undefined>[]} rows
 * @returns {ArrayBuffer}
 */
export function buildExcelBuffer(sheetName, rows) {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName.slice(0, 31));
  return XLSX.write(workbook, { type: "array", bookType: "xlsx" });
}

/**
 * @param {string} basename
 * @returns {string}
 */
export function excelFilename(basename) {
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  return `${basename}-${stamp}.xlsx`;
}

/**
 * @param {Date | string | null | undefined} value
 * @returns {string}
 */
export function formatExcelDate(value) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("ru-RU");
}
