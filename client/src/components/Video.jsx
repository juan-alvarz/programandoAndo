import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById } from "../redux/actions";
export default function Video() {
  const { video } = useSelector((state) => state.programandoando);
  const { idVideo } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(idVideo));
  }, [dispatch]);
  console.log(video);
  return (
    <div>
      <h1>{video.name}</h1>
    </div>
  );
}
