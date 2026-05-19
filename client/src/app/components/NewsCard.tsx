import { ArrowUp, ArrowDown, MessageCircle, Share2, MapPin, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface NewsCardProps {
  id: string;
  username: string;
  avatar: string;
  locality: string;
  timestamp: string;
  headline: string;
  description: string;
  image?: string;
  category: string;
  isBreaking?: boolean;
  initialLikes?: number;
  initialComments?: number;
  distance?: string;
}

export default function NewsCard({
  username,
  avatar,
  locality,
  timestamp,
  headline,
  description,
  image,
  category,
  isBreaking = false,
  initialLikes = 0,
  initialComments = 0,
  distance = '0.5 km away'
}: NewsCardProps) {
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);
  const [votes, setVotes] = useState(initialLikes);
  const [comments] = useState(initialComments);

  const handleUpvote = () => {
    if (voteState === 'up') {
      setVotes(votes - 1);
      setVoteState(null);
    } else if (voteState === 'down') {
      setVotes(votes + 2);
      setVoteState('up');
    } else {
      setVotes(votes + 1);
      setVoteState('up');
    }
  };

  const handleDownvote = () => {
    if (voteState === 'down') {
      setVotes(votes + 1);
      setVoteState(null);
    } else if (voteState === 'up') {
      setVotes(votes - 2);
      setVoteState('down');
    } else {
      setVotes(votes - 1);
      setVoteState('down');
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-[#161616] rounded-2xl overflow-hidden border border-[#2A2A2A] mt-12 mb-0 hover:border-[#3A3A3A] transition-all shadow-lg hover:shadow-xl"
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF5A1F] to-[#FF7A3F] flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img src={avatar} alt={username} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-semibold text-sm">{username[0]}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold text-sm">{username}</h3>
                <span className="px-2 py-0.5 bg-[#FF5A1F]/10 text-[#FF5A1F] text-xs rounded-md border border-[#FF5A1F]/20">
                  {category}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <MapPin className="w-3 h-3" />
                  <span>{locality}</span>
                </div>
                <span className="text-gray-600">•</span>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{timestamp}</span>
                </div>
              </div>
            </div>
          </div>
          {isBreaking && (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex items-center gap-1 px-2 py-1 bg-red-500/10 border border-red-500/30 rounded-lg"
            >
              <AlertCircle className="w-3 h-3 text-red-500" />
              <span className="text-red-500 text-xs font-semibold">BREAKING</span>
            </motion.div>
          )}
        </div>

        <h2 className="text-white text-lg font-bold mb-2 leading-snug">{headline}</h2>
        

        {image && (
          <div className="mb-3 rounded-xl overflow-hidden">
            <img
              src={image}
              alt={headline}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A]">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 bg-[#1F1F1F] rounded-xl p-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleUpvote}
                className={`p-1.5 rounded-lg transition-all ${
                  voteState === 'up'
                    ? 'bg-[#FF5A1F]/20 text-[#FF5A1F]'
                    : 'hover:bg-[#252525] text-gray-400'
                }`}
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>

              <span className={`text-sm font-bold min-w-[2rem] text-center ${
                voteState === 'up' ? 'text-[#FF5A1F]' : voteState === 'down' ? 'text-blue-500' : 'text-gray-300'
              }`}>
                {votes}
              </span>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDownvote}
                className={`p-1.5 rounded-lg transition-all ${
                  voteState === 'down'
                    ? 'bg-blue-500/20 text-blue-500'
                    : 'hover:bg-[#252525] text-gray-400'
                }`}
              >
                <ArrowDown className="w-4 h-4" />
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[#1F1F1F] text-gray-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{comments}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[#1F1F1F] text-gray-400 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="text-xs text-gray-500">{distance}</div>
        </div>
      </div>
    </motion.article>
  );
}
