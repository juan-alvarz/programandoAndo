import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { getFavorites, getUser, updateUser } from "../redux/actions";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Paginated } from "./Paginated";
import HearthFav from "./HearthFav";

export const Favorites = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.programandoando);

  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);

  useEffect(() => {
    if (userObj) {
      dispatch(getUser(userObj.user._id));
    }
  }, [dispatch]);

  const courses = user && user.favorites;
  // console.log(courses);
  // console.log(user);
  // let durationCourse = (course) => {
  //   console.log(course);
  //   let temporaly = course && course.map((e) => e.duration);
  //   console.log(temporaly);

  //   const toSeconds = (time) => {
  //     if (time.length > 5) {
  //       let parse = time.split(":");
  //       let newParse = [
  //         parseInt(parse[0]) * 3600,
  //         parseInt(parse[1], 10) * 60,
  //         parseInt(parse[2], 10),
  //       ];
  //       let sumParse = newParse[0] + newParse[1] + newParse[2];
  //       return sumParse;
  //     }
  //     if (time.length <= 5) {
  //       let parse = time.split(":");
  //       let newParse = [parseInt(parse[0], 10) * 60, parseInt(parse[1], 10)];
  //       let sumParse = newParse[0] + newParse[1];
  //       return sumParse;
  //     }
  //   };
  //   let secondsDuration = temporaly.map((e) => toSeconds(e));

  //   let oneDuration = secondsDuration.reduce((sum, a) => sum + a, 0);

  //   let object = {
  //     ...course,
  //     duration: oneDuration,
  //   };

  //   return object;
  // };

  // =============== Paginado ==========================
  const [cursoActual, setCursoActual] = useState(1);
  const [cursosPagina] = useState(6);
  const ultimoCurso = cursoActual * cursosPagina;
  const primerCurso = ultimoCurso - cursosPagina;

  let coursesPow = courses;
  // let coursesPow = courses && courses.map((e) => durationCourse(e));

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
      <div className="flex flex-col items-center justify-around px-5 py-3 lg:flex-row">
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
      <div className="grid grid-row-auto justify-items-center sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-5 mb-5">
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
                    src={course.image}
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
                    {course.name}
                  </h5>
                </div>
                {/* <p
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
                </p> */}
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
                {/* <div className="ml-5 mt-5">
                  <h4
                    style={{
                      color: "rgb(201, 196, 184)",
                    }}
                  >
                    Score: {course.score}
                  </h4>
                </div> */}
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
                  {userLocal && <HearthFav course={course} userObj={userObj} />}
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* <h2 className="bg-green-300 bg-gray-700">{favoritoAgregado}</h2> */}
    </div>
  );
  //   const dispatch = useDispatch();
  //   const { user } = useSelector((state) => state.programandoando);
  //   const { favoritesUser } = useSelector((state) => state.programandoando);
  //   let userActualizado = JSON.parse(JSON.stringify(user ? user : null));

  //   //usuario registrado
  //   let userLocal = window.localStorage.getItem("user");
  //   let userObj = JSON.parse(userLocal);

  //   //////////////////
  //   const [elminado, setEliminado] = useState();

  //   console.log(favoritesUser);
  //   useEffect(() => {
  //     if (userObj) {
  //       dispatch(getUser(userObj.user._id));

  //       dispatch(getFavorites(userObj.user._id));
  //     }
  //   }, [dispatch]);

  //   let favoritos = favoritesUser.map((cursos) => {
  //     return [JSON.stringify(cursos), cursos];
  //   });
  //   let favoritosMap = new Map(favoritos);

  //   let favoritosUnicos = [...favoritosMap.values()];

  //   /*let personasMap = personas.map(persona => {
  //     return [JSON.stringify(persona), persona]
  // });
  // let personasMapArr = new Map(personasMap); // Pares de clave y valor
  // let unicos = [...personasMapArr.values()];*/

  //   return (
  //     <div>

  //     <div  className="flex flex-row">
  //       {Object.entries(userActualizado).length === 0 ? (
  //         <span>CARGANDO</span>
  //       ) : (

  //         favoritosUnicos.map((elemento) => {
  //           return (
  //             <div
  //               key={elemento._id}
  //               className=""

  //             >
  //               <div class=""
  //                 style={{
  //                   width: 350,
  //                   height: 200,
  //                   backgroundColor: "rgb(17, 52, 82)",
  //                   marginTop: 5,
  //                   marginLeft: 10,
  //                   marginRight: 10,
  //                   marginBottom: 30,
  //                   borderRadius: 10,
  //                 }}

  //               >
  //                <button
  //                   onClick={() => {
  //                     const filteredfavorites = userActualizado.favorites.filter(
  //                       (item) => item._id !== elemento._id
  //                     );

  //                     userActualizado.favorites = filteredfavorites;

  //                     dispatch(updateUser(userActualizado, userActualizado._id));
  //                     setTimeout(function () {
  //                       dispatch(getUser(userActualizado._id));
  //                       dispatch(getFavorites(userActualizado._id));
  //                     }, 300);
  //                   }}
  //                   className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5 text-center m-3 "
  //                 >
  //                   X
  //                 </button>
  //                 <a href="#">
  //                   <h5 class="rounded-lg p-5 m-5 text-2xl font-bold tracking-tight text-gray-900 "
  //                     style={{
  //                       fontSize: 15,
  //                       display: "flex",
  //                       color: "rgb(201, 196, 184)",
  //                       justifyContent: "center",
  //                       backgroundColor: "rgb(55, 109, 109)",
  //                       paddingTop: 10,
  //                       paddingBottom: 10,
  //                       marginBottom:15,
  //                     }}
  //                   >
  //                     {elemento.name}
  //                   </h5>
  //                 </a>

  //                 <button>
  //                   <NavLink
  //                     to={`/course/${elemento._id}`}
  //                     style={{
  //                       backgroundColor: "rgb(17, 52, 82)",
  //                       color: "rgb(201, 196, 184)",
  //                     }}
  //                     className="m-10 py-2.5 px-5 mr-2 mb-2 text-sm font-semi-bold focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
  //                   >
  //                     Read more
  //                   </NavLink>
  //                 </button>

  //               </div>
  //             </div>

  //           );
  //         })
  //       )}
  //     </div>

  //     </div>
  //   );
};
