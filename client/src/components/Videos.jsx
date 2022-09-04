import React from "react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Paginated } from "./Paginated";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Videos = (props) => {
  const { course } = useSelector((state) => state.programandoando);
  const dispatch = useDispatch();

  let name = props.name;
  useEffect(() => {
    setPaginaActual(1);
  }, [name]);

  let videos = props.videos;
  let idCourse= props.idCourse
  
  const [paginaActual, setPaginaActual] = useState(1);
  const [videosPagina] = useState(4);

  const ultimoVideo = paginaActual * videosPagina;
  const primerVideo = ultimoVideo - videosPagina;

  const videosActuales = videos.slice(primerVideo, ultimoVideo);
  

  const prev = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const next = () => {
<<<<<<< HEAD
    if (paginaActual < Math.ceil(videos.length / videosPagina)) {
=======
    if (paginaActual <= Math.ceil(videos.length / videosPagina)) {
>>>>>>> Lucho
      setPaginaActual(paginaActual + 1);
    }
  };

  const paginado = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <div>
      <div className="grid justify-items-center mb-20">
        <Paginated
          setPagina={paginado}
          videos={videos.length}
          videosPagina={videosPagina}
          paginaActual={paginaActual}
          prev={prev}
          next={next}
        ></Paginated>
      </div>
      <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videosActuales.map((elemento, index) => {
          return (
            <div key={index} style={{ justifyContent: "center" }}>
              <NavLink
                to={`/video/${elemento._id}/${idCourse}`}
                state={(videos = videosActuales)}
              >
                <div
                  style={{ margin: 10, boxShadow: "2px 2px 9px #312928" }}
                  className="rounded-lg w-80 h-80 p-6 transition ease-in-out delay-150 bg-gray-800 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-800 duration-300"
                >
                  <h3 className="mb-2 text-2xl font-bold tracking-tight text-white ">
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
