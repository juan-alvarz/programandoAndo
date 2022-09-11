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
import Loader from "./Loader";

export default function Video() {
  const { idVideo } = useParams();
  const { idCourse } = useParams();
  const { idUser } = useParams();
  const { video, course, foro } = useSelector((state) => state.programandoando);
  const dispatch = useDispatch();

  const [comment, setComment] = useState({
    content: "",
    authorComment: idUser,
    commentId: "",
  });

  function handleChange(e) {
    setComment({
      ...comment,
      [e.target.value]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(comment);
    dispatch(updateForo(video.foro, comment));
  }

  useEffect(() => {
    dispatch(getVideoById(idVideo));
    dispatch(getCourse(idCourse));
    //dispatch(getForoById(video.foro));
  }, [idVideo]);

  useEffect(() => {
    dispatch(getForoById(video.foro));
  });

  if (!Object.keys(course).length) {
    return <Loader />;
  } else {
    console.log(video.foro);
    console.log(foro);
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
                  Autor:{" "}
                  <a href={video.profile} target="_blank">
                    {video.author}
                  </a>
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
                <a
                  href={video.profile}
                  target="_blank"
                  className="text-blue-500"
                >
                  {video.profile}
                </a>
              </p>
            </div>
          </div>
          {/* Courses */}
          <Videos videos={course.videos} idCourse={idCourse} />
        </div>
        <div>
          <input
            type="text"
            value={comment.content}
            placeholder="Comment...)"
            onChange={(e) => handleChange(e)}
          />

          {Object.keys(foro).length ? (
            foro.comments.map((comment) => <h2>{comment.content}</h2>)
          ) : (
            <h2>No se cumplió master</h2>
          )}
          {/* 
          <h1>{foro.comments[2].content}</h1>

    <h1>{foro.comments[2].content}</h1>

        <button className="button" type='submit'
        onClick={(e)=> handleSubmit(e)}>Send</button>
{foro.map( (comment) => {
  return{
    comment: comment[2].answers
  }
})}      
        <h1>{foro.comments[2].answers[0].content}</h1>

        */}
          <input
            type="text"
            value={comment.content}
            placeholder="Comment...)"
            onChange={(e) => handleChange(e)}
          />
          <button
            className="button"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Send
          </button>
        </div>
        {/* <div>
        <h1>
          {foro.comments.map((comment) => (
            <h1>{comment.content}</h1>
          ))}
        </h1>
        </div> */}
      </div>
    );
  }
}
