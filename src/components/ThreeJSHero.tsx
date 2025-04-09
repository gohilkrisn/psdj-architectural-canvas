
import React, { useRef, useEffect } from "react";
import { createArchitectureGrid } from "../utils/threeUtils";

interface ThreeJSHeroProps {
  title: string;
  subtitle?: string;
}

const ThreeJSHero: React.FC<ThreeJSHeroProps> = ({ title, subtitle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize the ThreeJS scene
    const cleanup = createArchitectureGrid(containerRef.current);
    
    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const x = e.clientX;
      const y = e.clientY;
      
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate offset based on mouse position
      const moveX = (x - windowWidth / 2) * 0.01;
      const moveY = (y - windowHeight / 2) * 0.01;
      
      containerRef.current.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up when component unmounts
    return () => {
      cleanup();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* ThreeJS Container */}
      <div 
        ref={containerRef}
        className="absolute inset-0 z-0 transition-transform duration-75 ease-out"
      />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-kessler mb-4 opacity-0 animate-fade-in">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl opacity-80 mt-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <div className="flex flex-col items-center">
          <span className="text-sm uppercase tracking-widest mb-2">Scroll</span>
          <div className="h-12 w-0.5 bg-black opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default ThreeJSHero;
