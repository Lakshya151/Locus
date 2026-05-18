import { TrendingUp, MapPin, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface TrendingTopic {
  id: string;
  title: string;
  locality: string;
  posts: number;
  category: string;
}

const trendingTopics: TrendingTopic[] = [
  {
    id: '1',
    title: 'New Metro Station Opening',
    locality: 'Downtown SF',
    posts: 234,
    category: 'Transport'
  },
  {
    id: '2',
    title: 'Local Farmers Market Today',
    locality: 'Mission District',
    posts: 189,
    category: 'Events'
  },
  {
    id: '3',
    title: 'Road Closure on Market St',
    locality: 'Financial District',
    posts: 156,
    category: 'Traffic'
  },
  {
    id: '4',
    title: 'New Coffee Shop Opens',
    locality: 'Hayes Valley',
    posts: 142,
    category: 'Business'
  },
  {
    id: '5',
    title: 'Community Clean-up Drive',
    locality: 'Golden Gate Park',
    posts: 98,
    category: 'Community'
  }
];

const activeCommunities = [
  { name: 'Mission District', members: '12.5K', active: true },
  { name: 'Financial District', members: '10.2K', active: true },
  { name: 'Hayes Valley', members: '8.7K', active: false },
  { name: 'Castro', members: '7.3K', active: true }
];

export default function TrendingSidebar() {
  return (
    <div className="hidden lg:block sticky top-20 space-y-4">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-[#161616] rounded-2xl p-4 border border-[#2A2A2A]"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#FF5A1F]" />
          <h2 className="text-white font-bold">Trending Nearby</h2>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-3 rounded-xl hover:bg-[#1F1F1F] transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-1">
                <span className="text-gray-500 text-xs font-medium">#{index + 1}</span>
                <span className="px-2 py-0.5 bg-[#FF5A1F]/10 text-[#FF5A1F] text-xs rounded-md">
                  {topic.category}
                </span>
              </div>
              <h3 className="text-white text-sm font-semibold mb-1">{topic.title}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <MapPin className="w-3 h-3" />
                  <span>{topic.locality}</span>
                </div>
                <span className="text-gray-500 text-xs">{topic.posts} posts</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#161616] rounded-2xl p-4 border border-[#2A2A2A]"
      >
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-[#FF5A1F]" />
          <h2 className="text-white font-bold">Active Communities</h2>
        </div>
        <div className="space-y-2">
          {activeCommunities.map((community, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-[#1F1F1F] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#FF5A1F] to-[#FF7A3F] rounded-lg"></div>
                <div>
                  <p className="text-white text-sm font-medium">{community.name}</p>
                  <p className="text-gray-500 text-xs">{community.members} members</p>
                </div>
              </div>
              {community.active && (
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
