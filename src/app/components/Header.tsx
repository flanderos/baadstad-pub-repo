'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isLandingPage = pathname === "/";



  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen && !(e.target as HTMLElement).closest('header')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Check if a link is active
  const isActive = (path: string) => pathname === path;

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const mainNavItems = [
    { name: 'Hjem', path: '/',   },
    { name: 'Prosjekter', path: '/prosjekter' },
    { name: 'Om oss', path: '/om-oss' },
    { name: 'Kontakt', path: '/kontakt' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isLandingPage
          ? scrolled
            ? "bg-gray-900 text-white shadow-lg py-2"
            : "bg-transparent text-white py-4"
          : "bg-gray-800 text-white shadow-lg py-4"
      }`}
      aria-label="Hovednavigasjon"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
              href="/" 
              className="font-bold text-xl relative z-20"
              aria-label="Gå til forsiden"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                {/* Prøver med standard img-tag istedenfor Next.js Image */}
                <Image 
                  src="/baadstad-logo.png" 
                  alt="Bådstad AS logo" 
                  width={48} 
                  height={48} 
                  className="w-12 h-12 rounded-full"
                />
                <span className={scrolled ? 'text-white' : 'text-white'}>Bådstad AS</span>
              </motion.div>
            </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {mainNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`relative font-medium py-2 px-1 transition-colors hover:text-blue-400
                  ${isActive(item.path) 
                    ? 'text-blue-500 font-bold' 
                    : ''}
                `}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden relative z-20 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Lukk meny' : 'Åpne meny'}
          >
            <AnimatePresence initial={false} mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 top-0 z-10 pt-20 bg-gray-900 bg-opacity-95 backdrop-blur-sm overflow-y-auto"
            >
              <nav className="container mx-auto px-4 py-6 flex flex-col text-white">
                {mainNavItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-700">
                    <Link
                      href={item.path}
                      className={`block py-4 text-xl ${
                        isActive(item.path) ? 'text-blue-400' : 'text-white'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isActive(item.path) ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <p className="text-gray-400 mb-4">Kontakt oss</p>
                  <p className="text-white mb-2">info@dittfirma.no</p>
                  <p className="text-white">+47 123 45 678</p>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;