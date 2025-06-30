import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, ShoppingCart, RotateCcw, Zap, Shield, Truck, AlertCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMessage, setAuthMessage] = useState('');

  // Mock product data
  const product = {
    id: id || '1',
    name: 'Quantum Headphones',
    price: 299,
    originalPrice: 399,
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      'https://images.pexels.com/photos/3753525/pexels-photo-3753525.jpeg',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg'
    ],
    category: 'Audio',
    rating: 4.8,
    reviews: 124,
    description: 'Experience the future of audio with our Quantum Headphones. Featuring advanced noise cancellation, premium materials, and immersive 3D audio technology.',
    features: [
      'Advanced noise cancellation',
      'Premium build quality',
      '3D spatial audio',
      '30-hour battery life',
      'Wireless charging case',
      'Voice assistant integration'
    ],
    specs: {
      'Frequency Response': '20Hz - 40kHz',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Weight': '280g',
      'Connectivity': 'Bluetooth 5.3, USB-C',
      'Colors': 'Black, White, Purple'
    }
  };

  const reviews = [
    {
      id: 1,
      user: 'Alex Chen',
      rating: 5,
      comment: 'Incredible sound quality and build. The 3D audio is mind-blowing!',
      date: '2024-01-15'
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      rating: 5,
      comment: 'Best headphones I\'ve ever owned. Worth every penny.',
      date: '2024-01-10'
    },
    {
      id: 3,
      user: 'Mike Rodriguez',
      rating: 4,
      comment: 'Great quality, though a bit pricey. The noise cancellation is superb.',
      date: '2024-01-08'
    }
  ];

  const showAuthRequired = (action: string) => {
    setAuthMessage(`You must login first to add products to your ${action === 'cart' ? 'cart' : 'wishlist'}`);
    setShowAuthModal(true);
  };

  const addToCart = () => {
    if (!user) {
      showAuthRequired('cart');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      cartDispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const toggleWishlist = () => {
    if (!user) {
      showAuthRequired('wishlist');
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

  const rotate360 = () => {
    setRotation(rotation + 360);
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Auth Required Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-gray-200 dark:border-slate-700 shadow-2xl animate-scaleIn">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                  <AlertCircle className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Login Required
                </h3>
                
                <p className="text-gray-600 dark:text-slate-400 mb-8 text-lg leading-relaxed">
                  {authMessage}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/auth"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 text-center"
                    onClick={() => setShowAuthModal(false)}
                  >
                    Login
                  </Link>
                  
                  <button
                    onClick={() => setShowAuthModal(false)}
                    className="flex-1 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 aspect-square">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
              
              {/* 360 View Button */}
              <button
                onClick={rotate360}
                className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-full text-blue-500 hover:text-white hover:bg-blue-600/50 transition-all duration-300 group"
              >
                <RotateCcw className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
              </button>

              {/* Action Buttons */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button 
                  onClick={toggleWishlist}
                  className={`p-3 backdrop-blur-lg rounded-full transition-all duration-300 ${
                    isInWishlist 
                      ? 'bg-pink-500/80 text-white' 
                      : 'bg-white/80 dark:bg-slate-900/80 text-gray-600 dark:text-slate-400 hover:text-pink-400'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
                <button className="p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-full text-gray-600 dark:text-slate-400 hover:text-blue-400 transition-colors duration-300">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? 'border-blue-500 ring-2 ring-blue-500/50'
                      : 'border-gray-300 dark:border-slate-600 hover:border-blue-400'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="text-blue-500 font-medium">{product.category}</span>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-500 dark:text-slate-400">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  25% OFF
                </span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-600 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-gray-900 dark:text-white font-medium">Quantity:</label>
                <div className="flex items-center bg-gray-100 dark:bg-slate-800/50 rounded-lg border border-gray-300 dark:border-slate-600">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-900 dark:text-white border-x border-gray-300 dark:border-slate-600">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={addToCart}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/25"
              >
                <ShoppingCart className="h-6 w-6" />
                <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <span className="text-sm text-gray-600 dark:text-slate-400">2 Year Warranty</span>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <span className="text-sm text-gray-600 dark:text-slate-400">Free Shipping</span>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <span className="text-sm text-gray-600 dark:text-slate-400">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Specifications */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-slate-700 last:border-b-0">
                    <span className="text-gray-600 dark:text-slate-400">{key}</span>
                    <span className="text-gray-900 dark:text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h3>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{review.user}</span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-slate-300 mb-2">{review.comment}</p>
                    <span className="text-sm text-gray-500 dark:text-slate-500">{review.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;