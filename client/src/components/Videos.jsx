import React from "react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Paginated } from "./Paginated";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";

export const Videos = (props) => {
  const { course } = useSelector((state) => state.programandoando);
  const dispatch = useDispatch();
  const {idVideo} = useParams()
  
  let name = props.name;
  useEffect(() => {
    setPaginaActual(1);
  }, [name]);

  let videos = props.videos;
  let idCourse = props.idCourse;

  const [paginaActual, setPaginaActual] = useState(1);
  const [videosPagina] = useState(4);

  const ultimoVideo = paginaActual * videosPagina;
  const primerVideo = ultimoVideo - videosPagina;

  const videosActuales = videos.slice(primerVideo, ultimoVideo);

  // const prev = () => {
  //   if (paginaActual <= 1) {
  //     setPaginaActual(paginaActual - 1);
  //   } else {
  //     setPaginaActual(paginaActual);
  //   }
  // };
  // const next = () => {
  //   if (paginaActual >= videos.length) {
  //     setPaginaActual(paginaActual + 1);
  //   } else {
  //     setPaginaActual(paginaActual);
  //   }
  // };
  const prev = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const next = () => {
    if (paginaActual <= Math.ceil(videos.length / videosPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const paginado = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <div>
      <div className="grid justify-items-center mt-10">
        <Paginated
          setPagina={paginado}
          videos={videos.length}
          videosPagina={videosPagina}
          paginaActual={paginaActual}
          prev={prev}
          next={next}
        ></Paginated>
      </div>
      <div className="grid gap-8 lg:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10 justify-items-center">
        {videosActuales.map((elemento, index) => {
          console.log(elemento)
          return (
            <div key={index}>
              <NavLink
                to={`/video/${elemento._id}/${idCourse}`}
                state={(videos = videosActuales)}
              >
                <div
                  style={elemento._id === idVideo ? { margin: 10, backgroundColor: 'rgb(17, 52, 82)'} : { margin: 10, backgroundColor: 'rgb(55, 109, 109)'}}
                  className="flex place-content-center rounded-lg w-80 h-80 p-6 transition ease-in-out delay-150 bg-gray-800 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-800 duration-300"
                >
                  <h3 style={{}} className="flex items-center text-center text-md font-medium text-white w-52">
                    {elemento.name}
                  </h3>
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};