
"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const Notepad = dynamic(() => import('../src/components/Notepad'), { ssr: false });

const Page: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-8">
        <Notepad />
      </main>
    </div>
  );
};

export default Page;
