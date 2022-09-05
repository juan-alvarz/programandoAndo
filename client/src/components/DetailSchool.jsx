import React from "react";
import { NavLink } from "react-router-dom";
import data1 from "../utils/data"; 

export const DetailSchool = () => {
  let data = data1;
  return (
    <div >
      {data ? (
        data.map((elemento, index) => {
          let name = elemento.name;
          return (
            <div key={index}>
              <NavLink
                className="text-white bg-gray-700 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2"
                style={{ margin: 10, padding: 3, borderRadius: 3 }}
                to="/courses"
                state={(name = name)}
              >
                {elemento.name}
              </NavLink>
            </div>
          );
        })
      ) : (
        <span>Error</span>
      )}
    </div>
  );
};
