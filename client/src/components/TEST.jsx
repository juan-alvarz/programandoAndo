import axios from "axios";
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { getUser, updateUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";import logo from "../utils/images/LOGOPA.png";

function TEST() {
  
    return (
      <div>COMPONENTE PARA PROBAR COSAS QUE SE ROMPEN</div>
    )
}

export default TEST;