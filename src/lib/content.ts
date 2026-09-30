import * as raw from "../../content/posts.mjs";
import type { Category, Post } from "./types";

// The local content module is the source of truth; this cast keeps the authoring format readable.
const data = raw as unknown as { categories: Category[]; posts: Post[] };
export const categories = data.categories;
export const posts = data.posts;
export function getAllCategories() { return categories; }
export function getAllPosts() { return posts; }
export function getCategoryBySlug(slug: string) { return categories.find((category) => category.slug === slug); }
export function getPostBySlug(slug: string) { return posts.find((post) => post.slug === slug); }
export function getPostsByCategory(slug: string) { return posts.filter((post) => post.categorySlug === slug); }
