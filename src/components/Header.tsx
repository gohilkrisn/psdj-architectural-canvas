
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { siteData } from "../data/siteData";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-10",
        isScrolled ? "py-4 bg-white/90 backdrop-blur-sm shadow-sm" : "py-6"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link 
          to="/"
          className="flex items-center"
        >
          <img 
            src="/lovable-uploads/99dc09e2-c36d-4531-a1a8-d451b9ee66bc.png" 
            alt="PSDJ Interior Architecture" 
            className="h-10 w-auto mr-4"
          />
          <span className="font-kessler text-lg tracking-wide hidden md:block">
            INTERIOR ARCHITECTURE
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {siteData.navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "hover-line text-sm uppercase tracking-widest transition-colors font-light",
                    location.pathname === item.path ? "text-black" : "text-gray-500"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 pt-20 px-6 transform transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav>
          <ul className="flex flex-col space-y-8">
            {siteData.navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "text-3xl uppercase font-kessler tracking-widest block",
                    location.pathname === item.path ? "text-black" : "text-gray-500"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-12 left-6">
          <p className="text-gray-500 mb-2">{siteData.contact.email}</p>
          <p className="text-gray-500">{siteData.contact.phone}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
