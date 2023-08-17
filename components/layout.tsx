import React from 'react';
import Image from 'next/image';
import homecarelogotom from '../pages/icons/homecarelogotom.png';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto flex flex-col space-y-4">
      <header className="container sticky top-0 z-40 bg-white h-16 border-b border-b-slate-200 py-4">
        <nav className="ml-4 pl-6">
          <a href="#" className="hover:text-slate-600 cursor-pointer">
            <Image src={homecarelogotom} alt="HomeCarePro Logo" />
          </a>
        </nav>
      </header>
      <div>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
