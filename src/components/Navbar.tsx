import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Zap, Heart, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-slate-700/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300 shadow-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              TechStore
            </span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-700/50"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-700/50"
              >
                Products
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50"
            >
              {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 group"
            >
              <Heart className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              {wishlistState.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {wishlistState.items.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 group"
            >
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              {cartState.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartState.items.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50">
                  <User className="h-6 w-6" />
                  <span className="hidden md:block font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800/95 backdrop-blur-lg rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 dark:border-slate-700">
                  <button
                    onClick={logout}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700/50 hover:text-blue-600 dark:hover:text-white w-full text-left transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50"
              >
                <User className="h-6 w-6" />
              </Link>
            )}

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors duration-200"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-slate-700/50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white block px-3 py-2 rounded-lg text-base font-medium hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white block px-3 py-2 rounded-lg text-base font-medium hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/wishlist"
              className="text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white block px-3 py-2 rounded-lg text-base font-medium hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Wishlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;