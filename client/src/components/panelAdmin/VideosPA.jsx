import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Select from "react-select";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { set, useForm } from "react-hook-form";
import { difficult } from "../../utils/difficult";
import Error404 from "../Error404";

import {
  getAllVideos,
  deleteVideoById,
  createsVideo,
  updateVideo,
} from "../../redux/actions";

// import NavbarPA from "./NavbarPA";

function VideosPA() {
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.programandoando);

  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);
  let role = userObj && userObj.user.role;

  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch, getAllVideos]);

  useEffect(() => {
    dispatch(getAllVideos());
  }, [getAllVideos]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
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

  const optionDifficult = difficult?.map((dif) => {
    return {
      value: dif,
      label: dif,
    };
  });

  const onSubmit = (data) => {
    const get = getValues();
    console.log(get);

    console.log(data);
    dispatch(createsVideo(get));

    reset({
      name: "",
      profile: "",
      url: "",
      description: "",
      author: "",
      duration: "",
      difficult: "",
    });
    // window.location.href = window.location.href

    // dispatch(getAllVideos());
  };

  const [videoDelete, setVideoDelete] = useState();
  function handleSelectDelete(data) {
    setVideoDelete(data);
  }

  const optionListVideos = videos?.map((video) => {
    return {
      value: video._id,
      label: video.name,
    };
  });
  // ============ Edit Videos ============
  const [videosSelectValue, setVideosSelectValue] = useState();
  const [render, setRender] = useState({
    name: "",
    author: "",
    duration: "",
    difficult: "",
    profile: "",
    url: "",
    description: "",
  });

  function handleSelectEdit(value) {
    const findSelect = videos.find((school) => school._id === value.value);

    setVideosSelectValue(value);

    if (findSelect) {
      setRender({
        name: findSelect.name,
        author: findSelect.author,
        duration: findSelect.duration,
        difficult: findSelect.difficult,
        profile: findSelect.profile,
        url: findSelect.url,
        description: findSelect.description,
      });
    }
    // console.log(findSelect.courses);
  }
  console.log(videosSelectValue);
  function handleChange(e) {
    console.log(render);
    setRender({
      ...render,
      [e.target.name]: e.target.value,
    });
  }

  const renderuwu = render;

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    // console.log(renderuwu);
    dispatch(updateVideo(renderuwu, videosSelectValue.value));

    dispatch(getAllVideos());
    setVideosSelectValue("Choose Video");
    setRender({
      name: "",
      author: "",
      duration: "",
      difficult: "",
      profile: "",
      url: "",
      description: "",
    });
  };
  // console.log(renderuwu.difficult)

  // ============ Delete =================
  const handleDeleteVideo = (id) => {
    dispatch(deleteVideoById(id));
    setVideoDelete("Select Course");
    // window.location.href = window.location.href
  };

  const [selectedDifficult, setSelectedDifficult] = useState("");
  function handleSelectDifficult(data) {
    setSelectedDifficult(data);
    setValue("difficult", data.label);
  }
  const [contador, setContador] = useState(0);
  const [selectedDifficultEdit, setSelectedDifficultEdit] = useState("");
  function handleSelectDifficultEdit(data) {
    setSelectedDifficultEdit(data);
    setRender({
      ...render,
      difficult: data.value,
    });
    setContador(contador + 1);
    // setValue("difficult", data.label);
  }
  // console.log(selectedDifficultEdit)
  return role === "admin" ? (
    <div className="text-2x1 font-semibold flex h-screen">
      <Sidebar />
      <div
        className="w-full h-full flex justify-around"
        style={{ backgroundColor: "rgb(240, 240, 240)" }}
      >
        {/* Create School */}
        <div>
          {/* <NavbarPA /> */}
          <div className="h-screen">
            <form
              className="w-96 max-w-xs bg-white flex flex-col mt-5 py-2 px-8 rounded-lg shadow-lg"
              onSubmit={handleSubmit(onSubmit)}
              action="#"
              method="POST"
            >
              <h2
                style={{ backgroundColor: "rgb(17, 52, 82)" }}
                className="text-gray-300 font-bold my-2 p-2 rounded-md bg-gray-200 text-center text-xl"
              >
                Create Video
              </h2>

              {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
                Name
              </label> */}
              <input
                name="name"
                type="text"
                className="text-gray-700 font-light shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-2"
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

              {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
                Author
              </label> */}
              <input
                name="author"
                type="text"
                className="text-gray-700 font-light shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-2"
                placeholder="Author"
                {...register("author", {
                  required: true,
                })}
              />
              {errors.name?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}

              {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
                Duration
              </label> */}
              <input
                name="duration"
                type="text"
                className="text-gray-700 font-light shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-2"
                placeholder="Duration"
                {...register("duration", {
                  required: true,
                })}
              />
              {errors.name?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}

              <div className="mb-2">
                {/* <label
                  htmlFor="Difficult"
                  className="block text-sm font-bold text-black undefined"
                >
                  Difficult
                </label> */}
                <Select
                  name="difficult"
                  options={optionDifficult}
                  placeholder="Difficult"
                  value={selectedDifficult}
                  onChange={handleSelectDifficult}
                  isSearchable={false}
                  className="font-light"
                />
              </div>

              <label className="text-gray-700 font-bold mb-1" htmlFor="">
                Profile Video
              </label>
              <input
                name="profile"
                type="text"
                className="text-gray-700 font-light shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-2"
                placeholder="http://..."
                {...register("profile", {
                  required: true,
                  pattern: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
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

              <label className="text-gray-700 font-bold mb-1" htmlFor="">
                URL Video
              </label>
              <input
                name="url"
                type="text"
                className="text-gray-700 font-light shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-2"
                placeholder="http://..."
                {...register("url", {
                  required: true,
                  pattern: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
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

              {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
                Description
              </label> */}
              <textarea
                style={{ resize: "none" }}
                name="description"
                className="text-gray-700 font-light shadow border rounded border-gray-300 py-1 px-3 mb-2 focus:outline-none focus:shadow-outline"
                placeholder="Description"
                {...register("description", { required: true })}
              />
              {errors.description?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}

              <div className="flex justify-end items-center my-4 mt-5">
                <button
                  style={{ backgroundColor: "rgb(55, 109, 109)" }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 "
                  disabled={Object.entries(errors).length === 0 ? "" : true}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Edit Video */}
        <div>
          <div className="h-screen">
            <form
              className="w-96 max-w-xs bg-white flex flex-col mt-5 py-2 px-8 rounded-lg shadow-lg"
              action=""
              onSubmit={(e) => handleSubmitEdit(e)}
            >
              <h2
                style={{ backgroundColor: "rgb(17, 52, 82)" }}
                className="text-gray-300 font-bold my-2 p-2 rounded-md bg-gray-200 text-center text-xl"
              >
                Edit Video
              </h2>
              {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
                Select Video
              </label> */}
              <Select
                options={optionListVideos}
                placeholder="Select Video"
                value={videosSelectValue}
                onChange={handleSelectEdit}
                isSearchable={true}
                className="font-light"
              />

              <h2
                style={{ backgroundColor: "rgb(17, 52, 82)" }}
                className="text-gray-300 font-bold my-2 p-2 rounded-md bg-gray-200 text-center text-xl"
              >
                Form to Edit
              </h2>
              {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
                Name
              </label> */}
              <input
                name="name"
                type="text"
                value={render.name}
                className="text-gray-700 font-light shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-2"
                placeholder="Name"
                onChange={(e) => handleChange(e)}
              />
              {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
                Author
              </label> */}
              <input
                name="author"
                type="text"
                value={render.author}
                className="text-gray-700 font-light shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-2"
                placeholder="Author"
                onChange={(e) => handleChange(e)}
              />
              {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
                Duration
              </label> */}
              <input
                name="duration"
                type="text"
                value={render.duration}
                className="text-gray-700 font-light shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-2"
                placeholder="Duration"
                onChange={(e) => handleChange(e)}
              />
              {/* <label
                htmlFor="Difficult"
                className="block text-sm font-bold text-black undefined"
              >
                Difficult
              </label> */}
              <div className="mb-2">
                <Select
                  name="difficult"
                  options={optionDifficult}
                  placeholder="Difficult"
                  value={selectedDifficultEdit}
                  onChange={handleSelectDifficultEdit}
                  isSearchable={false}
                  className="font-light"
                />
              </div>
              <label className="text-gray-700 font-bold mb-1" htmlFor="">
                Profile Video
              </label>
              <input
                name="profile"
                type="text"
                className="text-gray-700 font-light shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-2"
                placeholder="http://..."
                value={render.profile}
                onChange={(e) => handleChange(e)}
              />

              <label className="text-gray-700 font-bold mb-1" htmlFor="">
                URL Video
              </label>
              <input
                name="url"
                type="text"
                className="text-gray-700 font-light shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-2"
                placeholder="http://..."
                value={render.url}
                onChange={(e) => handleChange(e)}
              />

              {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
                Description
              </label> */}

              <textarea
                style={{ resize: "none" }}
                name="description"
                value={render.description}
                className="text-gray-700 font-light shadow border rounded border-gray-300 mb-2 py-1 px-3 focus:outline-none focus:shadow-outline"
                placeholder="Description"
                onChange={(e) => handleChange(e)}
              />
              <div className="flex justify-end items-center my-4 mt-3">
                <button
                  style={{ backgroundColor: "rgb(55, 109, 109)" }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 "
                  disabled={Object.entries(errors).length === 0 ? "" : true}
                >
                  Edit Video
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Delete Video */}
        <div>
          <div className="h-screen">
            <form
              className="w-96 max-w-xs bg-white flex flex-col mt-5 py-2 px-8 rounded-lg shadow-lg"
              action=""
            >
              <h2
                style={{ backgroundColor: "rgb(17, 52, 82)" }}
                className="text-gray-300 font-bold my-2 p-2 rounded-md bg-gray-200 text-center text-xl"
              >
                Delete Video
              </h2>
              {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
                Select Videos
              </label> */}
              <Select
                options={optionListVideos}
                placeholder="Select video"
                value={videoDelete}
                onChange={handleSelectDelete}
                isSearchable={true}
                className="font-light"
              />

              <div className="flex justify-end items-center my-4 mt-5">
                <button
                  style={{ backgroundColor: "rgb(55, 109, 109)" }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 "
                  type="button"
                  onClick={() => handleDeleteVideo(videoDelete["value"])}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Error404 />
  );
}

export default VideosPA;
