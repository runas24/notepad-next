
"use client";

import React from 'react';
import Notepad from '../src/components/Notepad';

const Page: React.FC = () => {
  return (
    <div className="flex">
      <main className="flex-1 p-8">
        <Notepad />
      </main>
    </div>
  );
};

export default Page;
