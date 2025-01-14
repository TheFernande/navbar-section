"use client";

import { useState } from "react";
import Link from "next/link";
import NavLogo from "./icons/nav-logo";
import ShoppingCart from "./icons/shopping-cart";
import HamburgerIcon from "./icons/hamburger";
import MobileMenu from "./mobile-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems] = useState(0);

  return (
    <section className='gfe-container'>
      <nav className='w-full'>
        {/* Main navbar content */}
        <div className='mx-auto flex h-16 items-center'>
          {/* Left section with logo and navigation */}
          <div className='flex items-center'>
            <NavLogo />
            {/* Navigation - hidden on mobile, 103px from logo */}
            <div className='hidden pl-[103px] lg:block'>
              <div className='flex items-center gap-8'>
                <Link
                  href='/shop'
                  className='text-sm text-neutral-900'
                >
                  Shop all
                </Link>
                <Link
                  href='/latest'
                  className='text-sm text-neutral-900'
                >
                  Latest arrivals
                </Link>
              </div>
            </div>
          </div>

          {/* Cart and Hamburger pushed to the right */}
          <div className='ml-auto flex items-center gap-4 text-neutral-600'>
            <button
              className='relative flex'
              aria-label='Shopping cart'
            >
              <ShoppingCart />
              {cartItems > 0 && (
                <span className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white'>
                  {cartItems}
                </span>
              )}
            </button>

            <button
              className='lg:hidden'
              onClick={() => setIsOpen(!isOpen)}
              aria-label='Toggle menu'
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>

        <MobileMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </nav>
    </section>
  );
}
