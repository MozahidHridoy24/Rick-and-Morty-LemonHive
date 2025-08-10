import React from "react";
import banner from "../assets/Heading Container.png";
import logo from "../assets/Logo.png";

const Hero = () => {
  return (
    <div>
      <div className="  p-10 flex justify-center items-center">
        <img className=" w-3/12" src={logo} alt="" />
      </div>
      <div className="flex justify-center items-center">
        <img className=" w-full md:w-8/12" src={banner} alt="" />
      </div>
    </div>
  );
};

export default Hero;
