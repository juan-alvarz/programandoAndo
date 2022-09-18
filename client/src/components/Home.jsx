import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Puntuation from "./Puntuation";
import PuntuationNotLogged from "./PuntuationNotLogged";
import Foro from "./Foro";
import ForoNotLogged from "./ForoNotLogged";
import SearchBar from "./SearchBar";
import {
  getVideoById,
  clearFilter,
  getAllNotifications,
  getUser,
  getFavorites,
} from "../redux/actions";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "./Carousel";
import img from "../utils/images/LAPTOPVIDEOS.png";
import axios from "axios";
import Chat from "./Chat";
import PWA from "./PWA";

function Home() {
  const { video } = useSelector((state) => state.programandoando);
  const { idVideo } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.programandoando);

  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);

  const incomingFavorites = user.favorites;

  let verified = userObj && userObj.user.status;

  console.log(document.cookie);

  // delete_cookie("github-jwt")

  useEffect(() => {
    // dispatch(getVideoById(idVideo));
    dispatch(getAllNotifications());
    if (userObj) {
      dispatch(getUser(userObj.user._id));
      dispatch(getFavorites(userObj.user._id));
    }
  }, [dispatch]);

  useEffect(() => {
    (async function() {
      const usr = await axios
        .get(`http://localhost:3001/api/auth/me`, {
          withCredentials: true,
        })
        .then((res) => res.data);
      if (usr) {
        // console.log(usr.decoded._id);
        dispatch(getUser(usr.decoded._id));
        dispatch(getFavorites(usr.decoded._id));
        window.localStorage.setItem(
          "user",
          JSON.stringify({ token: usr.tokenJwt, user })
        );
      }
    })();
  }, [Object.keys(user).length !== 0]);

  const stat = useSelector((state) => state.programandoando);
  // window.location.href = "/";

  // console.log(stat);
  return (
    <div style={{ backgroundColor: "rgb(240, 240, 240)" }}>
      <NavBar />
      <div class="py-10">
        <div
          style={{ backgroundColor: "rgb(17, 52, 82)" }}
          class="px-10 py-2 container m-auto sm:px-24 sm:py-6 rounded-xl"
        >
          <div class="lg:flex justify-between items-center">
            <div class="lg:w-6/12 lg:p-0 p-7">
              <h1
                style={{ color: "rgb(201, 196, 184)" }}
                class="text-xl sm:text-3xl font-bold leading-tight mb-3 capitalize "
              >
                {" "}
                THE ONLY THING YOU NEED TO DO IS TO TAKE THE DECISION TO START
                STUDYING. THE WAY IS GIVEN TO YOU BY US{" "}
              </h1>
              <br />
              <p
                style={{ color: "rgb(201, 196, 184)" }}
                class="text-xs font-light sm:text-lg"
              >
                {" "}
                This platform has been developed in order to solve a common
                problem that people who want to study programming have. Here are
                offered free and ordered study routes using videos and
                information found on the internet, providing the sources of
                information to generate a thank you and greater visibility to
                people who are committed to teach for free.{" "}
              </p>
            </div>
            <div class="lg:w-5/12 order-2">
              <img src={img} alt="" class="rounded" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Carousel />
      </div>
      <PWA />
      {userObj ? <Puntuation /> : <PuntuationNotLogged />}
      <br></br>
      <br></br>
      <br></br>
      <h1>ACA ABAJO EL FORO GENERAL</h1>
      <br></br>
      <br></br>
      <br></br>
      {userObj ? <Foro /> : <ForoNotLogged />}
      <div
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
        }}
      >
        <Chat />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
