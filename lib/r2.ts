import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import probeImageSize from "probe-image-size";
import type { Photo } from "./photos";

const R2_PUBLIC_URL = "https://pub-253f4f98a29547d189d929dd4b0273e2.r2.dev";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function isImage(key: string): boolean {
  const ext = key.slice(key.lastIndexOf(".")).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

function getS3Client() {
  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
}

export async function listR2Photos(): Promise<Photo[]> {
  const s3 = getS3Client();
  const command = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET_NAME!,
  });

  const response = await s3.send(command);
  const objects = response.Contents ?? [];

  const imageKeys = objects
    .map((obj) => obj.Key!)
    .filter((key) => key && isImage(key));

  const photos = await Promise.all(
    imageKeys.map(async (key): Promise<Photo | null> => {
      const url = `${R2_PUBLIC_URL}/${encodeURIComponent(key)}`;
      try {
        const result = await probeImageSize(url);
        return {
          src: url,
          width: result.width,
          height: result.height,
          alt: "",
        };
      } catch (err) {
        console.error(`Failed to probe ${key}:`, err);
        return null;
      }
    })
  );

  return photos.filter((p): p is Photo => p !== null);
}
