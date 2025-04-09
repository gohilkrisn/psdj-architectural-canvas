
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { siteData } from "../data/siteData";
import ThreeJSHero from "../components/ThreeJSHero";
import ThreeJSAccent from "../components/ThreeJSAccent";
import ProjectCard from "../components/ProjectCard";
import ParallaxSection from "../components/ParallaxSection";
import { ArrowRight, ArrowDown } from "lucide-react";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const introRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToIntro = () => {
    introRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with enhanced 3D and parallax */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ThreeJSHero 
            title={siteData.home.hero.title}
            subtitle={siteData.home.hero.subtitle}
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-10 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-kessler mb-6 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.5s" }}>
              {siteData.home.hero.title}
            </h1>
            <p className="text-xl md:text-2xl opacity-80 mt-4 opacity-0 animate-fade-in"
               style={{ animationDelay: "0.8s" }}>
              {siteData.home.hero.subtitle}
            </p>
            
            <button 
              onClick={scrollToIntro}
              className="mt-12 flex items-center mx-auto opacity-0 animate-fade-in hover:opacity-70 transition-opacity"
              style={{ animationDelay: "1.1s" }}
            >
              <span className="mr-2 text-sm uppercase tracking-widest">Explore</span>
              <ArrowDown size={20} className="animate-float" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Intro Section with Parallax */}
      <section ref={introRef} className="py-24 md:py-40">
        <div className="container mx-auto px-4 md:px-10">
          <div className="max-w-5xl mx-auto">
            <p className="text-2xl md:text-4xl font-kessler leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              We transform environments through thoughtful design, crafting spaces that reflect our clients' identities while pushing the boundaries of architectural innovation.
            </p>
            
            <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <h2 className="text-3xl font-kessler mb-5">Our Approach</h2>
                <p className="text-gray-600">
                  We transform environments through thoughtful design, crafting spaces that reflect our clients' identities while pushing the boundaries of architectural innovation. Our approach combines rigorous attention to detail with a deep understanding of how people interact with their environments.
                </p>
                <p className="text-gray-600 mt-4">
                  Every project begins with a thorough exploration of our client's needs, the site context, and the potential for innovation. We believe that exceptional design emerges from this foundation of understanding.
                </p>
              </div>
              
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <h2 className="text-3xl font-kessler mb-5">Our Vision</h2>
                <p className="text-gray-600">
                  To redefine interior architecture by creating environments that seamlessly blend aesthetics, functionality, and human-centered design principles. We see each project as an opportunity to create spaces that not only accommodate their intended use but elevate the experience of those who inhabit them.
                </p>
                <p className="text-gray-600 mt-4">
                  We strive to balance innovation with timelessness, creating spaces that feel contemporary yet enduring. Our vision extends beyond the immediate project to how our work contributes to a more thoughtful built environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About/Philosophy Section with Parallax */}
      <ParallaxSection 
        imageUrl="https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?auto=format&fit=crop&w=2000&q=80"
        className="py-32 md:py-40 text-white relative"
      >
        <div className="absolute inset-0 bg-black/70 z-0"></div>
        <div className="container mx-auto px-4 md:px-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-4xl md:text-5xl font-kessler mb-10">
                {siteData.home.about.title}
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                {siteData.home.about.content}
              </p>
              <p className="text-gray-300 mb-8 text-lg">
                Our collaborative approach ensures that every decision is informed by both creative vision and practical considerations. We believe that successful interior architecture is measured not just by its aesthetic impact, but by how well it serves its purpose over time.
              </p>
              
              <Link 
                to="/expertise" 
                className="inline-flex items-center group"
              >
                <span className="hover-line text-white">Learn more about our expertise</span>
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {siteData.home.about.values.map((value, index) => (
                  <div key={value.title} className="border border-white/20 backdrop-blur-sm bg-black/30 p-8 relative">
                    <span className="large-number text-white/10">{index + 1}</span>
                    <h3 className="text-2xl font-kessler mb-4 relative z-10">{value.title}</h3>
                    <p className="text-gray-400 text-base relative z-10">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>
      
      {/* Featured Projects with Modern Look */}
      <section className="py-28 md:py-40">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-kessler mb-6 md:mb-0 opacity-0 animate-fade-in">
              {siteData.home.featured.title}
            </h2>
            
            <Link 
              to="/our-work" 
              className="inline-flex items-center group opacity-0 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="hover-line text-lg">View all projects</span>
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8">
            {[
              {
                title: "Meridian Loft",
                category: "Residential",
                image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?auto=format&fit=crop&w=1200&q=80",
                description: "A minimalist penthouse with panoramic city views."
              },
              {
                title: "Vertex Gallery",
                category: "Commercial",
                image: "https://images.unsplash.com/photo-1594844311819-a0f462d45a3a?auto=format&fit=crop&w=1200&q=80",
                description: "A contemporary art gallery with flexible exhibition spaces."
              },
              {
                title: "Nova Restaurant",
                category: "Hospitality",
                image: "https://images.unsplash.com/photo-1504474298956-b1812fe43d92?auto=format&fit=crop&w=1200&q=80",
                description: "An intimate dining environment with dramatic lighting design."
              }
            ].map((project, index) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                category={project.category}
                image={project.image}
                description={project.description}
                index={index}
                to="/our-work"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Recent Recognition/Awards Section */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="container mx-auto px-4 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-kessler mb-12 opacity-0 animate-fade-in">
              Recognition
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {[
                { year: "2023", award: "Interior Design Excellence Award" },
                { year: "2022", award: "Best Commercial Space" },
                { year: "2021", award: "Innovation in Design" },
                { year: "2020", award: "Sustainable Architecture Award" },
              ].map((item, index) => (
                <div 
                  key={item.award} 
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <p className="text-lg font-kessler mb-1">{item.year}</p>
                  <p className="text-gray-400 text-sm">{item.award}</p>
                </div>
              ))}
            </div>
            
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <p className="text-gray-300 mb-8">
                Our work has been recognized by leading industry organizations and publications for its innovative approach to interior architecture and commitment to excellence.
              </p>
              <div className="flex justify-center space-x-8">
                <div className="h-8 w-20 bg-white/20"></div>
                <div className="h-8 w-20 bg-white/20"></div>
                <div className="h-8 w-20 bg-white/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section with Parallax */}
      <ParallaxSection
        imageUrl="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2000&q=80"
        className="py-28 md:py-40 relative min-h-[60vh] flex items-center"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black/40 z-0"></div>
        <div className="container mx-auto px-4 md:px-10 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-kessler mb-8 text-white opacity-0 animate-fade-in">
              Ready to transform your space?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-xl opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Let's collaborate on your next project and create an environment that inspires and elevates the human experience.
            </p>
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Link 
                to="/contact" 
                className="inline-flex items-center bg-white text-black px-8 py-4 text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                <span>Start a project</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default Home;
