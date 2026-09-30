import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SearchInterface } from "@/components/search-interface";
import { Suspense } from "react";
export const metadata: Metadata = { title: "Search", description: "Search the DailyTransPosts library.", robots: { index: false, follow: true } };
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) { const params = await searchParams; return <><SiteHeader/><main className="shell search-page"><span className="eyebrow">Find your next good read</span><h1 className="display">Search the library.</h1><Suspense fallback={<p className="muted">Loading search…</p>}><SearchInterface initialQuery={params.q || ""}/></Suspense></main><SiteFooter/></>; }
