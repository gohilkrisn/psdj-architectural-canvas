
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { siteData } from "../data/siteData";
import ThreeJSHero from "../components/ThreeJSHero";
import ThreeJSAccent from "../components/ThreeJSAccent";
import ProjectCard from "../components/ProjectCard";
import { ArrowRight } from "lucide-react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ThreeJSHero 
        title={siteData.home.hero.title}
        subtitle={siteData.home.hero.subtitle}
      />
      
      {/* Intro Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-10">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-3xl font-light leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {siteData.home.hero.description}
            </p>
            
            <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <h2 className="text-2xl font-light mb-3">Our Approach</h2>
                <p className="text-gray-600">
                  We transform environments through thoughtful design, crafting spaces that reflect our clients' identities while pushing the boundaries of architectural innovation.
                </p>
              </div>
              
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <h2 className="text-2xl font-light mb-3">Our Vision</h2>
                <p className="text-gray-600">
                  To redefine interior architecture by creating environments that seamlessly blend aesthetics, functionality, and human-centered design principles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About/Philosophy Section */}
      <section className="py-20 md:py-32 bg-black text-white">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-3xl md:text-4xl font-light mb-8">
                {siteData.home.about.title}
              </h2>
              <p className="text-gray-300 mb-8">
                {siteData.home.about.content}
              </p>
              
              <Link 
                to="/expertise" 
                className="inline-flex items-center group"
              >
                <span className="hover-line">Learn more about our expertise</span>
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {siteData.home.about.values.map((value, index) => (
                  <div key={value.title} className="border border-gray-800 p-6">
                    <h3 className="text-lg font-medium mb-2">{value.title}</h3>
                    <p className="text-gray-400 text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-light opacity-0 animate-fade-in">
              {siteData.home.featured.title}
            </h2>
            
            <Link 
              to="/our-work" 
              className="inline-flex items-center group opacity-0 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="hover-line">View all projects</span>
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteData.home.featured.projects.map((project, index) => (
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
      
      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 md:right-20 opacity-30">
          <ThreeJSAccent type="wireframe" className="h-40 w-40 md:h-64 md:w-64" />
        </div>
        
        <div className="container mx-auto px-4 md:px-10 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-light mb-6 opacity-0 animate-fade-in">
              Ready to transform your space?
            </h2>
            <p className="text-lg text-gray-600 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Let's collaborate on your next project and create an environment that inspires.
            </p>
            <Link 
              to="/contact" 
              className="bg-black text-white px-8 py-3 text-sm uppercase tracking-wider inline-block hover:bg-gray-800 transition-colors opacity-0 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
