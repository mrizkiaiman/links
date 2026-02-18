import { useTheme } from "@/hooks/useTheme";
import { useUrlState } from "@/hooks/useUrlState";
import { Header } from "@/components/Header";
import { ProfileSection } from "@/components/ProfileSection";
import { TabNav } from "@/components/TabNav";
import { LinksSection } from "@/components/LinksSection";
import { ShopSection } from "@/components/ShopSection";
import "./App.css";

function App() {
  const { activeTab, handleTabChange, isDirect } = useUrlState();
  const { theme, toggleTheme } = useTheme();

  const isDarkMode = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <Header
        theme={theme}
        isDirect={isDirect}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        toggleTheme={toggleTheme}
      />

      {/* Main Content */}
      <main
        className={`max-w-2xl mx-auto px-6 sm:px-8 pb-32 relative transition-all duration-500 ${isDirect ? "pt-24" : "pt-8"}`}
      >
        {!isDirect && <ProfileSection theme={theme} />}
        {!isDirect && (
          <TabNav
            theme={theme}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
          />
        )}

        <div className="relative">
          {activeTab === "links" ? (
            <LinksSection theme={theme} />
          ) : (
            <ShopSection theme={theme} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
