import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { DetailSchool } from "./DetailSchool";
import img from "../utils/images/LOGOCOMPLETOPA.png";
import { useSelector } from "react-redux";
import Notifications from "./Notifications";
import NavBarUser from "./NavBarUser";
import NavBarAdmin from "./NavBarAdmin";

function NavBarLogin({ delete_cookie }) {
  const usuario = window.localStorage.getItem("user");
  let userObj = JSON.parse(usuario);
  const rolUser = userObj.user.role;

  return rolUser === "user" ? (
    <NavBarUser delete_cookie={delete_cookie} />
  ) : (
    <NavBarAdmin delete_cookie={delete_cookie} />
  );
}

export default NavBarLogin;
