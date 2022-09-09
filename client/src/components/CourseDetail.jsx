import React from "react";
import { CourseMoreDetail } from "./CourseMoreDetail";

export const CourseDetail = ({ element }) => {
  let el = element;

  return (
    <div className="grid justify-items-center mt-4  bg-gray-200 pt-5 border-t-4">
        <div>
           <img style={{maxHeight:100,maxWidth:150}} className="mb-5" src={el.image}></img> 
        </div>
        <h2 style={{color: 'rgb(17, 52, 82)'}} className="text-lg font-bold mb-2 text-gray-700">{el.name}</h2>
        <div className="flex mb-5 w-96 justify-center text-center font-medium text-sm">
            {el.description}
        </div>
   </div>
)
};
