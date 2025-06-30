import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <>
      {/* Top Spacer */}
      <div className="h-16 md:h-24"></div>
      
      <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  TechStore
                </span>
              </Link>
              <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                Your destination for cutting-edge technology and innovative products. Experience the future today.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/auth" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200">
                    Account
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-6">Categories</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200">
                    Audio
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200">
                    Gaming
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200">
                    Mobile
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200">
                    Wearable
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200">
                    Smart Home
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-6">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-600 dark:text-slate-400">support@techstore.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-600 dark:text-slate-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-600 dark:text-slate-400">123 Tech Street, Digital City</span>
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="mt-8">
                <h4 className="text-gray-900 dark:text-white font-medium mb-4">Newsletter</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-l-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-lg hover:from-blue-400 hover:to-purple-500 transition-colors duration-200">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-slate-700/50">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 dark:text-slate-400 text-sm">
                © 2024 TechStore. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors duration-200">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;