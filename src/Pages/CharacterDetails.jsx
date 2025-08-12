import React, { useEffect, useState } from "react";
import bgImage from "../assets/detailsBackgraund.png";
import { useParams } from "react-router";
import axios from "axios";
import logo from "../assets/Logo.png";
import heart from "../assets/Vector.png";
import species from "../assets/species.png";
import gender from "../assets/gender.png";
import origin from "../assets/origin.png";
import location from "../assets/location.png";
import episode from "../assets/episodes.png";
import { fetchData } from "../utils/function";
import "../utils/style.css";
const CharacterDetails = () => {
  const { id } = useParams();
  //   console.log(id);
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => {
        setCharacter(res.data);

        if (res.data.episode?.length) {
          fetchEpisodes(res.data.episode);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  //   console.log(character);
  //   console.log("Episode URLs:", character?.episode);

  const fetchEpisodes = async (episodeUrls) => {
    console.log("Starting to fetch episodes", episodeUrls);
    setLoadingEpisodes(true);
    try {
      const episodePromises = episodeUrls.map((url) => fetchData(url));
      const episodeData = await Promise.all(episodePromises);
      setEpisodes(episodeData);
    } catch (error) {
      console.error("Error fetching episodes:", error);
    } finally {
      setLoadingEpisodes(false);
    }
  };

  console.log(episodes);

  if (!character) {
    return <div className="text-white p-6">Loading...</div>;
  }

  return (
    <div
      className="h-full w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="w-11/12 mx-auto">
        <div className="  p-6 flex justify-center items-center mb-6">
          <img className=" w-3/12" src={logo} alt="" />
        </div>
        <div className="flex items-center justify-center p-6 gap-6 ">
          {/*left side image section */}
          <div className="border-r border-[#84F729] w-full h-full flex justify-center items-center">
            <div
              className="rounded-lg w-64 p-[.6px]
              bg-gradient-to-b from-[#84F729] to-[#15BFFD] "
            >
              <div className="bg-gray-800 rounded-lg p-6 ">
                <img
                  src={character.image}
                  alt={character.name}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
          {/* right side card section */}
          <div className="w-full h-full space-y-4 p-20 ">
            {/* top 3 card */}
            <div className="flex justify-between items-center gap-4 w-full">
              <div
                className="rounded-lg p-[.6px]
              bg-gradient-to-b from-[#84F729] to-[#15BFFD] "
              >
                <div className="bg-gray-800 rounded-lg p-6 text-white text-start">
                  <img src={heart} alt="heart" />
                  <p>Status</p>
                  <span>{character.status} </span>
                </div>
              </div>
              <div
                className="rounded-lg p-[.6px]
              bg-gradient-to-b from-[#84F729] to-[#15BFFD] "
              >
                <div className="bg-gray-800 rounded-lg p-6 text-white text-start">
                  <img src={species} alt="species" />
                  <p>Species</p>
                  <span>{character.species} </span>
                </div>
              </div>
              <div
                className="rounded-lg p-[.6px]
              bg-gradient-to-b from-[#84F729] to-[#15BFFD] "
              >
                <div className="bg-gray-800 rounded-lg p-6 text-white text-start">
                  <img src={gender} alt="gender" />
                  <p>Gender</p>
                  <span>{character.gender} </span>
                </div>
              </div>
            </div>
            {/* origin card */}
            <div>
              <div
                className="rounded-lg p-[.6px]
              bg-gradient-to-b from-[#84F729] to-[#15BFFD] "
              >
                <div className="bg-gray-800 rounded-lg p-6 text-white text-start">
                  <img src={origin} alt="origin" />
                  <p>Origin</p>
                  <span>{character.origin?.name} </span>
                </div>
              </div>
            </div>
            {/* location card */}
            <div className="p-2 border border-red-400">
              <div
                className="rounded-lg p-[.6px]
              bg-gradient-to-b from-[#84F729] to-[#15BFFD] "
              >
                <div className="bg-gray-800 rounded-lg p-6 text-white text-start">
                  <img src={location} alt="location" />
                  <p>Last Known Location</p>
                  <span>{character.location?.name} </span>
                </div>
              </div>
            </div>
            {/* Episodes */}
            <div className="p-2">
              <div className="rounded-lg p-[.6px] bg-gradient-to-b from-[#84F729] to-[#15BFFD]">
                <div className="bg-gray-800 rounded-lg p-6 text-white text-start">
                  <img src={episode} alt="episode" />
                  <p className=" pb-4 text-sm font-light">Episode(S)</p>
                  <div className="overflow-y-auto custom-scrollbar h-52">
                    {loadingEpisodes ? (
                      <p>Loading episodes...</p>
                    ) : (
                      <ul className="list-disc pl-8">
                        {episodes.map((episode, index) => (
                          <li className="font-semibold" key={index}>
                            {episode.name}{" "}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
