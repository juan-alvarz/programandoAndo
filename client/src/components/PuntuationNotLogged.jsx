import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUsers, userOpinion } from "../redux/actions";

const PuntuationNotLogged = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.programandoando);
  // console.log(users)

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  let usuarios = users;

  function promedioPuntuacion(users) {
    let suma = 0;
    let todos = 0;
    for (let key in users) {
      if (users[key]["pagePuntuation"] > 0) {
        todos++;
        suma += users[key]["pagePuntuation"];
      }
    }
    let promedio = suma / todos;
    const average = Math.round(promedio * 10) / 10;
    return average;
  }

  let total = promedioPuntuacion(usuarios);
  // console.log(total)

  return (
    <div>
      <div>
        <h1>Calificacion Promedio</h1>
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <span>{total}/10</span>
      </div>
      {Object.keys(users).length > 0
        ? users.map((user) =>
            user.pageOpinion !== "" && user.pagePuntuation !== 0 ? (
              <ol>
                <p>Autor: {user.name}</p>
                <p>Comentario: {user.pageOpinion} </p>
                <p>Puntuation: {user.pagePuntuation}</p>
                <br></br>
                <br></br>
                <p>Registrate para dejar tu FeedBack de la página</p>
              </ol>
            ) : (
              ""
            )
          )
        : ""}
    </div>
  );
};

export default PuntuationNotLogged;
