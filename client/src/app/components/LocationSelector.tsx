import { MapPin, Navigation, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface LocationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const locations = [
  { name: 'San Francisco', state: 'CA', distance: 'Current' },
  { name: 'Oakland', state: 'CA', distance: '12 mi' },
  { name: 'Berkeley', state: 'CA', distance: '15 mi' },
  { name: 'San Jose', state: 'CA', distance: '48 mi' },
  { name: 'Palo Alto', state: 'CA', distance: '35 mi' }
];

export default function LocationSelector({ isOpen, onClose }: LocationSelectorProps) {
  const [selected, setSelected] = useState('San Francisco');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-20 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md z-50"
          >
            <div className="bg-[#161616] rounded-2xl border border-[#2A2A2A] shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-[#2A2A2A] flex items-center justify-between">
                <h2 className="text-white text-xl font-bold">Select Location</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-[#1F1F1F] rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              <div className="p-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-[#FF5A1F] to-[#FF7A3F] text-white rounded-xl font-semibold mb-4"
                >
                  <Navigation className="w-5 h-5" />
                  Use Current Location
                </motion.button>

                <div className="space-y-2">
                  {locations.map((location) => (
                    <motion.button
                      key={location.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelected(location.name)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                        selected === location.name
                          ? 'bg-[#FF5A1F]/10 border border-[#FF5A1F]/30'
                          : 'bg-[#1F1F1F] border border-transparent hover:bg-[#252525]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin
                          className={`w-5 h-5 ${
                            selected === location.name ? 'text-[#FF5A1F]' : 'text-gray-400'
                          }`}
                        />
                        <div className="text-left">
                          <p className="text-white font-semibold">{location.name}</p>
                          <p className="text-gray-400 text-sm">{location.state}</p>
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm">{location.distance}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
