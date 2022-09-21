import React from "react";
import AgeCharts from "./AgeCharts";
import CountryCharts from "./CountryCharts";
import Sidebar from "./Sidebar";
import Error404 from "../Error404";

function Administrator() {
  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);

  let role = userObj && userObj.user.role;

  return role === "admin" ? (
    <div
      style={{ backgroundColor: "rgb(240, 240, 240)" }}
      className="text-2x1 font-semibold flex h-screen"
    >
      <Sidebar />
      <div className="grid mx-auto max-w-screen-xl py-16">
        <div
          style={{ width: 650, backgroundColor: "#fff" }}
          className="h-fit px-7 py-7 rounded-lg"
        >
          <AgeCharts />
        </div>
        <div
          style={{ width: 650, backgroundColor: "#fff" }}
          className="h-fit px-7 py-7 rounded-lg"
        >
          <CountryCharts />
        </div>
      </div>
    </div>
  ) : (
    <Error404 />
  );
}

export default Administrator;
