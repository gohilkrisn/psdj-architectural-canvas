
import React, { useRef, useEffect } from "react";
import { createArchitectureGrid } from "../utils/threeUtils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ThreeJSHeroProps {
  title: string;
  subtitle?: string;
}

const ThreeJSHero: React.FC<ThreeJSHeroProps> = ({ title, subtitle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !threeRef.current) return;
    
    // Initialize the ThreeJS scene
    const cleanup = createArchitectureGrid(threeRef.current);
    
    // GSAP animations
    const tl = gsap.timeline();
    
    // Initial state
    gsap.set(titleRef.current, { opacity: 0, y: 30 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
    
    // Animate in
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.5
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8");
    
    // Scroll animations
    gsap.to(threeRef.current, {
      y: 200,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    gsap.to(overlayTextRef.current, {
      y: -100,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    return () => {
      cleanup();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* ThreeJS Container */}
      <div 
        ref={threeRef}
        className="absolute inset-0 z-0"
      />
      
      {/* Content Overlay */}
      <div ref={overlayTextRef} className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-9xl font-kessler mb-4">
              {title}
            </h1>
            {subtitle && (
              <p ref={subtitleRef} className="text-lg md:text-2xl opacity-80 mt-4 max-w-xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-0 animate-fade-in" style={{ animationDelay: "1.6s" }}>
        <div className="flex flex-col items-center">
          <span className="text-sm uppercase tracking-widest mb-2">Scroll</span>
          <div className="h-12 w-0.5 bg-black opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default ThreeJSHero;
