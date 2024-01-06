import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ModListProvider } from "@/contexts/ModListContext";
import { cn } from "@/utils/cn";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mod List Creator | Project Zomboid",
  description: "Generator and creator mod list for Project Zomboid",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta property="og:type" content="website" />

        <meta
          name="description"
          content="Generator and creator mod list for Project Zomboid"
        />
        <meta
          name="keywords"
          content="Mod, Project Zomboid, Creator, Mod PZ, PZ, Modpack, Steam, Workshop, Steam Workshop"
        />

        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Mod List Creator | Project Zomboid"
        />
        <meta
          name="twitter:description"
          content="Generator and creator mod list for Project Zomboid"
        />
        <meta name="twitter:image" content="URL da Imagem em Miniatura" />

        <meta
          property="og:title"
          content="Mod List Creator | Project Zomboid"
        />
        <meta
          property="og:description"
          content="Generator and creator mod list for Project Zomboid"
        />
        <meta property="og:image" content="/mod-creator.png" />

        <link rel="icon" href="/web/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/web/apple-touch-icon.png" />
      </head>
      <ModListProvider>
        <body className={cn(inter.className, "bg-gray-900")}>{children}</body>
      </ModListProvider>
    </html>
  );
}
