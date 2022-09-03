import React from "react";
import NavBar from "./NavBar";
<<<<<<< HEAD
import data from "../utils/data"
import Footer from "./Footer";
import SearchBar from "./SearchBar";
=======
>>>>>>> 5789ac6 (redux and navbar)

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
