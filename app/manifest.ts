import type { MetadataRoute } from "next";
import { company } from "@/data/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.nameEn,
    short_name: "Al Maha National",
    description:
      "Al Maha National Company for General Trading & Contracting — Kuwait",
    start_url: "/en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0B1F3A",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/brand/icon-512-transparent.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
