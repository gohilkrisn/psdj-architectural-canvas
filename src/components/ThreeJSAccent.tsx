
import React, { useRef, useEffect } from "react";
import { createWireframeModel, createParticleField } from "../utils/threeUtils";

interface ThreeJSAccentProps {
  type?: "wireframe" | "particles";
  className?: string;
}

const ThreeJSAccent: React.FC<ThreeJSAccentProps> = ({ 
  type = "wireframe",
  className = "h-64 w-64"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize the appropriate ThreeJS visualization
    const cleanup = type === "wireframe" 
      ? createWireframeModel(containerRef.current)
      : createParticleField(containerRef.current);
    
    // Clean up when component unmounts
    return cleanup;
  }, [type]);
  
  return (
    <div 
      ref={containerRef}
      className={className}
      aria-hidden="true"
    />
  );
};

export default ThreeJSAccent;
