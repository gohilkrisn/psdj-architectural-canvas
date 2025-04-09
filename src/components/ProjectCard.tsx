
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  description?: string;
  index?: number;
  to?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  category,
  image,
  description,
  index = 0,
  to = "#"
}) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "group block relative overflow-hidden bg-secondary aspect-square",
        "opacity-0",
        "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
    >
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
      </div>
      
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="self-end text-xs text-white/90 tracking-wider">
          {category}
        </div>
        
        <div className="text-white">
          <h3 className="text-lg md:text-xl font-light">{title}</h3>
          {description && (
            <p className="text-sm text-white/80 mt-1">{description}</p>
          )}
          
          <div className="mt-4 flex items-center opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="text-sm mr-2">View Project</span>
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
