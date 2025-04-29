import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook to track page views in a React Single Page Application
 * This ensures Google Analytics receives page view events when routes change
 */
const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Make sure gtag is defined (loaded from the script in index.html)
    if (typeof window.gtag !== "undefined") {
      // Send a pageview to Google Analytics
      window.gtag("config", "G-Q8CPR243NQ", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
};

// Add this to make TypeScript happy
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      params?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export default usePageTracking;
