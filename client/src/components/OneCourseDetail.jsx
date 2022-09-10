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
      <div style={{backgroundColor: 'rgb(198, 198, 198)', height: '100vh'}}>
        <NavBar />
        <div className="justify-center">
          <div className="grid justify-items-center  bg-gray-200 pt-5 border-t-4">
            <div >
              <img
                style={{maxHeight:100,maxWidth:150}} 
                className="mb-5"
                src={course.image}
              ></img>
            </div>
            <h2
              style={{color: 'rgb(17, 52, 82)'}} 
              className="text-lg font-bold mb-2 text-gray-700"
            >
              {course.name}
            </h2>
            <span
              className="flex mb-5 w-96 justify-center text-center font-medium text-sm"
            >
              {course.description}
            </span>
          </div>
          <Videos videos={window.courseSelect.videos} idCourse={idCourse} />
        </div>
      </div>
    );
  }
}