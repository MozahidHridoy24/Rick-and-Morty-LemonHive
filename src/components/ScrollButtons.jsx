import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ScrollButtons = ({ children }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = () => {
    const element = scrollRef.current;
    if (!element) return;
    setCanScrollLeft(element.scrollLeft > 0);
    setCanScrollRight(
      element.scrollLeft + element.clientWidth < element.scrollWidth
    );
  };

  // Scroll distance
  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "next" ? 300 : -300,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateArrows();
  }, [children]);

  return (
    <div className="relative w-full">
      {canScrollLeft && (
        <button
          onClick={() => scrollBy("prev")}
          className="absolute left-2 top-1/2 -translate-x-8 -translate-y-1/2 bg-white p-2 rounded-full z-10 hover:bg-white/90"
        >
          <FaChevronLeft className="text-[#9DFE00]" />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={updateArrows}
        className="flex overflow-x-auto no-scrollbar gap-4 scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {children}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scrollBy("next")}
          className="absolute right-2 top-1/2 translate-x-8 -translate-y-1/2 bg-white p-2 rounded-full z-10 hover:bg-white/90"
        >
          <FaChevronRight className="text-[#9DFE00]" />
        </button>
      )}
    </div>
  );
};

export default ScrollButtons;
