
import React, { useRef, useEffect } from "react";
import { createFloorplanVisualization } from "../utils/threeUtils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ThreeJSInteriorSceneProps {
  title: string;
  description?: string;
}

const ThreeJSInteriorScene: React.FC<ThreeJSInteriorSceneProps> = ({ 
  title, 
  description 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !sceneRef.current) return;
    
    // Initialize 3D scene
    const cleanup = createFloorplanVisualization(sceneRef.current);
    
    // GSAP animations
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%"
        }
      }
    );
    
    // Parallax effect on scroll
    gsap.to(sceneRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
    
    return () => {
      cleanup();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* 3D Scene */}
          <div className="w-full lg:w-1/2 h-80 lg:h-[500px] mb-10 lg:mb-0">
            <div 
              ref={sceneRef} 
              className="w-full h-full"
            />
          </div>
          
          {/* Content */}
          <div 
            ref={contentRef} 
            className="w-full lg:w-1/2 lg:pl-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-kessler mb-6">
              {title}
            </h2>
            
            {description && (
              <p className="text-lg opacity-80 max-w-lg">
                {description}
              </p>
            )}
            
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="border-l border-black pl-4">
                <p className="text-sm uppercase tracking-wider opacity-70 mb-1">Design Process</p>
                <p className="font-kessler text-xl">Thoughtful planning and innovative solutions</p>
              </div>
              
              <div className="border-l border-black pl-4">
                <p className="text-sm uppercase tracking-wider opacity-70 mb-1">Visualization</p>
                <p className="font-kessler text-xl">Cutting-edge 3D rendering and modeling</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeJSInteriorScene;
