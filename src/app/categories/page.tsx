import Link from "next/link";
import { getAllCategories, getPostsByCategory } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = { title: "Categories", description: "Browse every DailyTransPosts category." };

export default function CategoriesPage() { return <><SiteHeader/><main className="shell directory-page"><div className="directory-heading"><span className="eyebrow">Explore by interest</span><h1 className="display">All categories.</h1><p>Find a useful corner of the DailyTransPosts library, from AI and software to money, travel, health, and the ideas shaping everyday life.</p></div><div className="category-directory">{getAllCategories().map((category, index) => <Link className="category-tile" href={`/category/${category.slug}`} key={category.slug}><span className="tile-number">{String(index + 1).padStart(2, "0")}</span><div><span className="eyebrow">{getPostsByCategory(category.slug).length} stories</span><h2 className="display">{category.name}</h2><p>{category.description}</p></div><span className="tile-arrow" aria-hidden>↗</span></Link>)}</div></main><SiteFooter/></>; }
