import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Welcome = () => {
  const path = window.location.pathname;
  console.log(window.location.pathname);
  const { confirmationCode } = useParams();

  const verifyUser = async (code) => {
    const response = await axios.get(
      `http://localhost:3001/api/users/auth/confirm/${code}`
    );
    return response.data;
  };

  if (path === `/confirm/${confirmationCode}`) {
    verifyUser(confirmationCode);
  }

  return (
    <div
      className=" flex h-screen justify-center items-center "
      style={{ backgroundColor: "rgb(240,240,240)" }}
    >
      <div className="block p-6 rounded-lg shadow-2xl bg-white max-w-sm">
        <h5
          className="text-blue-900 text-2xl  leading-tight font-bold mb-2 text-center"
          style={{ color: "#376D6D" }}
        >
          Account confirmed!
        </h5>
        <p className="text-black text-xl my-10 font-semibold text-center">
          The confirmation of your email was successful. Press the button to go
          to <span style={{ color: "#A84C65" }}>"Login"</span>.
        </p>
        <div className="flex justify-end">
          <Link to={"/login"}>
            <button
              type="button"
              className=" inline-block px-6  py-2.5 text-white  font-bold text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
              style={{
                background: "#376D6D",
              }}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
