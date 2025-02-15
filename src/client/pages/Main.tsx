import React from "react";
import { useAppContext } from "../Context";
import { Outlet } from "react-router-dom";

const Main = () => {

  return (
    <div className="flex bg-white-100 font-sans items-center flex-col justify-between min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;