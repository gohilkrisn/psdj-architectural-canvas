
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
      case "building": return <Building size={24} />;
      case "layout": return <LayoutGrid size={24} />;
      case "armchair": return <Armchair size={24} />;
      case "palette": return <Palette size={24} />;
      case "lamp": return <Lamp size={24} />;
      case "clipboard-list": return <ClipboardList size={24} />;
      default: return <Building size={24} />;
    }
  };
  
  return (
    <div 
      className="opacity-0 animate-fade-in p-6 border border-gray-200 hover:border-black transition-colors"
      style={{ animationDelay: `${index * 0.1 + 0.2}s`, animationFillMode: "forwards" }}
    >
      <div className="mb-4">
        {getIcon()}
      </div>
      
      <h3 className="text-lg font-medium mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default ExpertiseCard;
