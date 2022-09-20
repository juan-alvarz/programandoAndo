import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUser, getownPathCourse } from "../redux/actions";
import { Paginated } from "./Paginated";

function UserCreatedCourse({}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.programandoando);
  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);

  useEffect(() => {
    if (userObj) {
      // dispatch(getownPathCourse(userObj.user._id));
      dispatch(getUser(userObj.user._id));
    }
  }, [dispatch]);
  const schools = user && user.ownPath;
  // console.log(schools);
  // console.log(user);
  let durationCourse = (school) => {
    let temporaly = school && school.courses.map((e) => e.duration);

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
      ...school,
      duration: oneDuration,
    };

    return object;
  };

  // =============== Paginado ==========================
  const [cursoActual, setCursoActual] = useState(1);
  const [cursosPagina] = useState(5);
  const ultimoCurso = cursoActual * cursosPagina;
  const primerCurso = ultimoCurso - cursosPagina;

  let schoolPow = schools && schools.map((e) => durationCourse(e));
  // console.log(schoolPow);
  const cursosActuales = schoolPow && schoolPow.slice(primerCurso, ultimoCurso);
  const prev = () => {
    if (cursoActual > 1) {
      setCursoActual(cursoActual - 1);
    }
  };
  const next = () => {
    if (cursoActual < Math.ceil(schools.length / cursosPagina)) {
      setCursoActual(cursoActual + 1);
    }
  };
  const paginado = (numeroPagina) => {
    setCursoActual(numeroPagina);
  };

  return (
    <div style={{ backgroundColor: "rgb(240, 240, 240)" }}>
      <div className="flex flex-col items-center justify-around px-5 py-3 lg:flex-row ">
        {/* Paginated */}
        <div className="grid justify-items-center my-5">
          <Paginated
            setPagina={paginado}
            videos={schools && schools.length}
            videosPagina={cursosPagina}
            paginaActual={cursoActual}
            prev={prev}
            next={next}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-row-auto justify-items-center sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-5 mb-5">
        {cursosActuales &&
          cursosActuales.map((course, index) => (
            <div
              key={index}
              className="max-w-sm h-auto my-3 rounded overflow-hidden shadow-lg"
              style={{
                maxWidth: 400,
                height: 400,
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
                    src={course.image.url}
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
                    textAlign: "center",
                  }}
                  className="mb-3 font-normal text-gray-700"
                >
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
                    textAlign: "center",
                  }}
                >
                  {/* <strong>Time Inversion: </strong>
                {finallyOneDuration(course.duration)} */}
                </span>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: -120,
                  }}
                >
                  <button>
                    <NavLink
                      to={`/school/${course._id}`}
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

  //==============================UWU====================================

  // return (
  //   <div>
  //     <div className="grid grid-row-auto justify-items-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-8 mt-10">
  //       {ownPath ? (
  //         ownPath.map((course, index) => (
  //           <div
  //             key={index}
  //             className="max-w-sm h-auto my-3 rounded overflow-hidden shadow-lg"
  //             style={{
  //               maxWidth: 270,
  //               height: 300,
  //               backgroundColor: "rgb(17, 52, 82)",
  //               marginTop: 5,
  //               marginLeft: 10,
  //               marginRight: 10,
  //               marginBottom: 30,
  //               borderRadius: 10,
  //             }}
  //           >
  //             <picture>
  //               <NavLink to={`/course/${course._id}`}>
  //                 <img
  //                   className="rounded-t-lg object-cover"
  //                   src={course.image.url}
  //                   alt=""
  //                   style={{
  //                     minHeight: 120,
  //                     maxHeight: 170,
  //                     width: "70%",
  //                     objectFit: "cover",
  //                     borderTopLeftRadius: 10,
  //                     borderTopRightRadius: 10,
  //                     width: "500px",
  //                   }}
  //                 />
  //               </NavLink>
  //             </picture>

  //             <div>
  //               <div>
  //                 <h5
  //                   style={{
  //                     fontSize: 15,
  //                     display: "flex",
  //                     color: "rgb(201, 196, 184)",
  //                     justifyContent: "center",
  //                     backgroundColor: "rgb(55, 109, 109)",
  //                     paddingTop: 10,
  //                     paddingBottom: 10,
  //                   }}
  //                   className="mb-2 text-2xl font-bold tracking-tight text-gray-900"
  //                 >
  //                   {course.name}
  //                 </h5>
  //               </div>

  //               <div
  //                 style={{
  //                   display: "flex",
  //                   justifyContent: "center",
  //                   alignContent: "center",
  //                   marginTop: 15,
  //                 }}
  //               >
  //                 <button>
  //                   <NavLink
  //                     to={`/course/${course._id}`}
  //                     style={{
  //                       backgroundColor: "rgb(17, 52, 82)",
  //                       color: "rgb(201, 196, 184)",
  //                     }}
  //                     className=" py-2.5 px-5 mr-2 mb-2 text-sm font-semi-bold focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
  //                   >
  //                     Read more
  //                   </NavLink>
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         ))
  //       ) : (
  //         <span>No tienes cursos creados</span>
  //       )}
  //     </div>
  //   </div>
  // );
}

export default UserCreatedCourse;
