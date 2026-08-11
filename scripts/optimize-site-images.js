/**
 * Optimize public site images for quality + readability (not max compression).
 * Logos/icons stay sharp; photos/diagrams → high-quality WebP.
 *
 * Usage: node scripts/optimize-site-images.js
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const imgDir = path.join(root, "public", "img");
const iconDir = path.join(root, "public", "icon");
const appDir = path.join(root, "src", "app");

function exists(p) {
  return fs.existsSync(p);
}

async function writeWebp(input, output, { quality = 90, effort = 4 } = {}) {
  await sharp(input).webp({ quality, effort, smartSubsample: true }).toFile(output);
  const before = fs.statSync(input).size;
  const after = fs.statSync(output).size;
  console.log(
    `${path.basename(input)} → ${path.basename(output)}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (q=${quality})`,
  );
}

/** Near-black → transparent (keeps red/white UI). Soft edge for AA. */
async function punchBlackBg(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = Buffer.from(data);
  const thr = 22;
  const soft = 42;
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    const lum = (r + g + b) / 3;
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);
    if (chroma < 16 && lum <= thr) px[i + 3] = 0;
    else if (chroma < 16 && lum < soft) {
      px[i + 3] = Math.round(255 * ((lum - thr) / (soft - thr)));
    }
  }
  await sharp(px, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9, palette: false })
    .toFile(outputPath);
  return outputPath;
}

async function optimizeFavicon() {
  const src = path.join(iconDir, "Makuzo-ico.png");
  if (!exists(src)) {
    console.warn("Skip favicon: missing Makuzo-ico.png");
    return;
  }

  const transparent = path.join(iconDir, "Makuzo-ico-transparent.png");
  await punchBlackBg(src, transparent);

  // Master icon for metadata (square, crisp)
  const master = path.join(iconDir, "Makuzo-ico.png");
  await sharp(transparent)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: false })
    .sharpen({ sigma: 0.6 })
    .toFile(master + ".tmp");
  fs.renameSync(master + ".tmp", master);

  const sizes = [
    { file: path.join(iconDir, "favicon-32.png"), size: 32 },
    { file: path.join(iconDir, "favicon-48.png"), size: 48 },
    { file: path.join(iconDir, "apple-touch-icon.png"), size: 180 },
  ];

  for (const { file, size } of sizes) {
    await sharp(master)
      .resize(size, size, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
        kernel: sharp.kernel.lanczos3,
      })
      .png({ compressionLevel: 9, palette: false })
      .toFile(file);
    console.log(`favicon ${size}x${size} → ${path.basename(file)}`);
  }

  // Next.js app/icon.png
  await sharp(master)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(appDir, "icon.png"));

  // Browser fallback (PNG bytes with .ico name — fine for modern browsers)
  fs.copyFileSync(path.join(iconDir, "favicon-32.png"), path.join(root, "public", "favicon.ico"));

  if (exists(transparent)) fs.unlinkSync(transparent);
  console.log("Favicon set optimized (transparent, multi-size).");
}

async function optimizeSmartHomeDiagram() {
  const png = path.join(imgDir, "smart-homes.png");
  if (!exists(png)) {
    console.warn("Skip smart-homes.png");
    return;
  }

  // High-quality WebP for site delivery (readable labels)
  const webp = path.join(imgDir, "smart-homes.webp");
  await sharp(png)
    .webp({ quality: 92, effort: 5, smartSubsample: true })
    .toFile(webp);

  // Re-encode PNG lightly for smaller weight without crushing lines
  const tmp = png + ".tmp";
  await sharp(png).png({ compressionLevel: 9, palette: false }).toFile(tmp);
  fs.renameSync(tmp, png);

  const beforeNote = fs.statSync(webp).size;
  console.log(`smart-homes.webp ready (${(beforeNote / 1024).toFixed(0)}KB @ q=92)`);
}

async function optimizeLogos() {
  const pairs = [
    { png: "logo-on-light.png", webp: "logo-on-light.webp" },
    { png: "logo-on-dark.png", webp: "logo-on-dark.webp" },
  ];

  for (const { png, webp } of pairs) {
    const input = path.join(imgDir, png);
    const output = path.join(imgDir, webp);
    if (!exists(input)) continue;
    // Logos: near-lossless for sharp edges/text
    await sharp(input)
      .webp({ quality: 95, alphaQuality: 100, effort: 5, smartSubsample: false })
      .toFile(output);
    console.log(`logo ${webp} q=95`);
  }
}

async function optimizeHeroBg() {
  const webp = path.join(imgDir, "hero-bg.webp");
  if (!exists(webp)) return;
  const tmp = path.join(imgDir, `hero-bg-${Date.now()}.webp`);
  try {
    await sharp(webp).webp({ quality: 88, effort: 5 }).toFile(tmp);
    fs.copyFileSync(tmp, webp);
    console.log(`hero-bg.webp re-encoded q=88 (${(fs.statSync(webp).size / 1024).toFixed(0)}KB)`);
  } catch (err) {
    console.warn("Skip hero-bg.webp (file locked?):", err.code || err.message);
  } finally {
    if (exists(tmp)) fs.unlinkSync(tmp);
  }
}

async function main() {
  await optimizeFavicon();
  await optimizeSmartHomeDiagram();
  await optimizeLogos();
  await optimizeHeroBg();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
