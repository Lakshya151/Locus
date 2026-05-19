import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import CategoryTabs from "./components/CategoryTabs";
import NewsCard from "./components/NewsCard";
import TrendingSidebar from "./components/TrendingSidebar";
import BottomNavigation from "./components/BottomNavigation";
import CreatePostModal from "./components/CreatePostModal";
import LocationSelector from "./components/LocationSelector";
import MapView from "./components/MapView";
import {
  get_posts_5km,
  get_posts_10km,
  get_posts_25km,
  get_posts_by_city,
  get_posts_by_country,
  get_all_posts,
} from "../lib/supabase";



export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [activeCategory, setActiveCategory] = useState("5km");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [news, setNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userCity, setUserCity] = useState("");
  const [userCountry, setUserCountry] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreNews();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [news]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
              );

              const locationData = await response.json();

              const city =
                locationData.address.city ||
                locationData.address.town ||
                locationData.address.village ||
                "";

              const country = locationData.address.country || "";

              setUserCity(city);
              setUserCountry(country);

              console.log("Detected city:", city);
              console.log("Detected country:", country);
            } catch (err) {
              console.error("Location fetch failed", err);
            }

            let data = [];

            switch (activeCategory) {
              case "5km":
                data = await get_posts_5km(lat, lng);
                break;

              case "10km":
                data = await get_posts_10km(lat, lng);
                break;

              case "25km":
                data = await get_posts_25km(lat, lng);
                break;

              case "city":
                if (userCity) {
                  data = await get_posts_by_city(userCity);
                }
                break;

              case "country":
                if (userCountry) {
                  data = await get_posts_by_country(userCountry);
                }
                break;

              case "world":
                if (userCountry) {
                  data = await get_all_posts();
                }
                break;

              default:
                data = await get_posts_5km(lat, lng);
            }

            if (!data) {
              setNews([]);
              setIsLoading(false);
              return;
            }

            const formatted = data
              .map((item: any, index: number) => ({
                id: item.id || index,
                username: item.username || "Anonymous",
                avatar: item.avatar || "",
                locality: item.city || item.locality || "Unknown",
                timestamp: item.created_at
                  ? new Date(item.created_at).toLocaleString()
                  : "Recently",
                headline: item.headline || item.title || "Untitled",
                description: item.description || "",
                image:
                  item.image ||
                  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
                category: item.category || "General",
                isBreaking: item.is_breaking || false,
                initialLikes: item.upvote || 0,
                initialComments: item.comments || 0,
                upvote: item.upvote || 0,
                downvote: item.downvote || 0,
                distance: item.distance
                  ? `${Number(item.distance).toFixed(1)} km away`
                  : "",
              }))
              .sort((a, b) => b.upvote - b.downvote - (a.upvote - a.downvote));

            setNews(formatted);
            setIsLoading(false);
          },
          (error) => {
            console.error(error);
            setIsLoading(false);
          },
        );
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [activeCategory]);

  const loadMoreNews = () => {};

  const filteredNews = news;

  return (
    <div className="min-h-screen bg-[#0B0B0B] dark p-1">
      <Navbar
        onOpenNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
        onOpenSearch={() => setIsSearchOpen(!isSearchOpen)}
        onOpenLocation={() => setIsLocationModalOpen(true)}
      />

      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-24 lg:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "map" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <MapView />
              </motion.div>
            ) : (
              <>
                {filteredNews.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NewsCard {...item} />
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex justify-center py-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="w-8 h-8 border-2 border-[#FF5A1F] border-t-transparent rounded-full"
                    />
                  </div>
                )}

                {filteredNews.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      No news in this category yet.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="hidden lg:block">
            <TrendingSidebar />
          </div>
        </div>
      </div>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCreatePost={() => setIsCreateModalOpen(true)}
      />

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <LocationSelector
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      {isNotificationsOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-0 top-16 bottom-0 w-full md:w-96 bg-[#161616] border-l border-[#2A2A2A] z-40 overflow-y-auto"
        >
          <div className="p-4">
            <h2 className="text-white text-xl font-bold mb-4">Notifications</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="p-3 bg-[#1F1F1F] rounded-xl border border-[#2A2A2A]"
                >
                  <p className="text-white text-sm font-semibold mb-1">
                    New post in your area
                  </p>
                  <p className="text-gray-400 text-xs">
                    Someone posted about traffic near Mission District
                  </p>
                  <p className="text-gray-500 text-xs mt-2">{i} hour ago</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-16 left-0 right-0 z-40 bg-[#161616] border-b border-[#2A2A2A] p-4"
        >
          <div className="max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search local news..."
              autoFocus
              className="w-full bg-[#1F1F1F] text-white placeholder-gray-500 px-4 py-3 rounded-xl border border-[#2A2A2A] focus:border-[#FF5A1F] focus:outline-none"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
