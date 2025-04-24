import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface VisibilityState {
  [key: string]: boolean;
}

const useScrollVisibility = (sectionIds: string[]) => {
  const location = useLocation();

  // Create initial state with all sections not visible
  const initialState: VisibilityState = sectionIds.reduce(
    (acc, id) => ({ ...acc, [id]: false }),
    {}
  );

  const [visible, setVisible] = useState<VisibilityState>(initialState);

  // Reset visibility when location.hash changes (not the entire location)
  useEffect(() => {
    // We don't reset the entire state here anymore

    const checkVisibility = () => {
      const updatedVisibility = { ...visible }; // Use current state, not initialState

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          updatedVisibility[id] =
            rect.top <=
              (window.innerHeight || document.documentElement.clientHeight) *
                0.8 && rect.bottom >= 0;
        }
      });

      setVisible(updatedVisibility);
    };

    // Handle scroll events
    const handleScroll = () => {
      window.requestAnimationFrame(checkVisibility);
    };

    window.addEventListener("scroll", handleScroll);

    // Check initial state
    setTimeout(checkVisibility, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, location.hash]); // Only depend on hash changes, not full location

  return visible;
};

export default useScrollVisibility;
