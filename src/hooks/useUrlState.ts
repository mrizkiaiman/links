import { useState, useEffect, useCallback } from "react";
import type { TabType } from "@/types";

export function useUrlState(): {
  activeTab: TabType;
  handleTabChange: (tab: TabType) => void;
  isDirect: boolean;
} {
  const getStatesFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      tab: (params.get("tab") === "shop" ? "shop" : "links") as TabType,
      direct: params.get("direct") === "true",
    };
  };

  const [activeTab, setActiveTab] = useState<TabType>(getStatesFromUrl().tab);
  const [isDirect] = useState<boolean>(getStatesFromUrl().direct);

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    if (tab === "links") {
      url.searchParams.delete("tab");
    } else {
      url.searchParams.set("tab", tab);
    }
    window.history.pushState({}, "", url.toString());
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const newState = getStatesFromUrl();
      setActiveTab(newState.tab);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return { activeTab, handleTabChange, isDirect };
}
