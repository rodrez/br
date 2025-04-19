'use client';

import { useRef } from 'react';
import ShinyButton from './shiny-button';

export default function Hero() {
  const newsletterRef = useRef<HTMLElement | null>(null);

  function scrollToNewsletter() {
    // Find newsletter element
    const newsletterElement = document.querySelector('#newsletter');
    if (newsletterElement) {
      newsletterElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="relative isolate pt-8 sm:pt-14">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        ></div>
      </div>
      <div className="py-12 sm:py-24 lg:pb-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Smart Buying Starts Here
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600">
              Our scientific rankings help you choose the best products with confidence. Make informed
              choices effortlessly.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
              <ShinyButton text="Subscribe to our Newsletter" onClick={scrollToNewsletter} />
              <a
                href="https://www.patreon.com/BrandRanks"
                className="text-sm font-semibold leading-6 transform ease-in text-gray-900 p-2 rounded-md hover:bg-orange-600 hover:text-white dark:hover:text-orange-400"
              >
                Patreon <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 md:mt-24 flow-root">
            <div
              className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4"
            >
              <iframe
                className="rounded-md aspect-video w-full"
                src="https://www.youtube.com/embed/RLcfBG9yUmg?si=zuHJUEoNH6Q7v_s1"
                title="YouTube video player"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        ></div>
      </div>
    </div>
  );
} 