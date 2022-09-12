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

  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);

   // COMENTARIO

  const [valueComment, setvalueComment] = useState("")

  const [commentario, setCommentario] = useState({
    content: "",
    authorComment: userObj.user._id,
    commentId: "", // este siempre sale vakcio che 
  });

  function handleChange(e) {
    setCommentario({
      ...commentario,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(commentario);
    dispatch(updateForo(video.foro, commentario));
    setvalueComment("")
  }

  // RESPUESTA 
  const [respuesta, setRespuesta] = useState({
    content: "",
    authorComment: userObj.user._id,
    commentId: "",
  });

  function handleChangeRespuesta(e) {
    setRespuesta({
      ...respuesta,
      commentId: e.target.dataset.commentid,
      [e.target.name]: e.target.value,
    });
    setvalueComment(e.target.value)
  }
  
  function handleSubmitRespuesta(e) {
    e.preventDefault();
    console.log(respuesta);
    dispatch(updateForo(video.foro, respuesta))
    setvalueComment("")
  }

  useEffect(() => {
    dispatch(getVideoById(idVideo));
    dispatch(getCourse(idCourse));
  }, [idVideo]);

  useEffect(() => {
    dispatch(getForoById(video.foro));
  }, [video.foro]);

  console.log(foro)
 
  if (!Object.keys(course).length) {
    return <Loader />;
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
          {/* FORO FUNCIONAL */}
          {Object.keys(foro).length > 0 ? (
            foro.comments.map(            
              (comment) => 
              <ol>
              <h2>{comment.content}</h2> 
              <h3>{comment.answers?.map(
                (answer) => 
                <ol>
                <h2>{answer.content}</h2>
          </ol>
              )}
              </h3>
          <button>Comentar</button>
          <br/>
          <br/>
          <h1> --- </h1>
          <br/>
          <input
            type="text"
            placeholder="Comment...)"
            value= {valueComment}
            data-commentid={comment._id}
            name="content"
            onChange={(e) => handleChangeRespuesta(e)}
            />
          <button
            className="button"
            type="submit"
            onClick={(e) => handleSubmitRespuesta(e)}
            >
            Send
          </button> 
              </ol>) 
          ) : (
            <h2>No se cumplió master</h2>
          )}
          
        </div>
           <input
            type="text"
            value={valueComment}
            name= "content"
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
          <h1>EL DE ARRIBA ES UN INPUT PARA UN COMENTARIO, NO UNA RESPUESTA</h1>
      </div>
    );
  }
}
