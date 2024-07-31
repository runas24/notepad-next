
"use client";

import React from 'react';
import Link from 'next/link';

const Menu: React.FC = () => {
  return (
    <div>
      {/* Desktop Menu */}
      <nav className="hidden md:flex fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-4">
        <ul>
          <li className="menu-item mb-2"><Link href="/">Home</Link></li>
          <li className="menu-item mb-2"><Link href="/about">About</Link></li>
          <li className="menu-item"><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden mobile-menu">
        <ul className="flex w-full justify-around">
          <li className="menu-item"><Link href="/">Home</Link></li>
          <li className="menu-item"><Link href="/about">About</Link></li>
          <li className="menu-item"><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
