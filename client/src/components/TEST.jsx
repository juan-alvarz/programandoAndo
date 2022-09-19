import axios from "axios";
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { getUser, updateUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";import logo from "../utils/images/LOGOPA.png";

function TEST() {
  const userToUpdate = { username: "Leo Messi" };
  const amount = 45
  const currentAmount = 3
  return (
    <div style={{ backgroundColor: "rgb(240, 240, 240)", height: "100vh" }}>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "60%",
          margin: "auto",
          paddingTop: "35px",
        }}
      >
          <h1 className="text-2xl font-bold" style={{ color: "rgb(55, 109, 109)" }}>Success Donation!</h1>
        <div
          className="max-w-2xl text-sm text-center md:text-md md:text-left md:text lg:text-lg leading-tight my-2"
          style={{
            textAlign: "center",
            paddingTop: "15px",
            paddingBottom: "15px",
          }}
        >
          <span>
            Thanks for contributing to the page, remember that all the content
            is totally free, the donation helps to keep the page and now you
            enter the list of people who have helped keep it going, here you are
            a special gift for you, keep it learning!
          </span>
        </div>
        <div className="flex rounded-lg border border-blue-800 border shadow-md md:flex-row md:max-w-xl" style={{marginTop: 40}}>
              <div className="flex items-center rounded-l-lg" style={{backgroundColor: "rgb(17, 52, 82)", padding: "5px", width: 350}}>
                <img
                  style={{backgroundColor: "rgb(17, 52, 82)"}}
                  class="px-3 h-96 rounded-l-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={logo}
                  alt="not found"
                />
              </div>
              <div className="p-5 bg-white">
                <div
                  class="flex flex-col justify-between p-4 leading-normal"
                >
                  <h5
                    class="mb-2 text-2xl font-bold tracking-tight"
                    style={{ color: "rgb(55, 109, 109)" }}
                  >
                    {userToUpdate.username} is a new contributor!
                  </h5>
                  <p
                    class="mb-3 font-normal"
                    
                  >
                    We want to thank <strong>{userToUpdate.username}</strong> for
                    contributing to <strong style={{ color: "rgb(168, 76, 101)" }}>ProgramandoAndo</strong> and help
                    support it, voluntarily contributing {amount} USD and has
                    collaborated with {amount + currentAmount} USD in total.
                    <br />
                    Thanks you so much {userToUpdate.username}
                  </p>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}

export default TEST;