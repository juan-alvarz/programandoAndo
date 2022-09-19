import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getForoById,
  updateForo,
  updateDeleteCommentorAnswer,
} from "../redux/actions";
import { useForm } from "react-hook-form";

export default function ForoNotLogged() {
  let foroId = "6325148393901f7583647c03";

  const dispatch = useDispatch();
  const { foro } = useSelector((state) => state.programandoando);

  useEffect(() => {
    dispatch(getForoById(foroId));
  }, [foroId]);

  // console.log(foro)

  if (!foro) {
    <h1>Cargando Foro</h1>;
  } else {
    return (
      <div>
        {Object.keys(foro).length > 0 ? (
          foro.comments[0] ? (
            foro.comments.map((comment) => (
              <ol>
                <br></br>
                <h1>abajo un nuevo comentario</h1>
                <h2>ESTE ES EL COMENTARIO: -- {comment.content}</h2>
                <h2>
                  Autor ---{" "}
                  {comment.authorComment
                    ? comment.authorComment.name
                    : "no se encuenta master"}
                </h2>
                <br></br>
                <h3>
                  {comment.answers?.map((answer) => (
                    <ol>
                      <h2> -- ESTA ES UNA ANSWER: {answer.content}</h2>
                      <h1>
                        Author de la respuesta: {answer.authorComment.name}
                      </h1>
                    </ol>
                  ))}
                </h3>
                <br></br>
                <input placeholder="Comment..." />
                <h3>Registrate para Comentar !!</h3>
              </ol>
            ))
          ) : (
            <p>Aun no hay comentarios</p>
          )
        ) : (
          <p>Cargando Comentarios</p>
        )}
        <div>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}
