import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Zap, Star, Heart, ShoppingBag, Cpu, Headphones, Smartphone } from 'lucide-react';

const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const floatingElements = [
    { icon: Sparkles, color: 'text-blue-400', size: 'h-8 w-8', delay: 0 },
    { icon: Zap, color: 'text-yellow-400', size: 'h-6 w-6', delay: 0.5 },
    { icon: Star, color: 'text-purple-400', size: 'h-7 w-7', delay: 1 },
    { icon: Heart, color: 'text-pink-400', size: 'h-6 w-6', delay: 1.5 },
    { icon: ShoppingBag, color: 'text-green-400', size: 'h-7 w-7', delay: 2 },
    { icon: Cpu, color: 'text-cyan-400', size: 'h-8 w-8', delay: 2.5 },
    { icon: Headphones, color: 'text-indigo-400', size: 'h-6 w-6', delay: 3 },
    { icon: Smartphone, color: 'text-emerald-400', size: 'h-7 w-7', delay: 3.5 }
  ];

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: '1000px' }}
    >
      {/* 3D Floating Elements */}
      {floatingElements.map((element, index) => {
        const Icon = element.icon;
        const parallaxX = (mousePosition.x - 0.5) * 50;
        const parallaxY = (mousePosition.y - 0.5) * 30;
        
        return (
          <div
            key={index}
            className="absolute animate-float"
            style={{
              left: `${10 + (index % 4) * 25}%`,
              top: `${15 + Math.floor(index / 4) * 30}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${4 + (index % 3)}s`,
              transform: `
                translateX(${parallaxX * (index % 2 === 0 ? 1 : -1)}px) 
                translateY(${parallaxY * (index % 2 === 0 ? 1 : -1)}px)
                rotateX(${mousePosition.y * 20 - 10}deg)
                rotateY(${mousePosition.x * 20 - 10}deg)
                translateZ(${50 + index * 10}px)
              `,
              transformStyle: 'preserve-3d'
            }}
          >
            <div 
              className={`${element.color} ${element.size} drop-shadow-lg hover:scale-125 transition-transform duration-300`}
              style={{
                filter: 'drop-shadow(0 0 20px currentColor)',
                animation: `float ${4 + index}s ease-in-out infinite`
              }}
            >
              <Icon className="w-full h-full" />
            </div>
          </div>
        );
      })}

      {/* 3D Geometric Shapes */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 20}%`,
              top: `${20 + (i % 2) * 40}%`,
              transform: `
                translateX(${(mousePosition.x - 0.5) * 30 * (i % 2 === 0 ? 1 : -1)}px)
                translateY(${(mousePosition.y - 0.5) * 20 * (i % 2 === 0 ? 1 : -1)}px)
                rotateX(${mousePosition.y * 15}deg)
                rotateY(${mousePosition.x * 15}deg)
                translateZ(${30 + i * 15}px)
              `,
              transformStyle: 'preserve-3d',
              animationDelay: `${i * 0.5}s`
            }}
          >
            <div 
              className={`w-16 h-16 bg-gradient-to-br ${
                i % 3 === 0 ? 'from-blue-500/20 to-purple-500/20' :
                i % 3 === 1 ? 'from-green-500/20 to-cyan-500/20' :
                'from-pink-500/20 to-red-500/20'
              } rounded-lg backdrop-blur-sm border border-white/10 animate-pulse`}
              style={{
                animationDuration: `${2 + i}s`,
                transform: `rotateZ(${i * 45}deg)`
              }}
            />
          </div>
        ))}
      </div>

      {/* Particle System */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/50 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: `
                translateX(${(mousePosition.x - 0.5) * 20}px)
                translateY(${(mousePosition.y - 0.5) * 15}px)
                translateZ(${Math.random() * 100}px)
              `
            }}
          />
        ))}
      </div>

      {/* 3D Grid Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `
            perspective(500px)
            rotateX(${mousePosition.y * 10 - 5}deg)
            rotateY(${mousePosition.x * 10 - 5}deg)
          `
        }}
      />
    </div>
  );
};

export default Hero3D;