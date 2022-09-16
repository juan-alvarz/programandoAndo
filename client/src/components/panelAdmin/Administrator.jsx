import React from "react";
import Sidebar from "./Sidebar";

function Administrator() {
  return (
    <div className="text-2x1 font-semibold flex h-screen">
      <Sidebar />
      <div className="w-full h-full flex justify-center items-center">
        <p>Administrator</p>
      </div>
    </div>
  );
}

export default Administrator;
