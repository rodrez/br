"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  const SITE_NAME = "Brand Ranks";
  
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12">
          {/* 1st block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-6 max-sm:order-1 flex flex-col">
            <div className="mb-4">
              {/* Logo */}
              <Link href="/" className="flex items-center justify-center bg-white w-12 h-12 rounded">
                <div className="flex items-center justify-center">
                  <span className="text-sm font-bold">BR</span>
                </div>
              </Link>
            </div>
            <div className="grow text-sm text-zinc-500">© {SITE_NAME} All rights reserved.</div>
            {/* Social links */}
            <ul className="flex space-x-4 mt-4 mb-1">
              <li>
                <a
                  className="flex justify-center items-center text-zinc-700 hover:text-zinc-900 transition ease-in-out duration-200 hover:scale-[1.2]"
                  href="#0"
                  aria-label="Twitter"
                >
                  <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                    <path
                      d="m7.063 3 3.495 4.475L14.601 3h2.454l-5.359 5.931L18 17h-4.938l-3.866-4.893L4.771 17H2.316l5.735-6.342L2 3h5.063Zm-.74 1.347H4.866l8.875 11.232h1.36L6.323 4.347Z"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="flex justify-center items-center text-zinc-700 hover:text-red-600 transition ease-in-out duration-200 hover:scale-[1.2]"
                  href="#0"
                  aria-label="YouTube"
                >
                  <svg
                    width="20"
                    height="20"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 576 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="flex justify-center items-center text-zinc-700 hover:text-blue-600 transition ease-in-out duration-200 hover:scale-[1.2]"
                  href="#0"
                  aria-label="Facebook"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-primary font-medium mb-2">Company</h6>
            <ul className="text-sm space-y-2">
              <li>
                <Link className="text-zinc-500 hover:text-zinc-900 transition" href="/about">About us</Link>
              </li>
              <li>
                <Link className="text-zinc-500 hover:text-zinc-900 transition" href="/blog">Blog</Link>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-primary font-medium mb-2">Resources</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-zinc-500 hover:text-zinc-900 transition" href="#0">Community</a>
              </li>
              <li>
                <Link className="text-zinc-500 hover:text-zinc-900 transition" href="/terms">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link className="text-zinc-500 hover:text-zinc-900 transition" href="/rankings">Rankings</Link>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-primary font-medium mb-2">Legals</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-zinc-500 hover:text-zinc-900 transition" href="#0">Refund policy</a>
              </li>
              <li>
                <Link className="text-zinc-500 hover:text-zinc-900 transition" href="/terms">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link className="text-zinc-500 hover:text-zinc-900 transition" href="/privacy">Privacy policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </footer>
  );
} 