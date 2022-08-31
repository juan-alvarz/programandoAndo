import React from "react";
import NavBar from "./NavBar";
import data from "../utils/data"

function Home() {
  return (
    <div>
      <h1>{data.map(e => e.name)}</h1>
      <h1>{data.map(e => e.description)}</h1>
    </div>
  );
}

export default Home;
