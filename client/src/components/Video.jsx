import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getVideoById,
  clearVideo,
  getCourse,
  getForoById,
  updateForo,
  updateDeleteCommentorAnswer,
} from "../redux/actions";
import NavBar from "./NavBar";
import { Videos } from "./Videos";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

export default function Video() {
  const { video, course, foro } = useSelector((state) => state.programandoando);
  const { idVideo } = useParams();
  const { idCourse } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const usuario = window.localStorage.getItem("user");
  let userObj = JSON.parse(usuario);

  const [contador, setContador] = useState(1);
  const [state, setState] = useState({ input1: "", input2: "" });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(idVideo));
    dispatch(getCourse(idCourse));
    dispatch(getForoById(video.foro));
  }, [idVideo]);

  useEffect(() => {
    dispatch(getForoById(video.foro));
  }, [dispatch, video.foro, contador]);

  useEffect(() => {
    dispatch(getForoById(video.foro));
  }, [dispatch, video.foro, contador]);

  //   useEffect(() => {
  //     dispatch(getForoById(video.foro));
  // }, [video.foro, contador]);

  // COMENTARIO
  const [commentario, setCommentario] = useState({
    content: "",
    authorComment: userObj.user._id,
    commentId: "", // este siempre sale vacio che
  });

  function handleChange(e) {
    setCommentario({ ...commentario, content: e.target.value });
    setState({ ...state, [e.target.name]: e.target.value });
    setContador(contador + 1);
  }

  function handleSubmitComment(e) {
    e.preventDefault();
    dispatch(updateForo(video.foro, commentario));
    setState({ input2: "" });
    setContador(contador + 1);
  }

  // DELETE COMENTARIO

  const [deleteComment, setDeleteComment] = useState({
    commentId: "",
    change: "deleteComment",
  });

  //const deleteComment = {commentId: "6323a1c671576a73f18bd911", change: "deleteComment" }

  //   let elimina = deleteComment4()

  // let elimina2 = handleChangeDelete()

  // let eliminar = {...elimina, elimina2}

  function deleteComment4(e, id) {
    e.preventDefault();
    //return deleteComment
    dispatch(
      updateDeleteCommentorAnswer(video.foro, {
        commentId: id,
        change: "deleteComment",
      })
    ); //.then(setContador(contador + 1))
    //   setContador(contador+1)
  }

  function deleteAnswer(e, id, idAnswer) {
    e.preventDefault();
    //return deleteComment
    dispatch(
      updateDeleteCommentorAnswer(video.foro, {
        commentId: id,
        change: "deleteAnswer",
        idAnswer: idAnswer,
      })
    ); //.then(setContador(contador + 1))
    setContador(contador + 1);
  }

  // RESPUESTA
  const [respuesta, setRespuesta] = useState({
    content: "",
    authorComment: userObj.user._id,
    commentId: "",
    change: "respuesta",
  });

  function handleChangeRespuesta(e) {
    setRespuesta({
      ...respuesta,
      commentId: e.target.dataset.commentid,
      content: e.target.value,
    });
    setState({ ...state, input1: e.target.value });
    setContador(contador + 1);
  }

  function handleSubmitRespuesta(data, e) {
    e.target.reset();
    e.preventDefault();
    dispatch(updateForo(video.foro, respuesta));
    setState({ input1: "" });
    setContador(contador + 1);
  }

  function handleSubmitRespuesta(data, e) {
    e.target.reset();
    e.preventDefault();
    dispatch(updateForo(video.foro, respuesta));
    setState({ input1: "" });
    setContador(contador + 1);
  }

  console.log(foro);

  if (!Object.keys(course).length) {
    return <h2>Cargando Video!</h2>;
  } else {
    return usuario ? (
      <div
        style={{
          width: "100%",
          backgroundColor: "rgb(240, 240, 240)",
        }}
      >
        <NavBar />
        <div className=" xl:flex pl-2 justify-between">
          <div style={{ display: "flex" }}>
            <div className="max-w-screen-xl py-5">
              {/* Video */}
              <div className="mb-10 flex flex-col sm:flex-row">
                <iframe
                  className="sm:w-screen px-5"
                  width="380"
                  height="515"
                  src={video.url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              {/* Texto Card */}
              <div className="px-10 flex flex-col justify-between sm:w-screen lg:w-full ">
                <div>
                  <h2
                    className="pt-5 pb-1.5 text-2xl font-bold "
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

                <p
                  className="capitalize font-bold flex justify-end"
                  style={{ color: "rgb(55, 109, 109)" }}
                >
                  Nivel: {video.difficult}
                </p>
                <p
                  className="font-semibold flex justify-end py-2"
                  style={{ color: "rgb(55, 109, 109)" }}
                >
                  Tiempo: {video.duration}
                </p>

                <button className="flex justify-end ">
                  <a
                    href={video.profile}
                    target="_blank"
                    className=" text-white font-bold py-2 px-4 rounded"
                    style={{ backgroundColor: "#376D6D" }}
                  >
                    Youtube
                  </a>
                </button>
              </div>
            </div>
          </div>
          {/* CHAT */}
          <div className="bg-white rounded-md m-5 xl:w-3/12 ">
            <div
              style={{ backgroundColor: "rgb(17, 52, 82)" }}
              className="rounded-t-xl mb-5"
            >
              <p
                style={{ color: "rgb(240, 240, 240)" }}
                className="text-center py-5 text-xl font-bold uppercase"
              >
                {" "}
                General Forum{" "}
              </p>
            </div>
            <div>
              <div
                style={{ height: 600 }}
                className="flex justify-center overflow-hidden hover:overflow-y-scroll scrolling-touch"
              >
                <form
                  className="bg-white w-10/12"
                  onSubmit={handleSubmit(handleSubmitRespuesta)}
                >
                  {Object.keys(foro).length > 0 ? (
                    foro.comments.map((comment) => (
                      <ol
                        style={{ borderWidth: 1, height: 320 }}
                        className="rounded-md my-5 border-gray-300 overflow-hidden hover:overflow-y-scroll scrolling-touch"
                      >
                        <div className="bg-gray-400 rounded-t-md py-1">
                          <p className="text-lg text-center font-bold text-white">
                            {comment.authorComment
                              ? comment.authorComment.name
                              : "no se encuenta master"}
                          </p>
                        </div>
                        <div>
                          <p className="text-md text-center font-bold pt-5">
                            {comment.content}
                          </p>
                        </div>
                        <div className=" my-5">
                          <h3>
                            {comment.answers?.map((answer) => (
                              <ol className="bg-gray-200 my-3 mx-3 p-4 rounded-md">
                                <p className="text-sm font-bold">
                                  {answer.authorComment
                                    ? answer.authorComment.name
                                    : "no se encuenta master"}
                                </p>
                                  <p className="text-xs">{answer.content}</p>

                                {answer.authorComment ? (  
                                  answer.authorComment._id ===
                                  userObj.user._id ? (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <button
                                        style={{ width: 130 }}
                                        className="bg-gray-700 text-xs hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                                        type="submit"
                                        onClick={(e) =>
                                          deleteAnswer(
                                            e,
                                            comment._id,
                                            answer._id
                                          )
                                        }
                                      >
                                        Delete answer
                                      </button>
                                    </div>
                                  ) : (
                                    ""
                                  )
                                ) : (
                                  <h1></h1>
                                )}
                              </ol>
                            ))}
                          </h3>
                        </div>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                          className="my-5"
                        >
                          <textarea
                            className="border border-gray-300 rounded-l-md p-2 text-xs"
                            type="text"
                            placeholder="Comment..."
                            data-commentid={comment._id}
                            name="hola"
                            onChange={(e) => handleChangeRespuesta(e)}
                          />
                          <button
                            style={{
                              width: 130,
                              backgroundColor: "rgb(55, 109, 109)",
                            }}
                            className="bg-blue-500 text-xs hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-r-md"
                            type="submit"
                            onClick={(e) => handleSubmitRespuesta(e)}
                            disabled={state.input1 ? "" : true}
                          >
                            Send reply
                          </button>
                        </div>
                        {comment.authorComment ? (
                          userObj.user._id === comment.authorComment._id ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <button
                                style={{ width: 130 }}
                                className="bg-gray-700 text-xs hover:bg-red-700 text-white font-bold mx-2 py-2 px-2 rounded"
                                type="submit"
                                onClick={(e) => deleteComment4(e, comment._id)}
                              >
                                Delete Comment
                              </button>
                            </div>
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )}
                      </ol>
                    ))
                  ) : (
                    <h2>No se cumplió master</h2>
                  )}
                </form>
              </div>
              <div
                style={{ backgroundColor: "rgb(17, 52, 82)" }}
                className="rounded-b-xl"
              >
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  className="mt-5 pt-5"
                >
                  <p
                    style={{ color: "rgb(240, 240, 240)" }}
                    className="uppercase mb-3 font-bold text-sm"
                  >
                    Post your questions / comments here
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  className="pb-5"
                >
                  <textarea
                    style={{ backgroundColor: "rgb(17, 52, 82)", resize: 'none' }}
                    className="text-white border border-white text-sm rounded-l-md p-2"
                    type="text"
                    placeholder="New answer"
                    value={state.input2}
                    name="input2"
                    onChange={(e) => handleChange(e)}
                  />
                  <button
                    style={{
                      width: 130,
                      backgroundColor: "#fff",
                      color: "rgb(17, 52, 82)",
                    }}
                    className="bg-blue-500 text-xs hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-r-md"
                    type="submit"
                    onClick={(e) => handleSubmitComment(e)}
                    disabled={state.input2 ? "" : true}
                  >
                    Send Comment
                  </button>
                </div>
              </div>
              {/* CHAT */}
            </div>
          </div>
        </div>
        <div>
          {/* Courses */}
          <Videos videos={course.videos} idCourse={idCourse} />
        </div>
      </div>
    ) : (
      Swal.fire({
        title: "Access to videos denied",
        text: "You cannot login if you are not logged in. Please log in",
        icon: "warning",
        confirmButtonText: "Log in",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      })
    );
  }
}