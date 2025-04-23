import { useEffect, useState } from "react";

interface VisibilityState {
  [key: string]: boolean;
}

const useScrollVisibility = (sectionIds: string[]) => {
  const initialState: VisibilityState = sectionIds.reduce(
    (acc, id) => ({ ...acc, [id]: false }),
    {}
  );

  const [visible, setVisible] = useState<VisibilityState>(initialState);

  useEffect(() => {
    const handleScroll = () => {
      const updatedVisibility = { ...initialState };

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          updatedVisibility[id] =
            rect.top <=
              (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0;
        }
      });

      setVisible(updatedVisibility);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return visible;
};

export default useScrollVisibility;
