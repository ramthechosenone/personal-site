import { listR2Photos } from "@/lib/r2";
import { photos as fallbackPhotos } from "@/lib/photos";
import PhotographyClient from "./PhotographyClient";

export default async function Photography() {
  let photos = fallbackPhotos;
  try {
    const r2Photos = await listR2Photos();
    if (r2Photos.length > 0) photos = r2Photos;
  } catch {
    // Fall back to hardcoded photos if R2 credentials aren't configured
  }

  return <PhotographyClient photos={photos} />;
}
