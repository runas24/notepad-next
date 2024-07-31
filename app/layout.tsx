
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
