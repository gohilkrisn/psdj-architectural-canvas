
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
  speed = 0.15,
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
    
    // Create parallax effect with ScrollTrigger
    gsap.to(bg, {
      backgroundPosition: `50% ${100 * speed}%`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
    
    // Animate content in when it becomes visible
    gsap.fromTo(
      content, 
      { opacity: 0, y: 50 }, 
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%"
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section || trigger.vars.trigger === content) {
          trigger.kill();
        }
      });
    };
  }, [speed]);
  
  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div 
        ref={bgRef} 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
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
      
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
