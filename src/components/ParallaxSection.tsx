
import React, { useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  imageUrl: string;
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  imageUrl, 
  children, 
  className = "", 
  speed = 0.15 
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    
    if (!section || !bg) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      // Check if the section is in view
      if (
        scrollPosition + window.innerHeight >= sectionTop && 
        scrollPosition <= sectionTop + sectionHeight
      ) {
        // Calculate the parallax effect
        const yPos = (scrollPosition - sectionTop) * speed;
        bg.style.transform = `translateY(${yPos}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);
  
  return (
    <div ref={sectionRef} className={`parallax-container ${className}`}>
      <div 
        ref={bgRef} 
        className="parallax-bg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="parallax-content">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
