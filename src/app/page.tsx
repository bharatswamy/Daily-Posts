import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/seo-json-ld";
import { site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const featured = posts[2];
  const latest = posts.slice(0, 6);
  const newBlogs = [...posts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 4);
  return <>
    <JsonLd value={{ "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.domain, description: site.description }} />
    <SiteHeader />
    <main>
      <section className="hero hero-redesign interactive-panel">
        <div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">Daily ideas, carefully edited</span>
            <h1 className="display hero-title"><span className="headline-word word-one">Read</span> <span className="headline-word word-two">something</span> <span className="headline-word word-three">that moves</span> <span className="headline-word word-four">you forward.</span></h1>
            <p>Useful, well-made reading for the moments when you want more than a quick answer—and less than a lecture.</p>
            <form className="search-box hero-search" action="/search"><label className="sr-only" htmlFor="hero-search">Search DailyTransPosts</label><input id="hero-search" name="q" placeholder="What are you curious about?" /><button>Explore <span aria-hidden>↗</span></button></form>
            <div className="scroll-cue"><span className="scroll-line" aria-hidden="true" /> Scroll to explore</div>
          </div>
          <Link href={`/blog/${featured.slug}`} className="hero-card hero-feature interactive-panel panel-glow"><span className="hero-feature-index">03</span><span className="eyebrow">Editor’s pick</span><h2 className="display">{featured.title}</h2><p>{featured.excerpt}</p><span className="hero-card-link">Read the story <span aria-hidden>↗</span></span></Link>
        </div>
      </section>
      <div className="hero-ticker" aria-label="Topics covered"><div className="ticker-track"><span>TECHNOLOGY</span><i>✦</i><span>AI & CHATGPT</span><i>✦</i><span>CAREER</span><i>✦</i><span>PERSONAL FINANCE</span><i>✦</i><span>TRAVEL</span><i>✦</i><span>HEALTH & FITNESS</span><i>✦</i><span>HOW-TO GUIDES</span><i>✦</i><span>TECHNOLOGY</span><i>✦</i><span>AI & CHATGPT</span><i>✦</i></div></div>
      <div className="shell">
        <Reveal delay={80}><section className="publication-stats"><div><strong>200</strong><span>original stories</span></div><div><strong>15</strong><span>ways to explore</span></div><div><strong>01</strong><span>good read at a time</span></div><div className="stats-note">No noise.<br /><em>Just useful ideas.</em></div></section></Reveal>
        <Reveal delay={140}><section className="section editorial-lead gallery-section"><div className="section-kicker"><span className="eyebrow">The latest thinking</span><Link href="/blogs">View all stories ↗</Link></div><div className="editorial-lead-grid"><div className="editorial-intro"><h2 className="display">Stories worth<br /><em>your attention.</em></h2><p>We follow the questions people are actually asking—and make the answers clearer, calmer, and more useful.</p><Link href="/categories" className="text-link">Browse by category <span aria-hidden>→</span></Link></div><div className="editorial-stack">{latest.slice(0, 3).map((post, index) => <Link className="story-row magnetic-row gallery-row" href={`/blog/${post.slug}`} key={post.slug}><span className="story-number">0{index + 1}</span><span><span className="eyebrow">{post.categorySlug.replaceAll("-", " ")}</span><strong className="display">{post.title}</strong></span><span className="story-arrow" aria-hidden>↗</span></Link>)}</div></div></section></Reveal>
        <Reveal delay={180}><section className="section latest-section"><div className="section-head"><div><span className="eyebrow">Fresh from the desk</span><h2 className="display">New perspectives.</h2></div><span className="section-index">01 / 04</span></div><div className="article-grid editorial-grid">{latest.slice(3, 6).map((post) => <ArticleCard key={post.slug} post={post} />)}</div></section></Reveal>
        <Reveal><section className="section new-blogs-section"><div className="new-blogs-intro"><div><span className="eyebrow">Just published</span><h2 className="display">New blogs.</h2><p>Fresh ideas from the desk, ready when you are.</p></div><Link href="/blogs" className="text-link">See the full library <span aria-hidden>→</span></Link></div><div className="new-blogs-grid">{newBlogs.map((post, index) => <div className={`new-blog-item new-blog-item-${index + 1}`} key={post.slug}><ArticleCard post={post} featured={index === 0} /></div>)}</div></section></Reveal>
        <Reveal delay={220}><section className="section category-showcase"><div className="section-head"><div><span className="eyebrow">Find your corner</span><h2 className="display">Explore by interest.</h2></div><Link href="/categories" className="muted">All categories ↗</Link></div><div className="category-mosaic">{categories.slice(0, 6).map((category, index) => <Link className={`category-card category-card-${index + 1} tilt-in`} href={`/category/${category.slug}`} key={category.slug}><span className="category-card-number">0{index + 1}</span><span className="category-card-name display">{category.name}</span><span className="category-card-arrow" aria-hidden>↗</span></Link>)}</div></section></Reveal>
        <Reveal><section className="section editorial-quote motion-quote"><span className="quote-mark">“</span><blockquote className="display">The internet is full of answers. We’re here for the ones that help you ask a better question.</blockquote><span className="eyebrow">The DailyTransPosts editorial desk</span></section></Reveal>
        {categories.slice(6).map((category, index) => { const categoryPosts = posts.filter((post) => post.categorySlug === category.slug); return <Reveal key={category.slug}><section className={`section category-section ${index % 2 === 0 ? "category-section-tint" : ""}`}><div className="section-head"><div><span className="eyebrow">{String(index + 7).padStart(2, "0")} / {category.name}</span><h2 className="display editorial-sweep">{category.name}</h2></div><Link href={`/category/${category.slug}`} className="muted">See all ↗</Link></div><p className="section-description">{category.description}</p><div className="article-grid two">{categoryPosts.slice(0, 2).map((post) => <ArticleCard key={post.slug} post={post} />)}</div></section></Reveal>; })}
        <NewsletterCta /><Reveal><section className="final-cta texture-drift"><span className="eyebrow">Keep exploring</span><h2 className="display">There’s always<br /><em>another good read.</em></h2><Link href="/blogs" className="cta-button">Browse all 200 stories <span aria-hidden>↗</span></Link></section></Reveal>
      </div>
    </main><SiteFooter />
  </>;
}
