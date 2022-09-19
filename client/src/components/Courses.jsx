import React from "react";
import Loader from "./Loader";

import { NavLink, useLocation } from "react-router-dom";

import Video from "./Video";
import Course from "./Course";
import { Paginated } from "./Paginated";
import { Videos } from "./Videos";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSchools, getUser } from "../redux/actions";
import { useState } from "react";
import { CourseDetail } from "./CourseDetail";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Courses() {
  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);
  let idUser = userObj.user._id;

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllNotifications());
    dispatch(getUser(idUser));
  }, [dispatch]);

  const { schools } = useSelector((state) => state.programandoando);
  // console.log(schools);
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
  // console.log(cursosfiltrados)

  // -------------------------------
  let durationCourse = (course) => {
    let temporaly = course.map((e) => e.duration);

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

  //-----------------------------------------------

  return (
    <div style={{ backgroundColor: "rgb(240, 240, 240)" }}>
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
          <Loader />
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
                      <div
                        key={index}
                        className="lg:mx-32 lg:border-t-2 lg:py-5 lg:my-5"
                      >
                        <CourseDetail element={el}></CourseDetail>
                        <div>
                          <Videos
                            videos={el.videos}
                            name={name}
                            idCourse={el._id}
                          ></Videos>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Courses;
