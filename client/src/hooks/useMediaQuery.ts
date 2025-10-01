import { useEffect, useState } from "react";

// Breakpoints Tailwind par défaut
const BREAKPOINTS: Record<string, string> = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export function useMediaQuery(size: keyof typeof BREAKPOINTS, direction: "up" | "down" = "up") {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query =
      direction === "up"
        ? `(min-width: ${BREAKPOINTS[size]})`
        : `(max-width: ${BREAKPOINTS[size]})`;

    const media = window.matchMedia(query);

    const listener = () => setMatches(media.matches);
    setMatches(media.matches); // valeur initiale

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [size, direction]);

  return matches;
}
