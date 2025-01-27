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
    <nav className='flex w-full flex-row justify-between'>
      {/* Main navbar content */}
      <div className='flex w-full flex-row items-center justify-between py-4'>
        {/* Left section with logo and navigation */}
        <div className='flex w-full max-w-[384px] flex-row items-center justify-between'>
          <NavLogo />
          {/* Navigation - hidden on mobile, 103px from logo */}
          <div className='hidden lg:block'>
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
        <div className='flex min-w-fit items-center gap-4 text-neutral-600'>
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
            className='rounded p-1 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 lg:hidden'
            onClick={() => setIsOpen(!isOpen)}
            aria-label='Toggle menu'
            aria-expanded={isOpen}
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
  );
}
