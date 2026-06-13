import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '/menu' },
    { name: 'Services', href: '#services' },
    { name: 'Book Table', href: '#reservation' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/80 backdrop-blur-md py-2.5 md:py-4 shadow-xl' : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 overflow-hidden">
            <div className="flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 40" className="h-8 md:h-12 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="12" stroke="#3FB6E0" strokeWidth="5" />
                <path d="M 40 32 L 40 8 A 10 10 0 0 1 60 8 A 10 10 0 0 1 40 20" stroke="#72C06A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 70 32 L 85 8 L 100 32" stroke="#3FB6E0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 78 22 L 92 22" stroke="#72C06A" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[13px] md:text-base font-black tracking-tight text-white uppercase leading-tight">
              Outdoor Play<br/><span className="text-landing-primary">Arena</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-landing-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-landing-primary transition-colors duration-300"
                >
                  {link.name}
                </a>
              )
            ))}
            <Link
              to="/login"
              className="bg-landing-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-landing-primary-dark transition-all duration-300 shadow-lg shadow-landing-primary/20"
            >
              Login
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="relative p-2 text-white">
              <ShoppingCart size={24} />
              <span className="absolute top-0 right-0 bg-landing-primary text-[10px] w-4 h-4 flex items-center justify-center rounded-full">2</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-lighter border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-4 text-base font-medium text-gray-300 hover:bg-white/5 rounded-lg"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-4 text-base font-medium text-gray-300 hover:bg-white/5 rounded-lg"
                  >
                    {link.name}
                  </a>
                )
              ))}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-landing-primary text-white py-4 rounded-xl font-bold mt-4 shadow-lg shadow-landing-primary/20"
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;


