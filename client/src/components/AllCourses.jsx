import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCourses } from "../redux/actions";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { Paginated } from "./Paginated";
import Footer from "./Footer";
import {
  getAllCoursesAZ,
  getAllCoursesZA,
  getCourses10more,
  getCourses10h,
  getCourses5h,
  getCourses3h,
} from "../redux/actions";
import imageNotFound from "../utils/images/404person.png";

export default function AllCourses() {
  const courses = useSelector((state) => state.programandoando.courses);
  const dispatch = useDispatch();

  // =============== Paginado ==========================
  const [cursoActual, setCursoActual] = useState(1);
  const [cursosPagina] = useState(6);
  const ultimoCurso = cursoActual * cursosPagina;
  const primerCurso = ultimoCurso - cursosPagina;
  //======================================================
  const [coursesPowFilter, setCoursesPowFilter] = useState([]);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch, coursesPowFilter]);

  console.log(courses);
  // //===================================================
  let finallyOneDuration = (time) => {
    let hours = Math.floor(time / 3600);
    time %= 3600;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    minutes = String(minutes).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    let stringNumber = `${hours}h ${minutes}min ${seconds}seg`;
    return stringNumber;
  };

  const path = "courses";

  /*==================course not found page========================== */
  if (courses.msg === "error") {
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <SearchBar path={path} setPagina={setCursoActual} />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "90%",
              margin: "auto",
            }}
          >
            <img
              src={imageNotFound}
              alt="notfound"
              style={{ width: "35%", marginTop: 40 }}
            />
            <h1
              style={{
                fontSize: "2rem",
                padding: "30px",
              }}
            >
              Course not found
            </h1>
            <span>no results found, please try another course</span>
          </div>
        </div>
      </div>
    );
  } else if (!courses.length) {
    /* ======================Loading page====================== */
    return (
      <div>
        {/* <div>
          <SearchBar path={path} />
        </div> */}
        <div role="status">Cargando ando!</div>
      </div>
    );
  } else {
    /* =======================All correct!=================== */
    let durationCourse = (course) => {
      let temporaly = course.videos.map((e) => e.duration);

      const toSeconds = (time) => {
        if (time.length > 5) {
          let parse = time.split(":");
          let newParse = [
            parseInt(parse[0]) * 3600,
            parseInt(parse[1], 10) * 60,
            parseInt(parse[2], 10),
          ];
          let sumParse = newParse[0] + newParse[1] + newParse[2];
          return sumParse;
        }
        if (time.length <= 5) {
          let parse = time.split(":");
          let newParse = [parseInt(parse[0], 10) * 60, parseInt(parse[1], 10)];
          let sumParse = newParse[0] + newParse[1];
          return sumParse;
        }
      };
      let secondsDuration = temporaly.map((e) => toSeconds(e));
      console.log(secondsDuration);
      let oneDuration = secondsDuration.reduce((sum, a) => sum + a, 0);
      console.log(oneDuration);

      let object = {
        ...course,
        duration: oneDuration,
      };
      console.log(object.duration);
      return object;
    };

    console.log(durationCourse(courses[0]));
    let coursesPow = courses.map((e) => durationCourse(e));

    console.log(coursesPow);

    //=========== lógica del duration ==========

    //=========== handles =================
    const handleFilterAlph = (e) => {
      setCursoActual(1);
      e.target.checked === true
        ? dispatch(getAllCoursesZA())
        : dispatch(getAllCoursesAZ());
    };
    const handleFilterDuration = (e) => {
      if (e.target.value === "allDurations") {
        dispatch(getAllCourses());
        setCursoActual(1);
      }
      if (e.target.value === "10hmore") {
        dispatch(getCourses10more());
        setCursoActual(1);
      }
      if (e.target.value === "10h") {
        dispatch(getCourses10h());
        setCursoActual(1);
      }
      if (e.target.value === "5h") {
        dispatch(getCourses5h());
        setCursoActual(1);
      }
      if (e.target.value === "3h") {
        dispatch(getCourses3h());
        setCursoActual(1);
      }
    };

    //==========================================

    const cursosActuales = coursesPow.slice(primerCurso, ultimoCurso);
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
          <SearchBar path={path} setPagina={setCursoActual} />
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
                onChange={(e) => handleFilterAlph(e)}
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
              onChange={(e) => handleFilterDuration(e)}
            >
              <option value={"allDurations"}>All Durations</option>
              <option value={"10hmore"}>More than 10 hours</option>
              <option value={"10h"}>Up to 10 hours</option>
              <option value={"5h"}>Up to 5 hours</option>
              <option value={"3h"}>Up to 3 hours</option>
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
              style={{ maxHeight: 700, maxWidth: 500, minWidth: 500 }}
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
                    <strong>Time Inversion: </strong>
                    {finallyOneDuration(course.duration)}
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
