
import React, { useEffect } from "react";
import { siteData } from "../data/siteData";
import ExpertiseCard from "../components/ExpertiseCard";
import ThreeJSAccent from "../components/ThreeJSAccent";

const Expertise = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-light mb-8 text-center animate-fade-in">
              {siteData.expertise.title}
            </h1>
            <p className="text-xl text-gray-600 text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {siteData.expertise.description}
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.expertise.services.map((service, index) => (
              <ExpertiseCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 md:py-24 bg-black text-white relative">
        <div className="absolute top-0 right-0 opacity-40">
          <ThreeJSAccent type="wireframe" className="h-40 w-40 md:h-64 md:w-64" />
        </div>
        
        <div className="container mx-auto px-4 md:px-10 relative z-10">
          <h2 className="text-3xl md:text-4xl font-light mb-16 opacity-0 animate-fade-in">
            {siteData.expertise.process.title}
          </h2>
          
          <div className="space-y-16 md:space-y-24">
            {siteData.expertise.process.steps.map((step, index) => (
              <div 
                key={step.number}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="md:col-span-1">
                  <span className="text-2xl font-mono">{step.number}</span>
                </div>
                
                <div className="md:col-span-3">
                  <h3 className="text-2xl font-light mb-3">{step.title}</h3>
                </div>
                
                <div className="md:col-span-8">
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Client Testimonial or Quote */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl font-light italic opacity-0 animate-fade-in">
              "Design is not just what it looks like and feels like. Design is how it works."
            </blockquote>
            <p className="mt-6 text-gray-500 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              — Steve Jobs
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Expertise;
