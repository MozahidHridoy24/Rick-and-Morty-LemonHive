import React from "react";
import Hero from "../components/Hero";
import bgImage from "../assets/Backgraund.png";
import Characters from "../components/Characters";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Hero />
      <Characters />
    </div>
  );
};

export default Home;
