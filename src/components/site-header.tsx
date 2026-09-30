"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="shell header-inner">
    <Link href="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark">DT</span><span><strong>DailyTransPosts</strong><small>Useful reading, daily.</small></span></Link>
    <button className="menu-button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
    <nav id="main-nav" className={open ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
      {site.nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link className="nav-search" href="/search" onClick={() => setOpen(false)}>Search <span aria-hidden>↗</span></Link>
    </nav>
  </div></header>;
}
