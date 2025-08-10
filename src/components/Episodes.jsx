import React, { useEffect, useState } from "react";
import axios from "axios";
import ScrollButtons from "./ScrollButtons";

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/episode")
      .then((res) => setEpisodes(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="md:p-8">
      <div className="p-6 md:px-8 py-6">
        <h2 className="text-xl text-white font-normal mb-6">Episodes</h2>
        <ScrollButtons>
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="rounded-lg w-40 md:w-64 h-24 md:h-30 clip-bottom-right p-[.6px] bg-gradient-to-b from-[#84F729] to-[#15BFFD] flex-shrink-0 flex flex-col items-center"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="bg-gray-800 clip-bottom-right text-white w-full h-full rounded-lg p-2 md:p-4 flex flex-col items-center">
                <p className="w-full text-start">{episode.episode}</p>
                <h3 className="w-full text-start font-medium text-white">
                  {episode.name}
                </h3>
              </div>
            </div>
          ))}
        </ScrollButtons>
      </div>
    </div>
  );
};

export default Episodes;
