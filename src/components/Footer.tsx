
import React from "react";
import { Link } from "react-router-dom";
import { siteData } from "../data/siteData";
import { ArrowUpRight } from "lucide-react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-xl md:text-2xl font-mono mb-4">
              {siteData.companyName}
            </h3>
            <p className="text-gray-400 max-w-xs">
              {siteData.description}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2">
              {siteData.navigation.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className="hover-line inline-block text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-4">Contact</h4>
            <p className="text-gray-400 mb-1">{siteData.contact.email}</p>
            <p className="text-gray-400 mb-1">{siteData.contact.phone}</p>
            <p className="text-gray-400 mb-4">{siteData.contact.address}</p>
            
            <div className="flex space-x-4 mt-4">
              {siteData.social.map((item) => (
                <a 
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <span>{item.name}</span>
                  <ArrowUpRight size={14} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {year} {siteData.fullCompanyName}. All rights reserved.
          </p>
          
          <p className="text-gray-500 text-sm">
            Site crafted with precision
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
