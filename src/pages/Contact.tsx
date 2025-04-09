
import React, { useEffect } from "react";
import { siteData } from "../data/siteData";
import ContactForm from "../components/ContactForm";
import ThreeJSAccent from "../components/ThreeJSAccent";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen pt-24">
      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h1 className="text-4xl md:text-6xl font-light mb-8 animate-fade-in">
                {siteData.contact.title}
              </h1>
              <p className="text-gray-600 mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                {siteData.contact.description}
              </p>
              
              <div className="mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <h2 className="text-sm uppercase tracking-widest mb-4">Contact Details</h2>
                <p className="mb-2">{siteData.contact.email}</p>
                <p className="mb-2">{siteData.contact.phone}</p>
                <p>{siteData.contact.address}</p>
              </div>
              
              <div className="relative h-40 w-40 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <ThreeJSAccent type="wireframe" className="h-full w-full" />
              </div>
            </div>
            
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4 md:px-10">
          <h2 className="text-3xl md:text-4xl font-light mb-12 opacity-0 animate-fade-in">
            {siteData.contact.aboutUs.title}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-gray-300 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                {siteData.contact.aboutUs.content}
              </p>
            </div>
            
            <div>
              <div className="grid grid-cols-2 gap-8">
                {siteData.contact.aboutUs.team.map((member, index) => (
                  <div 
                    key={member.name} 
                    className="opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                  >
                    <div className="aspect-square bg-gray-800 mb-4 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-light">{member.name}</h3>
                    <p className="text-sm text-gray-400">{member.position}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
