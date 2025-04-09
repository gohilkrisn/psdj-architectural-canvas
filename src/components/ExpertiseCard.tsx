
import React from "react";
import { Building, LayoutGrid, Armchair, Palette, Lamp, ClipboardList } from "lucide-react";

interface ExpertiseCardProps {
  title: string;
  description: string;
  icon: string;
  index?: number;
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({
  title,
  description,
  icon,
  index = 0
}) => {
  const getIcon = () => {
    switch (icon) {
      case "building": return <Building size={24} className="text-primary" />;
      case "layout": return <LayoutGrid size={24} className="text-primary" />;
      case "armchair": return <Armchair size={24} className="text-primary" />;
      case "palette": return <Palette size={24} className="text-primary" />;
      case "lamp": return <Lamp size={24} className="text-primary" />;
      case "clipboard-list": return <ClipboardList size={24} className="text-primary" />;
      default: return <Building size={24} className="text-primary" />;
    }
  };
  
  return (
    <div 
      className="p-8 bg-white/70 h-full hover:shadow-lg transition-all duration-500 border-b-2 border-primary/20 hover:border-primary"
    >
      <div className="mb-6 p-4 inline-block rounded-full bg-primary/10">
        {getIcon()}
      </div>
      
      <h3 className="text-xl font-serif mb-4 text-primary">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ExpertiseCard;
