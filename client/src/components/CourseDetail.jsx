import React from "react";
import { CourseMoreDetail } from "./CourseMoreDetail";

export const CourseDetail = ({ element }) => {
  let el = element;

  return (
    <div className="grid mt-8 bg-gray-200 justify-items-center lg:justify-items-start lg:mx-32 lg:flex" style={{backgroundColor: 'rgb(240, 240, 240)'}}>
      <div >
        <img style={{maxHeight:100,maxWidth:150}} className="mb-5" src={el.image}></img> 
      </div>
      <div className="grid w-96 justify-items-center  lg:justify-items-start lg:w-10/12 lg:ml-10">
        <h2 style={{color: 'rgb(17, 52, 82)'}} className="text-lg font-bold mb-2 text-gray-700">{el.name}</h2>
        <div className="flex mb-5 font-medium text-sm text-center lg:text-start">
            {el.description}
        </div>
      </div>
   </div>
)
};
