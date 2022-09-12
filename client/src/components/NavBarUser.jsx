import React, { useEffect } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { DetailSchool } from "./DetailSchool";
import img from "../utils/images/LOGOCOMPLETOPA.png";
import Notifications from './Notifications'
import { getAllNotifications } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";



const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Courses", href: "/allCourses", current: false },
  { name: "About us", href: "/aboutUs", current: false },
  { name: "Create route", href: "/createCourse", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBarUser() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.programandoando);

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  const handlelogout = (e) => {
    e.preventDefault();

    window.localStorage.removeItem("user");
    setTimeout(function () {
    
        navigate("/");
    }, 1000
    )
  }

  return (
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
                      {/* <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button> */}

{/* <button id="dropdownNotificationButton" data-dropdown-toggle="dropdownNotification" class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400" type="button"> 
<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
<div class="flex relative">
  <div class="inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
</div>
</button>
<!-- Dropdown menu -->
<div id="dropdownNotification" class="hidden z-20 w-full max-w-sm bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
  <div class="block py-2 px-4 font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white">
      Notifications
  </div>
  <div class="divide-y divide-gray-100 dark:divide-gray-700">
    <a href="#" class="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
      <div class="flex-shrink-0">
        <img class="w-11 h-11 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"/>
        <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-blue-600 rounded-full border border-white dark:border-gray-800">
          <svg class="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
        </div>
      </div>
      <div class="pl-3 w-full">
          <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span class="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
          <div class="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
      </div>
    </a>
    <a href="#" class="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
      <div class="flex-shrink-0">
        <img class="w-11 h-11 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Joseph image"/>
        <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-800">
          <svg class="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
        </div>
      </div>
      <div class="pl-3 w-full">
          <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span> and <span class="font-medium text-gray-900 dark:text-white">5 others</span> started following you.</div>
          <div class="text-xs text-blue-600 dark:text-blue-500">10 minutes ago</div>
      </div>
    </a>
    <a href="#" class="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
      <div class="flex-shrink-0">
        <img class="w-11 h-11 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
        <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-800">
          <svg class="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg>
        </div>
      </div>
      <div class="pl-3 w-full">
          <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">Bonnie Green</span> and <span class="font-medium text-gray-900 dark:text-white">141 others</span> love your story. See it and view more stories.</div>
          <div class="text-xs text-blue-600 dark:text-blue-500">44 minutes ago</div>
      </div>
    </a>
    <a href="#" class="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
      <div class="flex-shrink-0">
        <img class="w-11 h-11 rounded-full" src="/docs/images/people/profile-picture-4.jpg" alt="Leslie image"/>
        <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white dark:border-gray-800">
          <svg class="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
        </div>
      </div>
      <div class="pl-3 w-full">
          <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">Leslie Livingston</span> mentioned you in a comment: <span class="font-medium text-blue-500" href="#">@bonnie.green</span> what do you say?</div>
          <div class="text-xs text-blue-600 dark:text-blue-500">1 hour ago</div>
      </div>
    </a>
    <a href="#" class="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
      <div class="flex-shrink-0">
        <img class="w-11 h-11 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Robert image"/>
        <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white dark:border-gray-800">
          <svg class="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
        </div>
      </div>
      <div class="pl-3 w-full">
          <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">Robert Brown</span> posted a new video: Glassmorphism - learn how to implement the new design trend.</div>
          <div class="text-xs text-blue-600 dark:text-blue-500">3 hours ago</div>
      </div>
    </a>
  </div>
  <a href="#" class="block py-2 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
    <div class="inline-flex items-center ">
      <svg class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
        View all
    </div>
  </a>
</div> */}
                      
                      {/* Bell notification */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full mr-4 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open bell notification</span>
                            <svg style={{color: 'rgb(240, 240, 240)'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                              <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clip-rule="evenodd" />
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {notifications.map( e => {
                              console.log(notifications)
                              return (
                                <Menu.Item>
                                  <div>
                                    <div>{e.title}</div>
                                    <div>{e.description}</div>
                                  </div>
                                </Menu.Item>  
                              )  
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
                            {/* <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Your Profile user
                                </a>
                              )}
                            </Menu.Item> */}
                            <Menu.Item>
                              {({ active }) => (
                                <NavLink
                                  to="/donators"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Donar
                                </NavLink>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <NavLink
                                  to="/favorites"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Favorites
                                </NavLink>
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
  )
}

export default NavBarUser