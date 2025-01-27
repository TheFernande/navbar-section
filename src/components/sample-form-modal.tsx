// src/components/sample-form-modal.tsx
"use client";

import { useState } from "react";
import Modal from "./modal";

export default function SampleFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2'
      >
        Open Contact Form
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title='Contact Us'
      >
        <form
          onSubmit={handleSubmit}
          className='space-y-4'
        >
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900'
              required
            />
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900'
              required
            />
          </div>

          <div>
            <label
              htmlFor='message'
              className='block text-sm font-medium text-gray-700'
            >
              Message
            </label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900'
              required
            />
          </div>

          <div className='flex justify-end gap-3'>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2'
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
