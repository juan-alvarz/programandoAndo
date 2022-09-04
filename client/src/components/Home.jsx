import React, { useEffect } from "react";
import NavBar from "./NavBar";
import data from "../utils/data";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import { getVideoById, clearFilter } from "../redux/actions";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const { video } = useSelector((state) => state.programandoando);
  const { idVideo } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(idVideo));
  }, [dispatch]);
  return (
    <div>
      <NavBar />

      <div className="flex justify-center mt-2">
        <SearchBar />
      </div>
      <h1>{data.map((e) => e.name + " ")}</h1>
      <h1>{data.map((e) => e.description + " ")}</h1>
      <NavLink to={`/video/${video._id}`}>HOLA MUNDO</NavLink>
      <Footer />
    </div>
  );
}

export default Home;
