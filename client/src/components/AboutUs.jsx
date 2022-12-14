import React, { useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Lucho from "../utils/images/LuisAboutUs1.png";
import Santi from "../utils/images/SantiagoAboutUs1.png";
import Agus from "../utils/images/AgustinAboutUs1.png";
import Fran from "../utils/images/FrancoAboutUs1.png";
import Dani from "../utils/images/DanielAboutUs1.png";
import Juan from "../utils/images/JuanAboutUs1.png";
import Roge from "../utils/images/RogelioAboutUs1.png";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../redux/actions";

function AboutUs() {
  // console.log("uwu");
  let userLocal = window.localStorage.getItem("user");
  let userObj = userLocal && JSON.parse(userLocal);
  let idUser = userObj && userObj.user._id;

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllNotifications());
    dispatch(getUser(idUser));
  }, [dispatch]);
  return (
    <section style={{ backgroundColor: "rgb(240, 240, 240)" }}>
      <NavBar />
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <h2
            style={{ color: "rgb(17, 52, 82)" }}
            className="mb-4 text-4xl tracking-tight font-extrabold text-gray-800"
          >
            Our team
          </h2>
          <p
            style={{ color: "rgb(17, 52, 82)" }}
            className="font-medium text-gray-500 sm:text-xl"
          >
            Future programmers creating the platform that will train future
            programmers
          </p>
        </div>
        <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="text-center text-gray-500">
            <img
              className="mx-auto mb-4 w-36 h-36 rounded-full"
              src={Fran}
              alt="Fran Avatar"
            />
            <h3
              style={{ color: "rgb(55, 109, 109)" }}
              className="mb-1 text-2xl font-bold tracking-tight text-gray-800 "
            >
              <a href="#">Franco Giuliano</a>
            </h3>
            <p style={{ color: "rgb(17, 52, 82)" }}>Future programmer</p>
            <ul className="flex justify-center mt-4 space-x-4">
              <li>
                <a
                  href="https://github.com/frangiuliano"
                  style={{ color: "rgb(168, 76, 101)" }}
                  className="text-gray-200 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/francosebastiangiuliano/"
                  style={{ color: "rgb(168, 76, 101)" }}
                  className="text-[#ea4c89] hover:text-gray-900"
                >
                  <svg
                    style={{ color: "rgb(168, 76, 101)" }}
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    {" "}
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center text-gray-500">
            <img
              className="mx-auto mb-4 w-36 h-36 rounded-full"
              src={Santi}
              alt="Santi Avatar"
            />
            <h3
              style={{ color: "rgb(55, 109, 109)" }}
              className="mb-1 text-2xl font-bold tracking-tight text-gray-800"
            >
              <a href="#">Santiago Vega</a>
            </h3>
            <p style={{ color: "rgb(17, 52, 82)" }}>Future programmer</p>
            <ul className="flex justify-center mt-4 space-x-4">
              <li>
                <a
                  href="https://github.com/Santy1707"
                  style={{ color: "rgb(168, 76, 101)" }}
                  className="text-gray-200 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/santiago-vega-53970b217/"
                  className="text-[#ea4c89] hover:text-gray-900"
                >
                  <svg
                    style={{ color: "rgb(168, 76, 101)" }}
                    className="w-5 h-5 text-blue-500 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    {" "}
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center text-gray-500">
            <img
              className="mx-auto mb-4 w-36 h-36 rounded-full"
              src={Lucho}
              alt="Lucho Avatar"
            />
            <h3
              style={{ color: "rgb(55, 109, 109)" }}
              className="mb-1 text-2xl font-bold tracking-tight text-gray-800"
            >
              <a href="#">Luis Blanco</a>
            </h3>
            <p style={{ color: "rgb(17, 52, 82)" }}>Future programmer</p>
            <ul className="flex justify-center mt-4 space-x-4">
              <li>
                <a
                  href="https://github.com/Luchobd"
                  style={{ color: "rgb(168, 76, 101)" }}
                  className="text-gray-200 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/luis-wuilfredo-blanco-delgado-b47619207/"
                  className="text-[#ea4c89] hover:text-gray-900"
                >
                  <svg
                    style={{ color: "rgb(168, 76, 101)" }}
                    className="w-5 h-5 text-blue-500 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    {" "}
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center text-gray-500">
            <img
              className="mx-auto mb-4 w-36 h-36 rounded-full"
              src={Juan}
              alt="Juan Avatar"
            />
            <h3
              style={{ color: "rgb(55, 109, 109)" }}
              className="mb-1 text-2xl font-bold tracking-tight text-gray-800"
            >
              <a href="#">Juan Alvarez</a>
            </h3>
            <p style={{ color: "rgb(17, 52, 82)" }}>Future programmer</p>
            <ul className="flex justify-center mt-4 space-x-4">
              <li>
                <a
                  href="https://github.com/juan-alvarz"
                  style={{ color: "rgb(168, 76, 101)" }}
                  className="text-gray-200 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/juan-alvarez-8857aa18b/"
                  className="text-[#ea4c89] hover:text-gray-900"
                >
                  <svg
                    style={{ color: "rgb(168, 76, 101)" }}
                    className="w-5 h-5 text-blue-500 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    {" "}
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center text-gray-500">
            <img
              className="mx-auto mb-4 w-36 h-36 rounded-full"
              src={Dani}
              alt="Dani Avatar"
            />
            <h3
              style={{ color: "rgb(55, 109, 109)" }}
              className="mb-1 text-2xl font-bold tracking-tight text-gray-800"
            >
              <a href="#">Daniel Martinez</a>
            </h3>
            <p style={{ color: "rgb(17, 52, 82)" }}>Future programmer</p>
            <ul className="flex justify-center mt-4 space-x-4">
              <li>
                <a
                  href="https://github.com/DanielFMartinezC"
                  style={{ color: "rgb(168, 76, 101)" }}
                  className="text-gray-200 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/daniel-felipe-mart%C3%ADnez-cubillos-904551241/"
                  className="text-[#ea4c89] hover:text-gray-900"
                >
                  <svg
                    style={{ color: "rgb(168, 76, 101)" }}
                    className="w-5 h-5 text-blue-500 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    {" "}
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center text-gray-500">
            <img
              className="mx-auto mb-4 w-36 h-36 rounded-full"
              src={Roge}
              alt="Roge Avatar"
            />
            <h3
              style={{ color: "rgb(55, 109, 109)" }}
              className="mb-1 text-2xl font-bold tracking-tight text-gray-800"
            >
              <a href="#">Rogelio Sandoval</a>
            </h3>
            <p style={{ color: "rgb(17, 52, 82)" }}>Future programmer</p>
            <ul className="flex justify-center mt-4 space-x-4">
              <li>
                <a
                  href="https://github.com/Danzsv"
                  style={{ color: "rgb(168, 76, 101)" }}
                  className="text-gray-200 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/rogelio-sandoval/"
                  className="text-[#ea4c89] hover:text-gray-900"
                >
                  <svg
                    style={{ color: "rgb(168, 76, 101)" }}
                    className="w-5 h-5 text-blue-500 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    {" "}
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center text-gray-500 ">
            <img
              className="mx-auto mb-4 w-36 h-36 rounded-full"
              src={Agus}
              alt="Agus Avatar"
            />
            <h3
              style={{ color: "rgb(55, 109, 109)" }}
              className="mb-1 text-2xl font-bold tracking-tight text-gray-800"
            >
              <a href="#">Agustin Figueredo</a>
            </h3>
            <p style={{ color: "rgb(17, 52, 82)" }}>Future programmer</p>
            <ul className="flex justify-center mt-4 space-x-4">
              <li>
                <a
                  href="https://github.com/agu6692"
                  style={{ color: "rgb(168, 76, 101)" }}
                  className="text-gray-200 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/juan-agust%C3%ADn-figueredo-56a416194/"
                  className="text-[#ea4c89] hover:text-gray-900"
                >
                  <svg
                    style={{ color: "rgb(168, 76, 101)" }}
                    className="w-5 h-5 text-blue-500 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    {" "}
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default AboutUs;
