import { motion } from 'motion/react';
import { MapPin, Globe2, Building2, Flag } from 'lucide-react';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: '5km', label: 'Nearby 5km', icon: MapPin, gradient: true },
  { id: '10km', label: '10km', icon: MapPin },
  { id: '25km', label: '25km', icon: MapPin },
  { id: 'city', label: 'City', icon: Building2 },
  { id: 'country', label: 'Country', icon: Flag },
  { id: 'world', label: 'World', icon: Globe2 }
];

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="sticky top-16 z-40 bg-[#0B0B0B]/95 backdrop-blur-lg border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF5A1F] to-[#FF7A3F] text-white shadow-lg shadow-[#FF5A1F]/20'
                    : 'bg-[#161616] text-gray-400 hover:bg-[#1F1F1F] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{category.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
