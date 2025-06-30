import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Star, Heart, ShoppingBag } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    icon: React.ReactNode;
    delay: number;
    duration: number;
  }>>([]);

  const icons = [
    <Sparkles className="h-6 w-6" />,
    <Zap className="h-6 w-6" />,
    <Star className="h-6 w-6" />,
    <Heart className="h-6 w-6" />,
    <ShoppingBag className="h-6 w-6" />
  ];

  useEffect(() => {
    const generateElements = () => {
      const newElements = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        icon: icons[Math.floor(Math.random() * icons.length)],
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4
      }));
      setElements(newElements);
    };

    generateElements();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute text-sky-400/20 animate-float"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`
          }}
        >
          {element.icon}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;