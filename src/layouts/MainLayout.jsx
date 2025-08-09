import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#191D29] to-[#191D29]">
      <Outlet />
    </div>
  );
};

export default MainLayout;
