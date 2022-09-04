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
  console.log(videos);
  const [paginaActual, setPaginaActual] = useState(1);
  const [videosPagina] = useState(4);

  const ultimoVideo = paginaActual * videosPagina;
  const primerVideo = ultimoVideo - videosPagina;

  const videosActuales = videos.slice(primerVideo, ultimoVideo);

  const prev = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    } else {
      setPaginaActual(paginaActual);
    }
  };
  const next = () => {
    if (paginaActual <= videos.length) {
      setPaginaActual(paginaActual + 1);
    } else {
      setPaginaActual(paginaActual);
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
                to={`/video/${elemento._id}`}
                state={(videos = videosActuales)}
              >
                <div
                  style={{ margin: 10, backgroundColor: "red", color: "white" }}
                  className="w-80 h-80    p-6 bg-gray-900 rounded-lg border border-gray-200 hover:border-gray-800    hover:bg-gray-700"
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
