import * as raw from "../../content/posts.mjs";
import * as added from "../../content/new-posts.mjs";
import * as expansion from "../../content/expansion-posts.mjs";
import type { Category, Post } from "./types";

// The original library and additive batches are kept separate so existing content
// remains auditable while the app exposes one unified publication collection.
const data = raw as unknown as { categories: Category[]; posts: Post[] };
const addedData = added as unknown as { posts: Post[] };
const expansionData = expansion as unknown as { categories: Category[]; posts: Post[] };
export const categories = [...data.categories, ...expansionData.categories.slice(data.categories.length)];
export const posts = [...data.posts, ...addedData.posts, ...expansionData.posts];
export function getAllCategories() { return categories; }
export function getAllPosts() { return posts; }
export function getCategoryBySlug(slug: string) { return categories.find((category) => category.slug === slug); }
export function getPostBySlug(slug: string) { return posts.find((post) => post.slug === slug); }
export function getPostsByCategory(slug: string) { return posts.filter((post) => post.categorySlug === slug); }
