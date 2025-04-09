
import React, { useRef, useEffect } from "react";
import ThreeJSHero from "../components/ThreeJSHero";
import ThreeJSAccent from "../components/ThreeJSAccent";
import ThreeJSInteriorScene from "../components/ThreeJSInteriorScene";
import ParallaxSection from "../components/ParallaxSection";
import ScrollAnimation from "../components/ScrollAnimation";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered animation for projects section
    if (projectsRef.current) {
      const projectItems = projectsRef.current.querySelectorAll('.project-item');
      
      gsap.fromTo(
        projectItems,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Animation for intro text
    if (introTextRef.current) {
      const childElements = introTextRef.current.children;
      
      gsap.fromTo(
        childElements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: introTextRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Parallax and fade for quote section
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 70%",
            end: "center 50%",
            scrub: true,
          }
        }
      );
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      {/* Hero Section with ThreeJS */}
      <ThreeJSHero 
        title="PSDJ INTERIORS" 
        subtitle="We create spaces that inspire, function, and reflect your vision."
      />
      
      {/* Introduction Text Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div 
            ref={introTextRef} 
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-kessler">Design that transforms spaces</h2>
            <p className="text-lg opacity-80">
              PSDJ Interior Architecture approaches each project with a blend of imagination, 
              precision, and dedication to creating environments that resonate with their 
              occupants and surroundings.
            </p>
            <div className="pt-8">
              <Button className="text-lg px-8 py-6">Our Philosophy</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-kessler text-center mb-16">Featured Projects</h2>
          
          <div 
            ref={projectsRef} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Project 1 */}
            <div className="project-item group">
              <div className="overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Modern living room" 
                  className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-kessler mb-2">Riverside Penthouse</h3>
              <p className="text-sm uppercase tracking-wide opacity-70">RESIDENTIAL DESIGN</p>
            </div>
            
            {/* Project 2 */}
            <div className="project-item group">
              <div className="overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Modern office space" 
                  className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-kessler mb-2">Artisan Studios</h3>
              <p className="text-sm uppercase tracking-wide opacity-70">COMMERCIAL DESIGN</p>
            </div>
            
            {/* Project 3 */}
            <div className="project-item group">
              <div className="overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Boutique hotel lobby" 
                  className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-kessler mb-2">Serenity Hotel</h3>
              <p className="text-sm uppercase tracking-wide opacity-70">HOSPITALITY DESIGN</p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Button variant="outline" className="text-lg px-8 py-6">View All Projects</Button>
          </div>
        </div>
      </section>
      
      {/* ThreeJS Interior Scene */}
      <ThreeJSInteriorScene 
        title="Spatial Design Philosophy"
        description="We believe in the transformative power of thoughtfully designed spaces. Every project begins with understanding how people will live, work, and interact within the environment."
      />
      
      {/* Quote Section with Parallax */}
      <ParallaxSection 
        imageUrl="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
        className="h-[500px]"
        overlay={true}
        overlayOpacity={0.6}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div 
            ref={quoteRef} 
            className="max-w-3xl text-center text-white"
          >
            <h2 className="text-3xl md:text-5xl font-kessler mb-6">
              "Design is not making beauty; beauty emerges from selection, affinities, integration."
            </h2>
            <p className="text-xl opacity-90">Louis Kahn</p>
          </div>
        </div>
      </ParallaxSection>
      
      {/* Services Section with ThreeJS Accent */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <ScrollAnimation animation="fade-left" className="space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-kessler mb-6">Our Services</h2>
                <p className="text-lg opacity-80 max-w-lg">
                  From concept to completion, we offer a comprehensive range of interior 
                  architecture services tailored to residential, commercial, and 
                  hospitality projects.
                </p>
                
                <div className="space-y-8 mt-12">
                  <div className="border-l-2 border-black pl-6">
                    <h3 className="text-2xl font-kessler mb-2">Interior Architecture</h3>
                    <p className="opacity-80">Comprehensive spatial planning and design solutions</p>
                  </div>
                  
                  <div className="border-l-2 border-black pl-6">
                    <h3 className="text-2xl font-kessler mb-2">Concept Development</h3>
                    <p className="opacity-80">Creative direction and vision for your space</p>
                  </div>
                  
                  <div className="border-l-2 border-black pl-6">
                    <h3 className="text-2xl font-kessler mb-2">Technical Documentation</h3>
                    <p className="opacity-80">Detailed drawings and specifications for execution</p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center">
              <ThreeJSAccent className="h-96 w-96" type="particles" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation animation="scale-in" className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-kessler">Ready to transform your space?</h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Let's collaborate to create an environment that inspires and functions beautifully.
            </p>
            <div className="pt-4">
              <Button className="text-lg px-10 py-6 bg-white text-gray-900 hover:bg-gray-100">
                Contact Us
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};

export default Home;
