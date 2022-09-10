import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCourses } from "../redux/actions";
import {favorite} from "../redux/actions"
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { Paginated } from "./Paginated";
import Loader from "./Loader";
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
import fav from "../utils/images/fav.png"
import { Favorites } from "./Favorites";

export default function AllCourses() {
  const courses = useSelector((state) => state.programandoando.courses);
  const dispatch = useDispatch();
  const {favoritesUser} = useSelector((state) => state.programandoando);
  // console.log(favoritesUser)

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
      <div style={{backgroundColor: 'rgb(198, 198, 198)'}}>
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
        <Loader />
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
      
      let oneDuration = secondsDuration.reduce((sum, a) => sum + a, 0);
      

      let object = {
        ...course,
        duration: oneDuration,
      };
      
      return object;
    };

    
    let coursesPow = courses.map((e) => durationCourse(e));

    

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
      <div style={{backgroundColor: 'rgb(198, 198, 198)'}}>
        <NavBar />
        <NavLink to="/favorites">Favorites</NavLink>

        <div className="flex flex-col items-center justify-around px-5 py-10 lg:flex-row">
          {/* Filtrados */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="pr-2">A-Z</span>
              <label
                for="default-toggle"
                className="inline-flex relative items-center cursor-pointer"
              >
                <div></div>
                <input
                  type="checkbox"
                  value=""
                  id="default-toggle"
                  className="sr-only peer"
                  onChange={(e) => handleFilterAlph(e)}
                />
                <div style={{backgroundColor: 'rgb(17, 52, 82)'}} className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
              <span style={{ paddingRight: "10px", paddingLeft: "10px" }}>
                Z-A
              </span>
            </div>

            {/* DURATION */}
            <div>
              <select
                id="countries"
                style={{width: 130}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40% py-1"
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
          <div className="grid justify-items-center my-5">
            <Paginated
              setPagina={paginado}
              videos={courses.length}
              videosPagina={cursosPagina}
              paginaActual={cursoActual}
              prev={prev}
              next={next}
            />
          </div>

          <div>
            <SearchBar path={path} setPagina={setCursoActual} />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-row-auto justify-items-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-8">
          {cursosActuales.map((course, index) => (
            <div
              key={index}
              className="max-w-sm h-auto my-3 rounded overflow-hidden shadow-lg"
              style={{
                maxWidth: 400,
                height: 580,
                backgroundColor: "rgb(17, 52, 82)",
                marginTop: 5,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 30,
                borderRadius: 10,
              }}
            >
              <picture>
                <NavLink to={`/course/${course._id}`}>
                  <img
                    className="rounded-t-lg object-cover"
                    src={course.image}
                    alt=""
                    style={{
                      minHeight: 180,
                      maxHeight: 180,
                      width: "100%",
                      objectFit: "cover",
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      width: "500px",
                    }}
                  />
                </NavLink>
              </picture>

              <div>
                <div>
                  <h5 
                    style={{
                      fontSize: 20,
                      display: "flex",
                      color: "rgb(201, 196, 184)",
                      justifyContent: "center",
                      backgroundColor: 'rgb(55, 109, 109)',
                      paddingTop: 10,
                      paddingBottom: 10
                    }}
                    className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {course.name}
                  </h5>
                  
                </div>
                <p 
                  style={{
                    fontSize: 15,
                    display: "flex",
                    color: "rgb(201, 196, 184)",
                    justifyContent: "center",
                    minHeight: 180,
                    paddingLeft: 35,
                    paddingRight: 35,
                    paddingTop: 20,
                    textAlign: "center"
                  }}
                  className="mb-3 font-normal text-gray-700">
                  {course.description}
                </p>
                <span 
                    style={{
                      fontSize: 15,
                      display: "flex",
                      color: "rgb(201, 196, 184)",
                      justifyContent: "center",
                      paddingTop: 10,
                      paddingBottom: 20,
                      paddingLeft: 35,
                      paddingRight: 35,
                      textAlign: "center"
                    }}
                  >
                    <strong>Time Inversion: </strong>
                    {finallyOneDuration(course.duration)}
                  </span>
                <NavLink
                  to={`/course/${course._id}`}
                  style={{ 
                    color: "white", 
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",}}
                >
                  <button 
                    style={{
                      backgroundColor: "rgb(17, 52, 82)",
                      color: "rgb(201, 196, 184)",
                    }}
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                    Read more
                  </button>
                </NavLink>
                  <img onClick={(e)=>(dispatch(favorite(course)))} src={fav}></img>
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    );
  }
}