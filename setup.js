const fs = require('fs');
const path = require('path');

// Функция для создания файлов
const createFile = (filePath, content) => {
  fs.writeFileSync(path.resolve(__dirname, filePath), content, 'utf8');
};

// Восстановление предыдущих изменений

// Восстановленный globals.css
createFile('app/globals.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Основные стили */
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

.menu {
  @apply bg-primary text-white p-4 h-full fixed top-0 left-0 w-64;
}

.menu-item {
  @apply block py-2 px-4 rounded-md hover:bg-opacity-80;
}

.menu-item a {
  @apply text-white;
}
`);

// Восстановленный Menu.tsx
createFile('src/components/Menu.tsx', `
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
`);

// Восстановленный layout.tsx для применения новых стилей
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
      <body className="flex">
        <Menu />
        <main className="flex-1 p-8 ml-64">
          {children}
        </main>
      </body>
    </html>
  );
};

export default Layout;
`);

// Восстановленный page.tsx для применения новых стилей
createFile('app/page.tsx', `
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
`);

// Восстановленный Notepad.tsx для применения новых стилей
createFile('src/components/Notepad.tsx', `
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import debounce from 'lodash/debounce';

const Notepad: React.FC = () => {
  const [text, setText] = useState('');
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('id', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching notes:', error);
      } else {
        if (data) {
          setText(data.content ?? '');
          localStorage.setItem('notepadContent', data.content ?? '');
        }
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(editor);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [text]);

  const handleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    const newText = event.target.innerHTML;
    setText(newText);
    localStorage.setItem('notepadContent', newText);
    saveNoteDebounced();
  };

  const saveNote = async () => {
    const { data, error } = await supabase
      .from('notes')
      .upsert([
        { id: 1, title: 'My Note', content: text }
      ]);

    if (error) {
      console.error('Error saving note:', error);
    } else {
      console.log('Note saved:', data);
    }
  };

  const saveNoteDebounced = debounce(() => {
    saveNote();
  }, 500);

  return (
    <motion.div 
      className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        contentEditable
        ref={editorRef}
        className="textarea border rounded-lg p-4"
        dangerouslySetInnerHTML={{ __html: text }}
        onInput={handleChange}
        onBlur={() => {
          saveNoteDebounced();
        }}
      />
    </motion.div>
  );
};

export default Notepad;
`);

console.log('Styles and structure have been reverted and setup completed!');