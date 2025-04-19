"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky z-50 w-full backdrop-blur-sm top-0 py-2">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 backdrop-blur-sm">
          {/* Site branding */}
          <div className="flex">
            <Link href="/">
              {/* If you have a logo image, use it here */}
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-xs font-bold">BR</span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}
            <ul className="flex grow flex-wrap items-center justify-center gap-4 text-sm lg:gap-8">
              <li>
                <Link 
                  href="/rankings" 
                  className="flex items-center px-2 py-1 text-gray-200 transition hover:text-primary lg:px-3 font-semibold"
                >
                  Rankings
                </Link>
              </li>
              <li>
                <Link 
                  href="/shop" 
                  className="flex items-center px-2 py-1 text-gray-200 transition hover:text-primary lg:px-3 font-semibold"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="flex items-center px-2 py-1 text-gray-200 transition hover:text-primary lg:px-3 font-semibold"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Auth section - simplified for now */}
          <div className="flex items-center justify-end gap-3">
            <Button 
              className="btn-sm bg-primary bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
            >
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="group inline-flex h-8 w-8 items-center justify-center text-center text-gray-200 transition"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Menu</span>
              <svg
                className="pointer-events-none fill-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  className="origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]"
                  y="7"
                  width="9"
                  height="2"
                  rx="1"
                ></rect>
                <rect
                  className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]"
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                ></rect>
                <rect
                  className="origin-center translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]"
                  y="7"
                  width="9"
                  height="2"
                  rx="1"
                ></rect>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 