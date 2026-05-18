import { X, MapPin, Image, Video, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [isBreaking, setIsBreaking] = useState(false);

  const categories = ['General', 'Traffic', 'Events', 'Crime', 'Business', 'Community', 'Politics'];

  const handleSubmit = () => {
    console.log({ headline, description, category, isBreaking });
    onClose();
  };

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
            className="fixed inset-x-4 top-20 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50"
          >
            <div className="bg-[#161616] rounded-2xl border border-[#2A2A2A] shadow-2xl max-h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="sticky top-0 bg-[#161616] border-b border-[#2A2A2A] p-4 flex items-center justify-between">
                <h2 className="text-white text-xl font-bold">Create Local News Post</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-[#1F1F1F] rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-[#1F1F1F] rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FF5A1F] to-[#FF7A3F] rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">A</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Anonymous User</p>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="What's happening in your area?"
                    className="w-full bg-[#1F1F1F] text-white placeholder-gray-500 px-4 py-3 rounded-xl border border-[#2A2A2A] focus:border-[#FF5A1F] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Share details about what's happening..."
                    rows={4}
                    className="w-full bg-[#1F1F1F] text-white placeholder-gray-500 px-4 py-3 rounded-xl border border-[#2A2A2A] focus:border-[#FF5A1F] focus:outline-none resize-none transition-colors"
                  />
                </div>

                {/* <div>
                  <label className="text-gray-400 text-sm mb-2 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <motion.button
                        key={cat}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          category === cat
                            ? 'bg-[#FF5A1F] text-white'
                            : 'bg-[#1F1F1F] text-gray-400 hover:bg-[#252525]'
                        }`}
                      >
                        {cat}
                      </motion.button>
                    ))}
                  </div>
                </div> */}

                {/* <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsBreaking(!isBreaking)}
                  className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                    isBreaking
                      ? 'bg-red-500/10 border-red-500/30 text-red-500'
                      : 'bg-[#1F1F1F] border-[#2A2A2A] text-gray-400'
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                </motion.button> */}

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-[#1F1F1F] hover:bg-[#252525] rounded-xl text-gray-400 transition-colors"
                  >
                    <Image className="w-4 h-4" />
                    <span className="text-sm font-medium">Photo</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-[#1F1F1F] hover:bg-[#252525] rounded-xl text-gray-400 transition-colors"
                  >
                    <Video className="w-4 h-4" />
                    <span className="text-sm font-medium">Video</span>
                  </motion.button>
                </div>
              </div>

              <div className="sticky bottom-0 bg-[#161616] border-t border-[#2A2A2A] p-4 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-[#1F1F1F] hover:bg-[#252525] text-gray-400 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={!headline.trim()}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#FF5A1F] to-[#FF7A3F] text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  Post News
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
