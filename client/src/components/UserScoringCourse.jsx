import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScoring, getUser } from "../redux/actions";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Paginated } from "./Paginated";

function UserScoringCourse() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.programandoando);

  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);

  useEffect(() => {
    if (userObj) {
      dispatch(getUser(userObj.user._id));
    }
  }, [dispatch]);

  const courses = user && user.scoring;
  // console.log(courses);
  // console.log(user);
  let durationCourse = (course) => {
    // console.log(course.course.videos);
    let temporaly = course && course.course.videos.map((e) => e.duration);
    // console.log(temporaly);

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

  // =============== Paginado ==========================
  const [cursoActual, setCursoActual] = useState(1);
  const [cursosPagina] = useState(6);
  const ultimoCurso = cursoActual * cursosPagina;
  const primerCurso = ultimoCurso - cursosPagina;

  let coursesPow = courses && courses.map((e) => durationCourse(e));
  const cursosActuales =
    coursesPow && coursesPow.slice(primerCurso, ultimoCurso);
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
  // useEffect(() => {
  //   if (userObj) {
  //     dispatch(getownPathCourse(userObj.user._id));
  //   }
  // }, [dispatch]);

  return (
    <div style={{ backgroundColor: "rgb(240, 240, 240)" }}>
      <div className="flex flex-col items-center justify-around px-5 py-10 lg:flex-row">
        {/* Paginated */}
        <div className="grid justify-items-center my-5">
          <Paginated
            setPagina={paginado}
            videos={courses && courses.length}
            videosPagina={cursosPagina}
            paginaActual={cursoActual}
            prev={prev}
            next={next}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-row-auto justify-items-center sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-5 mb-8">
        {cursosActuales &&
          cursosActuales.map((course, index) => (
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
                    src={course.course.image}
                    // src={course.course.image.url}
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
                      backgroundColor: "rgb(55, 109, 109)",
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                    className="mb-2 text-2xl font-bold tracking-tight text-gray-900"
                  >
                    {course.course.name}
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
                    textAlign: "center",
                  }}
                  className="mb-3 font-normal text-gray-700"
                >
                  {course.course.description}
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
                    textAlign: "center",
                  }}
                >
                  {/* <strong>Time Inversion: </strong>
                {finallyOneDuration(course.duration)} */}
                </span>
                <div
                  className="ml-5 mt-5"
                  style={{
                    display: "flex",
                    // borderLeft: "4px solid #60A5FA",
                  }}
                >
                  <h4
                    style={{
                      color: "rgb(201, 196, 184)",
                    }}
                  >
                    Score: {course.score}
                  </h4>
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: 15,
                  }}
                >
                  <button>
                    <NavLink
                      to={`/course/${course._id}`}
                      style={{
                        backgroundColor: "rgb(17, 52, 82)",
                        color: "rgb(201, 196, 184)",
                      }}
                      className="py-2.5 px-5 mr-2 mb-2 text-sm font-semi-bold focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                    >
                      Read more
                    </NavLink>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* <h2 className="bg-green-300 bg-gray-700">{favoritoAgregado}</h2> */}
    </div>
  );
  //   return (
  //     <div >

  //      <div className="grid grid-row-auto justify-items-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-8 mt-10">
  //           {scoringRender ? scoringRender.map((course, index) => (
  //             <div
  //               key={index}
  //               className="max-w-sm h-auto my-3 rounded overflow-hidden shadow-lg"
  //               style={{
  //                 maxWidth: 250,
  //                 height: 250,
  //                 backgroundColor: "rgb(17, 52, 82)",
  //                 marginTop: 5,
  //                 marginLeft: 10,
  //                 marginRight: 10,
  //                 marginBottom: 30,
  //                 borderRadius: 10,
  //               }}
  //             >
  //               <picture>
  //                 <NavLink to={`/course/${course.course._id}`}>
  //                   <img
  //                     className="rounded-t-lg object-cover"
  //                     src={course.course.image}
  //                     alt=""
  //                     style={{
  //                       minHeight: 100,
  //                       maxHeight: 100,
  //                       width: "70%",
  //                       objectFit: "cover",
  //                       borderTopLeftRadius: 10,
  //                       borderTopRightRadius: 10,
  //                       width: "200",
  //                     }}
  //                   />
  //                 </NavLink>
  //               </picture>

  //               <div>
  //                 <div>
  //                   <h5
  //                     style={{
  //                       fontSize: 12,
  //                       display: "flex",
  //                       color: "rgb(201, 196, 184)",
  //                       justifyContent: "center",
  //                       backgroundColor: "rgb(55, 109, 109)",
  //                       paddingTop: 10,
  //                       paddingBottom: 10,
  //                     }}
  //                     className="mb-2 text-2xl font-bold tracking-tight text-gray-900"
  //                   >
  //                     {course.course.name}
  //                   </h5>
  //                 </div>

  //                 {/*
  //                 <p
  //                   style={{
  //                     fontSize: 15,
  //                     display: "flex",
  //                     color: "rgb(201, 196, 184)",
  //                     justifyContent: "center",
  //                     minHeight: 180,
  //                     paddingLeft: 35,
  //                     paddingRight: 35,
  //                     paddingTop: 20,
  //                     textAlign: "center",
  //                   }}
  //                   className="mb-3 font-normal text-gray-700"
  //                 >
  //                   {course.course.description}
  //                 </p>

  //                 */}

  //                 <div
  //                   style={{
  //                     display: "flex",
  //                     justifyContent: "center",
  //                     alignContent: "center",
  //                     marginTop: 15,
  //                   }}
  //                 >
  //                   <button>
  //                     <NavLink
  //                       to={`/course/${course.course._id}`}
  //                       style={{
  //                         backgroundColor: "rgb(17, 52, 82)",
  //                         color: "rgb(201, 196, 184)",
  //                       }}
  //                       className=" py-2.5 px-5 mr-2 mb-2 text-sm font-semi-bold focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
  //                     >
  //                       Read more
  //                     </NavLink>
  //                   </button>

  //                 </div>
  //                 <div className='ml-5 mt-5'>

  //                       <h4
  //                       style={{

  //                         color: "rgb(201, 196, 184)",
  //                       }}
  //                       >Score: {course.score}</h4>
  //                   </div>

  //               </div>
  //             </div>
  //           )):<span>No tienes reviews en cursos</span>}
  //         </div>

  //   </div>
  // );
}

export default UserScoringCourse;
