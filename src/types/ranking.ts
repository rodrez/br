export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  websiteUrl: string | null;
}

export interface Ranking {
  id: number;
  categoryId: number;
  brandId: number;
  rank: number;
  score: number;
  review: string | null;
  createdById: string;
  createdAt: Date;
  updatedAt: Date | null;
  brand?: Brand;
  category?: Category;
} 