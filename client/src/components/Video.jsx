import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById, clearFilter } from "../redux/actions";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

function Video() {
  const dispatch = useDispatch();
  const { idVideo } = useParams();

  console.log(idVideo);

  useEffect(() => {
    dispatch(getVideoById(idVideo));
    return () => {
      dispatch(clearFilter());
    };
  }, [dispatch, idVideo]);

  const { video } = useSelector((state) => state.programandoando);
  console.log(video);

  return (
    <div>
      <NavBar />
      <SearchBar />
      <h1>trabajando en este componente</h1>
    </div>
  );
}

export default Video;
