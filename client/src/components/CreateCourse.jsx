import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, createsCourse, getAllCourses } from "../redux/actions";
import Swal from "sweetalert2";

import NavBar from "./NavBar";
import Google from "./Google";

export default function CreateCourse() {
  const navigate = useNavigate();

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
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
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
    <div style={{backgroundColor: 'rgb(240, 240, 240)'}}>
      <NavBar />
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <div
            className="flex flex-col items-center"
            style={{ color: "rgb(168,76,101)" }}
          >
            <h2 style={{ color: "rgb(17, 52, 82)" }} className="text-3xl font-semibold text-center text-black uppercase">
              Create route
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
                Name
              </label>
              <input
                name="name"
                type="text"
                autoComplete="off"
                className="block w-full px-4 py-2 mt-2 text-black font-light bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                <small className="text-red-600 font-bold">Name empty</small>
              )}
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-semibold text-gray-800"
              >
                Image
              </label>
              <input
                name="image"
                type="text"
                autoComplete="off"
                className="block w-full px-4 py-2 mt-2 text-black font-light bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Image or Logo course"
                {...register("image", {
                  required: true,
                  pattern:
                    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                  pattern: /.*(png|jpg|jpeg|gif)$/,
                })}
              />
              {errors.image?.type === "required" && (
                <small className="text-red-600 font-bold">Image empty</small>
              )}
              {errors.image?.type === "pattern" && (
                <small className="text-red-600 font-bold">URL Not Valid</small>
              )}
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-semibold text-gray-800"
              >
                Description
              </label>
              <textarea
                style={{ resize: "none" }}
                name="description"
                autoComplete="off"
                className="block w-full px-4 py-2 mt-2 text-black font-light bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Description"
                {...register("description", { required: true })}
              />
              {errors.description?.type === "required" && (
                <small className="text-red-600 font-bold">Description empty</small>
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

            <div
              style={{
                overflow: "scroll",
                height: "160px",
                backgroundColor: "rgb(198, 198, 198)",
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "white",
              }}
              className=""
            >
              {video.map((v, index) => (
                <div key={index} className="text-center">
                  <span
                    className="cursor-pointer bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-pink-800 hover:text-gray-200"
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
}
