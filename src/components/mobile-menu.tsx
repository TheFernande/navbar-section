// src/components/mobile-menu.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import NavLogo from "./icons/nav-logo";
import CloseIcon from "./icons/close-icon";
import Portal from "./portal";
import { useFocusTrap } from "../hooks/use-focus-trap";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Initialize focus trap
  useFocusTrap(menuRef, isOpen);

  // Handle initial mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      const mainContent = document.querySelector(".gfe-main");
      mainContent?.classList.add("blur-sm", "brightness-90");
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      const mainContent = document.querySelector(".gfe-main");
      mainContent?.classList.remove("blur-sm", "brightness-90");
    };
  }, [isOpen, onClose]);

  // Only start rendering after initial mount to avoid hydration issues
  if (!mounted) return null;

  return (
    <Portal>
      {/* Use opacity-0 as initial state instead of invisible for smoother first animation */}
      <div
        role='dialog'
        aria-modal='true'
        aria-label='Mobile navigation menu'
        className={`fixed inset-0 z-50 lg:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Background overlay */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
          aria-hidden='true'
        />

        {/* Menu panel */}
        <div
          ref={menuRef}
          className={`fixed inset-y-0 right-0 z-50 w-fit min-w-96 transform bg-white transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header with logo and close button */}
          <div className='flex items-center justify-between px-4 pb-6 pt-8'>
            <NavLogo />
            <button
              onClick={onClose}
              className='rounded p-1 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2'
              aria-label='Close menu'
            >
              <CloseIcon />
            </button>
          </div>

          {/* Navigation links with staggered animation */}
          <nav
            className={`flex flex-col gap-2 px-4 transition-all duration-300 ${
              isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
            style={{
              transitionDelay: isOpen ? "150ms" : "0ms"
            }}
          >
            <Link
              href='/shop'
              className='gap-3 rounded p-3 text-sm text-neutral-900 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2'
              onClick={onClose}
            >
              Shop all
            </Link>
            <Link
              href='/latest'
              className='gap-3 rounded p-3 text-sm text-neutral-900 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2'
              onClick={onClose}
            >
              Latest arrivals
            </Link>
          </nav>
        </div>
      </div>
    </Portal>
  );
}
