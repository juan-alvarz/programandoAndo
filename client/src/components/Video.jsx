import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById, clearVideo, getCourse } from "../redux/actions";
import NavBar from "./NavBar";
import { Videos } from "./Videos";

export default function Video() {
  const { video, course } = useSelector((state) => state.programandoando);
  const { idVideo } = useParams();
  const { idCourse } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(idVideo));
    dispatch(getCourse(idCourse));
  }, [idVideo]);

  if (!Object.keys(course).length) {
    return <h2>Cargando Video!</h2>;
  } else {
    return (
      <div style={{ width: "100%" }}>
        <NavBar />
        <div>
          {/* Video */}
          <div className="mb-10 flex flex-col sm:flex-row">
            <iframe
              className="sm:w-screen"
              height="515"
              src={video.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* Texto Card */}
            <div className="px-10 flex flex-col justify-between w-full">
              <div>
                <h2
                  className="pt-5 pb-1.5 text-xl font-bold "
                  style={{ color: "rgb(17, 52, 82)" }}
                >
                  {video.name}
                </h2>
                <h3
                  className="pb-5 text-lg font-semibold"
                  style={{ fontSize: "15px", color: "rgb(17, 52, 82)" }}
                >
                  Autor: <a href={video.profile}>{video.author}</a>
                </h3>
              </div>
              <p
                className="pb-5 text-justify font-medium"
                style={{ color: "rgb(17, 52, 82)" }}
              >
                {video.description}
              </p>
              <div className="pb-5 flex justify-between font-medium">
                <p
                  className="capitalize font-bold"
                  style={{ color: "rgb(55, 109, 109)" }}
                >
                  Nivel: {video.difficult}
                </p>
                <p
                  className="font-semibold"
                  style={{ color: "rgb(55, 109, 109)" }}
                >
                  Tiempo: {video.duration}
                </p>
              </div>
              <p className="flex justify-end">
                <a href={video.profile} className="text-blue-500">
                  {video.profile}
                </a>
              </p>
            </div>
          </div>
          {/* Courses */}
          <Videos videos={course.videos} idCourse={idCourse} />
        </div>
      </div>
    );
  }
}
