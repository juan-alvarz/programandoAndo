import React from "react";
import AgeCharts from "./AgeCharts";
import CountryCharts from "./CountryCharts";
import Sidebar from "./Sidebar";

function Administrator() {
  return (
    <div style={{ backgroundColor: "rgb(240, 240, 240)" }} className="text-2x1 font-semibold flex h-screen">
      <Sidebar />
      <div className="grid mx-auto max-w-screen-xl lg:py-16">
        <div style={{width: 700, backgroundColor: "#fff" }} className='h-fit px-10 py-10 rounded-lg'>
          <AgeCharts/>
        </div>
        <div style={{width: 700, backgroundColor: "#fff" }} className='h-fit px-10 py-10 rounded-lg'>
          <CountryCharts/>
        </div>
      </div>
    </div>
  );
}

export default Administrator;
