import type { MetadataRoute } from "next";
import { models } from "@/lib/models";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://models.samirdev.uz";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/usage`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...models.map((model) => ({
      url: `${baseUrl}/models/${model.slug}`,
      lastModified: new Date(`${model.year}-12-01`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
