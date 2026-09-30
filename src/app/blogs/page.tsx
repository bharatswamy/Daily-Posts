import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";
import { Reveal } from "@/components/reveal";
import { LoadMorePosts } from "@/components/load-more-posts";

export const metadata = { title: "Blogs", description: "Browse all DailyTransPosts articles by category." };

export default function BlogsPage() {
  const posts = getAllPosts();
  const [featured, ...library] = posts;
  return <><SiteHeader/><main className="shell directory-page blog-library">
    <Reveal delay={70} className="blog-library-heading"><div className="directory-heading"><span className="eyebrow">The full library · {posts.length} stories</span><h1 className="display">Ideas worth<br /><em>keeping.</em></h1><p>Browse the publication by mood, question, or category. Start with the featured read, then wander wherever your curiosity points.</p><div className="library-stats"><span><strong>{getAllCategories().length}</strong> desks</span><span>Fresh thinking, clearly told</span></div></div></Reveal>
    <Reveal delay={150} className="blog-showcase-reveal"><section className="blog-showcase"><div className="showcase-kicker"><span>Editor&apos;s doorway</span><span>01 / {String(posts.length).padStart(3, "0")}</span></div><div className="showcase-card"><div className="showcase-index" aria-hidden>01</div><ArticleCard post={featured} featured /></div><div className="showcase-note"><span className="eyebrow">Read this first</span><p>A useful idea should give you a better next question. This is a good place to begin.</p><Link href={`/blog/${featured.slug}`} className="text-link">Open featured story <span aria-hidden>→</span></Link></div></section></Reveal>
    <div className="library-filter-wrap"><div className="library-filter-label"><span className="eyebrow">Move through the desks</span><span>Filter by category</span></div><nav className="directory-filter library-filter" aria-label="Filter blogs by category"><Link href="/blogs" className="active">All stories</Link>{getAllCategories().map((category) => <Link key={category.slug} href={`/category/${category.slug}`}>{category.name}</Link>)}</nav></div>
    <LoadMorePosts posts={library} initialVisible={12} />
  </main><SiteFooter/></>;
}
