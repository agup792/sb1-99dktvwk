import React from 'react';
import { Logo } from './Logo';

export function Header() {
  return (
    <header className="bg-white shadow-sm mb-6">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <h1 className="text-2xl font-bold text-[#4B286D]">
            Boolean Query Builder
          </h1>
        </div>
      </div>
    </header>
  );
}