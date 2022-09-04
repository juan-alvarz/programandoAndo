import React, { useState } from "react";
import Select from "react-select";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useForm, Controller } from "react-hook-form";
import videos from "../utils/videos.json";
import Swal from "sweetalert2";
import NavBar from './NavBar.jsx'

export default function CreateCourse() {
  // react-hook-forms
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      description: "",
      videos: [],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    Swal.fire({
      title: "Create Course",
      text: "Course Created Successfully",
      icon: "success",
      confirmButtonText: "Back",
    });
  };
  const [video, setVideo] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();

  const handleSelect = (data) => {
    setSelectedOptions(data);
  };

  const optionList = videos?.map((video) => {
    return {
      value: video.name,
      label: video.name,
    };
  });

  // console.log(optionList);

  return (
    <>
    <NavBar/>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <svg className="mx-auto h-12 w-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create Course
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            action="#"
            method="POST"
          >
            <div>
              <input
                name="name"
                type="text"
                autoComplete="off"
                className="relative block w-full appearance-none rounded-b-md rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Video Name"
                {...register("name", {
                  required: true,
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Name invalid",
                  },
                })}
              />
              {errors.name?.type === "required" && (
                <small className="text-red-600">Input empty</small>
              )}
              {errors.name?.type === "pattern" && (
                <small className="">{errors.name.message}</small>
              )}
            </div>

            <div>
              <input
                name="image"
                type="text"
                autoComplete="off"
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Image or Logo course"
                {...register("image", { required: true })}
              />
              {errors.image?.type === "required" && (
                <small className="text-red-600">Input empty</small>
              )}
            </div>

            <div>
              <textarea
                style={{ resize: "none" }}
                name="description"
                autoComplete="off"
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Description"
                {...register("description", { required: true })}
              />
              {errors.description?.type === "required" && (
                <small className="text-red-600">Input empty</small>
              )}
            </div>

            <Select
              name="video"
              options={optionList}
              placeholder="All Videos"
              value={selectedOptions}
              onChange={handleSelect}
              isSearchable={true}
              // isMulti
              // {...register("video", { required: false })}
            />

            {/* <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="videos"
              control={control}
              {...register("videos")}
            >
           
              <option value="All">Videos</option>
              {videos?.map((video, index) => (
                <option value={video.name} key={index}>
                  {video.name}
                </option>
              ))}
            </select> */}
            <div className="">
              {video.map((v, index) => (
                <div key={index} className="">
                  <span
                    className="cursor-pointer bg-red-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900 hover:bg-red-500"
                    // onClick={() => handleDeleteSchools(video)}
                  >
                    {v.name}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                // style={{ backgroundColor: "red" }}
                disabled={Object.entries(errors).length === 0 ? "" : true}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Create Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
