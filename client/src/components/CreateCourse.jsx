import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { schools } from "../utils/schools";
import { lenguages } from "../utils/lenguages";

export default function CreateCourse() {
  const [input, setInput] = useState({
    name: "",
    video: "",
    canal: "",
    description: "",
    author: "",
    image: "",
    schools: [],
    lenguages: [],
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectSchools = (e) => {
    if (e.target.value !== "All")
      setInput({
        ...input,
        schools: [...input.schools, e.target.value],
      });
  };

  const handleSelectLenguages = (e) => {
    if (e.target.value !== "All")
      setInput({
        ...input,
        lenguages: [...input.lenguages, e.target.value],
      });
  };

  const handleDeleteSchools = (e) => {
    setInput({
      ...input,
      schools: input.schools.filter((school) => school !== e),
    });
  };

  const handleDeleteLenguages = (e) => {
    setInput({
      ...input,
      lenguages: input.lenguages.filter((lenguage) => lenguage !== e),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    alert("Funciona");
  };
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Video creation form
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => handleSubmit(e)}
            action="#"
            method="POST"
          >
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}

            <div>
              <input
                id="name-video"
                value={input.name}
                name="name"
                type="text"
                autoComplete="off"
                required
                className="relative block w-full appearance-none rounded-b-md rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Video Name"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <input
                id="video"
                value={input.video}
                name="video"
                type="text"
                autoComplete="off"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="http:// URL(video)"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <input
                id="canal"
                value={input.canal}
                name="canal"
                type="text"
                autoComplete="off"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="http:// URL(canal)"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <textarea
                style={{ resize: "none" }}
                id="description"
                value={input.description}
                name="description"
                autoComplete="off"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Description"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <input
                id="author"
                value={input.author}
                name="author"
                type="text"
                autoComplete="off"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Author"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <input
                id="image"
                value={input.image}
                name="image"
                type="text"
                autoComplete="off"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Photo of the Author or Logo"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <select
              name="schools"
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => handleSelectSchools(e)}
            >
              <option value="All">Schools</option>
              {schools?.map((school, index) => (
                <option value={school.name} key={index}>
                  {school.name}
                </option>
              ))}
            </select>
            <div className="">
              {input.schools.map((school, index) => (
                <div key={index} className="">
                  <span
                    className="cursor-pointer bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900 hover:bg-red-700"
                    onClick={() => handleDeleteSchools(school)}
                  >
                    {school}
                  </span>
                </div>
              ))}
            </div>

            <select
              name="lenguages"
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => handleSelectLenguages(e)}
            >
              <option value="All">Lenguages or Frameworks</option>
              {lenguages?.map((lenguage, index) => (
                <option value={lenguage.name} key={index}>
                  {lenguage.name}
                </option>
              ))}
            </select>
            <div className="">
              {input.lenguages.map((lenguage, index) => (
                <div key={index} className="">
                  <span
                    className="cursor-pointer bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900 hover:bg-red-700"
                    onClick={() => handleDeleteLenguages(lenguage)}
                  >
                    {lenguage}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                // disabled={Object.entries(errors).length === 0 ? "" : true}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Video Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
