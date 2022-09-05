import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSchools } from "../redux/actions";
import { useEffect } from "react";

export const DetailSchool = () => {

  const dispatch = useDispatch()
  const { schools } = useSelector((state) => state.programandoando)

  useEffect(() => {
    dispatch(getAllSchools());
  }, [dispatch]);

  let data = schools;

  return (
    <div >
      {data ? (
        data.map((elemento, index) => {
          let name = elemento.name;
          return (
            <div className="hover:bg-sky-900" key={index}>
              <NavLink
                style={{color: 'rgb(201, 196, 184)'}}
                className="text-white focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm mx-5 my-3 inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2"
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
