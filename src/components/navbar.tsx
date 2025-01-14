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
      <nav className='relative w-full border-b border-gray-200'>
        <div className='mx-auto flex items-center justify-between p-4'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center'
          >
            <NavLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden items-center space-x-8 lg:flex'>
            <Link
              href='/shop'
              className='text-gray-600 hover:text-gray-900'
            >
              Shop all
            </Link>
            <Link
              href='/latest'
              className='text-gray-600 hover:text-gray-900'
            >
              Latest arrivals
            </Link>
          </div>

          {/* Cart and Mobile Menu Toggle */}
          <div className='flex items-center gap-4'>
            <button
              className='relative'
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
        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </nav>
    </section>
  );
}
