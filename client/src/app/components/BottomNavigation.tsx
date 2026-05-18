import { Home, Map, PlusCircle, TrendingUp, User } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCreatePost: () => void;
}

export default function BottomNavigation({ activeTab, onTabChange, onCreatePost }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },

    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 lg:hidden z-50 bg-[#0B0B0B]/95 backdrop-blur-lg border-t border-[#2A2A2A]"
    >
      <div className="flex items-center justify-around h-16 px-4">
        {tabs.slice(0,1).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 flex-1"
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? 'text-[#FF5A1F]' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs ${
                  isActive ? 'text-[#FF5A1F] font-medium' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onCreatePost}
          className="relative -mt-8"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-[#FF5A1F] to-[#FF7A3F] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FF5A1F]/20">
            <PlusCircle className="w-7 h-7 text-white" />
          </div>
        </motion.button>

        {tabs.slice(1).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 flex-1"
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? 'text-[#FF5A1F]' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs ${
                  isActive ? 'text-[#FF5A1F] font-medium' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}
