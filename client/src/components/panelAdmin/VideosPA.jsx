import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Select from "react-select";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getAllVideos,
  deleteVideoById,
  createsVideo,
} from "../../redux/actions";

// import NavbarPA from "./NavbarPA";

function VideosPA() {
  const dispatch = useDispatch();

  const { videos } = useSelector((state) => state.programandoando);

  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      profile: "",
      url: "",
      description: "",
      author: "",
      duration: "",
      difficult: "",
    },
  });

  const onSubmit = (data) => {
    const get = getValues();
    console.log(get);

    console.log(data);
    dispatch(createsVideo(get));

    Swal.fire({
      title: "Create Course",
      text: "Course Created Successfully",
      icon: "success",
      confirmButtonText: "Back",
    });
  };

  const [videoDelete, setVideoDelete] = useState();
  function handleSelectDelete(data) {
    setVideoDelete(data);
  }

  const [courseEdit, setEditCourse] = useState();
  function handleSelectEdit(data) {
    setEditCourse(data);
  }

  const optionListVideos = videos?.map((video) => {
    return {
      value: video._id,
      label: video.name,
    };
  });

  // ============ Delete =================
  const handleDeleteCourse = (id) => {
    dispatch(deleteVideoById(id));
  };
  return (
    <div className="text-2x1 font-semibold flex h-screen">
      <Sidebar />
      <div
        className="w-full h-full flex justify-around"
        style={{ backgroundColor: "#C9C4B8" }}
      >
        {/* Create School */}
        <div>
          {/* <NavbarPA /> */}
          <div className="h-screen">
            <form
              className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"
              onSubmit={handleSubmit(onSubmit)}
              action="#"
              method="POST"
            >
              <h2 className="text-gray-700 font-bold py-2 text-center text-xl">
                Create Video
              </h2>

              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Name
              </label>
              <input
                name="name"
                type="text"
                className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                placeholder="Name"
                {...register("name", {
                  required: true,
                  //   validate: {
                  //     repeat: (v) =>
                  //       !videos.includes(
                  //         videos.find(
                  //           (c) =>
                  //             c.name.replace(/\s+/g, "").toLowerCase() ===
                  //             v.replace(/\s+/g, "").toLowerCase()
                  //         )
                  //       ),
                  //   },
                  // })}
                })}
              />
              {errors.name?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}

              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Author
              </label>
              <input
                name="author"
                type="text"
                className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                placeholder="Author"
                {...register("author", {
                  required: true,
                })}
              />
              {errors.name?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}

              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Duration
              </label>
              <input
                name="duration"
                type="text"
                className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                placeholder="Duration"
                {...register("duration", {
                  required: true,
                })}
              />
              {errors.name?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}

              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Difficult
              </label>
              <input
                name="difficult"
                type="text"
                className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                placeholder="Difficult"
                {...register("difficult", {
                  required: true,
                })}
              />
              {errors.name?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}

              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Profile Video
              </label>
              <input
                name="profile"
                type="text"
                className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                placeholder="http://..."
                {...register("profile", {
                  required: true,
                  pattern:
                    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                })}
              />
              {errors.profile?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}
              {errors.profile?.type === "pattern" && (
                <small className="text-red-600 font-bold">
                  URL Not Valid or Format not Valid
                </small>
              )}

              <label className="text-gray-700 font-bold py-2" htmlFor="">
                URL Video
              </label>
              <input
                name="url"
                type="text"
                className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                placeholder="http://..."
                {...register("url", {
                  required: true,
                  pattern:
                    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                })}
              />
              {errors.url?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}
              {errors.url?.type === "pattern" && (
                <small className="text-red-600 font-bold">
                  URL Not Valid or Format not Valid
                </small>
              )}

              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Description
              </label>
              <textarea
                // style={{ resize: "none" }}
                name="description"
                className="text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline"
                placeholder="Description"
                {...register("description", { required: true })}
              />
              {errors.description?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}

              <div className="flex justify-end items-center my-4 mt-10">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 "
                  disabled={Object.entries(errors).length === 0 ? "" : true}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Edit School */}
        <div>
          <div className="h-screen">
            <form
              className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"
              action=""
            >
              <h2 className="text-gray-700 font-bold py-2 text-center text-xl">
                Edit Video
              </h2>
              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Select Videos
              </label>
              <Select
                options={optionListVideos}
                placeholder="Select school"
                value={courseEdit}
                onChange={handleSelectEdit}
                isSearchable={true}
              />
              <div className="flex justify-end items-center my-4 mt-10">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 ">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Delete School */}
        <div>
          <div className="h-screen">
            <form
              className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"
              action=""
            >
              <h2 className="text-gray-700 font-bold py-2 text-center text-xl">
                Delete Video
              </h2>
              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Select Videos
              </label>
              <Select
                options={optionListVideos}
                placeholder="Select course"
                value={videoDelete}
                onChange={handleSelectDelete}
                isSearchable={true}
              />

              <div className="flex justify-end items-center my-4 mt-10">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 "
                  type="button"
                  onClick={() => handleDeleteCourse(videoDelete["value"])}
                >
                  Delete
                </button>
              </div>
            </form>

            {/* <div>
              {videos.map((v, index) => (
                <div key={index} className="w-60 my-10">
                  <span
                    className="cursor-pointer bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-pink-800 hover:text-gray-200"
                    onClick={() => handleDeleteSelect(v)}
                  >
                    {v.url}
                  </span>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideosPA;
