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
    <div className="p-8">
      <div className="px-8 py-12">
        <h2 className="text-2xl text-white font-medium mb-6">Episodes</h2>
        <ScrollButtons>
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="rounded-lg clip-bottom-right p-[1px] bg-gradient-to-b from-[#84F729] to-[#15BFFD] flex-shrink-0 flex flex-col items-center"
              style={{ scrollSnapAlign: "start", width: "16rem" }}
            >
              <div className="bg-gray-800 clip-bottom-right text-white w-full h-24 rounded-lg p-4 flex flex-col items-center">
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
