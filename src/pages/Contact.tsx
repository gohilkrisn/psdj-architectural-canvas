
import React, { useEffect } from "react";
import { siteData } from "../data/siteData";
import ContactForm from "../components/ContactForm";
import ThreeJSAccent from "../components/ThreeJSAccent";
import ScrollAnimation from "../components/ScrollAnimation";
import ParallaxSection from "../components/ParallaxSection";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen pt-24 font-serif">
      {/* Header Section */}
      <ParallaxSection 
        imageUrl="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
        className="py-16 md:py-24 text-white"
        overlay={true}
        overlayColor="rgba(64, 48, 33, 0.7)"
      >
        <div className="container mx-auto px-4 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimation animation="fade-down" className="mb-8">
              <h1 className="text-4xl md:text-6xl font-light">
                Get in Touch
              </h1>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up">
              <p className="text-xl text-white/80">
                Let's collaborate to create spaces that inspire and transform
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </ParallaxSection>
      
      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-[#f8f6f2]">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollAnimation animation="fade-right">
              <div className="bg-white/50 p-8 h-full border-l-4 border-primary">
                <h2 className="text-3xl md:text-4xl font-light mb-8 text-primary">
                  {siteData.contact.title}
                </h2>
                <p className="text-gray-600 mb-12">
                  {siteData.contact.description}
                </p>
                
                <div className="mb-12">
                  <h3 className="text-sm uppercase tracking-widest mb-4 font-sans font-medium text-primary">Contact Details</h3>
                  <p className="mb-2 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </span>
                    {siteData.contact.phone}
                  </p>
                  <p className="mb-2 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </span>
                    {siteData.contact.email}
                  </p>
                  <p className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </span>
                    <span>{siteData.contact.address}</span>
                  </p>
                </div>
                
                <div className="relative h-40 w-40">
                  <ThreeJSAccent type="wireframe" className="h-full w-full" />
                </div>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-left">
              <div className="bg-white p-8 shadow-md">
                <ContactForm />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section className="py-16 md:py-24 bg-[#403025] text-white">
        <div className="container mx-auto px-4 md:px-10">
          <ScrollAnimation animation="fade-up" className="mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-center mb-6">
              {siteData.contact.aboutUs.title}
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <ScrollAnimation animation="fade-up">
                <p className="text-white/80 mb-8 text-lg leading-relaxed">
                  {siteData.contact.aboutUs.content}
                </p>
              </ScrollAnimation>
            </div>
            
            <div>
              <div className="grid grid-cols-2 gap-8">
                {siteData.contact.aboutUs.team.map((member, index) => (
                  <ScrollAnimation 
                    key={member.name} 
                    animation="fade-up"
                    delay={index * 0.1}
                  >
                    <div className="bg-white/10 p-4">
                      <div className="aspect-square overflow-hidden mb-4">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        />
                      </div>
                      <h3 className="text-lg font-serif">{member.name}</h3>
                      <p className="text-sm text-white/60">{member.position}</p>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Location Section */}
      <section className="h-96 bg-gray-100 relative">
        <div className="absolute inset-0 bg-[#f8f6f2]/30 z-10 flex items-center justify-center">
          <div className="text-center bg-white/80 backdrop-blur-sm p-8 max-w-md">
            <h3 className="text-2xl font-serif mb-4 text-primary">Visit Our Studio</h3>
            <p className="text-gray-700">
              Our design studio is located in the heart of the city. 
              Feel free to visit us Monday through Friday, 9am to 5pm.
            </p>
          </div>
        </div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6175363092613!2d-73.98657248459385!3d40.748447979326635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9aeb1c6b5%3A0x35b1cfbc89a6097f!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1566345235394!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          loading="lazy"
          title="Office Location"
          className="grayscale opacity-80"
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </section>
    </div>
  );
};

export default Contact;
