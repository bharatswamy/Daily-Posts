import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories, getCategoryBySlug, getPostsByCategory } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/seo-json-ld";
import { site } from "@/lib/site";
export function generateStaticParams() { return getAllCategories().map((category) => ({ slug: category.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const category = getCategoryBySlug(slug); if (!category) return {}; return { title: category.seoTitle, description: category.seoDescription, alternates: { canonical: `/category/${category.slug}` }, openGraph: { title: category.seoTitle, description: category.seoDescription, url: `${site.domain}/category/${category.slug}` } }; }
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const category = getCategoryBySlug(slug); if (!category) notFound(); const posts = getPostsByCategory(category.slug); return <><SiteHeader/><main><div className="category-band"><div className="shell category-intro"><Breadcrumbs items={[{label:category.name}]}/><span className="eyebrow">The {category.name} desk</span><h1 className="display" style={{fontSize:"clamp(3rem,7vw,6rem)",lineHeight:.95,margin:"14px 0 20px"}}>{category.name}</h1><p>{category.description} Explore the full collection below, with practical context and a clear next step in every story.</p></div></div><div className="shell section"><JsonLd value={{"@context":"https://schema.org","@type":"CollectionPage",name:category.name,url:`${site.domain}/category/${category.slug}`,description:category.description}}/><div className="category-list">{posts.map((post) => <ArticleCard key={post.slug} post={post} />)}</div></div></main><SiteFooter/></>; }
