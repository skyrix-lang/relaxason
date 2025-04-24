import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    // Function to handle scrolling to section based on hash
    const scrollToSection = () => {
      // If hash exists, scroll to the specific section
      if (location.hash) {
        const sectionId = location.hash.substring(1);
        const element = document.getElementById(sectionId);

        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      } else {
        // If no hash, scroll to top of the page
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    // Execute scroll on location change
    scrollToSection();
  }, [location]); // Depend on location changes
};

export default useScrollToHash;
