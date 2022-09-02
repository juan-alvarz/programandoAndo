import React from "react";
import NavBar from "./NavBar";
import data from "../utils/data"
import Footer from "./Footer";
import SearchBar from "./SearchBar";

function Home() {
  return (
    <div>
      <NavBar />
      <div className="flex justify-center mt-2">
      <SearchBar/>
      </div>
      <h1>{data.map(e => e.name + ' ')}</h1>
      <h1>{data.map(e => e.description + ' ')}</h1>
      <Footer/>
    </div>
  );
}

export default Home;
