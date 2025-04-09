
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-in' | 'rotate';
  delay?: number;
  duration?: number;
  triggerPosition?: string;
  scrub?: boolean;
  markers?: boolean;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 0.8,
  triggerPosition = 'bottom bottom',
  scrub = false,
  markers = false
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    
    // Set initial state based on animation type
    switch(animation) {
      case 'fade-up':
        gsap.set(element, { y: 30, opacity: 0 });
        break;
      case 'fade-down':
        gsap.set(element, { y: -30, opacity: 0 });
        break;
      case 'fade-left':
        gsap.set(element, { x: 30, opacity: 0 });
        break;
      case 'fade-right':
        gsap.set(element, { x: -30, opacity: 0 });
        break;
      case 'scale-in':
        gsap.set(element, { scale: 0.9, opacity: 0 });
        break;
      case 'rotate':
        gsap.set(element, { rotation: 5, opacity: 0 });
        break;
      default:
        gsap.set(element, { opacity: 0 });
    }
    
    // Create animation based on type
    const animateProps: gsap.TweenVars = { 
      opacity: 1, 
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: triggerPosition,
        markers,
        scrub: scrub,
        once: true, // Play animation only once for performance
        toggleActions: "play none none none" // Only plays when scrolling down, doesn't reverse
      }
    };
    
    // Add specific properties based on animation type
    switch(animation) {
      case 'fade-up':
        animateProps.y = 0;
        break;
      case 'fade-down':
        animateProps.y = 0;
        break;
      case 'fade-left':
        animateProps.x = 0;
        break;
      case 'fade-right':
        animateProps.x = 0;
        break;
      case 'scale-in':
        animateProps.scale = 1;
        break;
      case 'rotate':
        animateProps.rotation = 0;
        break;
    }
    
    gsap.to(element, animateProps);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill(true);
        }
      });
    };
  }, [animation, delay, duration, triggerPosition, scrub, markers]);
  
  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollAnimation;
