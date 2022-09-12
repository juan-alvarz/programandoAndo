import React, { useEffect } from "react";
import NavBar from "./NavBar";
import data from "../utils/data";
import Footer from "./Footer";
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
import Google from "./Google";

function Home() {
  const { video } = useSelector((state) => state.programandoando);
  const { idVideo } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.programandoando);
  
  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);
  // console.log(userObj.user.favorites);
<<<<<<< HEAD
  // console.log(userLocal)
  // console.log(userObj)
=======
>>>>>>> Juan
  
  const incomingFavorites = user.favorites
  console.log(incomingFavorites)
  
  useEffect(() => {
    // dispatch(getVideoById(idVideo));
    dispatch(getAllNotifications());
    if(userObj){
<<<<<<< HEAD
      (dispatch(getUser(userObj.user._id)))
    } 
   
    }, [dispatch]);
=======
      (dispatch(getUser(userObj.user._id))) 
      setTimeout( () => {
        dispatch(getFavorites(incomingFavorites))

      },4000 )   
    }
>>>>>>> Juan
    
  }, [dispatch]);
  
  
  
  const stat = useSelector( (state) => state.programandoando)
    console.log(stat)
  return (
    <div style={{ backgroundColor: "rgb(198, 198, 198)" }}>
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
      <Footer />
    </div>
  );
}

export default Home;
