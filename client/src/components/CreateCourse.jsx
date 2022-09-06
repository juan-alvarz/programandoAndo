import React, { useState, useEffect } from "react";
import Select from "react-select";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, createsCourse, getAllCourses } from "../redux/actions";
import Swal from "sweetalert2";
import NavBar from "./NavBar";

export default function CreateCourse() {
  const { videos, courses } = useSelector((state) => state.programandoando);
  const dispatch = useDispatch();

  console.log(courses);

  useEffect(() => {
    dispatch(getAllVideos());
    dispatch(getAllCourses());
  }, [dispatch]);

  // react-hook-forms
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      description: "",
      videos: [],
    },
  });

  const onSubmit = (data) => {
    const get = getValues();
    console.log(get);

    handleSelect(video);
    console.log(data);
    dispatch(createsCourse(get));

    Swal.fire({
      title: "Create Course",
      text: "Course Created Successfully",
      icon: "success",
      confirmButtonText: "Back",
    });
  };

  const [video, setVideo] = useState([]);

  const handleSelect = (value) => {
    const find = video.find((i) => i.value === value.value);
    if (!find) {
      setVideo([...video, value]);
      setValue(
        "videos",
        [...video, value].map((e) => e.value)
      );
      console.log(video);
    }
    // console.log(find);
  };

  const optionList = videos?.map((video) => {
    return {
      value: video._id,
      label: video.name,
    };
  });

  const handleDeleteSelect = (value) => {
    const videoFilter = video.filter((v) => v !== value);
    setVideo(videoFilter);
  };

  // console.log(optionList);
  let pattern =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  let reg_exUrl =
    /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;
  let reg_exImg = /.*(png|jpg|jpeg|gif)$/;
  return (
    <div style={{ height: "90vh" }}>
      <NavBar />
      <div
        className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "rgb(198, 198, 198)" }}
      >
        <div className="w-full max-w-md space-y-8 font">
          <div
            className="flex flex-col items-center"
            style={{ color: "rgb(168,76,101)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 mb-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>
            <h2 className=" text-center text-3xl font-bold tracking-tight text-gray-900">
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
                className="relative block w-full appearance-none rounded-b-md rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm font-light"
                placeholder="Course Name"
                {...register("name", {
                  required: true,
                  validate: {
                    repeat: (v) =>
                      !courses.includes(
                        courses.find(
                          (c) =>
                            c.name.replace(/\s+/g, "").toLowerCase() ===
                            v.replace(/\s+/g, "").toLowerCase()
                        )
                      ),
                  },
                })}
              />
              {errors.name?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}
            </div>

            <div>
              <input
                name="image"
                type="text"
                autoComplete="off"
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm font-light"
                placeholder="Image or Logo course"
                {...register("image", {
                  required: true,
                  pattern:
                    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                  pattern: /.*(png|jpg|jpeg|gif)$/,
                })}
              />
              {errors.image?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}
              {errors.image?.type === "pattern" && (
                <small className="text-red-600 font-bold">URL Not Valid</small>
              )}
            </div>

            <div>
              <textarea
                style={{ resize: "none" }}
                name="description"
                autoComplete="off"
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm font-light"
                placeholder="Description"
                {...register("description", { required: true })}
              />
              {errors.description?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}
            </div>

            <Select
              name="video"
              options={optionList}
              placeholder="All Videos"
              value={video}
              onChange={handleSelect}
              isSearchable={true}
              className="font-light"
            />

            <div className="">
              {video.map((v, index) => (
                <div key={index} className="">
                  <span
                    className="cursor-pointer bg-red-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900 hover:bg-red-500"
                    onClick={() => handleDeleteSelect(v)}
                  >
                    {v.label}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                style={{ backgroundColor: "rgb(17, 52, 82)" }}
                disabled={Object.entries(errors).length === 0 ? "" : true}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 group-hover:text-indigo-400"
                    aria-hidden="true"
                    style={{ color: "rgb(201, 196, 184)" }}
                  />
                </span>
                Create Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> Roge
