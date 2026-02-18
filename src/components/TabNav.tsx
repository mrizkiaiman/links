import { Link2, ShoppingBag } from "lucide-react";
import type { TabType } from "@/types";

interface TabNavProps {
  theme: "light" | "dark";
  activeTab: TabType;
  handleTabChange: (tab: TabType) => void;
}

export function TabNav({ theme, activeTab, handleTabChange }: TabNavProps) {
  const isDarkMode = theme === "dark";

  return (
    <div className="flex justify-center mb-12">
      <div
        className={`flex p-1.5 rounded-[1.5rem] ${isDarkMode ? "bg-white/5 border border-white/5" : "bg-gray-100/50 border border-gray-100 shadow-inner"}`}
      >
        <button
          onClick={() => handleTabChange("links")}
          className={`flex items-center gap-2 px-7 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all ${activeTab === "links" ? (isDarkMode ? "bg-white text-black shadow-xl scale-[1.02]" : "bg-white text-gray-900 shadow-md scale-[1.02]") : isDarkMode ? "text-gray-500 hover:text-white" : "text-gray-400 hover:text-gray-900"}`}
        >
          <Link2 className="w-4 h-4" /> Links
        </button>
        <button
          onClick={() => handleTabChange("shop")}
          className={`flex items-center gap-2 px-7 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all ${activeTab === "shop" ? (isDarkMode ? "bg-white text-black shadow-xl scale-[1.02]" : "bg-white text-gray-900 shadow-md scale-[1.02]") : isDarkMode ? "text-gray-500 hover:text-white" : "text-gray-400 hover:text-gray-900"}`}
        >
          <ShoppingBag className="w-4 h-4" /> Shop
        </button>
      </div>
    </div>
  );
}
