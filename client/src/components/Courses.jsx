import React from "react";

import { NavLink, useLocation } from "react-router-dom";

import Video from "./Video";
import Course from "./Course";
import { Paginated } from "./Paginated";
import { Videos } from "./Videos";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSchools } from "../redux/actions";
import { useState } from "react";
import { CourseDetail } from "./CourseDetail";
import NavBar from "./NavBar";

function Courses() {
  const dispatch = useDispatch();

  const { schools } = useSelector((state) => state.programandoando);
  console.log(schools);
  const location = useLocation();
  const name = location.state;
  let cursos = schools;

  useEffect(() => {
    dispatch(getAllSchools());
  }, [dispatch]);

  let cursosfiltrados = [];
  for (let i = 0; i < cursos.length; i++) {
    if (cursos[i].name === name) {
      cursosfiltrados.push(cursos[i]);
    }
  }

  return (
    <div>
      <NavBar />
      <div>
        {cursosfiltrados.length > 0 ? (
          <div>
            <Course
              name={cursosfiltrados[0].name}
              description={cursosfiltrados[0].description}
            ></Course>
          </div>
        ) : (
          <span>error</span>
        )}
      </div>
      <div>
        {cursosfiltrados.length > 0 ? (
          cursosfiltrados.map((elemento, index) => {
            return (
              <div key={index}>
                <div>
                  {elemento.courses.map((el, index) => {
                    return (
                      <div className="justify-center" key={index}>
                        <CourseDetail element={el}></CourseDetail>
                        <div  style={{paddingLeft:"4%"}} >
                        <Videos videos={el.videos} name={name} idCourse={el._id}></Videos>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <span>Error span</span>
        )}
      </div>
    </div>
  );
}

export default Courses;
