
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SplashScreen: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial state
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(textRef.current, { opacity: 0, y: 20 });
    
    // Animation sequence
    tl.to(logoRef.current, {
      opacity: 1, 
      scale: 1, 
      duration: 1.2, 
      ease: "power3.out"
    })
    .to(textRef.current, {
      opacity: 1, 
      y: 0, 
      duration: 1, 
      ease: "power2.out"
    }, "-=0.7")
    .to([logoRef.current, textRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.8,
      delay: 1.5,
      ease: "power2.in"
    })
    .to(overlayRef.current, {
      y: "-100%",
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.4");
  }, []);
  
  return (
    <div ref={overlayRef} className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col md:flex-row items-center max-w-md">
        <div ref={logoRef} className="mb-4 md:mb-0 md:mr-6">
          <img 
            src="/lovable-uploads/99dc09e2-c36d-4531-a1a8-d451b9ee66bc.png" 
            alt="PSDJ Interior Architecture" 
            className="w-16 md:w-20 h-auto"
          />
        </div>
        <div ref={textRef} className="text-center md:text-left">
          <h1 className="font-kessler text-2xl md:text-3xl tracking-wider">
            INTERIOR <br /> ARCHITECTURE
          </h1>
          <p className="text-xs mt-1 tracking-wider opacity-70">
            CRAFTING TIMELESS SPACES
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
