
import React, { useEffect, useState } from "react";
import { siteData } from "../data/siteData";
import ProjectCard from "../components/ProjectCard";
import ThreeJSAccent from "../components/ThreeJSAccent";

const OurWork = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(siteData.work.projects);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(siteData.work.projects);
    } else {
      setFilteredProjects(
        siteData.work.projects.filter(project => project.category === selectedCategory)
      );
    }
  }, [selectedCategory]);
  
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-light mb-8 animate-fade-in">
                {siteData.work.title}
              </h1>
              <p className="text-gray-600 max-w-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                {siteData.work.description}
              </p>
            </div>
            
            <div className="relative h-64">
              <ThreeJSAccent type="particles" className="h-full w-full" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Filter Categories */}
      <section className="py-8 border-t border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-wrap gap-8">
            {siteData.work.categories.map((category) => (
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  );
};

export default OurWork;
