import React from "react";
import { useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Paginated } from "./Paginated";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Footer from "./Footer";
import Swal from "sweetalert2";

export const Videos = (props) => {
  const { course } = useSelector((state) => state.programandoando);
  const dispatch = useDispatch();
  const { idVideo } = useParams();
  const usuario = window.localStorage.getItem("user");
  const navigate = useNavigate();

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
  const handleClick = () => {
    if (!usuario) {
      Swal.fire({
        icon: "warning",
        title: "Access to videos denied...",
        text: "You are not logged in. Please log in",
      });
    }
  };

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
      <div className="grid gap-8 lg:gap-8 mx-5 mt-10 sm:grid-cols-1 md:grid-cols-2 lg:mx-28 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-stretch ">
        {videosActuales.map((elemento, index) => {
          console.log(elemento);
          return (
            <div key={index}>
              <NavLink
                to={usuario ? `/video/${elemento._id}/${idCourse}` : `/login`}
                state={(videos = videosActuales)}
                onClick={handleClick}
              >
                <div
                  style={
                    elemento._id === idVideo
                      ? { margin: 10, backgroundColor: "rgb(17, 52, 82)" }
                      : { margin: 10, backgroundColor: "rgb(55, 109, 109)" }
                  }
                  className="flex place-content-center rounded-lg shadow-xl shadow-gray-500 w-50 h-40 p-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                >
                  <h3
                    style={{}}
                    className="flex items-center text-center text-md font-medium text-white w-52"
                  >
                    {elemento.name}
                  </h3>
                  {/* <button >Login </button> */}
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};
