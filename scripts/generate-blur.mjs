/**
 * Generate blurDataURL placeholders for photos in lib/photos.ts
 *
 * Usage: node scripts/generate-blur.mjs
 *
 * Requires: sharp (npm install -D sharp)
 * Fetches each photo URL, generates a tiny 10px-wide base64 JPEG,
 * and prints the blurDataURL values to paste into lib/photos.ts.
 */

import { readFileSync } from "fs";
import { resolve } from "path";

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("sharp is required. Install it with: npm install -D sharp");
    process.exit(1);
  }

  // Parse photo sources from lib/photos.ts
  const photosPath = resolve("lib/photos.ts");
  const content = readFileSync(photosPath, "utf-8");
  const srcRegex = /src:\s*["']([^"']+)["']/g;
  const srcs = [];
  let match;
  while ((match = srcRegex.exec(content)) !== null) {
    srcs.push(match[1]);
  }

  if (srcs.length === 0) {
    console.log("No photo sources found in lib/photos.ts");
    return;
  }

  console.log(`Generating blur placeholders for ${srcs.length} photos...\n`);

  for (const src of srcs) {
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      const blurBuf = await sharp(buffer)
        .resize(10)
        .jpeg({ quality: 40 })
        .toBuffer();
      const base64 = `data:image/jpeg;base64,${blurBuf.toString("base64")}`;
      console.log(`// ${src}`);
      console.log(`blurDataURL: "${base64}",\n`);
    } catch (err) {
      console.error(`Failed for ${src}: ${err.message}`);
    }
  }
}

main();
