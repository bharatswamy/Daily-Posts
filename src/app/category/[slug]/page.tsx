import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategories, getCategoryBySlug, getPostsByCategory } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/seo-json-ld";
import { site } from "@/lib/site";

export function generateStaticParams() { return getAllCategories().map((category) => ({ slug: category.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return { title: category.seoTitle, description: category.seoDescription, alternates: { canonical: `/category/${category.slug}` }, openGraph: { title: category.seoTitle, description: category.seoDescription, url: `${site.domain}/category/${category.slug}` } };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const posts = getPostsByCategory(category.slug);
  const featured = posts[0];
  const supporting = posts.slice(1, 3);
  const remaining = posts.slice(3);
  const relatedCategories = getAllCategories().filter((item) => item.slug !== category.slug).slice(0, 4);
  const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site.domain }, { "@type": "ListItem", position: 2, name: category.name, item: `${site.domain}/category/${category.slug}` }] };

  return <>
    <SiteHeader />
    <main>
      <section className="category-hero">
        <div className="shell category-hero-grid">
          <div className="category-hero-copy">
            <Breadcrumbs items={[{ label: category.name }]} />
            <Link href="/" className="category-home-link">← Back home</Link>
            <span className="eyebrow">The {category.name} desk</span>
            <h1 className="display">{category.name}</h1>
            <p>{category.description} Explore practical context, useful frameworks, and clear next steps in every story.</p>
          </div>
          <div className="category-hero-note" aria-label={`${posts.length} stories in this category`}>
            <span className="eyebrow">A considered collection</span>
            <strong>{String(posts.length).padStart(2, "0")}</strong>
            <span>stories to read, save, and return to.</span>
            <span className="category-hero-mark" aria-hidden>✦</span>
          </div>
        </div>
      </section>
      <div className="shell category-content">
        <JsonLd value={{ "@context": "https://schema.org", "@type": "CollectionPage", name: category.name, url: `${site.domain}/category/${category.slug}`, description: category.description }} />
        <JsonLd value={breadcrumbJsonLd} />
        <section className="category-featured" aria-labelledby="featured-heading">
          <div className="category-section-label"><span className="eyebrow" id="featured-heading">Start here</span><span className="section-index">01 / FEATURED</span></div>
          <div className="category-featured-grid">
            <ArticleCard post={featured} featured />
            <div className="category-supporting">{supporting.map((post) => <ArticleCard key={post.slug} post={post} />)}</div>
          </div>
        </section>
        <section className="category-library" aria-labelledby="library-heading">
          <div className="category-section-label"><div><span className="eyebrow">The full desk</span><h2 id="library-heading" className="display">More from {category.name}.</h2></div><span className="section-index">02 / LIBRARY</span></div>
          <div className="category-list">{remaining.map((post) => <ArticleCard key={post.slug} post={post} />)}</div>
        </section>
        <section className="related-categories" aria-labelledby="related-heading">
          <div className="category-section-label"><div><span className="eyebrow">Keep exploring</span><h2 id="related-heading" className="display">Related categories.</h2></div></div>
          <div className="related-category-grid">{relatedCategories.map((item, index) => <Link href={`/category/${item.slug}`} className="related-category-card" key={item.slug}><span className="eyebrow">0{index + 1}</span><strong className="display">{item.name}</strong><span aria-hidden>↗</span></Link>)}</div>
        </section>
      </div>
    </main>
    <SiteFooter />
  </>;
}
