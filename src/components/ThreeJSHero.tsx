
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
    
    // Clean up when component unmounts
    return cleanup;
  }, []);
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* ThreeJS Container */}
      <div 
        ref={containerRef}
        className="absolute inset-0 z-0"
      />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4 animate-fade-in">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl opacity-80 mt-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
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
