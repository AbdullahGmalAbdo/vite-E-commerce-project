import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistPage: React.FC = () => {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();

  const removeFromWishlist = (id: string) => {
    wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const addToCart = (product: any) => {
    cartDispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const clearWishlist = () => {
    wishlistDispatch({ type: 'CLEAR_WISHLIST' });
  };

  if (wishlistState.items.length === 0) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-24 w-24 text-slate-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Your wishlist is empty</h2>
          <p className="text-slate-400 mb-8">Save items you love to your wishlist</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-lg hover:from-sky-400 hover:to-cyan-400 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
            My Wishlist
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-xl text-slate-400">
              {wishlistState.items.length} item{wishlistState.items.length !== 1 ? 's' : ''} saved
            </p>
            <button
              onClick={clearWishlist}
              className="text-red-400 hover:text-red-300 transition-colors duration-200"
            >
              Clear Wishlist
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistState.items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-card rounded-2xl overflow-hidden border border-slate-700/50 hover:border-sky-500/50 transition-all duration-500 hover:transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                
                {/* Remove from wishlist button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 p-2 bg-slate-900/80 backdrop-blur-lg rounded-full text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all duration-300"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="relative p-6">
                <h3 className="text-xl font-semibold text-white group-hover:text-sky-300 transition-colors duration-300 mb-2">
                  {item.name}
                </h3>
                <p className="text-slate-400 mb-4">{item.category}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-sky-400">${item.price}</span>
                </div>

                <div className="flex space-x-2">
                  <Link
                    to={`/product/${item.id}`}
                    className="flex-1 bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors duration-200 text-center"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-gradient-to-r from-sky-500 to-cyan-500 text-white py-2 px-4 rounded-lg hover:from-sky-400 hover:to-cyan-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;