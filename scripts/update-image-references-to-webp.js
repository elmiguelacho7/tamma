/* eslint-disable no-console */

const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const publicImagesRoot = path.join(repoRoot, "public", "images");
const targetRoots = ["app", "components", "lib"].map((p) => path.join(repoRoot, p));

function existsWebp(urlPath) {
  // urlPath like "/images/foo/bar.webp"
  const rel = urlPath.replace(/^\/+/, "");
  return fs.existsSync(path.join(repoRoot, "public", rel));
}

async function* walk(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) yield* walk(p);
    else if (ent.isFile()) yield p;
  }
}

async function main() {
  if (!fs.existsSync(publicImagesRoot)) {
    console.error(`Missing folder: ${publicImagesRoot}`);
    process.exitCode = 1;
    return;
  }

  let filesUpdated = 0;
  let replacements = 0;

  const filePattern = /\.(ts|tsx|js|jsx)$/i;
  const imgPattern = /\/images\/[A-Za-z0-9_\-./]+?\.(png|jpe?g)\b/gi;

  for (const root of targetRoots) {
    if (!fs.existsSync(root)) continue;
    for await (const file of walk(root)) {
      if (!filePattern.test(file)) continue;
      const before = await fsp.readFile(file, "utf8");
      let after = before;

      after = after.replace(imgPattern, (match) => {
        const next = match.replace(/\.(png|jpe?g)\b/i, ".webp");
        if (!existsWebp(next)) return match; // safety: don't create broken refs
        replacements += 1;
        return next;
      });

      if (after !== before) {
        await fsp.writeFile(file, after, "utf8");
        filesUpdated += 1;
      }
    }
  }

  console.log(`Updated files: ${filesUpdated}`);
  console.log(`Replacements: ${replacements}`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

