
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const AdaptiveMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <nav className="hidden md:flex fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-4">
        <ul>
          <li className="menu-item mb-2"><Link href="/">Home</Link></li>
          <li className="menu-item mb-2"><Link href="/about">About</Link></li>
          <li className="menu-item"><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>

      <button 
        className="md:hidden fixed top-0 left-0 w-full bg-gray-800 text-white py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>
      
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full bg-gray-800 text-white p-4">
          <ul>
            <li className="menu-item mb-2"><Link href="/">Home</Link></li>
            <li className="menu-item mb-2"><Link href="/about">About</Link></li>
            <li className="menu-item"><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdaptiveMenu;
