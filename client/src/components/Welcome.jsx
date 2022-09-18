import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Welcome = () => {
  const path = window.location.pathname;
  // console.log(window.location.pathname);

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
    <div className="container">
      <header className="jumbotron">
        {/* <h3>
            <strong>Account confirmed!</strong>
          </h3> */}
      </header>
      {/* <Link to={"/login"}> */}
      {/* Please Login */}
      {/* </Link> */}
      {Swal.fire({
        title: "Verification successfully",
        text: "Please now try login in ",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "http://localhost:3000/login";
        }
      })}
    </div>
  );
};

export default Welcome;
