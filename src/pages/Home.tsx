
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { siteData } from "../data/siteData";
import ThreeJSHero from "../components/ThreeJSHero";
import ThreeJSAccent from "../components/ThreeJSAccent";
import ThreeJSInteriorScene from "../components/ThreeJSInteriorScene";
import ProjectCard from "../components/ProjectCard";
import ParallaxSection from "../components/ParallaxSection";
import ScrollAnimation from "../components/ScrollAnimation";
import { ArrowRight, ArrowDown, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const introRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Initialize scroll animations
    sectionRefs.current.forEach((section, index) => {
      gsap.fromTo(
        section.querySelectorAll('.animate-on-scroll'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%"
          }
        }
      );
    });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const scrollToIntro = () => {
    introRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Add section to refs
  const addSectionRef = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with enhanced 3D */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ThreeJSHero 
            title="Interior Architecture with Vision"
            subtitle="Creating spaces that inspire and endure"
          />
        </div>
        
        <button 
          onClick={scrollToIntro}
          className="absolute bottom-10 left-0 right-0 mx-auto flex items-center justify-center opacity-0 animate-fade-in z-10"
          style={{ animationDelay: "2s" }}
        >
          <div className="flex flex-col items-center cursor-pointer">
            <span className="mr-2 text-sm uppercase tracking-widest mb-2">EXPLORE</span>
            <ArrowDown size={24} className="animate-float" />
          </div>
        </button>
      </section>
      
      {/* Intro Section with Parallax */}
      <section ref={(el) => { 
        if (el) {
          introRef.current = el;
          addSectionRef(el);
        }
      }} className="py-24 md:py-40">
        <div className="container mx-auto px-4 md:px-10">
          <ScrollAnimation animation="fade-up" className="max-w-5xl mx-auto">
            <p className="text-2xl md:text-4xl font-kessler leading-relaxed">
              We transform environments through thoughtful design, crafting spaces that reflect our clients' identities while pushing the boundaries of architectural innovation.
            </p>
          </ScrollAnimation>
          
          <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollAnimation animation="fade-right" delay={0.2} className="animate-on-scroll">
              <h2 className="text-3xl font-kessler mb-5">Our Approach</h2>
              <p className="text-gray-600">
                We transform environments through thoughtful design, crafting spaces that reflect our clients' identities while pushing the boundaries of architectural innovation. Our approach combines rigorous attention to detail with a deep understanding of how people interact with their environments.
              </p>
              <p className="text-gray-600 mt-4">
                Every project begins with a thorough exploration of our client's needs, the site context, and the potential for innovation. We believe that exceptional design emerges from this foundation of understanding.
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-left" delay={0.4} className="animate-on-scroll">
              <h2 className="text-3xl font-kessler mb-5">Our Vision</h2>
              <p className="text-gray-600">
                To redefine interior architecture by creating environments that seamlessly blend aesthetics, functionality, and human-centered design principles. We see each project as an opportunity to create spaces that not only accommodate their intended use but elevate the experience of those who inhabit them.
              </p>
              <p className="text-gray-600 mt-4">
                We strive to balance innovation with timelessness, creating spaces that feel contemporary yet enduring. Our vision extends beyond the immediate project to how our work contributes to a more thoughtful built environment.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>
      
      {/* 3D Interior Scene Visualization */}
      <section ref={addSectionRef} className="py-24 bg-gray-50">
        <ThreeJSInteriorScene 
          title="Spatial Design Excellence"
          description="We carefully craft each space with precision and creativity, merging functionality with aesthetics to create environments that respond to our clients' needs while pushing boundaries of what's possible in interior architecture."
        />
      </section>
      
      {/* About/Philosophy Section with Enhanced Parallax */}
      <ParallaxSection 
        imageUrl="https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?auto=format&fit=crop&w=2000&q=80"
        className="py-32 md:py-40 text-white relative"
        overlay={true}
        overlayOpacity={0.7}
      >
        <div className="container mx-auto px-4 md:px-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
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
            
            <div>
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
      
      {/* Process Section with 3D Accent */}
      <section ref={addSectionRef} className="py-28 md:py-40">
        <div className="container mx-auto px-4 md:px-10">
          <ScrollAnimation animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-kessler mb-5">Our Process</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our methodical approach ensures every project is executed with precision, creativity and attention to detail from concept to completion.
            </p>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
            {[
              {
                title: "Discovery",
                description: "We begin with a deep dive into your needs, aspirations, and the context of your space.",
                icon: <Plus className="w-8 h-8" />
              },
              {
                title: "Design Development",
                description: "Our team creates detailed concepts that transform ideas into visually compelling spaces.",
                icon: <Plus className="w-8 h-8" />
              },
              {
                title: "Implementation",
                description: "We oversee the entire execution process, ensuring every detail is realized as envisioned.",
                icon: <Plus className="w-8 h-8" />
              }
            ].map((item, index) => (
              <ScrollAnimation 
                key={item.title} 
                animation="fade-up" 
                delay={0.2 * index} 
                className="animate-on-scroll"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">
                      <span className="text-white">{item.icon}</span>
                    </div>
                    <span className="absolute -top-5 -right-5 text-6xl font-kessler text-black opacity-20">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl font-kessler mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
      
      {/* ThreeJS Accent with Particle Animation */}
      <section ref={addSectionRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 h-80 md:h-[500px] mb-10 md:mb-0">
              <ThreeJSAccent
                type="particles"
                className="w-full h-full"
              />
            </div>
            
            <ScrollAnimation animation="fade-left" className="w-full md:w-1/2 md:pl-16">
              <h2 className="text-4xl font-kessler mb-6">Design Philosophy</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our work is defined by a commitment to creating spaces that feel both contemporary and timeless. We believe that exceptional interior architecture should balance innovation with an understanding of classic design principles.
              </p>
              <p className="text-lg text-gray-600">
                Each project is approached as a unique opportunity to create something tailored to the specific context, client needs, and potential for creative expression.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>
      
      {/* Featured Projects with Modern Look */}
      <section ref={addSectionRef} className="py-28 md:py-40">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <ScrollAnimation animation="fade-right" className="animate-on-scroll">
              <h2 className="text-4xl md:text-5xl font-kessler mb-6 md:mb-0">
                {siteData.home.featured.title}
              </h2>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-left" className="animate-on-scroll">
              <Link 
                to="/our-work" 
                className="inline-flex items-center group"
              >
                <span className="hover-line text-lg">View all projects</span>
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollAnimation>
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
      <section ref={addSectionRef} className="py-20 md:py-28 bg-black text-white">
        <div className="container mx-auto px-4 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation animation="fade-up" className="animate-on-scroll">
              <h2 className="text-4xl md:text-5xl font-kessler mb-12">
                Recognition
              </h2>
            </ScrollAnimation>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {[
                { year: "2023", award: "Interior Design Excellence Award" },
                { year: "2022", award: "Best Commercial Space" },
                { year: "2021", award: "Innovation in Design" },
                { year: "2020", award: "Sustainable Architecture Award" },
              ].map((item, index) => (
                <ScrollAnimation 
                  key={item.award} 
                  animation="fade-up" 
                  delay={0.1 * index}
                  className="animate-on-scroll"
                >
                  <p className="text-lg font-kessler mb-1">{item.year}</p>
                  <p className="text-gray-400 text-sm">{item.award}</p>
                </ScrollAnimation>
              ))}
            </div>
            
            <ScrollAnimation animation="fade-up" delay={0.5} className="animate-on-scroll">
              <p className="text-gray-300 mb-8">
                Our work has been recognized by leading industry organizations and publications for its innovative approach to interior architecture and commitment to excellence.
              </p>
              <div className="flex justify-center space-x-8">
                <div className="h-8 w-20 bg-white/20"></div>
                <div className="h-8 w-20 bg-white/20"></div>
                <div className="h-8 w-20 bg-white/20"></div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
      
      {/* CTA Section with Parallax */}
      <ParallaxSection
        imageUrl="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2000&q=80"
        className="py-28 md:py-40 relative min-h-[60vh] flex items-center"
        overlay={true}
      >
        <div className="container mx-auto px-4 md:px-10 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-kessler mb-8 text-white">
              Ready to transform your space?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-xl">
              Let's collaborate on your next project and create an environment that inspires and elevates the human experience.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center bg-white text-black px-8 py-4 text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
            >
              <span>Start a project</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default Home;
