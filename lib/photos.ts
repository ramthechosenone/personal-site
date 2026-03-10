export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
  category?: string;
};

const R2 = "https://pub-253f4f98a29547d189d929dd4b0273e2.r2.dev";

export const photos: Photo[] = [
  {
    src: `${R2}/112F6B6B-230E-406A-A2A6-DC1004D9E500_1_201_a.jpeg`,
    width: 6016,
    height: 4016,
    alt: "",
  },
  {
    src: `${R2}/41658D4A-75E3-448F-98B5-D7D4663088CD_1_201_a.jpeg`,
    width: 6016,
    height: 4016,
    alt: "",
  },
  {
    src: `${R2}/45C7863A-96DE-4269-BEC6-EACEBB572E50_1_105_c.jpeg`,
    width: 1084,
    height: 724,
    alt: "",
  },
  {
    src: `${R2}/8B2E4CA9-8864-46E4-BC7A-3027FCAC8FF7_1_201_a.jpeg`,
    width: 6016,
    height: 4016,
    alt: "",
  },
  {
    src: `${R2}/9F11A0D2-62E7-4410-85EE-A8D9A181531B_1_201_a.jpeg`,
    width: 6016,
    height: 4016,
    alt: "",
  },
  {
    src: `${R2}/AAC9F7FA-D551-45C8-8832-F4F3E0FFAB86_1_201_a.jpeg`,
    width: 6016,
    height: 4016,
    alt: "",
  },
  {
    src: `${R2}/AC01430A-C477-48C9-801B-D957849CD1E6_1_201_a.jpeg`,
    width: 6016,
    height: 4016,
    alt: "",
  },
];

export function getCategories(): string[] {
  const cats = new Set(photos.map((p) => p.category).filter(Boolean) as string[]);
  return Array.from(cats);
}

export function getPhotosByCategory(category: string | null): Photo[] {
  if (!category) return photos;
  return photos.filter((p) => p.category === category);
}
