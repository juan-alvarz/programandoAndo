import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSchools } from "../redux/actions";
import { useEffect } from "react";

export const DetailSchool = () => {
  const dispatch = useDispatch();
  const { schools } = useSelector((state) => state.programandoando);

  useEffect(() => {
    dispatch(getAllSchools());
  }, [dispatch]);

  let data = schools;
  let dataCustomFalse = []
console.log(data)
  for (let i = 0; i < data.length; i++){
    if (data[i].custom === false)
      dataCustomFalse.push(data[i])
  }

  return (
    <div>
      {dataCustomFalse ? (
        dataCustomFalse.map((elemento, index) => {
          let name = elemento.name;
          return (
            <div className="hover:bg-sky-900" key={index}>
              <NavLink
                style={{ color: "rgb(201, 196, 184)", width: "100%", height: '100%' }}
                className="text-white font-medium rounded-lg text-sm px-5 py-3 inline-flex items-center"
                to="/courses"
                state={(name = name)}
              >
                <div>
                  {elemento.name}
                </div>
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