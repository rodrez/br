import type { Metadata } from "next";

import { HydrateClient } from "@/trpc/server";

import Hero from "@/components/home/hero";
import FeaturedTests from "@/components/home/featured-test";
import Testimonials from "@/components/home/testimonials";
import Newsletter from "@/components/home/newsletter";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Home",
  description: "Brand Ranks site",
};

export default async function Home() {
  return (
    <HydrateClient>
      <Toaster position="top-right" />
      <Hero />
      <FeaturedTests />
      <Testimonials />
      <Newsletter />
    </HydrateClient>
  );
}
