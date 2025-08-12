import React, { useEffect, useState } from "react";
import axios from "axios";
import ScrollButtons from "./ScrollButtons";

const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/location")
      .then((res) => setLocations(res.data.results))
      .catch((err) => console.error(err));
  }, []);
  // console.log(locations);

  return (
    <div className="md:p-8">
      <div className="p-6 md:px-8 py-6">
        <h2 className="text-xl text-white font-normal mb-6">Locations</h2>
        <ScrollButtons>
          {locations.map((location) => (
            <div
              key={location.id}
              className="rounded-lg w-[40%] md:w-64 md:h-24 clip-bottom-right p-[.6px] bg-gradient-to-b from-[#84F729] to-[#15BFFD] flex-shrink-0 flex flex-col items-center"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="bg-gray-800 clip-bottom-right text-white w-full h-24 rounded-lg p-4 flex flex-col items-center">
                <p className="w-full text-start"> #{location.id}</p>
                <h3 className="w-full text-start font-medium text-white">
                  {location.name}
                </h3>
              </div>
            </div>
          ))}
        </ScrollButtons>
      </div>
    </div>
  );
};

export default Locations;
