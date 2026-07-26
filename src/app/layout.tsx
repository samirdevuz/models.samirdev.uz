import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";
import "./portfolio-theme.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://models.samirdev.uz"),
  applicationName: "Samir’s 3D Model Archive",
  title: {
    default: "Samir’s 3D Model Archive",
    template: "%s — Samir’s 3D Archive",
  },
  description:
    "Blockbench experiments, Minecraft-style assets, animated creatures, props, and downloadable project files by Samir.",
  keywords: [
    "Blockbench",
    "bbmodel",
    "Minecraft models",
    "voxel art",
    "3D models",
    "Samir Abdumo'minov",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Samir’s 3D Model Archive",
    description:
      "Explore Blockbench experiments, animated creatures, props, and Minecraft-style assets.",
    type: "website",
    url: "/",
    siteName: "Samir’s 3D Model Archive",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samir’s 3D Model Archive",
    description:
      "Blockbench experiments, animated creatures, props, and Minecraft-style assets.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
