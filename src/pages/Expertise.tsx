
import React, { useEffect } from "react";
import { siteData } from "../data/siteData";
import ExpertiseCard from "../components/ExpertiseCard";
import ThreeJSAccent from "../components/ThreeJSAccent";
import ParallaxSection from "../components/ParallaxSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScrollAnimation from "../components/ScrollAnimation";

const Expertise = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen pt-24 font-serif">
      {/* Header */}
      <ParallaxSection 
        imageUrl="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=2000&q=80"
        className="py-24 md:py-32 text-white"
        overlay={true}
        overlayColor="rgba(64, 48, 33, 0.6)"
      >
        <div className="container mx-auto px-4 md:px-10">
          <div className="max-w-3xl mx-auto">
            <ScrollAnimation animation="fade-down" className="mb-8">
              <h1 className="text-4xl md:text-6xl font-light text-center">
                {siteData.expertise.title}
              </h1>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" className="delay-300">
              <p className="text-xl text-white/80 text-center">
                {siteData.expertise.description}
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </ParallaxSection>
      
      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-[#f8f6f2]">
        <div className="container mx-auto px-4 md:px-10">
          <ScrollAnimation animation="fade-up" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-6 text-primary">Our Design Services</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.expertise.services.map((service, index) => (
              <ScrollAnimation
                key={service.title}
                animation="fade-up"
                delay={index * 0.1}
                className="h-full"
              >
                <ExpertiseCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  index={index}
                />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 md:py-24 bg-[#403025] text-white relative">
        <div className="absolute top-0 right-0 opacity-30">
          <ThreeJSAccent type="wireframe" className="h-40 w-40 md:h-64 md:w-64" />
        </div>
        
        <div className="container mx-auto px-4 md:px-10 relative z-10">
          <ScrollAnimation animation="fade-up" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-6">
              {siteData.expertise.process.title}
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </ScrollAnimation>
          
          <ScrollArea className="h-[600px] md:h-auto">
            <div className="space-y-16 md:space-y-24 px-4">
              {siteData.expertise.process.steps.map((step, index) => (
                <ScrollAnimation 
                  key={step.number}
                  animation="fade-left"
                  delay={index * 0.1}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-1">
                      <span className="text-2xl font-mono text-accent">{step.number}</span>
                    </div>
                    
                    <div className="md:col-span-3">
                      <h3 className="text-2xl font-serif mb-3">{step.title}</h3>
                    </div>
                    
                    <div className="md:col-span-8">
                      <p className="text-white/70">{step.description}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ScrollArea>
        </div>
      </section>
      
      {/* Client Testimonial or Quote */}
      <ParallaxSection 
        imageUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
        className="py-24 md:py-32 text-white"
        overlay={true}
        overlayOpacity={0.5}
      >
        <div className="container mx-auto px-4 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimation animation="scale-in">
              <blockquote className="text-2xl md:text-4xl font-serif italic">
                "Design is not just what it looks like and feels like. Design is how it works."
              </blockquote>
              <p className="mt-6 text-white/70">
                — Steve Jobs
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default Expertise;
