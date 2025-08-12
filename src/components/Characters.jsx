import React, { useEffect, useState } from "react";
import axios from "axios";
import "../utils/style.css";
import ScrollButtons from "./ScrollButtons";
import { Link } from "react-router";

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((res) => setCharacters(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="md:px-8">
      <div className="p-6 md:px-8 py-6">
        <h2 className="text-xl text-white font-normal mb-6">Meet The Cast</h2>
        <ScrollButtons>
          {characters.map((char) => (
            <Link
            to={`/details/${char.id}`}
              key={char.id}
              className="rounded-lg w-[40%] md:w-64 clip-bottom-right p-[.6px]
              bg-gradient-to-b from-[#84F729] to-[#15BFFD] flex-shrink-0 flex
              flex-col items-center"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="bg-gray-800 clip-bottom-right w-full h-48 md:h-64 rounded-lg p-4 flex flex-col items-center">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-40 object-cover rounded-sm mb-2"
                />
                <h3 className="w-full mt-4 text-start font-medium text-white ">
                  {char.name}
                </h3>
              </div>
            </Link>
          ))}
        </ScrollButtons>
      </div>
    </div>
  );
};
export default Characters;
