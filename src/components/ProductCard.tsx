import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Eye, Tag, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAuthRequired: (action: string) => void;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAuthRequired, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { user } = useAuth();

  const addToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      onAuthRequired('cart');
      return;
    }

    setAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    cartDispatch({ type: 'ADD_TO_CART', payload: product });
    setAddingToCart(false);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      onAuthRequired('wishlist');
      return;
    }

    const isInWishlist = wishlistState.items.some(item => item.id === product.id);
    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const isInWishlist = user && wishlistState.items.some(item => item.id === product.id);
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-500 hover:transform hover:scale-105 hover-lift shadow-lg hover:shadow-xl animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center shadow-lg">
              <Zap className="h-3 w-3 mr-1" />
              New
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center shadow-lg">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
        
        {/* Action buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <button
            onClick={toggleWishlist}
            className={`p-2 backdrop-blur-lg rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
              isInWishlist
                ? 'bg-pink-500/90 text-white'
                : 'bg-white/90 dark:bg-slate-800/90 text-gray-600 dark:text-slate-400 hover:text-pink-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          
          <Link
            to={`/product/${product.id}`}
            className="p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-full text-gray-600 dark:text-slate-400 hover:text-blue-500 transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>

        {/* Quick add to cart overlay */}
        <div className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button
            onClick={addToCart}
            disabled={addingToCart}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg backdrop-blur-sm"
          >
            {addingToCart ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        <div className="mb-3">
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{product.category}</span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 mt-1">
            {product.name}
          </h3>
        </div>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 transition-all duration-200 hover:scale-110 ${
                  i < Math.floor(product.rating) ? 'fill-current' : ''
                }`} 
              />
            ))}
          </div>
          <span className="text-gray-500 dark:text-slate-400 text-sm">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {discountPercentage > 0 && (
            <span className="text-green-600 dark:text-green-400 text-sm font-medium">
              Save ${(product.originalPrice! - product.price).toFixed(0)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-200 hover:scale-105 text-center text-sm font-medium"
          >
            View Details
          </Link>
          <button
            onClick={addToCart}
            disabled={addingToCart}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed pulse-button text-sm font-medium"
          >
            {addingToCart ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;