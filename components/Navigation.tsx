// components/Navigation.tsx

'use client';

import Link from 'next/link';

const Navigation = () => {
  const toggleMenu = () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
  };

  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">
            <span className="cursor-pointer hover:text-gray-400">MonPortfolio</span>
          </Link>
        </div>

        <ul className="hidden md:flex space-x-6">
          <li><Link href="#about"><span className="cursor-pointer hover:text-gray-400">\u00c0 propos</span></Link></li>
          <li><Link href="#projects"><span className="cursor-pointer hover:text-gray-400">Projets</span></Link></li>
          <li><Link href="#skills"><span className="cursor-pointer hover:text-gray-400">Compétences</span></Link></li>
          <li><Link href="#contact"><span className="cursor-pointer hover:text-gray-400">Contact</span></Link></li>
        </ul>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="md:hidden hidden bg-gray-800">
        <ul className="space-y-4 px-4 pb-4">
          <li><Link href="#about"><span className="block cursor-pointer hover:text-gray-400">\u00c0 propos</span></Link></li>
          <li><Link href="#projects"><span className="block cursor-pointer hover:text-gray-400">Projets</span></Link></li>
          <li><Link href="#skills"><span className="block cursor-pointer hover:text-gray-400">Compétences</span></Link></li>
          <li><Link href="#contact"><span className="block cursor-pointer hover:text-gray-400">Contact</span></Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
