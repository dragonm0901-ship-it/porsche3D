import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "porsche. Premium Showcase",
  description: "A full-screen car showcase with a scroll-timed hero and garage mode.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload the 3D model JSON and binary payloads for Taycan S (first) and GT4 RS (second) */}
        <link rel="preload" href="/cars/models/car-03/scene.gltf" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/cars/models/car-03/scene.bin" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/cars/models/car-02/scene.gltf" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/cars/models/car-02/scene.bin" as="fetch" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
