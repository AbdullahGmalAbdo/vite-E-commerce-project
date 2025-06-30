import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Maximize2, Minimize2 } from 'lucide-react';

interface Product3DProps {
  images: string[];
  name: string;
  className?: string;
}

const Product3D: React.FC<Product3DProps> = ({ images, name, className = '' }) => {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef<number>(0);

  // Auto-rotation effect
  useEffect(() => {
    let animationFrame: number;
    
    if (isRotating && !isDragging) {
      const rotate = () => {
        rotationRef.current += 1;
        setCurrentAngle(rotationRef.current);
        animationFrame = requestAnimationFrame(rotate);
      };
      animationFrame = requestAnimationFrame(rotate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isRotating, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouseX(e.clientX);
    setIsRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMouseX;
      rotationRef.current += deltaX * 0.5;
      setCurrentAngle(rotationRef.current);
      setLastMouseX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleAutoRotation = () => {
    setIsRotating(!isRotating);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Calculate which image to show based on angle
  const imageIndex = Math.floor(((currentAngle % 360) + 360) % 360 / (360 / images.length));
  const currentImage = images[imageIndex] || images[0];

  return (
    <>
      <div 
        ref={containerRef}
        className={`relative group ${className} ${isFullscreen ? 'fixed inset-0 z-50 bg-black/90 flex items-center justify-center' : ''}`}
      >
        <div className={`relative ${isFullscreen ? 'max-w-4xl max-h-4xl w-full h-full' : 'w-full h-full'} bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700`}>
          {/* 3D Product Display */}
          <div 
            className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Main Product Image with 3D Transform */}
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
              style={{
                transform: `rotateY(${currentAngle}deg) rotateX(${Math.sin(currentAngle * 0.01) * 5}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <img
                src={currentImage}
                alt={name}
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                  transform: 'translateZ(50px)'
                }}
                draggable={false}
              />
            </div>

            {/* Reflection Effect */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-1/3 opacity-20"
              style={{
                background: `linear-gradient(to top, rgba(0,0,0,0.1), transparent)`,
                transform: 'scaleY(-1) translateY(100%)',
                transformOrigin: 'bottom'
              }}
            >
              <img
                src={currentImage}
                alt={`${name} reflection`}
                className="w-full h-full object-contain opacity-30"
                style={{
                  transform: `rotateY(${currentAngle}deg)`,
                  filter: 'blur(1px)'
                }}
                draggable={false}
              />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + i * 0.5}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={toggleAutoRotation}
              className={`p-3 rounded-full backdrop-blur-lg border transition-all duration-300 hover:scale-110 ${
                isRotating 
                  ? 'bg-blue-500/80 border-blue-400 text-white' 
                  : 'bg-white/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-400'
              }`}
              title={isRotating ? 'Stop rotation' : 'Auto rotate'}
            >
              <RotateCcw className={`h-5 w-5 ${isRotating ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-400 hover:text-blue-500 transition-all duration-300 hover:scale-110"
              title={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
          </div>

          {/* Angle Indicator */}
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-lg text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {Math.round(((currentAngle % 360) + 360) % 360)}°
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-lg text-white px-3 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Drag to rotate
          </div>
        </div>

        {/* Fullscreen Close Button */}
        {isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-lg rounded-full text-white hover:bg-white/20 transition-colors duration-300"
          >
            <Minimize2 className="h-6 w-6" />
          </button>
        )}
      </div>
    </>
  );
};

export default Product3D;