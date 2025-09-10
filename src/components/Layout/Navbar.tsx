import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Committees', href: '/committees' },
    { name: 'Registration', href: '/registration' },
    { name: 'Resources', href: '/resources' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      <div className="container-max section-padding">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MUN</span>
            </div>
            <span className="font-bold text-xl text-primary-600">SchoolMUN</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                    : 'text-neutral-600 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu / Login */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">Dashboard</span>
                </button>
                
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2"
                    >
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/dashboard/registration"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        My Registration
                      </Link>
                      <Link
                        to="/dashboard/delegates"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Delegates
                      </Link>
                      <Link
                        to="/dashboard/documents"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Documents
                      </Link>
                      <hr className="my-2 border-neutral-200" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-600 hover:text-primary-600 transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-200 mt-4 pt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-base font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-primary-600'
                        : 'text-neutral-600 hover:text-primary-600'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {user ? (
                  <>
                    <hr className="border-neutral-200" />
                    <Link
                      to="/dashboard"
                      className="text-base font-medium text-neutral-600 hover:text-primary-600 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      className="text-base font-medium text-red-600 hover:text-red-700 transition-colors duration-200 text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="btn-primary inline-block text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;