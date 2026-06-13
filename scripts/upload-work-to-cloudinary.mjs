import crypto from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const sourceRoot = process.env.WORK_SOURCE_DIR ?? path.join(process.env.USERPROFILE ?? "", "Downloads", "ecom");
const outputPath = process.env.WORK_MANIFEST_PATH ?? path.join("public", "work", "cloudinary-manifest.json");
const allowedExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error("Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET before uploading.");
}

async function listImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      images.push(...(await listImages(fullPath)));
      continue;
    }

    if (allowedExts.has(path.extname(entry.name).toLowerCase())) {
      images.push(fullPath);
    }
  }

  return images;
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function sign(params) {
  const toSign = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return crypto.createHash("sha1").update(`${toSign}${apiSecret}`).digest("hex");
}

async function upload(filePath) {
  const relative = path.relative(sourceRoot, filePath);
  const serviceFolder = path.dirname(relative) === "." ? "uncategorized" : path.dirname(relative);
  const baseName = path.basename(filePath, path.extname(filePath));
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = `ecomxpertstudio/${slug(serviceFolder)}`;
  const publicId = slug(baseName);
  const params = { folder, public_id: publicId, timestamp };
  const form = new FormData();

  form.append("file", new Blob([await readFile(filePath)]), path.basename(filePath));
  form.append("api_key", apiKey);
  form.append("timestamp", String(timestamp));
  form.append("folder", folder);
  form.append("public_id", publicId);
  form.append("signature", sign(params));

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    throw new Error(`Cloudinary upload failed for ${relative}: ${response.status} ${await response.text()}`);
  }

  const result = await response.json();

  return {
    title: baseName,
    category: serviceFolder,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    secureUrl: result.secure_url,
    source: relative,
  };
}

const images = await listImages(sourceRoot);
const uploaded = [];

for (const image of images) {
  uploaded.push(await upload(image));
}

await writeFile(outputPath, `${JSON.stringify(uploaded, null, 2)}\n`);
console.log(`Uploaded ${uploaded.length} images. Manifest written to ${outputPath}.`);
