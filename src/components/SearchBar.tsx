import React, { useState, useRef, useEffect } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { products } from '../data/products';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const trendingSearches = ['Headphones', 'Gaming', 'Smartphone', 'Laptop', 'Smart Watch'];

  useEffect(() => {
    if (value.length > 0) {
      const filtered = products
        .filter(product => 
          product.name.toLowerCase().includes(value.toLowerCase()) ||
          product.category.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search products, brands, categories..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.length > 0 && setIsOpen(true)}
          className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 z-50 max-h-96 overflow-y-auto">
          {suggestions.length > 0 ? (
            <div className="p-2">
              <div className="text-xs text-gray-500 dark:text-slate-400 px-3 py-2 font-medium">
                PRODUCTS
              </div>
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSuggestionClick(product.name)}
                  className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200 text-left"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">
                      {product.category} • ${product.price}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : value.length > 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-slate-400">
              No products found for "{value}"
            </div>
          ) : null}

          {/* Trending Searches */}
          {value.length === 0 && (
            <div className="p-2 border-t border-gray-200 dark:border-slate-700">
              <div className="flex items-center text-xs text-gray-500 dark:text-slate-400 px-3 py-2 font-medium">
                <TrendingUp className="h-4 w-4 mr-2" />
                TRENDING
              </div>
              {trendingSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => handleSuggestionClick(search)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200 text-sm text-gray-700 dark:text-slate-300"
                >
                  {search}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;