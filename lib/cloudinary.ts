import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export const CLOUDINARY_FOLDER = "personal/photography";

export type CloudinaryImage = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
};

export async function listImages(
  folder: string = CLOUDINARY_FOLDER,
  maxResults: number = 50
): Promise<CloudinaryImage[]> {
  if (!cloudName || !apiKey || !apiSecret) return [];

  const normalizeFolder = folder.replace(/\/$/, "");
  const prefix = `${normalizeFolder}/`;

  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix,
      max_results: maxResults,
    });
    const resources = result.resources ?? [];
    if (resources.length > 0) {
      return resources.map((r: { public_id: string; secure_url?: string; url?: string; width?: number; height?: number }) => ({
        public_id: r.public_id,
        secure_url: r.secure_url ?? r.url ?? buildImageUrl(r.public_id),
        width: r.width ?? 0,
        height: r.height ?? 0,
      }));
    }
  } catch {
    // Fall through to Search API
  }

  try {
    const searchResult = await cloudinary.search
      .expression(`folder:${normalizeFolder}`)
      .max_results(maxResults)
      .execute();
    const resources = searchResult?.resources ?? [];
    return resources.map((r: { public_id: string; secure_url?: string; url?: string; width?: number; height?: number }) => ({
      public_id: r.public_id,
      secure_url: r.secure_url ?? r.url ?? buildImageUrl(r.public_id),
      width: r.width ?? 0,
      height: r.height ?? 0,
    }));
  } catch {
    return [];
  }
}

function buildImageUrl(publicId: string): string {
  if (!cloudName) return "";
  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
}

export async function uploadImage(
  buffer: Buffer,
  folder: string = CLOUDINARY_FOLDER,
  fileName?: string
): Promise<{ secure_url: string; public_id: string } | null> {
  if (!cloudName || !apiKey || !apiSecret) return null;
  return new Promise((resolve) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: folder.replace(/\/$/, ""),
        public_id: fileName?.replace(/\.[^.]+$/, ""),
      },
      (err, result) => {
        if (err || !result) {
          resolve(null);
          return;
        }
        resolve({
          secure_url: result.secure_url ?? "",
          public_id: result.public_id ?? "",
        });
      }
    );
    uploadStream.end(buffer);
  });
}

export function getCloudName(): string | undefined {
  return cloudName;
}
