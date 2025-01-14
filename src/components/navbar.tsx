"use client";

import { useState } from "react";
import Link from "next/link";
import NavLogo from "./icons/nav-logo";
import ShoppingCart from "./icons/shopping-cart";
import HamburgerIcon from "./icons/hamburger";
import MobileMenu from "./mobile-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Controls menu visibility
  const [cartItems] = useState(0);

  return (
    <section className='gfe-container'>
      <nav className='relative w-full'>
        {/* Main navbar content */}
        <div className='mx-auto flex items-center justify-between'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center'
          >
            <NavLogo />
          </Link>

          {/* Desktop Navigation - hidden on mobile */}
          <div className='hidden items-center space-x-8 lg:flex'>
            <Link
              href='/shop'
              className='gap-3 p-3 text-sm text-neutral-900'
            >
              Shop all
            </Link>
            <Link
              href='/latest'
              className='gap-3 p-3 text-sm text-neutral-900'
            >
              Latest arrivals
            </Link>
          </div>

          {/* C Cart and Hamburger buttons */}
          <div className='flex items-center gap-4 text-neutral-600'>
            <button
              className='relative'
              aria-label='Shopping cart'
            >
              <ShoppingCart />

              {/* Cart badge */}
              {cartItems > 0 && (
                <span className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white'>
                  {cartItems}
                </span>
              )}
            </button>

            {/* Hamburger button - toggles menu state */}
            <button
              className='lg:hidden'
              onClick={() => setIsOpen(!isOpen)}
              aria-label='Toggle menu'
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>

        {/* Mobile Menu Component */}
        <MobileMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </nav>
    </section>
  );
}
