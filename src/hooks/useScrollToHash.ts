import { useEffect } from "react";

const useScrollToHash = () => {
  useEffect(() => {
    // Function to handle scrolling to section based on hash
    const scrollToSection = () => {
      if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        const element = document.getElementById(sectionId);

        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    // Scroll on initial load
    scrollToSection();

    // Add event listener for hash changes
    window.addEventListener("hashchange", scrollToSection);

    // Cleanup
    return () => {
      window.removeEventListener("hashchange", scrollToSection);
    };
  }, []);
};

export default useScrollToHash;
