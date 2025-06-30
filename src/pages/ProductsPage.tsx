import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Filter, Grid, List, Heart, ShoppingCart, Tag, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';
import AuthModal from '../components/AuthModal';
import SearchBar from '../components/SearchBar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { products, getProductsByCategory } from '../data/products';

const ProductsPage: React.FC = () => {
  const [allProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { user } = useAuth();
  const [productsRef, productsVisible] = useScrollAnimation(0.1);

  const categories = ['All', ...Array.from(new Set(allProducts.map(p => p.category)))];

  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      let filtered = getProductsByCategory(selectedCategory);

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply price filter
      filtered = filtered.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      // Apply rating filter
      if (selectedRating > 0) {
        filtered = filtered.filter(product => product.rating >= selectedRating);
      }

      // Sort products
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
          case 'featured':
            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
          default:
            return a.name.localeCompare(b.name);
        }
      });

      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm, sortBy, priceRange, selectedRating, allProducts]);

  const showAuthRequired = (action: string) => {
    setAuthMessage(`You must login first to add products to your ${action === 'cart' ? 'cart' : 'wishlist'}`);
    setShowAuthModal(true);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setPriceRange([0, 2000]);
    setSelectedRating(0);
    setSortBy('name');
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          message={authMessage}
        />

        {/* Header */}
        <div className="mb-12 animate-fadeInUp py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
              Products Catalog
            </h1>
            <p className="text-xl text-gray-600 dark:text-slate-400">
              Discover our premium collection of {allProducts.length}+ cutting-edge technology products
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              className="w-full"
            />
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-12 border border-gray-200 dark:border-slate-700 animate-fadeInUp shadow-lg" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-blue-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category} {category !== 'All' && `(${getProductsByCategory(category).length})`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
                <option value="featured">Featured First</option>
              </select>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Mode */}
              <div className="flex bg-gray-50 dark:bg-slate-700/50 rounded-lg p-1 border border-gray-300 dark:border-slate-600">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-all duration-200 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-all duration-200 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t border-gray-200 dark:border-slate-700 pt-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="flex-1"
                    />
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Minimum Rating
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                        className={`p-1 rounded transition-colors duration-200 ${
                          selectedRating >= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-slate-600'
                        }`}
                      >
                        <Star className="h-5 w-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results count */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-slate-400">
                Showing {filteredProducts.length} of {allProducts.length} products
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
              
              {filteredProducts.length > 0 && (
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-slate-400">
                  <Sparkles className="h-4 w-4" />
                  <span>{filteredProducts.filter(p => p.isFeatured).length} Featured</span>
                  <span>•</span>
                  <span>{filteredProducts.filter(p => p.isNew).length} New</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Products Grid/List */}
        {!isLoading && (
          <div 
            ref={productsRef}
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
              : 'space-y-8'
            }
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAuthRequired={showAuthRequired}
                index={index}
              />
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-20 animate-fadeInUp">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Bottom Spacer */}
        <div className="h-16 md:h-24"></div>
      </div>
    </div>
  );
};

export default ProductsPage;