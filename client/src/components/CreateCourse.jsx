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
    <>
      <NavBar />
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
              alt="Workflow"
            />
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
                <small className="text-red-600">Input empty</small>
              )}
            </div>

            <div>
              <input
                name="image"
                type="text"
                autoComplete="off"
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Image or Logo course"
                {...register("image", {
                  required: true,
                  pattern:
                    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                  pattern: /.*(png|jpg|jpeg|gif)$/,
                })}
              />
              {errors.image?.type === "required" && (
                <small className="text-red-600">Input empty</small>
              )}
              {errors.image?.type === "pattern" && (
                <small className="text-red-600">URL Not Valid</small>
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
              value={video}
              onChange={handleSelect}
              isSearchable={true}
            />

            <div className="">
              {video.map((v, index) => (
                <div key={index} className="">
                  <span
                    className="cursor-pointer bg-red-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900 hover:bg-red-500"
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
