import React from "react";
import { NavLink } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-sky-900 to-red-400">
      <div
        style={{ backgroundColor: "rgb(198, 198, 198)" }}
        className="px-40 py-20 bg-white rounded-md shadow-xl"
      >
        <div className="flex flex-col items-center">
          <h1
            style={{ color: "rgb(17, 52, 82)" }}
            className="font-bold text-gray-800 text-9xl"
          >
            404
          </h1>
          <h6
            style={{ color: "rgb(17, 52, 82)" }}
            className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl"
          >
            <span
              style={{ color: "rgb(168, 76, 101)" }}
              className="text-red-500"
            >
              Oops!
            </span>{" "}
            Page not found
          </h6>
          <p
            style={{ color: "rgb(17, 52, 82)" }}
            className="mb-8 text-center text-gray-500 md:text-lg"
          >
            The page you’re looking for doesn’t exist.
          </p>
          <NavLink to="/">
            <a
              href="#"
              style={{
                backgroundColor: "rgb(17, 52, 82)",
                color: "rgb(201, 196, 184)",
              }}
              className="px-6 py-2 text-sm rounded-md font-semibold text-gray-800 bg-blue-100"
            >
              Go home
            </a>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Error404;
