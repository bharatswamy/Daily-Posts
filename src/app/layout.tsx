import type { Metadata } from "next";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain), title: { default: site.name, template: `%s | ${site.name}` }, description: site.description,
  alternates: { canonical: "/" }, icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" }, openGraph: { type: "website", siteName: site.name, title: site.name, description: site.description, url: site.domain },
  twitter: { card: "summary_large_image", title: site.name, description: site.description }, robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
