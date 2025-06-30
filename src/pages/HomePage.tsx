import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles, Gamepad2, Headphones, Smartphone, Zap, Shield, Truck, Heart, ShoppingCart } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import FloatingElements from '../components/FloatingElements';
import ProductCard from '../components/ProductCard';
import AuthModal from '../components/AuthModal';
import Product3D from '../components/Product3D';
import Hero3D from '../components/Hero3D';
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimation';
import { getFeaturedProducts, getNewProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxOffset = useParallax();
  const [statsRef, statsVisible] = useScrollAnimation(0.3);
  const [productsRef, productsVisible] = useScrollAnimation(0.2);
  const [featuresRef, featuresVisible] = useScrollAnimation(0.2);
  const [newProductsRef, newProductsVisible] = useScrollAnimation(0.2);
  const [showcase3DRef, showcase3DVisible] = useScrollAnimation(0.2);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMessage, setAuthMessage] = useState('');

  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { user } = useAuth();

  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  // 3D Product showcase data
  const showcase3DProduct = {
    name: 'Quantum Headphones Pro',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      'https://images.pexels.com/photos/3753525/pexels-photo-3753525.jpeg',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -0.3;
      
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showAuthRequired = (action: string) => {
    setAuthMessage(`You must login first to add products to your ${action === 'cart' ? 'cart' : 'wishlist'}`);
    setShowAuthModal(true);
  };

  const floatingProducts = [
    {
      id: '1',
      name: 'Quantum Headphones',
      price: 299,
      icon: <Headphones className="h-8 w-8" />
    },
    {
      id: '2',
      name: 'Gaming Controller',
      price: 129,
      icon: <Gamepad2 className="h-8 w-8" />
    },
    {
      id: '3',
      name: 'Smart Phone',
      price: 999,
      icon: <Smartphone className="h-8 w-8" />
    }
  ];

  return (
    <div className="overflow-hidden relative">
      <FloatingElements />
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        message={authMessage}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 pb-32">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
        
        {/* 3D Hero Background */}
        <Hero3D />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${parallaxOffset * 0.1}px)` }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse" 
            style={{ 
              animationDelay: '1s',
              transform: `translateY(${parallaxOffset * -0.15}px)` 
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-3xl animate-pulse" 
            style={{ 
              animationDelay: '2s',
              transform: `translate(-50%, -50%) translateY(${parallaxOffset * 0.05}px)` 
            }}
          ></div>
        </div>

        <div ref={heroRef} className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                <Sparkles className="h-16 w-16 text-blue-500 mx-auto" />
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent text-shadow">
            Tech Revolution
          </h1>
          
          <div className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <p className="text-2xl md:text-3xl text-gray-700 dark:text-slate-200 mb-4 max-w-3xl mx-auto leading-relaxed font-light">
              Discover Tomorrow's Technology
            </p>
            <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
              Experience cutting-edge products with premium quality and innovative design
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeInUp" style={{ animationDelay: '1s' }}>
            <Link
              to="/products"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl hover:from-blue-400 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 pulse-button"
            >
              <span className="mr-3">Shop Now</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-blue-600 dark:text-blue-400 border-2 border-blue-500/50 rounded-2xl hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm hover-lift"
            >
              Browse Catalog
            </Link>
          </div>
        </div>

        {/* Dynamic Floating Product Cards */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          {floatingProducts.map((product, index) => (
            <div
              key={product.id}
              className="absolute animate-float hover-lift"
              style={{
                top: `${15 + index * 30}%`,
                left: index % 2 === 0 ? '8%' : '85%',
                animationDelay: `${index * 0.7}s`,
                animationDuration: '4s',
                transform: `translateY(${parallaxOffset * (index % 2 === 0 ? 0.1 : -0.1)}px)`
              }}
            >
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 neon-glow"></div>
                <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-xl p-6 border border-gray-200/50 dark:border-slate-700/50 shadow-xl">
                  <div className="text-blue-500 mb-3 flex justify-center animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                    {product.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">{product.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-bold text-center">${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacer */}
      <div className="h-16 md:h-24"></div>

      {/* 3D Product Showcase */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
              Experience in 3D
            </h2>
            <p className="text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Interact with our products in stunning 3D detail
            </p>
          </div>

          <div 
            ref={showcase3DRef}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              showcase3DVisible ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            {/* 3D Product Viewer */}
            <div className="relative">
              <Product3D
                images={showcase3DProduct.images}
                name={showcase3DProduct.name}
                className="aspect-square"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-blue-500 font-medium text-lg">Premium Audio</span>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                  {showcase3DProduct.name}
                </h3>
                <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
                  Experience revolutionary audio technology with our flagship headphones. 
                  Featuring advanced noise cancellation, premium materials, and immersive 3D spatial audio.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                  <div className="text-2xl font-bold text-blue-500 mb-1">30h</div>
                  <div className="text-sm text-gray-600 dark:text-slate-400">Battery Life</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                  <div className="text-2xl font-bold text-purple-500 mb-1">3D</div>
                  <div className="text-sm text-gray-600 dark:text-slate-400">Spatial Audio</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                  <div className="text-2xl font-bold text-green-500 mb-1">ANC</div>
                  <div className="text-sm text-gray-600 dark:text-slate-400">Noise Cancel</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                  <div className="text-2xl font-bold text-orange-500 mb-1">Hi-Fi</div>
                  <div className="text-sm text-gray-600 dark:text-slate-400">Audio Quality</div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Link
                  to="/product/1"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 text-center"
                >
                  View Details
                </Link>
                <button className="px-6 py-4 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200">
                  <Heart className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-20 md:h-32"></div>

      {/* Features Section */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-slate-800/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
              Why Choose TechStore
            </h2>
            <p className="text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Experience premium quality and exceptional service
            </p>
          </div>

          <div 
            ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Shield className="h-12 w-12" />,
                title: '2 Year Warranty',
                description: 'Comprehensive warranty coverage on all products',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: <Truck className="h-12 w-12" />,
                title: 'Free Shipping',
                description: 'Free delivery on orders over $100',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: <Zap className="h-12 w-12" />,
                title: '24/7 Support',
                description: 'Round-the-clock customer support',
                color: 'from-purple-500 to-pink-500'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`text-center p-8 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl group ${
                  featuresVisible ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`text-white mb-4 flex justify-center p-4 rounded-full bg-gradient-to-r ${feature.color} mx-auto w-fit group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-20 md:h-32"></div>

      {/* Featured Products */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Handpicked selection of premium technology products
            </p>
          </div>

          <div 
            ref={productsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {featuredProducts.slice(0, 6).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAuthRequired={showAuthRequired}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-20 md:h-32"></div>

      {/* New Products */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-slate-800/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
              New Arrivals
            </h2>
            <p className="text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Latest innovations and cutting-edge technology
            </p>
          </div>

          <div 
            ref={newProductsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {newProducts.slice(0, 4).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAuthRequired={showAuthRequired}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-20 md:h-32"></div>

      {/* Dynamic Stats Section */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: 10000, label: 'Happy Customers', suffix: '+', color: 'from-blue-500 to-cyan-500' },
              { number: 500, label: 'Products', suffix: '+', color: 'from-purple-500 to-pink-500' },
              { number: 50, label: 'Brands', suffix: '+', color: 'from-green-500 to-emerald-500' },
              { number: 24, label: 'Support', suffix: '/7', color: 'from-orange-500 to-red-500' }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {statsVisible ? (
                    <AnimatedCounter 
                      end={stat.number} 
                      suffix={stat.suffix}
                      duration={2000 + index * 200}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>
                <div className="text-gray-600 dark:text-slate-300 text-xl font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Spacer */}
      <div className="h-16 md:h-24"></div>
    </div>
  );
};

export default HomePage;