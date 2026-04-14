/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Optimize raster images under /public/images using sharp.
 *
 * - Input:  /public/images (recursive), extensions: .png/.jpg/.jpeg
 * - Output: /public/images-optimized/** (same folder structure) as .webp
 * - Heuristics:
 *   - hero → max width 1600
 *   - cards/tiles → max width 900
 *   - other → max width 1200
 * - Quality: 78
 *
 * This script does NOT modify source files or code references.
 */

const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const repoRoot = path.resolve(__dirname, "..");
const inputRoot = path.join(repoRoot, "public", "images");
const outputRoot = path.join(repoRoot, "public", "images-optimized");

const QUALITY = 78;

const exts = new Set([".png", ".jpg", ".jpeg"]);

function isHero(rel) {
  const s = rel.toLowerCase();
  return (
    s.includes("hero") ||
    s.includes("hero-bg") ||
    s.includes("hero-main") ||
    s.includes("/home/hero") ||
    s.includes("/nosotros/hero") ||
    s.includes("/servicios/hero") ||
    s.includes("/seguros/hero") ||
    s.includes("/empresas/hero") ||
    s.includes("/consejos/hero")
  );
}

function isCardOrTile(rel) {
  const s = rel.toLowerCase();
  return (
    s.includes("card-") ||
    s.includes("/cards/") ||
    s.includes("/services/card") ||
    s.includes("/insurance/tile") ||
    s.includes("tile-") ||
    s.includes("/tile-")
  );
}

function maxWidthFor(rel) {
  if (isHero(rel)) return 1600;
  if (isCardOrTile(rel)) return 900;
  return 1200;
}

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

async function* walk(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      yield* walk(p);
    } else if (ent.isFile()) {
      yield p;
    }
  }
}

async function main() {
  if (!fs.existsSync(inputRoot)) {
    console.error(`Missing input folder: ${inputRoot}`);
    process.exitCode = 1;
    return;
  }

  // Clean output folder
  await fsp.rm(outputRoot, { recursive: true, force: true });
  await ensureDir(outputRoot);

  let processed = 0;
  let skipped = 0;
  let failed = 0;

  const files = [];
  for await (const abs of walk(inputRoot)) {
    const ext = path.extname(abs).toLowerCase();
    if (!exts.has(ext)) continue;
    files.push(abs);
  }

  console.log(`Found ${files.length} raster images to optimize.`);

  for (const abs of files) {
    const relFromImages = path.relative(inputRoot, abs);
    const relPosix = relFromImages.split(path.sep).join("/");

    const outRel = relFromImages.replace(/\.(png|jpg|jpeg)$/i, ".webp");
    const outAbs = path.join(outputRoot, outRel);
    const outDir = path.dirname(outAbs);
    await ensureDir(outDir);

    const maxW = maxWidthFor(relPosix);

    try {
      const img = sharp(abs, { failOn: "none" });
      const meta = await img.metadata();
      if (!meta.width || meta.width <= 0) {
        skipped += 1;
        continue;
      }

      const width = Math.min(meta.width, maxW);

      await img
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outAbs);

      processed += 1;
      if (processed % 25 === 0) {
        console.log(`Optimized ${processed}/${files.length}...`);
      }
    } catch (e) {
      failed += 1;
      console.error(`Failed: ${relPosix}`);
      console.error(e);
    }
  }

  console.log(
    `Done. Optimized=${processed}, Skipped=${skipped}, Failed=${failed}. Output: ${outputRoot}`,
  );

  if (failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

