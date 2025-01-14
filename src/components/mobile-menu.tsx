// src/components/mobile-menu.tsx
import { useEffect } from "react";
import Link from "next/link";
import NavLogo from "./icons/nav-logo";
import CloseIcon from "./icons/close-icon";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    // Cleanup listener on unmount
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "unset"; // Restore scrolling
    }
    return () => {
      document.body.style.overflow = "unset"; // Restore scrolling
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Background overlay */}
      <div
        className='fixed inset-0 bg-black/50 transition-opacity lg:hidden'
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        className={`fixed inset-y-0 left-0 right-4 bg-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with logo and close button */}
        <div className='flex items-center justify-between px-4 pb-6 pt-8'>
          <NavLogo />
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-900'
            aria-label='Close menu'
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation links */}

        <nav className='flex flex-col gap-2 px-4'>
          <Link
            href='/shop'
            className='gap-3 p-3 text-sm text-neutral-900'
            onClick={onClose}
          >
            Shop all
          </Link>
          <Link
            href='/latest'
            className='gap-3 p-3 text-sm text-neutral-900'
            onClick={onClose}
          >
            Latest arrivals
          </Link>
        </nav>
      </div>
    </>
  );
}
