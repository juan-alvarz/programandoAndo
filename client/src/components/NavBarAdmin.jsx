import React, { useEffect } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { DetailSchool } from "./DetailSchool";
import img from "../utils/images/LOGOCOMPLETOPA.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications, getUser } from "../redux/actions";
import axios from "axios";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Courses", href: "/allCourses", current: false },
  { name: "About us", href: "/aboutUs", current: false },
  { name: "Create route", href: "/createCourse", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBarAdmin({ delete_cookie }) {
  const { user } = useSelector((state) => state.programandoando);
  // console.log(user);
  const imgUser = Object.keys(user).length !== 0 && user.image.url;
  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);
  let idUser = userObj.user._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.programandoando);

  useEffect(() => {
    dispatch(getAllNotifications());
    dispatch(getUser(idUser));
  }, [dispatch]);

  const handlelogout = async (e) => {
    e.preventDefault();

    window.localStorage.removeItem("user");
    delete_cookie("github-jwt");
    // let uwu = await axios.get('http://localhost:3001/api/auth/clear')
    // console.log(uwu);
    setTimeout(function() {
      navigate("/");
    }, 1000);
  };

  const duration = (props) => {
    let today = new Date();
    let nowMillisec = today.getTime();
    let notifMillisec = Date.parse(props);
    let difMillisec = nowMillisec - notifMillisec;

    let seconds = (difMillisec / 1000).toFixed(0);
    let minutes = (difMillisec / (1000 * 60)).toFixed(0);
    let hours = (difMillisec / (1000 * 60 * 60)).toFixed(0);
    let days = (difMillisec / (1000 * 60 * 60 * 24)).toFixed(0);

    if (seconds < 60) {
      return "a few moments ago";
    } else if (minutes < 60) {
      return minutes + " minutes ago";
    } else if (hours < 24) {
      return hours + " hours ago";
    } else {
      return days + " days";
    }
  };

  return (
    <Disclosure
      as="nav"
      style={{ backgroundColor: "rgb(17, 52, 82)" }}
      className="bg-gray-800"
    >
      {({ open }) => {
        return (
          <>
            <div className="max-w-full px-2 sm:px-6">
              <div className="relative flex h-20 items-center justify-center lg:justify-around">
                <div className="flex items-center w-96 justify-center lg:items-stretch lg:justify-center">
                  <NavLink to="/">
                    <img
                      className="block h-12 w-auto lg:hidden"
                      src={img}
                      alt="Workflow"
                    />
                    <img
                      className="hidden h-12 w-auto lg:block"
                      src={img}
                      alt="Workflow"
                    />
                  </NavLink>
                </div>
                <div>
                  <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-center">
                    <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                      {/* Mobile menu button*/}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="hidden lg:ml-5 lg:block">
                      <Menu as="div" className="relative">
                        <div>
                          <Menu.Button className="text-grey-300 hover:bg-grey-700 hover:text-white">
                            <div
                              style={{
                                fontSize: 15,
                                color: "rgb(201, 196, 184)",
                              }}
                              className="flex text-gray-300 hover:bg-sky-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                              <h3>Schools </h3>
                              <svg
                                className="w-4 h-4 item-center ml-2 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 9l-7 7-7-7"
                                ></path>
                              </svg>
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            style={{
                              width: 300,
                              display: "flex",
                              justifyContent: "flex-start",
                              backgroundColor: "rgb(17, 52, 82)",
                              borderColor: "rgb(198, 198, 198)",
                              borderWidth: "1px",
                              zIndex: 50,
                            }}
                            className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              <div style={{ width: 300 }}>
                                <DetailSchool />
                              </div>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    <div className="hidden lg:ml-5 lg:block">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            style={{
                              fontSize: 15,
                              color: "rgb(201, 196, 184)",
                            }}
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-sky-900 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      {/* Bell notification */}
                      <Menu as="div" className="relative ml-1">
                        <div>
                          <Menu.Button className="flex rounded-full mr-4 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">
                              Open bell notification
                            </span>
                            <svg
                              style={{ color: "rgb(240, 240, 240)" }}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div
                              style={{ backgroundColor: "rgb(201, 196, 184)" }}
                              className="rounded-t-lg block py-2 px-4 font-medium text-center text-black-900"
                            >
                              Notifications
                            </div>
                            {notifications.map((e) => {
                              // console.log(notifications);
                              return (
                                <Menu.Item>
                                  <div className="px-2 pt-1 pb-2 w-full border-t-2">
                                    <div className="font-semibold text-sm mb-2 text-gray-900">
                                      {e.title}
                                    </div>
                                    <div className="text-xs text-gray-900">
                                      {e.description} 🚀{" "}
                                    </div>
                                    <div className="text-xs text-blue-600 mt-2">
                                      {duration(e.createdAt)}
                                    </div>
                                  </div>
                                </Menu.Item>
                              );
                            })}
                          </Menu.Items>
                        </Transition>
                      </Menu>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={imgUser}
                              // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {/* <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Your Profile admin
                                </a>
                              )}
                            </Menu.Item> */}
                            <Menu.Item>
                              {({ active }) => (
                                <NavLink
                                  to="/administrator"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Panel Admin
                                </NavLink>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <NavLink
                                  to="/internalChat"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Messages
                                </NavLink>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                  onClick={handlelogout}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pt-2">
                <Menu
                  as="div"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                >
                  <div>
                    <Menu.Button className="text-gray-300 hover:bg-gray-700 hover:text-white">
                      <h3
                        style={{ color: "rgb(201, 196, 184)" }}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        Schools
                      </h3>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      style={{
                        width: 300,
                        display: "flex",
                        justifyContent: "flex-start",
                        backgroundColor: "rgb(17, 52, 82)",
                        borderColor: "rgb(198, 198, 198)",
                        borderWidth: "1px",
                        zIndex: 50,
                      }}
                      className="absolute text-gray-700 left-4 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <Menu.Item>
                        <DetailSchool />
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="space-y-1 px-2 pt-1 pb-3">
                {navigation.map((item) => (
                  <NavLink
                    style={{ color: "rgb(201, 196, 184)" }}
                    key={item.name}
                    as="a"
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        );
      }}
    </Disclosure>
  );
}

export default NavBarAdmin;
