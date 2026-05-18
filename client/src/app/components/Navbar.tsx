import { Bell, Search, MapPin, Menu } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onOpenLocation: () => void;
}

export default function Navbar({ onOpenNotifications, onOpenSearch, onOpenLocation }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0B]/95 backdrop-blur-lg border-b border-[#2A2A2A]"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden"
          >
          </motion.div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF5A1F] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <h1 className="text-xl font-bold text-white hidden sm:block">Locus</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onOpenLocation}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#161616] hover:bg-[#1F1F1F] rounded-xl transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#FF5A1F]" />
            <span className="text-sm text-gray-300">San Francisco</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onOpenSearch}
            className="p-2 hover:bg-[#161616] rounded-xl transition-colors"
          >
            <Search className="w-5 h-5 text-gray-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onOpenNotifications}
            className="relative p-2 hover:bg-[#161616] rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF5A1F] rounded-full"></span>
          </motion.button>

          <div className="w-8 h-8 bg-gradient-to-br from-[#FF5A1F] to-[#FF7A3F] rounded-full flex items-center justify-center cursor-pointer">
            <span className="text-white text-sm font-semibold">A</span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
