import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourse } from "../redux/actions";
import { Videos } from "./Videos";
import NavBar from "./NavBar";
import Loader from "./Loader";
export default function OneCourseDetail() {
  const { idCourse } = useParams();
  const { course } = useSelector((state) => state.programandoando);

  window.courseSelect = course;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourse(idCourse));
  }, [dispatch]);

  console.log(course);

  if (!Object.keys(course).length) {
    <Loader />;
  } else {
    return (
      <div>
        <NavBar />
        <div className="justify-center">
          <div className="grid justify-items-center mt-4  bg-gray-200 pt-5 border-t-4 border-indigo-300">
            <h2
              className="text-2xl mb-10"
              style={{ fontWeight: "600", fontSize: "1.5rem" }}
            >
              {course.name}
            </h2>
            <span
              style={{ fontSize: "1.2rem", textAlign: "center", width: "50%" }}
            >
              {course.description}
            </span>
            <div className="mt-10 ">
              <img
                style={{ maxHeight: 150, maxWidth: 300, borderRadius: "5px" }}
                className="mb-10"
                src={course.image}
              ></img>
            </div>
          </div>
          <Videos videos={window.courseSelect.videos} idCourse={idCourse} />
        </div>
      </div>
    );
  }
}