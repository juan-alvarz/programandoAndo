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
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Account confirmed!</strong>
        </h3>
      </header>
      <Link to={"/login"}>Please Login</Link>
    </div>
  );
};

export default Welcome;
