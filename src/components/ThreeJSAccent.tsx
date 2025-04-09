
import React, { useRef, useEffect } from "react";
import { createWireframeModel, createParticleField } from "../utils/threeUtils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ThreeJSAccentProps {
  type?: "wireframe" | "particles";
  className?: string;
  scrollAnimation?: boolean;
}

const ThreeJSAccent: React.FC<ThreeJSAccentProps> = ({ 
  type = "wireframe",
  className = "h-64 w-64",
  scrollAnimation = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize the appropriate ThreeJS visualization
    const cleanup = type === "wireframe" 
      ? createWireframeModel(containerRef.current)
      : createParticleField(containerRef.current);
    
    // Add scroll animation if requested
    if (scrollAnimation && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
          }
        }
      );
      
      // Add subtle rotation on scroll
      if (type === "wireframe") {
        gsap.to(containerRef.current, {
          rotateZ: 10,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }
    
    // Clean up when component unmounts
    return () => {
      cleanup();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [type, scrollAnimation]);
  
  return (
    <div 
      ref={containerRef}
      className={className}
      aria-hidden="true"
    />
  );
};

export default ThreeJSAccent;
