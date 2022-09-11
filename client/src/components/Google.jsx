import React from "react";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { createsUser, googleUserLogin } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Google() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const handleCallbackResponse = async (response) => {
    const token = response.credential;
    // console.log(token)
    // console.log("Encoded JWT ID TOKEN: " + response.credential);
    let userObject = jwt_decode(response.credential);

    dispatch(googleUserLogin({ token })).then((r) => console.log(r));

    // console.log(userObject);
    setUser(userObject);

    document.getElementById("googleSign").hidden = true;
    navigate('/')
  };

  console.log(user);

  const handleSignOut = (event) => {
    setUser({});
    document.getElementById("googleSign").hidden = false;
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "595173528563-62kj2r0qatrvjl30lgal6kghk7m4envk.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("googleSign"), {
      theme: "outline",
      size: "large",
    });
    // google.accounts.id.prompt();
  }, []);
  //If we have no user: sign in button
  //If we have user: show the log out button

  return (
    <div>
      <div id="googleSign"></div>
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}
