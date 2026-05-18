import { MapPin, Navigation, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface NewsPin {
  id: string;
  lat: number;
  lng: number;
  headline: string;
  category: string;
  isBreaking?: boolean;
}

const newsPins: NewsPin[] = [
  { id: '1', lat: 37.7749, lng: -122.4194, headline: 'New Metro Station', category: 'Transport', isBreaking: true },
  { id: '2', lat: 37.7849, lng: -122.4094, headline: 'Farmers Market', category: 'Events' },
  { id: '3', lat: 37.7649, lng: -122.4294, headline: 'Road Closure', category: 'Traffic' },
  { id: '4', lat: 37.7549, lng: -122.4394, headline: 'New Coffee Shop', category: 'Business' }
];

export default function MapView() {
  return (
    <div className="relative w-full h-[600px] bg-[#161616] rounded-2xl overflow-hidden border border-[#2A2A2A]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F1F1F] to-[#0B0B0B]">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2A2A2A" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative h-full flex items-center justify-center">
          {newsPins.map((pin, index) => (
            <motion.div
              key={pin.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              style={{
                position: 'absolute',
                left: `${20 + index * 15}%`,
                top: `${30 + (index % 2) * 20}%`
              }}
              className="group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="relative"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#0B0B0B] shadow-lg ${
                  pin.isBreaking ? 'bg-red-500' : 'bg-[#FF5A1F]'
                }`}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                {pin.isBreaking && (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 w-10 h-10 rounded-full bg-red-500"
                  />
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 -translate-x-1/2 top-12 w-48 bg-[#161616] border border-[#2A2A2A] rounded-xl p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              >
                <p className="text-white text-sm font-semibold mb-1">{pin.headline}</p>
                <span className="px-2 py-0.5 bg-[#FF5A1F]/10 text-[#FF5A1F] text-xs rounded-md inline-block">
                  {pin.category}
                </span>
              </motion.div>
            </motion.div>
          ))}

          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <MapPin className="w-64 h-64 text-[#FF5A1F]" />
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[#161616]/90 backdrop-blur-lg border border-[#2A2A2A] text-white rounded-xl font-medium flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Layers
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-gradient-to-br from-[#FF5A1F] to-[#FF7A3F] text-white rounded-xl shadow-lg"
        >
          <Navigation className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="absolute bottom-4 left-4 bg-[#161616]/90 backdrop-blur-lg border border-[#2A2A2A] rounded-xl p-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#FF5A1F] rounded-full"></div>
            <span className="text-gray-300 text-sm">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-300 text-sm">Breaking</span>
          </div>
        </div>
      </div>
    </div>
  );
}
