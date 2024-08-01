
"use client";

import React from 'react';
import Link from 'next/link';

const Menu: React.FC = () => {
  return (
    <div>
      <nav className="menu">
        <ul>
          <li className="menu-item mb-2"><Link href="/">Home</Link></li>
          <li className="menu-item mb-2"><Link href="/about">About</Link></li>
          <li className="menu-item"><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
