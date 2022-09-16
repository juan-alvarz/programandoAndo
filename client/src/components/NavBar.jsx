import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { DetailSchool } from "./DetailSchool";
import img from "../utils/images/LOGOCOMPLETOPA.png";
import { useSelector } from 'react-redux'
import Notifications from './Notifications'
import NavBarLogin from './NavBarLogin'
import NavBarLogout from './NavBarLogout'
import NavBarUser from "./NavBarUser";

export default function NavBar() {

  const usuario = window.localStorage.getItem('user')
  function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  const { notifications } = useSelector((state) => state.programandoando);
  // console.log(usuario.user)

  return (
    usuario ? 
    <NavBarLogin delete_cookie={delete_cookie}/>
    :
    <NavBarLogout />
  );
}