
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  imageUrl: string;
  children: React.ReactNode;
  className?: string;
  speed?: number;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  imageUrl, 
  children, 
  className = "", 
  speed = 0.1, // Reduced speed for better performance
  overlay = false,
  overlayColor = "black",
  overlayOpacity = 0.5
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    
    if (!section || !bg || !content) return;
    
    // Set initial state
    gsap.set(bg, { backgroundPosition: "50% 0%" });
    
    // Create parallax effect with ScrollTrigger - optimized for performance
    const parallaxTween = gsap.to(bg, {
      backgroundPosition: `50% ${100 * speed}%`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        toggleActions: "play none none reset"
      }
    });
    
    // Animate content in when it becomes visible - simple fade
    const contentTween = gsap.fromTo(
      content, 
      { opacity: 0, y: 30 }, 
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true // Only play animation once for better performance
        }
      }
    );
    
    return () => {
      // Clean up animations to prevent memory leaks
      parallaxTween.kill();
      contentTween.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section || trigger.vars.trigger === content) {
          trigger.kill();
        }
      });
    };
  }, [speed]);
  
  return (
    <div 
      ref={sectionRef} 
      className={`relative overflow-hidden will-change-transform ${className}`}
    >
      <div 
        ref={bgRef} 
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          transform: 'translateZ(0)', // Hardware acceleration
          backfaceVisibility: 'hidden'
        }}
      />
      
      {overlay && (
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundColor: overlayColor,
            opacity: overlayOpacity
          }}
        />
      )}
      
      <div 
        ref={contentRef} 
        className="relative z-10 will-change-transform"
        style={{ transform: 'translateZ(0)' }} // Hardware acceleration
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
