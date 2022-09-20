import React from "react";
import { useState } from "react";
import { Favorites } from "./Favorites";
import NavBar from "./NavBar";
import UserCreatedCourse from "./UserCreatedCourse";
import UserScoringCourse from "./UserScoringCourse";
import Error404 from "./Error404";

export const FolderUser = () => {
  const [creados, setCreados] = useState("");
  const [score, setScore] = useState("");
  const [favoritos, setFavoritos] = useState("");

  let userLocal = window.localStorage.getItem("user");
  let userObj = userLocal && JSON.parse(userLocal);

  // console.log(userObj);

  const handleCreados = () => {
    if (creados === "") {
      setCreados("none");
    } else {
      setCreados("");
    }
  };
  const handleScore = () => {
    if (score === "") {
      setScore("none");
    } else {
      setScore("");
    }
  };

  const handleFavoritos = () => {
    if (favoritos === "") {
      setFavoritos("none");
    } else {
      setFavoritos("");
    }
  };

  return userObj !== null ? (
    <div style={{ backgroundColor: "rgb(240, 240, 240)" }}>
      <NavBar />
      <div style={{ marginLeft: "0%" }}>
        <div>
          <div className="flex justify-center">
            <button
              onClick={handleCreados}
              className="mt-5 -mb-2 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              Rutas creadas
            </button>
          </div>
          <div style={{ display: creados }}>
            <UserCreatedCourse />
          </div>
        </div>
        <div>
          <div className="flex justify-center">
            <button
              onClick={handleScore}
              className="-mb-2 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              Cursos votados
            </button>
          </div>
          <div style={{ display: score }}>
            <UserScoringCourse />
          </div>
        </div>
        <div>
          <div className="flex justify-center -mt-3">
            <button
              onClick={handleFavoritos}
              className="-mb-2 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              Favoritos
            </button>
          </div>
          <div style={{ display: favoritos }}>
            <Favorites />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Error404 />
  );
};
