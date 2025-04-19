'use client';

import { useEffect, useRef } from 'react';

interface TestimonialItem {
  name: string;
  comment: string;
  avatar: string;
  role: string;
}

interface InfiniteCarouselProps {
  items: TestimonialItem[];
  reverse?: boolean;
}

export default function InfiniteCarousel({ items, reverse = false }: InfiniteCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Clone items to create the infinite effect
    const originalItems = Array.from(track.children);
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });

    // Set animation
    const duration = items.length * 25; // Longer duration for smoother animation
    track.style.animationDuration = `${duration}s`;
    track.style.animationDirection = reverse ? 'reverse' : 'normal';
  }, [items.length, reverse]);

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden my-8">
      <div 
        className={`flex gap-4 py-4 w-max animate-scroll`}
        ref={trackRef}
        style={{
          animationDuration: `${items.length * 15}s`,
          animationDirection: reverse ? 'reverse' : 'normal'
        }}
      >
        {items.map((item, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 w-[300px] bg-white dark:bg-slate-700 rounded-lg p-6 shadow-md"
          >
            <div className="flex items-start mb-4">
              <img
                src={item.avatar}
                alt={`${item.name}'s avatar`}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{item.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300">{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 