import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { getFavorites, getUser, updateUser } from "../redux/actions";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const Favorites = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.programandoando);
  const { favoritesUser } = useSelector((state) => state.programandoando);
  let userActualizado = JSON.parse(JSON.stringify(user ? user : null));

  //usuario registrado
  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);

  //////////////////
  const [elminado, setEliminado] = useState();

  console.log(favoritesUser);
  useEffect(() => {
    if (userObj) {
      dispatch(getUser(userObj.user._id));

      dispatch(getFavorites(userObj.user._id));
    }
  }, [dispatch]);

  let favoritos = favoritesUser.map((cursos) => {
    return [JSON.stringify(cursos), cursos];
  });
  let favoritosMap = new Map(favoritos);

  let favoritosUnicos = [...favoritosMap.values()];

  /*let personasMap = personas.map(persona => {
    return [JSON.stringify(persona), persona]
});
let personasMapArr = new Map(personasMap); // Pares de clave y valor
let unicos = [...personasMapArr.values()];*/

  return (
    <div>
      
    <div  className="flex flex-row">
      {Object.entries(userActualizado).length === 0 ? (
        <span>CARGANDO</span>
      ) : (
       
        favoritosUnicos.map((elemento) => {
          return (
            <div
              key={elemento._id}
              className=""
              
            >
              <div class=""
                style={{
                  width: 350,
                  height: 250,
                  backgroundColor: "rgb(17, 52, 82)",
                  marginTop: 5,
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 30,
                  borderRadius: 10,
                }}
              
              >
               <button
                  onClick={() => {
                    const filteredfavorites = userActualizado.favorites.filter(
                      (item) => item._id !== elemento._id
                    );

                    userActualizado.favorites = filteredfavorites;

                    dispatch(updateUser(userActualizado, userActualizado._id));
                    setTimeout(function () {
                      dispatch(getUser(userActualizado._id));
                      dispatch(getFavorites(userActualizado._id));
                    }, 300);
                  }}
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5 text-center m-3 "
                >
                  X
                </button>
                <a href="#">
                  <h5 class="rounded-lg p-5 m-5 text-2xl font-bold tracking-tight text-gray-900 "
                    style={{
                      fontSize: 20,
                      display: "flex",
                      color: "rgb(201, 196, 184)",
                      justifyContent: "center",
                      backgroundColor: "rgb(55, 109, 109)",
                      paddingTop: 10,
                      paddingBottom: 10,
                      marginBottom:15,
                    }}
                  >
                    {elemento.name}
                  </h5>
                </a>
               
                <button>
                  <NavLink
                    to={`/course/${elemento._id}`}
                    style={{
                      backgroundColor: "rgb(17, 52, 82)",
                      color: "rgb(201, 196, 184)",
                    }}
                    className="m-10 py-2.5 px-5 mr-2 mb-2 text-sm font-semi-bold focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                  >
                    Read more
                  </NavLink>
                </button>
               
              </div>
            </div>
            
          );
        })
      )}
    </div>

    </div>
  );
};
