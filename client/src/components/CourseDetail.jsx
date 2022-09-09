import React from "react";
import { CourseMoreDetail } from "./CourseMoreDetail";

export const CourseDetail = ({ element }) => {
  let el = element;

  return (
    <div className="grid justify-items-center mt-4  bg-gray-200 pt-5 border-t-4 border-indigo-300">
      <h2 className="text-2xl mb-10 text-gray-700">{el.name}</h2>
      <div className='"block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"'>
        <p>{el.description}</p>
      </div>
      <div className="mt-10 ">
        <img
          style={{ maxHeight: 150, maxWidth: 300 }}
          className="mb-10"
          src={el.image}
        ></img>
      </div>
      <h2
        style={{ color: "rgb(17, 52, 82)" }}
        className="text-lg font-bold mb-2 text-gray-700"
      >
        {el.name}
      </h2>
      <div className="flex mb-5 w-96 justify-center text-center font-medium text-sm">
        {el.description}
      </div>
    </div>
  );
};
