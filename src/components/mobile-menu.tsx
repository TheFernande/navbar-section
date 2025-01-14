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
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
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
        <div className='flex h-16 items-center justify-between px-4'>
          <NavLogo />
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-900'
            aria-label='Close menu'
          >
            <CloseIcon className='h-6 w-6' />
          </button>
        </div>

        <nav className='mt-8 flex flex-col space-y-4 px-4'>
          <Link
            href='/shop'
            className='text-lg text-gray-600 hover:text-gray-900'
            onClick={onClose}
          >
            Shop all
          </Link>
          <Link
            href='/latest'
            className='text-lg text-gray-600 hover:text-gray-900'
            onClick={onClose}
          >
            Latest arrivals
          </Link>
        </nav>
      </div>
    </>
  );
}
