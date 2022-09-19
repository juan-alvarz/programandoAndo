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
import Loader from "./Loader";

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

  // console.log(foro);

  if (!Object.keys(course).length) {
    return <Loader />;
  } else {
    return usuario ? (
      <div
        style={{
          width: "100%",
          backgroundColor: "rgb(240, 240, 240)",
          height: "100vh",
        }}
      >
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
        FORO FUNCIONAL
        <div>
          <form onSubmit={handleSubmit(handleSubmitRespuesta)}>
            {Object.keys(foro).length > 0 ? (
              foro.comments.map((comment) => (
                <ol>
                  <br></br>
                  <p>abajo un nuevo comentario</p>
                  <p>ESTE ES EL COMENTARIO: -- {comment.content}</p>
                  <p>
                    Autor ---{" "}
                    {comment.authorComment
                      ? comment.authorComment.name
                      : "no se encuenta master"}
                  </p>
                  <br></br>
                  <h3>
                    {comment.answers?.map((answer) => (
                      <ol>
                        <p> -- ESTA ES UNA ANSWER: {answer.content}</p>
                        <p>
                          Author de la respuesta:{" "}
                          {answer.authorComment
                            ? answer.authorComment.name
                            : "no se encuenta master"}
                        </p>

                        {answer.authorComment ? (
                          answer.authorComment._id === userObj.user._id ? (
                            <button
                              className="button"
                              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              type="submit"
                              onClick={(e) =>
                                deleteAnswer(e, comment._id, answer._id)
                              }
                            >
                              Eliminar respuesta
                            </button>
                          ) : (
                            ""
                          )
                        ) : (
                          <h1></h1>
                        )}
                      </ol>
                    ))}
                  </h3>
                  <br></br>
                  <h3>Comentar</h3>{" "}
                  <input
                    type="text"
                    placeholder="Comment..."
                    data-commentid={comment._id}
                    name="hola"
                    onChange={(e) => handleChangeRespuesta(e)}
                  />
                  <button
                    className="button"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                    onClick={(e) => handleSubmitRespuesta(e)}
                    disabled={state.input1 ? "" : true}
                  >
                    Send Comment
                  </button>
                  {comment.authorComment ? (
                    userObj.user._id === comment.authorComment._id ? (
                      <button
                        className="button"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                        onClick={(e) => deleteComment4(e, comment._id)}
                      >
                        Delete Comment
                      </button>
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
        <br></br>
        <br></br>
        <p>INPUT PARA ENVIAR UN COMENTARIO</p>{" "}
        <input
          type="text"
          placeholder="Comment..."
          value={state.input2}
          name="input2"
          onChange={(e) => handleChange(e)}
        />
        <button
          className="button"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          onClick={(e) => handleSubmitComment(e)}
          disabled={state.input2 ? "" : true}
        >
          Send Comment
        </button>
        <p>EL DE ARRIBA ES UN INPUT PARA UN COMENTARIO, NO UNA RESPUESTA</p>
      </div>
    ) : (
      Swal.fire({
        title: "Access to videos denied",
        text: "You are not logged in. Please log in",
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
