import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { DetailSchool } from "./DetailSchool";
import img from "../utils/images/LOGOCOMPLETOPA.png";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Courses", href: "/allCourses", current: false },
  { name: "About us", href: "/aboutUs", current: false },
  { name: "Create route", href: "/createCourse", current: false },
];

const navigation2 = [
  { name: "Register", href: "/register", current: false },
  { name: "Login", href: "/login", current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {

  const usuario = window.localStorage.getItem('user')

  const navigate = useNavigate()

  const handlelogout = (e) => {
    e.preventDefault();

    window.localStorage.removeItem("user");
    setTimeout(function () {
    
        navigate("/");
    }, 2000
    )
  }

  return (
    usuario ? 
    <Disclosure
      as="nav"
      style={{ backgroundColor: "rgb(17, 52, 82)"}}
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
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
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
                  <Disclosure.Button
                    style={{ color: "rgb(201, 196, 184)" }}
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        );
      }}
    </Disclosure>
    :
    <Disclosure
      as="nav"
      style={{ backgroundColor: "rgb(17, 52, 82)"}}
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
                        {navigation2.map((item) => (
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
                  <Disclosure.Button
                    style={{ color: "rgb(201, 196, 184)" }}
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        );
      }}
    </Disclosure>
  );
}
