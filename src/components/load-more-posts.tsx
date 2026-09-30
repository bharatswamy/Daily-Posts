"use client";

import { useState } from "react";
import type { Post } from "@/lib/types";
import { ArticleCard } from "@/components/article-card";
import { Reveal } from "@/components/reveal";

export function LoadMorePosts({ posts, initialVisible = 12 }: { posts: Post[]; initialVisible?: number }) {
  const [visibleCount, setVisibleCount] = useState(initialVisible);
  const visiblePosts = posts.slice(0, visibleCount);
  const remainingPosts = posts.length - visiblePosts.length;

  return <>
    <div className="article-grid blog-directory-grid">
      {visiblePosts.map((post, index) => <Reveal key={post.slug} delay={Math.min(80 + index * 18, 320)} className="blog-card-reveal"><ArticleCard post={post} /></Reveal>)}
    </div>
    {remainingPosts > 0 && <div className="load-more-shell"><p aria-live="polite"><strong>{visiblePosts.length}</strong> of {posts.length} stories on the page</p><button type="button" className="load-more-button" onClick={() => setVisibleCount((count) => Math.min(count + 12, posts.length))}>Load more articles <span aria-hidden>↓</span></button></div>}
  </>;
}
