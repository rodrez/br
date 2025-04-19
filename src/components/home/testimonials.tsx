'use client';

import InfiniteCarousel from './infinite-carousel';
import { goodComments } from '@/lib/data/good-comments';

// Sample comments - in a real app, these could come from an API or props

export default function Testimonials() {
  const firstPart = goodComments.slice(0, 5);
  const secondPart = goodComments.slice(5, goodComments.length);

  return (
    <section className="dark:bg-slate-800">
      <div className="py-12 md:py-20">
        {/* Heading */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2
              className="font-inter-tight text-primary text-3xl md:text-4xl font-bold dark:text-slate-200"
            >
              Loved by thousands of viewers from around the world
            </h2>
          </div>
        </div>
        <InfiniteCarousel items={firstPart} />
        <InfiniteCarousel items={secondPart} reverse={true} />
      </div>
    </section>
  );
} 