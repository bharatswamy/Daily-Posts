import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";

export const metadata = { title: "Blogs", description: "Browse all DailyTransPosts articles by category." };

export default function BlogsPage() { const posts = getAllPosts(); return <><SiteHeader/><main className="shell directory-page"><div className="directory-heading"><span className="eyebrow">The full library</span><h1 className="display">All blogs.</h1><p>Browse every story in one place, or jump to a category when you know what you are looking for.</p><div className="directory-filter"><Link href="/blogs" className="active">All stories</Link>{getAllCategories().map((category) => <Link key={category.slug} href={`/category/${category.slug}`}>{category.name}</Link>)}</div></div><div className="article-grid blog-directory-grid">{posts.map((post) => <ArticleCard key={post.slug} post={post}/>)}</div></main><SiteFooter/></>; }
