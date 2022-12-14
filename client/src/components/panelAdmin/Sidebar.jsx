import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import arrowMenu from "../../utils/images/sidebar/control.png";
// import logo from "../../utils/images/sidebar/logo.png";
import logo from "../../utils/images/LOGOPA.png";
import Error404 from "../Error404";

function Sidebar() {
  const [click, setClick] = useState(0);
  const [open, setOpen] = useState(true);

  const path = window.location.pathname;

  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);

  let role = userObj && userObj.user.role;

  const menus = [
    { title: "Dashboard", href: "/", src: "ArrowWhite", id: 0 },
    { title: "Administrator", href: "/administrator", src: "Chart_fill", id: 1 },
    { title: "Banned", href: "/banned", src: "GhostBanned", id: 2 },

    { title: "Videos", href: "/videospa", src: "User", gap: true, id: 3 },
    { title: "Courses", href: "/coursespa", src: "User", id: 4 },
    { title: "Schools", href: "/schoolspa", src: "User", id: 5 },
    { title: "Users", href: "/userspa", src: "User", id: 6 }, 

    // { title: "Search", href: "", src: "Search", gap: true, id: 7 },
    // { title: "Setting", href: "/setting", src: "Setting", gap: true, id: 8 },
  ];
  return role === "admin" ? (
    <div className="flex">
      <div
        style={{ backgroundColor: "rgb(17, 52, 82)" }}
        className={`${
          open ? "w-60" : "w-20"
        } duration-300 h-screen p-5 pt-8 bg-blue-900 relative`}
      >
        <img
          src={arrowMenu}
          alt="arrowMenu"
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-blue-900 ${!open &&
            "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 justify-center">
          <img
            style={{ width: 150 }}
            src={logo}
            alt="logo"
            className={`cursor-pointer duration-500 ${open &&
              "rotate-[360deg]"}`}
          />
          {/* <h1
            className={`text-white origin-left font-medium text-xl duration-300 ${!open &&
              "scale-0"}`}
          >
            ProgramandoAndo
          </h1> */}
        </div>
        <ul className="pt-6">
          {menus.map((menu, index) => (
            <NavLink to={menu.href} key={index}>
              <li
                key={index}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-sky-900 rounded-md ${
                  menu.gap ? "mt-9" : "mt-2"
                } ${menu.href === path ? "bg-sky-900 bg-opacity-60" : ""}`}
                onClick={() => {
                  setClick(menu.id);
                }}
              >
                <img
                  
                  src={require(`../../utils/images/sidebar/${menu.src}.png`)}
                  alt="links"
                />
                <span
                  className={`${!open && "scale-0"} origin-left duration-200`}
                >
                  {menu.title}
                </span>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
      {/* <div className="p-7 text-2x1 font-semibold flex h-screen">
        <h1>Home Page</h1>
      </div> */}
    </div>
  ) : (
    <Error404 />
  );
}

export default Sidebar;
