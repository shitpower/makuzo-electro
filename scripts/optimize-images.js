import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imgDir = path.join(__dirname, "..", "public", "img");

const targets = ["MainImg.png", "Logo_Makuzo.png"];

for (const filename of targets) {
  const input = path.join(imgDir, filename);
  if (!fs.existsSync(input)) {
    console.warn("Skip missing:", filename);
    continue;
  }

  const base = filename.replace(/\.[^.]+$/, "");
  const webpOut = path.join(imgDir, `${base}.webp`);
  const avifOut = path.join(imgDir, `${base}.avif`);

  await sharp(input).webp({ quality: 82 }).toFile(webpOut);
  await sharp(input).avif({ quality: 55 }).toFile(avifOut);

  const before = fs.statSync(input).size;
  const after = fs.statSync(webpOut).size;
  console.log(`${filename}: ${(before / 1024 / 1024).toFixed(2)}MB -> webp ${(after / 1024).toFixed(0)}KB`);
}
