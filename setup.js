const fs = require('fs');
const path = require('path');

// Функция для создания файлов
const createFile = (filePath, content) => {
  fs.writeFileSync(path.resolve(__dirname, filePath), content, 'utf8');
};

// Создание и редактирование файлов

// globals.css - Обновление стилей для горизонтального мобильного меню
createFile('app/globals.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-background text-gray-800;
}

h1 {
  @apply text-4xl font-bold text-center my-8 text-primary;
}

textarea {
  @apply w-full p-4 border rounded-lg resize-none text-lg;
}

button {
  @apply px-4 py-2 rounded-md text-white bg-primary hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary;
}

/* Обновленное меню */
.menu {
  @apply bg-primary text-white p-4 h-full fixed top-0 left-0 w-64;
}

.menu-item {
  @apply block py-2 px-4 rounded-md hover:bg-opacity-80;
}

.menu-item a {
  @apply text-white;
}

/* Адаптивное меню для мобильных устройств */
.mobile-menu {
  @apply fixed bottom-0 left-0 w-full bg-primary text-white flex justify-around items-center p-2;
  /* Убираем padding и устанавливаем flex для горизонтального расположения элементов */
}

.menu-item {
  @apply flex-1 text-center py-2; /* Растягиваем элементы по ширине и центрируем текст */
}

.menu-item a {
  @apply text-white;
}

.menu-toggle {
  @apply hidden; /* Убираем кнопку переключения меню */
}
`);

// Menu.tsx - Обновление компонента меню
createFile('src/components/Menu.tsx', `
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
`);

// layout.tsx - Обновление компонента layout
createFile('app/layout.tsx', `
import React, { ReactNode } from 'react';
import './globals.css';
import Menu from '../src/components/Menu';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <head>
        <title>Notepad</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Menu />
        <main className="flex-1 p-8 md:ml-64">
          {children}
        </main>
      </body>
    </html>
  );
};

export default Layout;
`);

// page.tsx - Обновление страницы
createFile('app/page.tsx', `
"use client";

import React from 'react';
import Notepad from '../src/components/Notepad';

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
`);

console.log('Menu has been updated and setup completed!');
