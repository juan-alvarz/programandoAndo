import React from "react";
import Sidebar from "./Sidebar";

function Setting() {
  return (
    <div className="text-2x1 font-semibold flex h-screen">
      <Sidebar />
      <div className="w-full h-full flex justify-center items-center">
        <p>Setting</p>
      </div>
    </div>
  );
}

export default Setting;
