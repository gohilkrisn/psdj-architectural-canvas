
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ThreeJSAccent from "../components/ThreeJSAccent";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-40 h-40 mb-8">
          <ThreeJSAccent type="wireframe" className="h-full w-full" />
        </div>
        
        <h1 className="text-6xl font-light mb-6 animate-fade-in">404</h1>
        <p className="text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          The page you're looking for doesn't exist.
        </p>
        
        <Link 
          to="/" 
          className="bg-black text-white px-8 py-3 text-sm uppercase tracking-wider inline-block hover:bg-gray-800 transition-colors animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Return home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
