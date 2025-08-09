import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../utils/style.css";

const Episodes = () => {
  const [episodes, setepisodes] = useState([]);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/episode")
      .then((res) => setepisodes(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  console.log("episodes", episodes);

  // Check scroll position to enable/disable arrows
  const checkForScrollPosition = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    checkForScrollPosition();
  }, [episodes]);

  // Scroll left/right by one card width (including gap)
  const scrollBy = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild
      ? el.firstChild.offsetWidth + 16 /* gap */
      : 300;
    const scrollAmount = direction === "next" ? cardWidth : -cardWidth;

    el.scrollBy({ left: scrollAmount, behavior: "smooth" });

    // Wait for scroll to finish then update button visibility
    setTimeout(checkForScrollPosition, 300);
  };

  return (
    <div className="px-8">
      <div className="px-8 py-12 relative">
        <h2 className="text-2xl text-white font-medium mb-6"></h2>

        {/* Prev button */}
        {canScrollLeft && (
          <button
            onClick={() => scrollBy("prev")}
            className="absolute left-2 top-1/2 -translate-y-1 bg-white bg-opacity-70 p-2 rounded-full z-10 hover:bg-opacity-90"
            aria-label="Previous"
          >
            <FaChevronLeft className="text-[#9DFE00]" />
          </button>
        )}

        {/* Cards container */}
        <div
          ref={scrollRef}
          onScroll={checkForScrollPosition}
          className="flex overflow-x-auto no-scrollbar gap-4 scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="rounded-lg clip-bottom-right p-[1px] bg-gradient-to-b from-[#84F729] to-[#15BFFD] flex-shrink-0 flex flex-col items-center"
              style={{ scrollSnapAlign: "start", width: "16rem" }}
            >
              <div className="bg-gray-800 text-white w-full h-24 rounded-lg p-4 flex flex-col items-center">
                <p className="w-full text-start">{episode.episode}</p>
                <h3 className="w-full text-start font-medium text-white ">
                  {episode.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Next button */}
        {canScrollRight && (
          <button
            onClick={() => scrollBy("next")}
            className="absolute right-2 top-1/2 -translate-y-1 bg-white bg-opacity-70 p-2 rounded-full z-10 hover:bg-opacity-90"
            aria-label="Next"
          >
            <FaChevronRight className="text-[#9DFE00]" />
          </button>
        )}
      </div>
    </div>
  );
};
export default Episodes;
