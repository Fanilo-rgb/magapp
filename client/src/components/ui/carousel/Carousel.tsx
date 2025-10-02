import { useRef, useState, useEffect, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: ReactNode;          // les éléments à afficher (les cartes, etc.)
  className?: string;           // optionnel, pour styliser le container
  scrollStep?: number;          // optionnel, pour customiser la vitesse du scroll
}

const Carousel: React.FC<CarouselProps> = ({ children, className = "", scrollStep }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scroll = (dir: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;

    const amount = scrollStep ?? el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* bouton gauche */}
      {showLeft && (
        <div className="absolute left-0 bg-gradient-to-r from-white to-transparent h-full grid place-items-center px-2">
          <button
            onClick={() => scroll("left")}
            className="bg-white shadow p-1 rounded-full z-10"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
      )}

      {/* container scroll */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-hidden w-full h-full"
      >
        {children}
      </div>

      {/* bouton droit */}
      {showRight && (
        <div className="absolute right-0 top-0 bg-gradient-to-l from-white via-5% to-transparent h-full grid place-items-center px-2">
          <button
            onClick={() => scroll("right")}
            className="bg-white shadow p-1 rounded-full z-10"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
