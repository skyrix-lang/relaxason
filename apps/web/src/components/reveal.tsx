import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type RefObject,
} from "react";
import { cn } from "@relaxason/ui";

/**
 * Whether the element is on screen: its top has passed 80% of the viewport's
 * height and its bottom hasn't left the top.
 */
export function useInView<T extends Element>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

/** A block that fades in when it scrolls into view (`.reveal` in styles.css). */
export function Reveal({ className, ...props }: ComponentProps<"div">) {
  const [ref, visible] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-visible={visible}
      className={cn("reveal", className)}
      {...props}
    />
  );
}
