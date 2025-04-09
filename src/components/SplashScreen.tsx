
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SplashScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial state
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(textRef.current, { opacity: 0, y: 20 });
    gsap.set(linesRef.current?.children || [], { width: 0 });
    
    // Animation sequence
    tl.to(logoRef.current, {
      opacity: 1, 
      scale: 1, 
      duration: 1, 
      ease: "power3.out"
    })
    .to(textRef.current, {
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      ease: "power2.out"
    }, "-=0.5")
    .to(linesRef.current?.children || [], {
      width: "100%",
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.inOut"
    }, "-=0.3")
    .to([logoRef.current, textRef.current, linesRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.6,
      delay: 1,
      ease: "power2.in"
    })
    .to(overlayRef.current, {
      y: "-100%",
      duration: 0.8,
      ease: "power3.inOut"
    }, "-=0.2");
  }, []);
  
  return (
    <div ref={containerRef} className="fixed inset-0 flex items-center justify-center bg-[#f8f6f2] z-50">
      <div ref={overlayRef} className="absolute inset-0 bg-[#f8f6f2] flex items-center justify-center">
        <div className="flex flex-col items-center max-w-md">
          <div ref={logoRef} className="mb-6">
            <img 
              src="/lovable-uploads/99dc09e2-c36d-4531-a1a8-d451b9ee66bc.png" 
              alt="PSDJ Interior Architecture" 
              className="w-20 md:w-24 h-auto"
              style={{ filter: 'brightness(1.3) contrast(0.9)' }}
            />
          </div>
          <div ref={textRef} className="text-center">
            <h1 className="font-kessler text-3xl md:text-4xl tracking-wider text-primary mb-2">
              INTERIOR <br /> ARCHITECTURE
            </h1>
            <p className="text-xs tracking-wider opacity-70 font-sans">
              CRAFTING TIMELESS SPACES
            </p>
          </div>
          
          <div ref={linesRef} className="w-full max-w-xs mt-6 space-y-2">
            <div className="h-px bg-primary/30"></div>
            <div className="h-px bg-primary/50"></div>
            <div className="h-px bg-primary/70"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
