
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  description?: string;
  to: string;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  category,
  image,
  description,
  to,
  index = 0
}) => {
  return (
    <Link 
      to={to} 
      className="project-card-hover block group opacity-0 animate-fade-in"
      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
    >
      <div className="relative overflow-hidden aspect-[4/5] mb-4">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20"></div>
        <div className="absolute top-4 right-4 bg-black text-white w-8 h-8 flex items-center justify-center opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight size={16} />
        </div>
      </div>
      
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg md:text-xl font-kessler">
          {title}
        </h3>
        <span className="text-xs text-gray-500 uppercase tracking-wider">
          {category}
        </span>
      </div>
      
      {description && (
        <p className="text-gray-600 mt-2 text-sm">
          {description}
        </p>
      )}
    </Link>
  );
};

export default ProjectCard;
