
import React, { useEffect, useState } from "react";
import { siteData } from "../data/siteData";
import ProjectCard from "../components/ProjectCard";
import ThreeJSAccent from "../components/ThreeJSAccent";
import ParallaxSection from "../components/ParallaxSection";

const OurWork = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([
    {
      title: "Meridian Loft",
      category: "Residential",
      location: "New York, NY",
      year: "2023",
      description: "A minimalist penthouse with panoramic city views.",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1200&q=80", 
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=80", 
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      title: "Vertex Gallery",
      category: "Commercial",
      location: "Chicago, IL",
      year: "2022",
      description: "A contemporary art gallery with flexible exhibition spaces.",
      image: "https://images.unsplash.com/photo-1594844311819-a0f462d45a3a?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1580974852861-c5b0a1f3522b?auto=format&fit=crop&w=1200&q=80", 
        "https://images.unsplash.com/photo-1583183634411-6c5c9eeec1b2?auto=format&fit=crop&w=1200&q=80", 
        "https://images.unsplash.com/photo-1572987679521-d6c339eb31b1?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      title: "Nova Restaurant",
      category: "Hospitality",
      location: "Miami, FL",
      year: "2022",
      description: "An intimate dining environment with dramatic lighting design.",
      image: "https://images.unsplash.com/photo-1504474298956-b1812fe43d92?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80", 
        "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1200&q=80", 
        "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      title: "Serene Residence",
      category: "Residential",
      location: "Los Angeles, CA",
      year: "2021",
      description: "A California modern home with seamless indoor-outdoor living.",
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", 
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80", 
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      title: "Monolith Office",
      category: "Commercial",
      location: "Seattle, WA",
      year: "2021",
      description: "A forward-thinking workspace for a technology company.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80", 
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", 
        "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      title: "Drift Hotel",
      category: "Hospitality",
      location: "Austin, TX",
      year: "2020",
      description: "A boutique hotel celebrating local materials and craftsmanship.",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80", 
        "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1200&q=80", 
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
      ]
    }
  ]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(filteredProjects);
    } else {
      setFilteredProjects(
        filteredProjects.filter(project => project.category === selectedCategory)
      );
    }
  }, [selectedCategory]);
  
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <ParallaxSection 
        imageUrl="https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=2000&q=80"
        className="py-32 md:py-40 text-white relative"
      >
        <div className="absolute inset-0 bg-black/70 z-0"></div>
        <div className="container mx-auto px-4 md:px-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-kessler mb-8 animate-fade-in">
                Our Work
              </h1>
              <p className="text-gray-300 max-w-xl animate-fade-in text-lg" style={{ animationDelay: "0.2s" }}>
                A curated portfolio of our most impactful projects across residential, commercial, and hospitality sectors. Each project represents our commitment to thoughtful design that enhances the human experience.
              </p>
            </div>
            
            <div className="relative h-64">
              <ThreeJSAccent type="particles" className="h-full w-full" />
            </div>
          </div>
        </div>
      </ParallaxSection>
      
      {/* Filter Categories */}
      <section className="py-12 border-t border-b border-gray-200 sticky top-20 bg-white/90 backdrop-blur-sm z-20">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-wrap gap-12">
            {["All", "Residential", "Commercial", "Hospitality"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm uppercase tracking-widest hover:text-black transition-colors relative ${
                  selectedCategory === category ? "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black" : "text-gray-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                category={project.category}
                image={project.image}
                description={`${project.location}, ${project.year}`}
                index={index}
                to="#"
              />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-xl text-gray-500">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Case Study */}
      <ParallaxSection 
        imageUrl="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=2000&q=80"
        className="py-32 md:py-40 text-white relative"
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="container mx-auto px-4 md:px-10 relative z-10">
          <div className="max-w-2xl">
            <span className="text-sm uppercase tracking-widest opacity-80">Featured Case Study</span>
            <h2 className="text-4xl md:text-5xl font-kessler my-6">
              Meridian Loft: Transforming Urban Living
            </h2>
            <p className="text-gray-300 mb-10">
              An in-depth look at our approach to redesigning a penthouse apartment in New York City, balancing luxury, functionality, and sustainability to create a space that reflects the client's lifestyle and values.
            </p>
            <button className="bg-white text-black px-8 py-4 hover:bg-gray-200 transition-colors">
              Read case study
            </button>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default OurWork;
