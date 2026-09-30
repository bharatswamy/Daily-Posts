import Link from "next/link";
import { getAllCategories } from "@/lib/content";

export function SiteFooter() { return <footer className="site-footer"><div className="shell footer-grid">
  <div><Link href="/" className="footer-brand">DailyTransPosts<span>®</span></Link><p>Useful, well-made reading for clearer decisions in a noisy world.</p></div>
  <div><h3>Explore</h3><div className="footer-links">{getAllCategories().slice(0, 8).map((category) => <Link key={category.slug} href={`/category/${category.slug}`}>{category.name}</Link>)}</div></div>
  <div><h3>About</h3><div className="footer-links"><Link href="/about">About us</Link><Link href="/contact">Contact</Link><Link href="/sitemap">Sitemap</Link><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms">Terms</Link><Link href="/disclaimer">Disclaimer</Link></div></div>
  </div><div className="shell footer-bottom"><span>© 2026 DailyTransPosts</span><span>Made for curious readers.</span></div></footer>; }
