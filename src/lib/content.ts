import * as raw from "../../content/posts.mjs";
import * as added from "../../content/new-posts.mjs";
import type { Category, Post } from "./types";

// The original library and additive batches are kept separate so existing content
// remains auditable while the app exposes one unified publication collection.
const data = raw as unknown as { categories: Category[]; posts: Post[] };
const addedData = added as unknown as { posts: Post[] };
export const categories = data.categories;
export const posts = [...data.posts, ...addedData.posts];
export function getAllCategories() { return categories; }
export function getAllPosts() { return posts; }
export function getCategoryBySlug(slug: string) { return categories.find((category) => category.slug === slug); }
export function getPostBySlug(slug: string) { return posts.find((post) => post.slug === slug); }
export function getPostsByCategory(slug: string) { return posts.filter((post) => post.categorySlug === slug); }
