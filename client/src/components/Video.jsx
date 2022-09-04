import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById, clearVideo,getCourse } from "../redux/actions";
import NavBar from "./NavBar";
import { Videos } from "./Videos";

export default function Video() {
  const { video, course } = useSelector((state) => state.programandoando);
  const { idVideo } = useParams();
  const {idCourse}= useParams()

  

  

  //const courseSelect = course;

  const dispatch = useDispatch();

  useEffect(() => {
 
    dispatch(getVideoById(idVideo));
    dispatch(getCourse(idCourse));
  }, [idVideo]);
  if (!Object.keys(course).length ) {
    return <h2>Cargando Video!</h2>;
  } else {
    return (
      <>
        <NavBar />
        <div>
          <div className=" flex">
            <iframe
              width="2800"
              height="515"
              src={video.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="  px-10 flex flex-col justify-between">
              <div>
                <h2 className="pt-5 text-xl font-bold">{video.name}</h2>
                <h3 className="pb-5 text-lg font-semibold">{video.author}</h3>
              </div>
              <p className="pb-5 text-justify font-medium">
                {video.description}
              </p>
              <div className="pb-5 flex justify-between font-medium">
                <p>{video.difficult}</p>
                <p>{video.duration}</p>
              </div>
              <a
                href="https://www.youtube.com/c/codigofacilito"
                className="flex justify-end font-medium text-blue-700"
              >
                {video.profile}
              </a>
            </div>
          </div>
          <Videos videos={course.videos} idCourse={idCourse} />
        </div>
      </>
    );
  }
}
