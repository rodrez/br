'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'motion/react';

interface FeaturedVideo {
  title: string;
  summary: string;
  tests: string[];
  thumbnail: string;
  url: string;
}

// Helper function to truncate text
const truncate = (text: string, length: number) => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};

export default function FeaturedTests() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const controls = useAnimation();

  // Sample data - you can replace with API calls or props
  const defaultVideos: FeaturedVideo[] = [
    {
      title: 'Engineers Test the Best Oil Filters! FRAM | Mobil 1 | K&N | Walmart Brand',
      summary:
        "We LAB tested four high mileage oil filters to see which one was the best. From their capacity to filter out aluminum powder, to their flow restriction, and filtering performance, we're leaving no stone unturned. If you want to learn how an oil filter works and find out which one takes the crown, then stick around.",
      tests: ['Capacity', 'Filtering Performance', 'Flow Restriction'],
      thumbnail: 'https://utfs.io/f/jOKDYBvuAoQBAqSvKl1gK53ERXl4nr9CshkvYNGpaI2fw1Hd',
      url: 'https://youtu.be/rqDjCzyYUOU?si=iG_92Wz-hMwnPV4f',
    },
    {
      title: 'Best Oil Filters of 2024 (Engineer Tested) - Amsoil | Mobil 1 | Mann | K&N',
      summary:
        'We tested 4 of the best oil filters to see which one was the best (Amsoil | Mobil 1 | Mann | K&N). We simulated hot and cold temperatures, their ability to filter out fine particles, and sent them off to a laboratory to help you make the right decision in your next oil filter change',
      tests: ['Capacity', 'Filtering Performance', 'Flow Restriction'],
      thumbnail: 'https://utfs.io/f/jOKDYBvuAoQBAqSvKl1gK53ERXl4nr9CshkvYNGpaI2fw1Hd',
      url: 'https://youtu.be/mYi640pMjWA?si=d8hjFQlqZu3kMV2f',
    },
    {
      title: 'Engineers Test the WORST Fram Filter',
      summary:
        'We tested the most popular Fram oil filters to see which one was the best. Is the Fram Extra Guard as bad as they say? Is the New Fram Endurance similar to Amsoil?',
      tests: ['Capacity', 'Filtering Performance', 'Flow Restriction'],
      thumbnail: 'https://utfs.io/f/jOKDYBvuAoQBAqSvKl1gK53ERXl4nr9CshkvYNGpaI2fw1Hd',
      url: 'https://youtu.be/JRbzE1C-FPs?si=fYKeXPQfoEXGiTR0',
    },
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section className="py-8 sm:py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-5xl">Featured Rankings</h2>
          <p className="max-w-[900px] text-sm sm:text-base text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Our latest and most popular product rankings, based on rigorous testing and analysis.
          </p>
        </div>
        <div 
          className="mt-8 sm:mt-16 flex flex-col items-center gap-4 sm:gap-8"
          ref={containerRef}
        >
          {defaultVideos.map((video, i) => (
            <motion.div
              key={i}
              className={`relative w-full sm:max-w-[80%] lg:max-w-[50%] h-[300px] sm:h-[400px]`}
              style={{ alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end' }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              animate={controls}
              variants={{
                visible: { 
                  opacity: 1, 
                  x: 0, 
                  transition: { 
                    duration: 0.5, 
                    delay: i * 0.2
                  } 
                }
              }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-w-16 aspect-h-9 max-h-[300px] sm:max-h-[400px] relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="object-cover w-full h-full"
                  />
                  <a
                    href={video.url}
                    className="absolute inset-0 flex items-center justify-center z-10"
                  >
                    <div className="">
                      <svg 
                        className="w-16 h-16 text-primary fill-primary" 
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                    </div>
                  </a>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                </div>
                <div className="p-4 sm:p-6 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent rounded-b-lg">
                  <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-white">
                    {truncate(video.title, 50)}
                  </h3>
                  <p 
                    className="text-sm sm:text-base text-slate-200 mb-2 sm:mb-4" 
                    title={video.summary}
                  >
                    {truncate(video.summary, 120)}
                  </p>

                  <div className="space-y-1 sm:space-y-2">
                    {video.tests.map((test, j) => (
                      <motion.span
                        key={j}
                        className="inline-block bg-gray-100 dark:bg-gray-700 rounded px-2 sm:px-3 py-1 text-xs sm:text-sm mr-2"
                        initial={{ opacity: 0, x: j % 2 === 0 ? -80 : 80 }}
                        animate={controls}
                        variants={{
                          visible: { 
                            opacity: 1, 
                            x: 0, 
                            transition: { 
                              duration: 0.5, 
                              delay: i * 0.2 + j * 0.01
                            } 
                          }
                        }}
                      >
                        {test}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 