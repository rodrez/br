import { z } from "zod";
import { eq, desc, and, gte, ne, sql } from "drizzle-orm";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { rankings, categories, brands } from "@/server/db/schema";

export const rankingRouter = createTRPCRouter({
  // Get all categories
  getCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.categories.findMany({
      orderBy: (categories, { asc }) => [asc(categories.name)],
    });
  }),

  // Get category by slug
  getCategoryBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const category = await ctx.db.query.categories.findFirst({
        where: (categories, { eq }) => eq(categories.slug, input.slug),
      });

      return category;
    }),

  // Get rankings by category
  getRankingsByCategory: publicProcedure
    .input(z.object({ categoryId: z.number() }))
    .query(async ({ ctx, input }) => {
      const categoryRankings = await ctx.db.query.rankings.findMany({
        where: (rankings, { eq }) => eq(rankings.categoryId, input.categoryId),
        orderBy: (rankings, { asc }) => [asc(rankings.rank)],
        with: {
          brand: true,
        },
      });

      return categoryRankings;
    }),

  // Get top ranked brands across all categories
  getTopRankings: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(10) }))
    .query(async ({ ctx, input }) => {
      const topRankings = await ctx.db.query.rankings.findMany({
        where: (rankings, { eq }) => eq(rankings.rank, 1),
        limit: input.limit,
        orderBy: (rankings, { desc }) => [desc(rankings.score)],
        with: {
          brand: true,
          category: true,
        },
      });

      return topRankings;
    }),

  // Create a new ranking
  create: protectedProcedure
    .input(
      z.object({
        categoryId: z.number(),
        brandId: z.number(),
        rank: z.number().min(1),
        score: z.number().min(0).max(10),
        review: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if a ranking already exists for this brand in this category
      const existingRanking = await ctx.db.query.rankings.findFirst({
        where: (rankings, { and, eq }) => 
          and(
            eq(rankings.categoryId, input.categoryId),
            eq(rankings.brandId, input.brandId)
          ),
      });

      if (existingRanking) {
        throw new Error("A ranking for this brand in this category already exists");
      }

      // Insert the new ranking
      await ctx.db.insert(rankings).values({
        categoryId: input.categoryId,
        brandId: input.brandId,
        rank: input.rank,
        score: input.score,
        review: input.review,
        createdById: ctx.session.user.id,
      });

      // Reorder ranks if necessary
      // Get all rankings for this category with rank >= input.rank and different brandId
      const rankingsToUpdate = await ctx.db.query.rankings.findMany({
        where: (rankings, { and, eq, gte, ne }) => 
          and(
            eq(rankings.categoryId, input.categoryId),
            gte(rankings.rank, input.rank),
            ne(rankings.brandId, input.brandId)
          ),
      });

      // Update each ranking's rank by 1
      for (const ranking of rankingsToUpdate) {
        await ctx.db.update(rankings)
          .set({ rank: ranking.rank + 1 })
          .where(eq(rankings.id, ranking.id));
      }
    }),

  // Update an existing ranking
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        rank: z.number().min(1).optional(),
        score: z.number().min(0).max(10).optional(),
        review: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const ranking = await ctx.db.query.rankings.findFirst({
        where: (rankings, { eq }) => eq(rankings.id, input.id),
      });

      if (!ranking) {
        throw new Error("Ranking not found");
      }

      // Create update object with only defined fields
      const updateData: {
        rank?: number;
        score?: number;
        review?: string | null;
        updatedAt: Date;
      } = {
        updatedAt: new Date(),
      };

      if (input.rank !== undefined) {
        updateData.rank = input.rank;
      }
      
      if (input.score !== undefined) {
        updateData.score = input.score;
      }
      
      if (input.review !== undefined) {
        updateData.review = input.review;
      }

      // Update the ranking
      await ctx.db.update(rankings)
        .set(updateData)
        .where(eq(rankings.id, input.id));

      // Reorder ranks if necessary
      if (input.rank && input.rank !== ranking.rank) {
        // Get all rankings for this category with rank >= input.rank and different brandId
        const rankingsToUpdate = await ctx.db.query.rankings.findMany({
          where: (rankings, { and, eq, gte, ne }) => 
            and(
              eq(rankings.categoryId, ranking.categoryId),
              gte(rankings.rank, input.rank),
              ne(rankings.brandId, ranking.brandId)
            ),
        });

        // Update each ranking's rank by 1
        for (const r of rankingsToUpdate) {
          await ctx.db.update(rankings)
            .set({ rank: r.rank + 1 })
            .where(eq(rankings.id, r.id));
        }
      }
    }),

  // Delete a ranking
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(rankings).where(eq(rankings.id, input.id));
    }),
}); 