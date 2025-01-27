// src/components/modal.tsx
"use client";

import { useEffect, useRef, ReactNode } from "react";
import Portal from "./portal";
import { useFocusTrap } from "../hooks/use-focus-trap";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Initialize focus trap
  useFocusTrap(modalRef, isOpen);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className='fixed inset-0 z-50 flex items-center justify-center p-4'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
      >
        {/* Overlay */}
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity'
          aria-hidden='true'
          onClick={onClose}
        />

        {/* Modal panel */}
        <div
          ref={modalRef}
          className='relative w-full max-w-lg transform rounded-lg bg-white p-6 shadow-xl transition-all'
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className='absolute right-4 top-4 rounded p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-900'
            aria-label='Close modal'
          >
            <svg
              className='h-5 w-5'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>

          {/* Title */}
          <h2
            id='modal-title'
            className='text-lg font-semibold text-gray-900'
          >
            {title}
          </h2>

          {/* Content */}
          <div className='mt-4'>{children}</div>
        </div>
      </div>
    </Portal>
  );
}
