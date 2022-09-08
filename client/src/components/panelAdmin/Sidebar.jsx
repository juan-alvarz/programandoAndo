import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import arrowMenu from "../../utils/images/sidebar/control.png";
import logo from "../../utils/images/sidebar/logo.png";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const menus = [
    { title: "Dashboard", href: "/", src: "Chart_fill" },
    { title: "Administrator", href: "/administrator", src: "Chat" },
    { title: "Baneos", href: "/baneos", src: "Folder" },

    { title: "Videos", href: "/videospa", src: "User", gap: true },
    { title: "Courses", href: "/coursespa", src: "User" },
    { title: "Schools", href: "/schoolspa", src: "User" },
    { title: "Users", href: "/userspa", src: "User" },

    { title: "Search", href: "", src: "Search", gap: true },
    { title: "Setting", href: "", src: "Setting" },
  ];
  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } duration-300 h-screen p-5 pt-8 bg-blue-900 relative`}
      >
        <img
          src={arrowMenu}
          alt="arrowMenu"
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-blue-900 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            alt="logo"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            ProgramandoAndo
          </h1>
        </div>
        <ul className="pt-6">
          {menus.map((menu, index) => (
            <NavLink to={menu.href}>
              <li
                key={index}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-white rounded-md ${
                  menu.gap ? "mt-9" : "mt-2"
                } ${index === 0 && "bg-white bg-opacity-50"}`}
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
  );
}

export default Sidebar;
