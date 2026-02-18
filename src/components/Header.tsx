import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { profile } from "@/config/data";
import type { TabType } from "@/types";

interface HeaderProps {
  theme: "light" | "dark";
  isDirect: boolean;
  activeTab: TabType;
  handleTabChange: (tab: TabType) => void;
  toggleTheme: () => void;
}

export function Header({
  theme,
  isDirect,
  activeTab,
  handleTabChange,
  toggleTheme,
}: HeaderProps) {
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const headerY = useTransform(scrollY, [0, 80], [-10, 0]);

  const isDarkMode = theme === "dark";

  return (
    <motion.header
      style={{
        opacity: isDirect ? 1 : headerOpacity,
        y: isDirect ? 0 : headerY,
      }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl transition-all duration-300 ${
        isDarkMode ? "bg-[#0a0a0a]/60" : "bg-white/60"
      }`}
    >
      <div className="max-w-2xl mx-auto px-6 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-40 blur-sm"></div>
            <img
              src={profile.avatar}
              alt={profile.name}
              className="relative w-8 h-8 rounded-full border border-white/20 object-cover"
            />
          </div>
          {!isDirect && (
            <span
              className={`font-black text-sm tracking-tight hidden sm:block ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              {profile.name}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Segmented Control - Modern Caps Style */}
          <div
            className={`flex p-1 rounded-full ${isDarkMode ? "bg-white/5 border border-white/10" : "bg-gray-100 border border-gray-200"}`}
          >
            <button
              onClick={() => handleTabChange("links")}
              className={`px-4 py-1 rounded-full text-[10px] font-black tracking-[0.1em] uppercase transition-all duration-300 ${
                activeTab === "links"
                  ? isDarkMode
                    ? "bg-white text-black shadow-lg"
                    : "bg-white text-gray-900 shadow-md"
                  : isDarkMode
                    ? "text-gray-500 hover:text-white"
                    : "text-gray-400 hover:text-gray-900"
              }`}
            >
              Links
            </button>
            <button
              onClick={() => handleTabChange("shop")}
              className={`px-4 py-1 rounded-full text-[10px] font-black tracking-[0.1em] uppercase transition-all duration-300 ${
                activeTab === "shop"
                  ? isDarkMode
                    ? "bg-white text-black shadow-lg"
                    : "bg-white text-gray-900 shadow-md"
                  : isDarkMode
                    ? "text-gray-500 hover:text-white"
                    : "text-gray-400 hover:text-gray-900"
              }`}
            >
              Shop
            </button>
          </div>

          {/* Header Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all active:scale-95 ${
              isDarkMode
                ? "bg-white/10 text-yellow-500"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDarkMode ? "dark" : "light"}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.1 }}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
