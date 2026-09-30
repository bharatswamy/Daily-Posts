import Link from "next/link";
import type { Post } from "@/lib/types";
import { getCategoryBySlug } from "@/lib/content";

export function ArticleCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const category = getCategoryBySlug(post.categorySlug);
  return <article className={featured ? "article-card featured gallery-card-hover" : "article-card gallery-card-hover"}>
    <div className="card-copy"><div className="card-topline"><span className="eyebrow">{category?.name}</span><span className="card-arrow" aria-hidden>↗</span></div><h3 className="display"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><div className="card-meta">{post.author.name} · {new Date(post.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</div></div>
  </article>;
}
