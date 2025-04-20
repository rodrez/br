import type { Metadata } from "next";
import { HydrateClient, api } from "@/trpc/server";
import { Toaster } from "sonner";
import Link from "next/link";
import Image from "next/image";
import type { RouterOutputs } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Rankings | Brand Ranks",
  description: "View the latest brand rankings and comparisons",
};

type Category = RouterOutputs["ranking"]["getCategories"][number];
type Ranking = RouterOutputs["ranking"]["getTopRankings"][number];

export default async function RankingsPage() {
  // Fetch top rankings and categories
  const topRankings = await api.ranking.getTopRankings({ limit: 10 });
  const categories = await api.ranking.getCategories();

  return (
    <HydrateClient>
      <Toaster position="top-right" />
      <div className="container mx-auto py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Brand Rankings</h1>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-600">
            Compare and discover the top-ranked brands across different
            categories.
          </p>
        </div>

        {/* Categories Section */}
        <div className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">Browse by Category</h2>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {categories.length > 0 ? (
              categories.map((category: Category) => (
                <Link
                  key={category.id}
                  href={`/rankings/category/${category.slug}`}
                  className="rounded-lg border border-gray-200 p-4 shadow-sm transition hover:border-gray-300 hover:shadow-md"
                >
                  {category.imageUrl && (
                    <div className="mb-2">
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-medium">{category.name}</h3>
                </Link>
              ))
            ) : (
              <div className="col-span-full rounded-lg border border-gray-200 p-6 text-center">
                <p className="text-gray-500">No categories available yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Rankings Section */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Top Ranked Brands</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topRankings.length > 0 ? (
              topRankings.map((ranking: Ranking) => (
                <div
                  key={ranking.id}
                  className="flex flex-col rounded-lg border border-gray-200 p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                      {ranking.brand.name}
                    </h3>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                      Score: {ranking.score.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex-grow">
                    {ranking.brand.logoUrl && (
                      <div className="mb-4 flex justify-center">
                        <Image
                          src={ranking.brand.logoUrl}
                          alt={ranking.brand.name}
                          width={100}
                          height={100}
                          className="h-20 w-auto object-contain"
                        />
                      </div>
                    )}

                    <p className="mb-4 text-gray-600">
                      Category:{" "}
                      <Link
                        href={`/rankings/category/${ranking.category.slug}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {ranking.category.name}
                      </Link>
                    </p>

                    {ranking.review && (
                      <p className="text-gray-600">
                        {ranking.review.substring(0, 120)}...
                      </p>
                    )}
                  </div>

                  <div className="mt-4">
                    <Link
                      href={`/rankings/category/${ranking.category.slug}`}
                      className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      View Full Rankings
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full rounded-lg border border-gray-200 p-6 text-center">
                <p className="text-gray-500">
                  No rankings available yet. Be the first to rank your favorite
                  brands!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
