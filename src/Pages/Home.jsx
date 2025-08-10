import React from "react";
import Hero from "../components/Hero";
import bgImage from "../assets/Backgraund.png";
import Characters from "../components/Characters";
import Episodes from "../components/Episodes";
import Locations from "../components/Locations";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Hero />
      <Characters />
      <Episodes />
      <Locations />
    </div>
  );
};

export default Home;
