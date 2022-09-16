import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getVideoById,
  clearVideo,
  getCourse,
  getForoById,
  updateForo,
} from "../redux/actions";
import NavBar from "./NavBar";
import { Videos } from "./Videos";

function TEST() {
  const { video, course, foro } = useSelector((state) => state.programandoando);
  const dispatch = useDispatch();
  const { videoId } = useParams();

  useEffect(() => {
    dispatch(getVideoById(videoId));
  }, [dispatch]);

  if (Object.keys(video).length !== 0) {
    console.log(video);
    console.log(foro);
  }
  useEffect(() => {
    dispatch(getForoById(video.foro));
  }, [dispatch]);
  console.log(foro);

  return <div>TEST</div>;
}

export default TEST;
