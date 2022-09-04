import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCourses } from "../redux/actions";
import { NavLink, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { Paginated } from "./Paginated";
import Footer from "./Footer";
import { sortAlpha } from "../redux/slice";

export default function AllCourses() {
  const courses = useSelector((state) => state.programandoando.courses);
  const dispatch = useDispatch();

  // =============== Paginado =========================
  const [cursoActual, setCursoActual] = useState(1);
  const [cursosPagina] = useState(6);
  const ultimoCurso = cursoActual * cursosPagina;
  const primerCurso = ultimoCurso - cursosPagina;
  const cursosActuales = courses.slice(primerCurso, ultimoCurso);
  const prev = () => {
    if (cursoActual > 1) {
      setCursoActual(cursoActual - 1);
    }
  };
  const next = () => {
    if (cursoActual < Math.ceil(courses.length / cursosPagina)) {
      setCursoActual(cursoActual + 1);
    }
  };
  const paginado = (numeroPagina) => {
    setCursoActual(numeroPagina);
  };
  // ==============================================

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  if (!courses.length) {
    return <div role="status">Cargando ando</div>;
  } else {
    /* const names = [];
    for (let i = 1; i < courses.length; i++) {
      // names.push(courses[i].name) <-- esta cochinada no sirve
      names.push(courses[i]["name"]); //se debe usar la nomenclatura ['atributo']
    }
    const alphabetic = courses.sort((a, b) =>
      a["name"].localeCompare(b.name)
    );
    console.log(alphabetic); */
    // courses es un array de 27 objetos con la propiedad name
    return (
      <div>
        <NavBar />
        <div
          style={{
            margin: "auto",
            width: "fit-content",
            padding: "10px",
          }}
        >
          <SearchBar />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ paddingRight: "10px", paddingLeft: "10px" }}>
              A-Z
            </span>
            <label
              for="default-toggle"
              className="inline-flex relative items-center mb-4 cursor-pointer"
            >
              <input
                type="checkbox"
                value=""
                id="default-toggle"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <span style={{ paddingRight: "10px", paddingLeft: "10px" }}>
              Z-A
            </span>
          </div>
          {/* DURATION */}

          <div style={{ paddingBottom: "10px" }}>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40% p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={"allDurations"}>All Durations</option>
              <option value={"more1Day"}>More than 1 day</option>
              <option value={"more10h"}>More than 10 hours</option>
              <option value={"less5hs"}>Less than 5 hours</option>
            </select>
          </div>
        </div>
        {/* Paginated */}
        <div className="grid justify-items-center mb-20">
          <Paginated
            setPagina={paginado}
            videos={courses.length}
            videosPagina={cursosPagina}
            paginaActual={cursoActual}
            prev={prev}
            next={next}
          ></Paginated>
        </div>
        <div
          className="grid gap-8 lg:gap-16 sm:grid-cols-1 lg:grid-cols-3 justify-items-center"
          style={{ paddingBottom: "30px" }}
        >
          {cursosActuales.map((course, index) => (
            <div
              key={index}
              class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
              style={{ maxHeight: 700, maxWidth: 500, minWidth: 300 }}
            >
              <NavLink to={`/course/${course._id}`}>
                <img
                  class="rounded-t-lg object-cover"
                  src={course.image}
                  alt=""
                  style={{
                    maxHeight: 300,
                    maxWidth: 500,
                    margin: "auto",
                  }}
                />
              </NavLink>
              <div class="p-5">
                <NavLink to={`/course/${course._id}`}>
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {course.name}
                  </h5>
                  <span style={{ fontSize: "1.2rem" }}>
                    <strong>Time Inversion: </strong>56:53:64
                  </span>
                </NavLink>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {course.description}
                </p>
                <NavLink
                  to={`/course/${course._id}`}
                  style={{ color: "white" }}
                >
                  <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    Read more
                  </button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    );
  }
}
