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
      <ModListProvider>
        <body className={cn(inter.className, "bg-gray-900")}>{children}</body>
      </ModListProvider>
    </html>
  );
}
