import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getScoring } from "../redux/actions";
import NavBar from './NavBar';
import Footer from './Footer';
import Loader from './Loader';
import { CourseDetail } from './CourseDetail';
import { Videos } from './Videos';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';



function UserScoringCourse() {

  const dispatch = useDispatch();
  const { scoring } = useSelector((state) => state.programandoando);
  

  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);

  useEffect(() => {
  if (userObj) {
      dispatch(getScoring(userObj.user._id));
      
  }
 
  }, [dispatch]);
  console.log("componente")
  
  console.log(scoring)
  


  

  return (
    <div style={{backgroundColor: 'rgb(240, 240, 240)'}}>
      
     <div className="grid grid-row-auto justify-items-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-8 mt-10">
          {scoring.map((course, index) => (
            <div
              key={index}
              className="max-w-sm h-auto my-3 rounded overflow-hidden shadow-lg"
              style={{
                maxWidth: 350,
                height: 300,
                backgroundColor: "rgb(17, 52, 82)",
                marginTop: 5,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 30,
                borderRadius: 10,
              }}
            >
              <picture>
                <NavLink to={`/course/${course.course._id}`}>
                  <img
                    className="rounded-t-lg object-cover"
                    src={course.course.image}
                    alt=""
                    style={{
                      minHeight: 120,
                      maxHeight: 170,
                      width: "70%",
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

                {/*
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

                */}
                
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
                      to={`/course/${course.course._id}`}
                      style={{
                        backgroundColor: "rgb(17, 52, 82)",
                        color: "rgb(201, 196, 184)",
                      }}
                      className=" py-2.5 px-5 mr-2 mb-2 text-sm font-semi-bold focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                    >
                      Read more
                    </NavLink>
                  </button>
                </div>
               
              </div>
            </div>
          ))}
        </div>
   
  </div>
);
  
}

export default UserScoringCourse