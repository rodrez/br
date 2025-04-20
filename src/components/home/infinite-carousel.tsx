"use client";

import { useEffect, useRef } from "react";

interface TestimonialItem {
  user: string;
  comment: string;
}

interface InfiniteCarouselProps {
  items: TestimonialItem[];
  reverse?: boolean;
}

export default function InfiniteCarousel({
  items,
  reverse = false,
}: InfiniteCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate the total width of original items
    const itemsContainer = track.querySelector('.items-container');
    if (!itemsContainer) return;

    // Clone the container for seamless loop
    const clone = itemsContainer.cloneNode(true) as HTMLElement;
    track.appendChild(clone);

    // Set initial position
    track.style.transform = 'translateX(0)';
  }, []); // Empty dependency array since we only need to run this once

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden my-8">
      <div
        ref={trackRef}
        className="flex gap-x-6 p-2 animate-infinite-scroll"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="items-container flex gap-4 py-4">
          {items.map((item) => (
            <div
              key={item.user}
              className="flex-shrink-0 w-[300px] bg-white dark:bg-slate-700 rounded-lg p-6 shadow-md"
            >
              <div className="flex items-start mb-4">
                <div className="flex items-center gap-x-2">
                  <div className="font-bold text-primary text-base sm:text-lg bg-slate-100 rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center">
                    {item.user.slice(1, 2).toUpperCase()}
                  </div>
                  <div className="text-primary text-sm sm:text-base">
                    {item.user}
                  </div>
                </div>
              </div>
              <p className="text-slate-500 text-sm sm:text-base">
                {item.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
