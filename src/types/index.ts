export interface Product {
  id: number;
  name: string;
  url: string;
  img: string;
  type: string;
  category: string;
  created_at: string;
  price?: string;
  description?: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
}

export interface ProfileLink {
  id: number;
  title: string;
  url: string;
  image: string;
  description?: string;
}

export interface ProfileData {
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  bio: string;
  email: string;
  socials: SocialLink[];
}

export type TabType = "links" | "shop";

export type SortOption = 
  | "newest" 
  | "oldest" 
  | "name-asc" 
  | "name-desc" 
  | "price-low" 
  | "price-high";

export type CategoryFilter = "all" | "tech" | "accessories";
