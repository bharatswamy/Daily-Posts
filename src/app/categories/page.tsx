import Link from "next/link";
import { getAllCategories, getPostsByCategory } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export const metadata = { title: "Categories", description: "Browse every DailyTransPosts category." };

export default function CategoriesPage() {
  const categories = getAllCategories();
  const spotlight = categories[0];
  const spotlightPosts = spotlight ? getPostsByCategory(spotlight.slug) : [];
  return <>
    <SiteHeader />
    <main className="shell directory-page category-atlas">
      <Reveal delay={80} className="atlas-heading-reveal"><div className="directory-heading atlas-heading"><span className="eyebrow">The DailyTransPosts atlas</span><h1 className="display">Find your<br /><em>next corner.</em></h1><p>Every desk has a different rhythm. Move through the collection, follow the question that catches you, and let the next useful idea find you.</p><div className="atlas-heading-meta"><span><strong>{categories.length}</strong> editorial desks</span><span><strong>{getPostsByCategory(spotlight?.slug ?? "").length}</strong> in the spotlight</span><span>Curated for curious people</span></div></div></Reveal>
      <div className="atlas-orbit" aria-hidden="true"><span>EXPLORE · READ · RETURN · </span></div>
      {spotlight && <Reveal delay={180} className="atlas-spotlight-reveal"><section className="atlas-spotlight"><div className="atlas-rail" aria-hidden="true"><span>01</span><i /><span>START HERE</span></div><div><span className="eyebrow">A doorway into the collection</span><h2 className="display">Begin with<br /><em>{spotlight.name}</em></h2><p>{spotlight.description}</p><Link href={`/category/${spotlight.slug}`} className="atlas-spotlight-link">Enter the desk <span aria-hidden>↗</span></Link></div><div className="atlas-spotlight-orbit" aria-hidden="true"><span>{String(spotlightPosts.length).padStart(2, "0")}</span><small>stories to start</small></div></section></Reveal>}
      <div className="category-directory atlas-grid">{categories.map((category, index) => <Reveal key={category.slug} delay={120 + index * 45} className="atlas-reveal"><Link className={`category-tile atlas-tile atlas-tile-depth atlas-tile-${(index % 6) + 1}`} href={`/category/${category.slug}`}><span className="tile-number">{String(index + 1).padStart(2, "0")}</span><div className="atlas-tile-copy"><span className="eyebrow">{getPostsByCategory(category.slug).length} stories</span><h2 className="display">{category.name}</h2><p>{category.description}</p></div><span className="tile-arrow" aria-hidden>↗</span><span className="atlas-tile-line" aria-hidden /></Link></Reveal>)}</div>
      <Reveal className="atlas-footer-note"><p><span className="eyebrow">A good place to begin</span><strong>Choose a question, not just a category.</strong> The best read is usually the one that makes your next question sharper.</p><Link href="/blogs" className="text-link">Browse every blog <span aria-hidden>→</span></Link></Reveal>
    </main>
    <SiteFooter />
  </>;
}
