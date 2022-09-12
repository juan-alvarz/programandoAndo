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
      <div style={{backgroundColor: 'rgb(240, 240, 240)', height: '100vh'}}>
        <NavBar />
        <div className="justify-center">
          <div className="grid mt-8 bg-gray-200 justify-items-center lg:justify-items-start lg:mx-32 lg:flex" style={{backgroundColor: 'rgb(240, 240, 240)'}}>
            <div >
              <img
                style={{maxHeight:100,maxWidth:150}} 
                className="mb-5"
                src={course.image}
              ></img>
            </div>
            <div className="grid w-96 justify-items-center  lg:justify-items-start lg:w-10/12 lg:ml-10">
              <h2
                style={{color: 'rgb(17, 52, 82)'}} 
                className="text-lg font-bold mb-2 text-gray-700"
              >
                {course.name}
              </h2>
              <div
                className="flex mb-5 font-medium text-sm text-center lg:text-start"
              >
                {course.description}
              </div>
            </div>
          </div>
          <Videos videos={window.courseSelect.videos} idCourse={idCourse} />
        </div>
      </div>
    );
  }
}